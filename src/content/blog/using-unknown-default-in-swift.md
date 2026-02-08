---
title: 'Using @unknown default in Swift'
description: 'In Swift 5, `@unknown default` was introducted. It is a new technique by which enums in Swift works and helps the enums...'
category: 'swift'
date: '2019-05-28'
draft: false
---
In Swift 5, `@unknown default` was introducted. It is a new technique by which enums in Swift works and helps the enums to be future compatible. 

Standard library enums like `UNAuthorizationStatus` will have set of cases which defined by Apple. Apple might add any new case in the future, at that point in time we have to update our source code to support now new case. In order to make the app work coherently in future without this impact, Apple introduced `@unknown default`. If each case is not handled individually, it will create warning in your enum and will not throw error, thus making it compactible for new enum cases.

Let's look at below enum along with `fallthrough` and `@unknown default` keyword,

```swift
switch userNotificationsAuthorizationStatus {
	case .notDetermined:
	    requestPermission()
	case .authorized, .denied, .provisional:
	    fallthrough
	@unknown default:
	    print("No need to request permission for User Notification")    
}
```

#### default vs @unknown default
`@unknown default` is similar to usual default state and thus it matches any values. It is required to mention all the cases. If any new case is introduced, it will highlight them a warning sign instead of throwing an error. `default` will not show any warning if any case is missed. The main difference is given in below example,

```swift
//Using "default"
switch userNotificationsAuthorizationStatus {
	case .notDetermined:
	    requestPermission()
	case .denied, .provisional:
	    fallthrough
	default:
	    print("No need to request permission for User Notification")    
}

//Using "@unknown default"
switch userNotificationsAuthorizationStatus {  //Shows warning "Switch must be exhaustive", because .authorized case is not handled 
	case .notDetermined:
	    requestPermission()
	case .denied, .provisional:
	    fallthrough
	@unknown default:
	    print("No need to request permission for User Notification")    
}
```
