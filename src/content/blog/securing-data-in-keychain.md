---
title: 'Securing data in Keychain'
description: 'Application security is very important in case of application development. Users rely on our app to share their...'
category: 'swift'
date: '2019-04-30'
draft: false
---
Application security is very important in case of application development. Users rely on our app to share their sensitive data, it is mandatory to maintain the privacy and security of the data.  

### Where to not store sensitive data?
`UserDefaults` is not the place to store user sensitive data such as subscription data, access token etc., It just stores the data as a property list file inside the preferences folder of our app without any encryption. The data inside this `UserDefaults` can be easily accessed by lot of apps available in the AppStore. This can be done without even jailbreak. 

The intended purpose of `UserDefaults` is to store only preferences of the app and not to store sensitive information. Keychain services API allows us to store and retreive sensitive data from encrypted keychain database.

#### Storing data to keychain

```swift 
 func save(_ password: String, for user: String) {
        let password = password.data(using: String.Encoding.utf8)!
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                    kSecAttrAccount as String: user,
                                    kSecValueData as String: password]
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { return print("save error")
    }
```
The keychain API `SecItemAdd` performs addition of data in keychain database

#### Retrieving data from keychain
The required data can retrieved from the query passed to `SecItemCopyMatching` function.
 
```swift
func retrievePassword(for user: String) -> String? {
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrAccount as String: user,
                                kSecMatchLimit as String: kSecMatchLimitOne,
                                kSecReturnData as String: kCFBooleanTrue]
    
    var retrivedData: AnyObject? = nil
    let _ = SecItemCopyMatching(query as CFDictionary, &retrivedData)
    
    guard let data = retrivedData as? Data else {return nil}
    return String(data: data, encoding: String.Encoding.utf8)
}
```
