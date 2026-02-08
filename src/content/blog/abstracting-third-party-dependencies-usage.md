---
title: 'Abstracting third party dependencies usage'
description: 'Third party frameworks/libraries are easy to configure and helps us to boost the application development...'
category: 'swift'
date: '2019-04-25'
draft: false
---
Third party frameworks/libraries are easy to configure and helps us to boost the application development. On the contrary, the entirety of the dependency is not known and it is difficult to maintain them if Apple makes any Swift version update. We would have used that framework in different files so it will also be time consuming to remove the dependency and write something on our own/to find an alternative dependency.

In this post, we will look into ways to abstract and refactor the dependencies to a single function/single class file, therefore it will be easy to do changes in case of update.

#### Extensions
Let's consider `Kingfisher` and `AlamofireImage` framework. Both are used to download image from the given url and can also be cached locally in memory/disk. In a typical iOS application with image, one of these framework, let's say `Kingfisher` will be used in multiple class files to setImage to corresponding imageview/container. If we want to replace `Kingfisher` with `AlamofireImage` it will be a tedious process. The ugly way to do this is by making change to all the files, whereall the previous framework is used. The better approach should be with tweaking the implementation itself. By adopting the below method, frameworks can be implemented efficiently.

```swift
import UIKit
import Kingfisher

extension UIImageView {
	func setImage(fromUrl:URL) {
		kf.setImage(with: url)
	}
}
```  
Thus, in case of replacing the framework, change is required only to this single extension file. 

#### Protocol
Protocol allows us to abstract the usage of library to other parts of the source code. In iOS, keychain is highly secure, where we can store user sensitive datas. A library called `KeychainSwift` provides key-value pair API to get and set values into the keychain. 

```swift
let keyChain = KeychainSwift()
keyChain.set("Hello all",forKey:"Secure key") 
keyChain.get("Secure key") // Returns "Hello all" value 
```

Protocol will hide the usage of library to most of the codebase. Let's check protocol implementation as follows,

```swift
protocol TokenStore {
	var accessToken :String {get set}
	var refreshToken :String {get set}
}

extension KeychainSwift:TokenStore {
	private enum Keys {
		static let accessToken = "accessToken"
		static let refreshToken = "refreshToken"
	}

	var accessToken:String{
		get{return get(Keys.accessToken)}
		set{set(newValue,forKeys:Keys.refreshToken)}
	}

	var refreshToken: String {
        get { return get(Keys.refreshToken) }
        set { set(newValue, forKey: Keys.refreshToken)}
    }
}


// Now without mentioning the Library name we can use the functionality in our class file by Protocol
class AuthenticationService {
    private let tokenStore: TokenStore

    init(tokenStore: TokenStore) {
        self.tokenStore = tokenStore
    }

    func fetchToken() {
    	print("Access token is \(tokenStore.accessToken)")
    }

    func saveToken(token:String,refreshToken:String) {
      tokenStore.accessToken = token
      tokenStore.refreshToken = refreshToken
    }
} 
```

In above case, we will use `KeychainSwift` library only while creating AuthenticationService object. In this way, we can abstract the library usage from rest of the codebase 

Most of the frameworks might be an overkill to your application's use case. If you have more time to develop a feature it is always better to write any framework on your own in order to have control over the framework.
