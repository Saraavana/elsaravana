---
title: Debugging Core Data
date: "2019-05-22T22:12:03.284Z"
slug: debugging-core-data
description: Core data is a framework that we can use to manage the modal layer of the application. It provides generialized and automated solutions...

---

Core data is a framework that we can use to manage the modal layer of the application. It provides generialized and automated solutions to common tasks with object life cycle and object graph management, including persistence. Some less know functionality in Core data debugging will be discussed in this post.

#### Explore SQL database
SQL Debug output can be enabled to understand the abstract executions happening in the SQL database. To enable SQL debug output _Edit scheme -> Run -> Arguments -> Arguments Passed On Launch_ and select `~com.apple.CoreData.SQLDebug 1`

The level can be set to 4 to get more verbose level of output. It will provide information about fetch requests, saved data, properties accessed and internal executions of the operation performed. It will also provide the sqlite database file location in the debug console.

``` Swift
CoreData: annotation: Connecting to sqlite database file at "/Users/Saravana/Library/Developer/CoreSimulator/Devices/AB83S03D-D1C1-45C4-9324-DB0E91FAB4F9/data/Containers/Shared/AppGroup/C6934424-5E58-4164-8593-3CC0D60D2BB5/mydatabase.sqlite
``` 

It will also allow us to discover heavy queries and the places in our app, that trigger multiple requests. More details can be acquired from [WWDC 2018’s Core Data Best Practices](https://developer.apple.com/videos/play/wwdc2018/224/)

#### Concurrency debugging
Concurrency allows us to execute multi thread operation on Core data. To understand the flows of the app and to identify when exceptions due to concurrency issue occurs, we should enable `-com.apple.CoreData.ConcurrencyDebug 1`

#### Migration debugging
To debug and understand the internal operations involved in Core Data migration can be viewed by enabling `-com.apple.CoreData.MigrationDebug 1`. This will provide us insights about the exception cases when data migration occurs.

