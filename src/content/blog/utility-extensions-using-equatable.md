---
title: 'Utility extensions using Equatable'
description: 'Describes various utilites functions using Equatable...'
category: 'swift'
date: '2019-08-17'
draft: false
---
We will write extensions using Equatable that can be utilized in various parts of the code.

```swift
import Foundation

public extension Equatable {
    func presentIn<Seq: Sequence> (_ values: Seq) -> Bool where Seq.Iterator.Element == Self {
        return values.contains(self)
    }
}
```

The above code snippet can be used to find out if a specific item is present in a collection of items.
```swift
//Example
1.presentIn([4,8,9,1,3]) //Returns true
let state = .noInternet
state.presentIn([.online, .offline, .connecting]) // Returns false
```

Let's look at another extension that will match `HTTPError` with `Error` type. 

```swift
import Foundation

public extension Equatable {
  func ~=<E: Error & Equatable>(rhs: E, lhs: Error) -> Bool {
    return (lhs as? E) == rhs
  }
}
```
It will enable us to compare `URLError` , `HTTPError` and `Error` in same *switch* statement
```swift
func showStates(_ error: Error) {
    switch error {
    case URLError.notConnectedToInternet,
         URLError.networkConnectionLost,
         URLError.cannotLoadFromNetwork:
        showOfflineView()
    case HTTPError.unauthorized:
        logOut()
    case is HTTPError:
        showNetworkErrorView()
    default:
        showErrorView(for: error)
    }
}
```
