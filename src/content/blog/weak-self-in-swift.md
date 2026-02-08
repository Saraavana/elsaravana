---
title: 'Weak self in Swift'
description: 'We will discuss about how ARC, weak self, retain cycles works in Swift...'
category: 'swift'
date: '2019-09-07'
draft: false
---
### What is ARC and How does ARC works?

Swift uses *Automatic Reference Counting(ARC)* to track and manage app's memory usage. Whenever a new instance of a class is created ARC allocates a chunk of memory to store the information about that instance. It stores information about the type of the class, properties, constants and variables associated with that instance. When an instance of class in no longer needed, ARC deallocates the instance from the memory and frees up the memory to other parts of the app. 

ARC checks all the variables, constants and properties refering to the instance. ARC will not deallocate an instance from memory as long as atleast one active reference to the instance exists. Whenever a constant/variable is declared, we must specify *weak* or *unowned* otherwise constant/variable makes a *strong reference* to that instance.

> Reference counting applies only to instances of classes. Structures and enumerations are value types, not reference types, and are not stored and passed by reference.

### Weak 
`weak` references are always declared as optionals, so that ARC can easily nullify them when the instance is deallocated from memory. Consider the following example,
```swift
class Post {
	var title :String
	var imageURL :URL
	var owner :UserWhoPosts?

	init(title: String, imageURL: URL) { self.title = title; self.imageURL = imageURL }

    deinit {
        print("Post \(title) is being deinitialized")
    }
}

class UserWhoPosts {
	var name :String
    var post : Post?

    init(name: String) { self.name = name }

    deinit {
        print("Owner of post \(name) is being deinitialized")
    }
}

var post: Post? = Post(title:"Rains",imageURL:URL(string:"www.elsaravana.com/rains")!)
var user :UserWhoPosts? = UserWhoPosts(name:"Saravana")

post.owner = user!
user.post = post!

post = nil
user = nil 
// Nothing gets printed
```
In above example, Post has strong reference to the owner and UserWhoPosts has strong reference to the Post. So it retain cycles similar to infinite loop. To break this cycle and to deinitialize the instance of class we need introduce to weak reference.
```swift
class Post {
	var title :String
	var imageURL :URL
	weak var owner :UserWhoPosts?

	init(title: String, imageURL: URL) { self.title = title; self.imageURL = imageURL }

    deinit {
        print("Post \(title) is being deinitialized")
    }
}

class UserWhoPosts {
	var name :String
    var post : Post?

    init(name: String) { self.name = name }

    deinit {
        print("Owner of post \(name) is being deinitialized")
    }
}

var post: Post? = Post(title:"Rains",imageURL:URL(string:"www.elsaravana.com/rains")!)
var user :UserWhoPosts? = UserWhoPosts(name:"Saravana")

post.owner = user!
user.post = post!

post = nil
user = nil

//Owner of post Saravana is being deinitialized
//Post Rains is being deinitialized
```
### Weak self
Weak self must be used inside closures to avoid retain cycles. 
```swift
var publishedPosts: [Post] = []

func publish(post:Post) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
        // Publish the post
        self.publishedPosts.append(post) 
        print("Post is published")
    }
}
```
If weak self is not used, strong reference will be used to publish the post and to append them in `publishedPosts` variable.
