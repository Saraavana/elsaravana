---
title: 'What are @State, @ObjectBinding and @EnvironmentObject'
description: 'We will get to know how property wrappers @State, @ObjectBinding, @EnvironmentObject works in SwiftUI...'
category: 'swift'
date: '2019-06-25'
draft: false
---
Structs are immutable and will have only one owner for each instance. Since structs are immutable, the properties defined in structs cannot be mutated. We use structs across multiple data types. In Swift 5.1, property wrappers were introduced to allow mutate(create & store) a property inside struct block using `lazy` initialization.
```swift
struct Football {
	var playerName :String
	lazy var reversedPlayerName :String = {
		String(playerName.reversed())
	}()
}
```
Similarly, SwiftUI creates it's view inside struct. Meaning, we cannot modify the states, views and properties created inside this struct. But SwiftUI gives us various property wrappers like `@State`, `@ObjectBinding`, `@EnvironmentObject` that allow us to change the state in struct.  

### @State 
`@State` property wrapper tells SwiftUI that it will mutate over time and changes it's state as program runs. The memory of `@State` property is managed and monitored by SwiftUI, whereas the other properties of struct resides inside the memory of the struct. When the `@State`property changes, it will automatically reload the body of view. Apple recommends to use `private` type when `@State` property wrapper is used.  

> SwiftUI manages the storage of any property you declare as a state. When the state value changes, the view invalidates its appearance and recomputes the body. Use the state as the single source of truth for a given view.

> A State instance isn’t the value itself; it’s a means of reading and mutating the value. To access a state’s underlying value, use its value property.

```swift
import SwiftUI

struct ContentView:View {
	@State private var numberOfTaps = 0

	var body: some View {
      Button(action:{
      	    self.numberOfTaps += 1
      	}) {
      		Text("Number of taps: \(numberOfTaps)")
      	}
	}
}
```  
In somecases, we will also want our property to be updated when the value of the property is changed from view. Eg. A textfield is used to display a value of property. When the value in textfield is changed, the value of property in code should also be changed. This is called as **Two-way binding**. In SwiftUI, two-way binding can be established by `$` at the beginning property name. It allows synchronization(read & write) of data to the property. 
```swift
import SwiftUI

struct User {
   var username = "Saravana"
   var password = "iuwerosdkj3298"
   var email = "saravkumar.g@gmail.com"
}

struct ContentView:View {
	@State private var user = User()

	var body: some View {
      VStack {
      	TextField($user.username)
      	TextField($user.password)
      	TextField($user.email)
      }
	}
}
``` 

### @ObjectBinding
If instance of struct is created and used across multiple view, each view will have it's own unique copy of the struct. So if one view changes it's property value, other views will not change the same property value. This lead us to have different states for the same data.

SwiftUI enables us to maintain shared state across multiple views using `@ObjectBinding` property wrapper. It will allow changes to the property and also notifies/watches other parts when property is changed. It can be achieved by using `Combine` framework.

Combine is new framework (similar to RxSwift, ReactiveSwift) that provides a declarative Swift API for processing values over time.

> Combine framework customize handling of asynchronous events by combining event-processing operators.

```swift
import SwiftUI

class User:BindableObject {
   var didChange = PassthroughSubject<Void,Never>()	
   var username = "Saravana" { didSet { didChange.send() } }
   var password = "iuwerosdkj3298" { didSet { didChange.send() } }
   var email = "saravkumar.g@gmail.com" { didSet { didChange.send() } }
}

struct ContentView:View {
	@ObjectBinding var user = User()

	var body: some View {
      VStack {
      	TextField($user.username)
      	TextField($user.password)
      	TextField($user.email)
      }
	}
}
``` 
The class must confirm to protocol `BindableObject` to use didChange property that notifies if any property is changed. We will not throw any error in our case, so we have used `Never` parameter to `PassthroughSubject`. If a We need a property observor like `var username = "Saravana" { didSet { didChange.send() } }` that sends notification if the property is changed. Hence single User instance can be used for multiple views.

### @EnvironmentObject

<!-- ![](./images/environment.png) -->
![](https://res.cloudinary.com/dsykbphvz/image/upload/v1563209821/elsaravana/what-are-%40state-%40objectbinding-and-%40environmentobject/images/environment_mwj26a.png)

`@EnvironmentObject` property wrapper allows us to maintain a shared object globally, which means we can add shared object into environment that can be accessed by any view/screen. It also allow two-way binding similar to `@ObjectBinding`. If one view changes an environmentObject, all other views using that object will be notified and their view gets updated.   
```swift
import SwiftUI

class User:BindableObject {
   var didChange = PassthroughSubject<Void,Never>()	
   var username = "Saravana" { didSet { didChange.send() } }
   var password = "iuwerosdkj3298" { didSet { didChange.send() } }
   var email = "saravkumar.g@gmail.com" { didSet { didChange.send() } }
}

struct ContentView:View {
	@EnvironmentObject var user :User

	var body: some View {
      VStack {
      	TextField($user.username)
      	TextField($user.password)
      	TextField($user.email)
      }
	}
}
```
We need to initialize the object, that we will use in our view. We should create instance of `User` in `SceneDelegate` class as `var userData = User()` and we should pass that instance to our content view as given below,
```swift
let window = UIWindow(frame:UIScreen.main.bounds)
window.rootViewController = UIHostingController(rootView:ContentView().environmentObject(userData))
```
