---
title: Async tasks using Grand Central Dispatch
date: "2019-05-15T22:12:03.284Z"
slug: async-tasks-using-grand-central-dispatch
description: Grand Central Dispatch(GCD) is a low-level API for managing concurrency in our application...

---

### Grand Central Dispatch
Grand Central Dispatch(GCD) is a low-level API for managing concurrency in our application. It enables us to perform multi-threading which means a number of tasks can be performed parallely.

GCD performs asynchronous tasks by executing blocks of codes in queues. This closure will be executed only once and the callback will be called once the task is complete. We usually perform all our UI updates in main queue. 

``` Swift
DispatchQueue.main.async {
	filterProducts(sortBy:"Price")
	tableView.reloadData()
}
```
When we perform a memory heavy operation, we should not execute it in the main thread rather we should execute it in background thread. Operations performed in background thread will not impact the UI performance.

``` Swift
DispatchQueue.global(qos:.background).async {
	downloadDataModel()
	notifyCompletion()
} 
``` 

We will need to perform UI updates once the background task is completed. We will perform those UI tasks in main thread as follows,

``` Swift
///Quality of Service - .userInitiated will have higher priority as we need to perform UI updates
var label = UILabel()
label.text="Downloading"

DispatchQueue.global(qos:.userInitiated).async{
	downloadDataModel()
	DispatchQueue.main.async {
		label.text="Downloaded"
	}
}
```

We can also create our own dispatch queue that will provide us higher control over the queue. We can enable these queue to perform serial and concurrent tasks.In iOS, GCD is an essential framework to work with asynchronous tasks.

``` Swift
let queue1 = DispatchQueue(label:"Queue1") // Default QOS and performs operations serially

//Since QOS is .userInitiated, tasks will have higher priority. Operations will be executed concurrently 
let queue2 = DispatchQueue(label:"Parallel Queue",qos:.userInitiated,attributes:[.concurrent]) 
```
 