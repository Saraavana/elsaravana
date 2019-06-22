---
title: Typealias in Swift
date: "2019-05-24T22:12:03.284Z"
slug: typealias-in-swift
description: A typealias allows us to provide a new name(alias) for an existing data type into our program...

---

### Typealias
A typealias allows us to provide a new name(alias) for an existing data type into our program. After a type alias is declared, the aliased name can be used instead of the existing type throughout the program.

### Declaring a typealias
A typealias can be declared by using `typealias` keyword followed by the typename we want to assign. Let's look at following example to understand,
```Swift
typealias INR:Double

struct Receipt {
	let totalCosts:INR
}
```
`INR` is ideally of type `Double` but with different name. If we declare any variable of type `INR`, it means that the variable is of type `Double`. In the other hand, if we write any extensions to typealias `INR`, it gets inherited to type `Double`.

``` Swift
typealias INR:Double
typealias Euro :Double

struct Receipt {
	let totalCosts:INR
} 

extension INR {
	func toEuro() -> Euro {
		return self * 0.013
	}
}

let receipt = Receipt(totalCosts:50)
receipt.totalCosts.toEuro() // 0.65

let doubleValue: Double = 50
doubleValue.toEuro() //0.65
```  

### Typealiasing with generics
Generics can also be used along with typealias, which will even improve the definition of the code structure. In below example, we have used typealias `ExchangeResult` instead of Swift's `Result` type

``` Swift
typealias INR:Double
typealias Euro :Double

struct Receipt {
	let totalCosts:INR
} 

typealias Currency:Double
typealias ExchangeResult<Currency> = Result<Currency,Error>

enum ExchangeError:Error {
	case invalidInput
}

extension INR {
	func toEuro() -> ExchangeResult<Euro> {
		guard self > 0 else {
			return ExchangeResult.failure(ExchangeError.invalidInput)
		}
		return Result.success(self * 0.013)
	}
}

let receipt = Receipt(totalCosts:50)
receipt.totalCosts.toEuro() // 0.65

let doubleValue: Double = 50
doubleValue.toEuro() //0.65
``` 

Typealias can be used along with other types like Closure, Delegate, Dictionary etc., Typealias is used to improve the code readability, which in turn is easy to maintain.

``` Swift
//Closure 
typealias Completion = () -> Void

//Delegate
typealias TransitionDelegate = UIViewController & UIViewControllerTransitioningDelegate

//Dictionary
public typealias JSON = [String: Any]
```

