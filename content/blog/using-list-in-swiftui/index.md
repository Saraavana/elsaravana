---
title: Using List in SwiftUI
date: "2019-06-19T22:12:03.284Z"
slug: using-list-in-swiftui
description: Describes about how to create scrolling table of fruits using static and dynamic lists...

---

### List
`List` in SwiftUI is similar to `UITableView` in UIKit.  Lists are designed for composability – designed to be able to build bigger things from smaller things. So rather than having one large view controller that configures cells by hand, SwiftUI helps us build small views that know how to configure themselves as list rows, then use those.

#### Static List
Static list creates rows of items. To create a static list we have to declare an row that will be re-used for all the items in our list.  Let's look at example below
``` Swift
struct FruitRow: View {
    var name: String

    var body: some View {
        Text("Fruit: \(name)")
    }
}

struct ContentView: View {
    var body: some View {
        List {
            FruitRow(name: "Apple")
            FruitRow(name: "Orange")
            FruitRow(name: "Mango")
        }
    }
}
```
#### Dynamic List
To create a dynamic list, we need to identify each item by using `Identifiable` protocol, which has a property `id` associated with it. This `id` must be unique to each item.
```Swift
struct Fruit: Identifiable {
    var id = UUID()
    var name: String
}

struct FruitRow: View {
    var fruit: Fruit

    var body: some View {
        Text("Fruit : \(fruit.name)")
    }
}

struct ContentView: View {
    var body: some View {
        let first = Fruit(name: "Apple")
        let second = Fruit(name: "Orange")
        let third = Fruit(name: "Mango")
        let fruits = [first, second, third]

        return List(fruits) { eachFruit in
            FruitRow(fruit: eachFruit)
        }
    }
}
```