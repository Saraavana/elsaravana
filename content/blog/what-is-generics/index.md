---
title: What is Generics
date: "2019-05-10T22:12:03.284Z"
slug: what-is-generics
description: Generic code enables you to write flexible, reusable functions and types that can work with any type, subject to requirements that you define...

---

### Generics
Generic code enables you to write flexible, reusable functions and types that can work with any type, subject to requirements that you define. You can write code that avoids duplication and expresses its intent in a clear, abstracted manner. Generic is highly useful feature in Swift. `Array` and `Dictionary` are generic collection types. An array can hold `[Int]` or `[String]`

Let's create our own generic type as follows,

``` Swift
struct Stack<T> {
	var item :T
	var date :Date
}

let stringStack = Stack(item:"Hello",date:Date())
let intStack = Stack(item:1,Date())
```
The objects `stringStack` and `intStack` will implicitly adopt type as `Stack<String>` and `Stack<Int>` respectively. 

We can also use a generic dictionary to store type of data as key-value pairs. Since we are using dictionary, we would require our key to conform to `Hashable`

``` Swift
class Cache<Key:Hashable,Item> {
	private var items = [Key:Stack<T>]()

	func insert(item:T,key: Key) {
		let date = Date()
		items[key] = Stack(item:item,date:date)
	}

	func value(key:Key) -> T? {
		guard let stack = items[key] else {
			return nil
		}
		return stack.item
	}
}
```  
The above generic dictionary can be used to cache any type of data. For example, it can store cached list of posts and it's ID `var cachedPosts = Cache<Post.ID,Post>()`. Such generics will act as single function that can be used across multiple data types. 