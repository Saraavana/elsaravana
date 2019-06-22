---
title: Pattern matching using 'case let'
date: "2019-04-24T22:12:03.284Z"
slug: pattern-matching-using-case-let
description: Pattern Matching is a feature that allows us to match state/value/property to some pattern. In Swift, it is...

---

### Pattern Matching

Pattern Matching is a feature that allows us to match state/value/property to some pattern. In Swift, it is achieved by using `case let` keyword.

Pattern matching can be applied by using different types of structure,
1. Enums
2. Optionals
3. Tuples
4. Flow statements

#### Enums
Using `enum` let's show different states in showing favourite list of series. We can also filter by using `where` keyword.

``` Swift
enum State<Data> {
	case favoriting
	case favorited(Data)
    case failed(Error)
}

switch state {
	case .favoriting: showFavouriteAnimation()
	case let .favorited(series) where series.isEmpty: showEmptyState()
	case let .favorited(series): showSeries()
	case let .failed(error): showErrorState(error)
}
```

#### Optionals
Optionals can be used in combination with enum for pattern matching, which in turn has some additional functionality. Let's check in the example below,

``` Swift
let price :Int? = 20

switch price {
	case let price? where price > 15: print("Price is higher than 15 bucks")
	case let .some(price): print("The price is \(price)")
	case .none: print("--Nil--")
}
```
Both `price?` and `some(price)` are non-nil values

#### Tuples
Pattern matching using `case let` can also be done on Tuples. Tuples are lightweight types which will represent an object in most cases. Let's look into the example below to understand better.

```Swift
let auth = (username: "Saravana", password: "StrongPassword")

switch auth {
	case ("admin", "admin"): showAdminView()
	case let (_, password) where password.count < 6: showShortPasswordMessage()
	case let (username, password): showProfile(username, password)
}
```

#### Flow statements
`if else` statements and `for-in` loops allow pattern matching using `case let`

```Swift
// Using if-else statement
if case let .favorited(series)=state, series.isEmpty {
	showEmptyState()
}

//Using guard else statement
guard case let .favorited(series)=state, series.isEmpty else {
	showEmptyState()
}

//Using for loops. Filter can also be applied
let viewStates :[State<[Series]>] = [.favorited([]), .favoriting]
for case let .favorited(series) in viewStates where series.count > 5 {
	//Highlight the favourite shows
}
``` 
