---
title: 'Exploring BackgroundTasks Framework'
description: 'We will explore backgroundtasks framework which was introduced in iOS 13...'
category: 'swift'
date: '2019-08-10'
draft: false
---
### BackgroundTasks framework
This framework was introduced in iOS 13. We can perform our required background operations such as downloading data in background, fetching updated contents etc., when the application is in background state.

An essential API to perform background tasks is `BGTaskScheduler`

> BGTaskScheduler - A class for registering launch handlers that are run by submitting task requests to launch your app in the background.

Following requests are used to process tasks and refresh the application in background

> `BGProcessingTaskRequest` - A request to launch your app in the background to execute a processing task that can take minutes to complete.
> `BGAppRefreshTaskRequest`  - A request to launch your app in the background to execute a short refresh task.

In order to perform background tasks we have to add capabilities to our application. In Xcode 11, click *Your App target -> Signing & Capabilities -> +Capability -> Background Modes*. And check `Background fetch` and `Background processing`

iOS will perform background tasks registered with specific identifiers. So we need to provide identifiers for our background tasks in plist file. Add `BGTaskSchedulerPermittedIdentifiers` key in info.plist and add items with uniques identifiers. For example: Item 0 - *com.app.backgroundImageFetch*, Item 1 - *com.app.appRefresh* 

We need to register our background tasks using `BGTaskScheduler` in `AppDelegate.swift`
```swift
import BackgroundTasks 

// We need to cancel existing background tasks before performing a new one
func cancelAllPendingBGTask() {
  BGTaskScheduler.shared.cancelAllTaskRequests()
}

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

registerBackgroundTask()
return true
}

//MARK: Registering backgroundtasks
private func registerBackgroundTasks() {

  BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.app.backgroundImageFetch", using: nil) { task in
   //This task can be casted to BGProcessingTask 
   self.handleImageFetcherTask(task: task as! BGProcessingTask)
  }

  BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.app.appRefresh", using: nil) { task in
   //This task can be casted to BGAppRefreshTask 
   self.handleAppRefreshTask(task: task as! BGAppRefreshTask)
  }
}
``` 

We also need to schedule what tasks to be executed when app enters background state. 
```swift
func applicationDidEnterBackground(_ application: UIApplication) {
  bgImageFetch()
  bgAppRefresh()
}

// We will fetch all the images from Photos app
func bgImageFetch()() {
 let request = BGProcessingTaskRequest(identifier: "com.app.backgroundImageFetch")
 request.requiresNetworkConnectivity = false // Need to true if your task need to network process. Defaults to false.
 request.requiresExternalPower = false

 request.earliestBeginDate = Date(timeIntervalSinceNow: 1 * 60) // fetch Image after 1 minute
 do {
  try BGTaskScheduler.shared.submit(request)
 } catch {
   print("Unable to fetch: \(error)") 
 }
}

func bgAppRefresh() {
 let request = BGAppRefreshTaskRequest(identifier: "com.app.appRefresh")
 request.earliestBeginDate = Date(timeIntervalSinceNow: 2 * 60) // Initiate app Refresh after 2 minute
 do {
  try BGTaskScheduler.shared.submit(request)
 } catch {
   print("Unable to refresh: \(error)")
 }
}
```
We cannot perform longer background tasks in iOS 13. The background task time is limited to 30 seconds.
