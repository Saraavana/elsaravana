---
title: 'Basics of Unit Testing'
description: 'Unit Testing is sometime misunderstood with Manual Testing. Manual Testing is carried out by testers/developers...'
category: 'swift'
date: '2019-04-11'
draft: false
---
### Unit Testing
Unit Testing is sometime misunderstood with Manual Testing. Manual Testing is carried out by testers/developers. Unit testing is a form of automated testing that is perfomed via code. It improves the application from leaks, protects code base from regressions and reduces the time consumed on Manual testing. Unit testing is necessary a function that executes our code and asserts whether the right action is performed. 

It is performed by using classes called as _test cases_, using _XCTest_ framework which is a subclass of _XCTestCase_. Unit test cases are run using unit testing targets. If your app doesn't have it, then add _Unit Testing Bundle_ target using _Xcode's File menu-> New -> Target_ before implementing test cases.

Let's create a test case that will apply offer to our food. 

```swift
import XCTestCase
// @testable will import all the symbols (types and functions) publicly available from our targets
@testable import FoodApp

class FoodTests :XCTestCase {
	func testApplyOffer() {

	}
}
```

XCTest's test runner will automatically invoke all the methods defined on the test cases beginning with _"test"_, will call all the methods when test suite is executed. 

We will now define login inside our _testApplyOffer_ function. _XCTAssertEqual_ will validate the if the passed argument(new value) matches with the expected value. It will determine whether our test case gives success or not. Our test case should follow below standard struction, in order to have clear method definition, to maintain huge test cases among teams and to avoid confusion. 
- **Given** set of conditions
- **When** set of actions to be performed
- **Then** the expected outcome should be

To re-use same value/object created from _Given_ section to perform multiple test cases, we can use _setUp()_ method. The _setUp()_ method will be called each time when a test case is executed, thus it will reset our test cases and provides fresh copies of the object to run our test.

```swift
class FoodTests :XCTestCase {
	private var productCart :ProductCart!

	override func setUp() {
		super.setUp()
		productCart = ProductCart()
	}

	func testApplyOffer() {
		//Given: We can assert if our initial state holds true
		XCTAssertEqual(productCart.price,0)
		let offer = Offer(name:"Craving Offer",discount:40) // given 40% off on new order

		//When
        productCart.add(Food(name:"Butter Chicken",price:200))
        productCart.add(Food(name:"Ghee Dosa",price:100))  
        productCart.apply(offer)

		//Then
        XCTAssertEqual(productCart.price,180)
	}
} 
``` 
We have used hard-coded values to assert the test cases. In production code, we should remove such hard-coded values and instead should use variable/properties. It is also good to have validation values as _literals_ so that it will be simple, easy to read and maintain them.
