---
title: Unit Testing on Modal Layer
date: "2019-05-03T22:12:03.284Z"
slug: unit-testing-on-modal-layer
description: Unit testing is a software testing method, which by means of test cases (code) validates and tests individual set of code blocks...

---

Unit testing is a software testing method, which by means of test cases (code) validates and tests individual set of code blocks in the source code.

If we are working on the mutating modal layer that will change when a new feature is implemented, it is recommended to Unit Test the modal layer every time a new change occurs. So that we can validate where the mandatory fields in the modal are not affected by the new change. We will look how to implement unit testing in the modal layer.


``` Swift
import Foundation

struct SearchNearbyRestaurant:Codable {
	let count :Int
	let results :[Restaurant]
}

struct Restaurant:Codable {
	let id:Int
	let name:String
	let location:String
	let phone:String
	let foodItems:[FoodItem]
}

struct FoodItem:Codable {
	let id:Int
	let name:String
	let price:String
}
```  
The above modal represents attributes of the searching nearby restaurants in our app. It will associate to the value fetched from JSON, when search nearby restaurant API is called.

``` Swift
class SearchRestaurant {
    typealias Handler = (Result<SearchNearbyRestaurant, Error>) -> Void

    private let session: URLSession
    private let decoder: JSONDecoder

    init(session: URLSession = .shared, decoder: JSONDecoder = .init()) {
        self.session = session
        self.decoder = decoder
    }

    func search(with query: String, handler: @escaping Handler) {
        session.dataTask(with: makeRequest(for: query)) { [weak self] data, _, error in
            guard let self = self else {
                return
            }

            do {
                let response = try self.decoder.decode(SearchNearbyRestaurant.self, from: data ?? Data())
                handler(.success(response))
            } catch {
                handler(.failure(error))
            }
        }
    }
} 
```

The `SearchRestaurant` class makes search API request to fetch nearby restaurant matching with given query parameters. We will create a mock JSON, to verify the response fetched from the API. 

``` Swift
//SearchRestaurant.json
{
	"count":20,
	"results":[
	{
		 "id":24,
	     "name":"IdlyArt",
	     "location":"Chennai",
	     "phone":"9999999999"
	     "foodItems":[
	     {
          "id":5,
           "name":"Idly",
           "price":"10"
	     },
	     {
          "id":6,
           "name":"Ghee Dosa",
           "price":"50"
	     }
	     ]
	}
	]
} 
```
we will create our test case to verify our modal with above mock JSON. To create new test case file, _Xcode's File -> New -> File -> Unit Test Case Class_. We have the add above JSON file into our project navigator, to validate with our test case.

``` Swift
import XCTest
@testable import FoodOrder 

class FoodOrderTests:XCTestCase {
	func testSearchNearbyRestaurants() throws {
         //Given
         guard let path = Bundle(for: self).path(forResource: "SearchRestaurant", ofType: "json") else {
         	fatalError("Cannot find JSON File")
         }

        //When
        let data = try Data(contentsOf: URL(fileURLWithPath: path))
        let response = try JSONDecoder().decode(SearchNearbyRestaurant.self, from: data)

        //Then
        XCTAssertEqual(response.count, 20)
        XCTAssertEqual(response.results.count, 1)

        let restaurant = response.results.first

        XCTAssertEqual(restaurant.id, 24)
        XCTAssertEqual(restaurant.name, "IdlyArt")
        XCTAssertEqual(restaurant.location, "Chennai")

        let foodItem = restaurant.foodItems.first

        XCTAssertEqual(foodItem.id, 5)
        XCTAssertEqual(foodItem.name, "Idly")
        XCTAssertEqual(foodItem.price, "10")
	}
}
``` 

`@testable` will import all the properties and variable of `SearchNearbyRestaurant` object inside the test case. It is required to check the mandatory fields from the test case. Adopting test case into a growing modal is particularly important, as it will help to maintain the defined truth of the structure intact. 