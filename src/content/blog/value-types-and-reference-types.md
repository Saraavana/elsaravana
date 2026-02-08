---
title: 'Value Types and Reference Types'
description: 'In Swift, we can access data by Value types and Reference types. Reference types creates instances which acts as reference to the object...'
category: 'swift'
date: '2019-05-07'
draft: false
---
In Swift, we can access data by Value types and Reference types. Reference types creates instances which acts as reference to the object. Value types creates immutable instances that are used individually and we can mutate a value type if required. Value types are generally `Struct` whereas Reference types are `Class`

#### Reference types
Let's create a class that will publish instagram posts. Since reference types are `class`, we will create the class as follows,

```swift
class Post {
	var image :Image
	var title :String
	var location :String
	var likes = 0

	init(image:Image,title:String,location:String) {
		self.image = image
		self.title = title
		self.location = location
	}

	//'like' action
	func like(post:Post) {
		post.likes+=1
		print("The post is liked!!!")
	}
}

//Publish a post and like it
let post = Post(image:Image(named:"abc.png"),title:"Nature",location:"Chennai")
like(post)
print("Number of likes \(post.likes)") // number of likes = 1
```
The function `like(post:)` will like the post once the button is tapped. When an reference for `Post` class is created, the object acts as a refernce type. This reference type object will mutate the original object once it performs action. The above `post` object will get mutate it's `likes` variable when `like(post)` is called. Thus, it will be difficult to maintain the original copy of the object unless a new copy of the object is created and left immutated. 

#### Value types
Value type has different behaviour. Let's create the same Post type using `struct`

```swift
struct Post {
	var image:Image
	var title:String
	var location:String
	var likes = 0

	init(image:Image,title:String,location:String) {
		self.image = image
		self.title = title
		self.location = location
	}

    //'like' action
    func like(post:Post) {
    	//Since the properties in struct are immutable. We have create new mutable post variable to like the post. 
    	var post = post
		post.likes+=1
		print("The post is liked!!!")
    }
}

//Publish a post and like it
let post = Post(image:Image(named:"abc.png"),title:"Nature",location:"Chennai")
like(post)
print("Number of likes \(post.likes)") // number of likes = 0 
```
Any change done on the new object will not reflect on the original object. We can mutate object of `struct` type using `inout` keyword in the parameter. This will allow us to mutate the object inside `like(post:)` function. The object passed as parameter in `like(post:)` function must be preceded by `&`, it will indicate that the parameter passed is a reference.

```swift
func like(post: inout Post) {
	post.likes+=1
	print("The post is liked!!!")
}

//Now publish post and like it
let post = Post(image:Image(named:"abc.png"),title:"Nature",location:"Chennai")
like(&post)
print("Number of likes \(post.likes)") // number of likes = 1
```  

If we don't want to reference a parameter in `struct` type to utilize the nature of value types. We have to create a new copy of the `post` object, perform like action and return the object.

```swift
 func like(post: Post) -> Post {
 	var post = post
	post.likes+=1
	print("The post is liked!!!")
	return post
}

//Now publish post and like it
var post = Post(image:Image(named:"abc.png"),title:"Nature",location:"Chennai")
post = like(post)
print("Number of likes \(post.likes)") // number of likes = 1
```
The usage of value and reference types depends on what action we can to perform. By default, `struct` is immutable where as `class` is mutable.
