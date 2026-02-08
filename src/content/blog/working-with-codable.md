---
title: 'Working with Codable'
description: 'Codable API allows us to leverage the compiler to generate most of code needed to encode and decode data to/from a serialized object like JSON...'
category: 'swift'
date: '2019-05-30'
draft: false
---
#### Codable
Codable API allows us to leverage the compiler to generate most of code needed to encode and decode data to/from a serialized object like JSON (Java script object notation). 

Codable is a type alias for the `Encodable` and `Decodable` protocols. When we use Codable as a type or a generic constraint, it matches any type that conforms to both protocols.

```swift
struct Post:Codable {
	var postImage:UIImage
	var postLikes:Int
}
```

Now, we can encode and decode JSON data by using `JSONEncoder()` and `JSONDecoder()` respectively. Both encoding and decoding is performed on a `do-try-catch` block.
```swift
do {
    let post = Post(image: UIImage(data:data), likes: 10)
    let encoder = JSONEncoder()
    let data = try encoder.encode(post)

    let decoder = JSONDecoder()
    let post = try decoder.decode(Post.self, from: data)
} catch {
    print("Whoops, an error occured: \(error)")
}
```

Let's consider the below JSON. If the properties name doesn't match with our `Codable` modal, we cannot encode/decode(parse) the JSON to our modal.
```swift
{
	"post":{
		"post_image":"http://elsaravana.com/sample.png"
		"post_likes":5
	}
}
```

Both in `JSONDecoder` and `JSONEncoder`, we can set the `.keyDecodingStrategy` or `.keyEncodingStrategy` to `.convertToSnakeCase`. Thus, `Codable` API makes it easy to serialize the JSON objects to and fro.
```swift
do {
    let post = Post(image: UIImage(data:data), likes: 10)
    let encoder = JSONEncoder()
    encoder.keyEncodingStrategy = .convertToSnakeCase
    let data = try encoder.encode(post)

    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertToSnakeCase
    let post = try decoder.decode(Post.self, from: data)
} catch {
    print("Whoops, an error occured: \(error)")
}
```
