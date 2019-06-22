---
title: What's new in Swift 5.1
date: "2019-06-07T22:12:03.284Z"
slug: what's-new-in-swift-5.1
description: Lets have a look at What's new in Swift 5.1...

---

Apple have introducted lot of new enhancements to Swift. In detail, let's look at all the what's new in Swift 5.1 as follows,
1. Memberwise initializer improvements
2. Implicit returns from single-expression functions
3. Universal 'Self'
4. Opaque return types
5. Ability to add static subscripts
6. Warning for ambiguous 'none' cases
7. Pattern matching enums between Optionals and Non-optionals
8. Ordered collection differences
9. Uninitialized array creation

#### 1. Memberwise initializer improvements
In previous version of Swift, we have to specify all the parameters to create memberwise initialize. In Swift 5.1, the memberwise initializer accepts default value of the properties. It will help us to remove redundancy.
``` Swift
struct Post {
	var title:String
	var likes:Int=0
}

//In previous Swift version 
let post = Post(title:"Nature",likes:0)

//In Swift 5.1
let trek = Post(title:"Forest",likes:0) 
let ride = Post(title:"Long way") // Since the default value of likes is `0`, we can either mention or remove it.
```

#### 2. Implicit returns from single-expression functions
Closures allow us to write single-expression functions with/without `return` keyword and the type will be inferred implicitly. With Swift 5.1, this feature is extended to function as well which means we can omit `return` keyword as long as the function has single-expression statement.
```Swift
//Closures
let multiplyByTwo = [2,9,1].map{$0*2}
let multiplyByTwo = [2,9,1].map{return $0*2}

//In Swift 5.1
func multiplyByTwo(number:Int)->Int {
	number*2
}  
```
#### 3. Universal 'Self'
`Self` refers to the containing type like classes, struct, enums. It is higly useful in case of dynamic types, where the type of the container is known only at run time. 
``` Swift
//In previous Swift version
class NetworkManager {
	class var maximumRequests :Int {
		return 5
	}
	func activeRequests() {
		print("Maximum requests:\(NetworkManager.maximumRequests)") // Prints "5"
	}
}

//Inheriting 'NetworkManager' class
class ConstraintedNetworkManager:NetworkManager{
	override class var maximumRequests : Int {
		return 3
	}
}

let manager = ConstraintedNetworkManager()
manager.activeRequests() // Prints "5"
```
The `activeRequests()` called from `manager` object should print 3 instead it prints 5 only, which is assigned in the parent class. This can be solved in Swift 5.1 using `Self`.
``` Swift
class UpdatedNetworkManager {
	class var maximumRequests :Int {
		return 5
	}
	func activeRequests() {
		print("Maximum requests:\(Self.maximumRequests)") // `Self` will dynamically refer to the class that calls the function
	}
}
```
#### 4. Opaque return types
Opaque return types allow us to abstract the actual type of the return value. Let's consider below example,
```Swift
protocol Sport

struct Football : Sport{}
func launchPlayer()->Sport{
	return Football()
}
let player1 = footballPlayer()

struct BasketBall:Sport{}

func launchPlayer()->Sport{
	return BasketBall()
}

let player2 = basketballPlayer()
``` 
We cannot compare `player1` and `player2`. We cannot use `Equatable` protocol to compare the players who play both Football and Basketball. If we use `Equatable` protocol in `launchPlayer()`, it will throw error "Protocol 'Sport' can only be used as a generic constraint because it has Self or associated type requirements." 

Opaque type can solve this problem, it enables us to compare and identify the return types. For example: it can identify whether `BasketBall()` returns array of string or Int. Opaque type can be implemented by using `some` keyword. 

``` Swift
func launchPlayer()->some Sport{
	return Football()
}

//Another example
func makeString() -> Some Equatable {
	"abc"
}

func makeInt() -> Some Equatable {
	Int.random(in:1...5)
}
let x = makeInt()
let y = makeInt()
print(x==y)
```
We can compare `x` and `y` as it hold the type integer. On the contrary, we cannot compare `makeString()` and `makeInt()` functions, because Swift knows the return type will be `String` and `Int` which cannot be compared. Generics also provide a similar behaviour, but we have mention the type we want to create while initializing a generic function. In Opaque type, the actual type will be abstract from rest of the codebase.

#### 5. Ability to add static subscripts
We can now allow subscripts to `static`, which means the property will apply to type rather than instance of the type. Let's consider following example where we need to maintian a common static setting for our application.
```Swift
//In previous Swift
public enum OldSettings {
    private static var values = [String: String]()

    static func get(_ name: String) -> String? {
        return values[name]
    }

    static func set(_ name: String, to newValue: String?) {
        values[name] = newValue
    }
}

OldSettings.set("Hulk", to: "Smash")
OldSettings.set("Thor", to: "Hammer")
print(OldSettings.get("Hulk") ?? "Unknown")

//In Swift 5.1
public enum NewSettings {
    private static var values = [String: String]()

    public static subscript(_ name: String) -> String? {
        get {
            return values[name]
        }
        set {
            values[name] = newValue
        }
    }
}

NewSettings["Hulk"] = "Smash"
NewSettings["Thor"] = "Hammer"
print(NewSettings["Hulk"] ?? "Unknown")
```
#### 6. Warning for ambiguous 'none' cases
We can specify `none` case in our enum, but the enum should always be non-optional. 
``` Swift
enum BorderStyle {
	case none
	case border(color:UIColor)
}

//In previous Swift version
let border :BorderStyle?=.none
print(border) // prints `nil`
```
In case of optional as mentioned above, Swift will consider the border value as `nil` rather than setting the value as `BorderStyle.none`.
To avoid this confusion, in Swift 5.1 an warning will be shown “Assuming you mean 'Optional.none'; did you mean 'BorderStyle.none' instead?” to hint us use appropriate case.

#### 7. Pattern matching enums between Optionals and Non-optionals
Pattern matching was allowed to other types while using `switch case` but it wasn't allowed for enums. In Swift 5.1 we can patter match optional enums and non-optional enums
``` Swift
enum Progress {
	case started
	case downloading
	case complete
}
let status :Progress? = .downloading
switch status {
case .downloading:
    print("Downloading...")
case .complete:
    print("Download is complete!")
default:
    print("Some other status")
}
```

#### 8. Ordered collection differences
Swift 5.1 introduced the ability to calculate and apply the differences between ordered collections. It will allow developers to perform changes in their collection types with smooth animation. It can be done by using `difference(from:)` API. Swift will provide this functionality in OS, but the actual OS number with which the feature will be released is unknown. In such cases, we will use `if #available(iOS 9999,*)`.
``` Swift
var points1 = [100, 91, 95, 98, 100]
let points2 = [100, 98, 95, 91, 100]

if #available(iOS 9999, *) {
    let diff = points2.difference(from: points1)

    for change in diff {
        switch change {
        case .remove(let offset, _, _):
            points1.remove(at: offset)
        case .insert(let offset, let element, _):
            points1.insert(element, at: offset)
        }
    }
    print(points1)
}
```
To perform advanced animations `associatedWith` can be used as `.insert(let offset, let element, let associatedWith)`. We can also implement the changes to the collection by using `applying()` method
``` Swift
if #available(iOS 9999, *) {
    let difference = points2.difference(from: points1)
    let result = points1.applying(diff) ?? []
}
```

#### 9. Uninitialized array creation
A new private API is introduced to initialize the array without prefilling with default values. We can create an array like this,
``` Swift
let randomNumbers = Array<Int>(unsafeUninitializedCapacity: 10) { buffer, initializedCount in
    for x in 0..<10 {
        buffer[x] = Int.random(in: 0...10)
    }

    initializedCount = 10
}

// Can also be achieved by map(), but is less efficient as it will loops over the range and calls the closure for every range item
let randomNumbers = (0...9).map{_ in Int.random(in:0...10)}
```