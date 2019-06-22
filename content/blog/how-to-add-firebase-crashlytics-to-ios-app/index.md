---
title: How to add Firebase Crashlytics to iOS app
date: "2019-04-07T22:12:03.284Z"
slug: how-to-add-firebase-crashlytics-to-ios-app
description: At somepoint in time all of our apps will have crashes. It would be better to prioritize and fix those crashes, if we can identify...

---

At somepoint in time all of our apps will have crashes. It would be better to prioritize and fix those crashes, if we can identify how often the crash occurs, its the root cause and track its impact on users. 

### Firebase Crashlytics
Firebase Crashlytics is a real-time crash reporter that helps to track issues and enhances the app quality. We must follow the below steps to integrate Firebase Crashlytics framework in our iOS application,
1. Connect iOS app
2. Add Crashlytics SDK
3. Configure crashlytics in Xcode
4. Build/run iOS app

#### Connect iOS app
Select Crashlytics from left nav-panel of [Firebase console](https://console.firebase.google.com/?pli=1). If Firebase is not added to iOS app, then register the app by entering iOS bundle ID. And download **GoogleService-Info.plist** config file and add it to iOS project. Choose appropriate app from the dropdown in top bar of the console. Tap **Set up Crashlytics** and select *No, this app does not have any version of the Crashlytics SDK installed*

#### Add Crashlytics SDK
Crashlytics SDK must be added to iOS project workspace. It can be installed easily using *Cocoapods*. If the project doesn't support Cocoapods, SDK can be added manually also.

##### To add SDK via Cocoapods
- Open terminal and navigate to project directory
- Open podfile and add these dependencies
``` Swift
pod 'Fabric', '~> 1.10.1'
pod 'Crashlytics', '~> 3.13.1'
```
- Enter `pod install` to install the dependencies

##### To add SDK manually 
- Download the [Crashlytics SDK](https://storage.googleapis.com/firebase-preview-drop/ios/crashlytics/com.crashlytics.ios-manual.zip)
- Unzip the SDK file and add `Fabric.framework` and `Crashlytics.framework` to project navigator
- Select *Copy items if necessary* and click *Finish*

#### Configure crashlytics in Xcode
Select the *Build Settings* from project file in Xcode and choose *DWARF with dSYM File* to the Debug Information format. This will allow the app to create dSYM files which will have clear stack traces with line numbers and methods. Navigate to *Build Phases* and add *New Run Script Phase* and enter this shell script `${PODS_ROOT}/Fabric/run` in the text box. This script will upload the dSYM files to Firebase, which will enable us to read detailed stack trace. Without the dSYM files we will only have raw stack traces with non-readable logs. 

#### Build/run iOS app
Once the app is run, verification will be sent to Firebase console that crashlytics is successfully installed. And the device logs can be viewed in the console.

By default, Firebase crashlytics will add analytic events to its crash logs. It will help us to identify the workflow of the user and his usage of different screens with specific events.   