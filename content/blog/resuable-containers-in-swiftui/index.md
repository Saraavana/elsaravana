---
title: Resuable containers in SwiftUI
date: "2019-08-31T18:12:03.284Z"
slug: resuable-containers-in-swiftui
description: Views built using SwiftUI can be reused by segregating Views and Data Flow...

---

SwiftUI is a lightweight framework and each and every view in SwiftUI are linked to one another. Generally Views in SwiftUI fetches data, renders them, listens user input and triggers action calls. It makes the View to be heavy and it cannot be reused across other flows in the app. Let's consider below example to fetch our Favourite food items,
``` Swift
import SwiftUI
import Combine

struct FavoritesView : View {
    @EnvironmentObject var foodItems: [Food]

    var body: some View {
        NavigationView {
            List {
                ForEach(foodItems) { food in
                    HStack(alignment: .top) {
                        VStack(alignment: .leading) {
                            Text(food.name)
                                .font(.headline)
                            Text(food.description ?? "")
                                .font(.subheadline)
                        }
                    }
                }
            }
            .navigationBarTitle(Text("Favorites"))
            .onAppear(perform: fetch)
        }
    }

    private func fetch() {
        store.fetchFavorites()
    }
}
```
The above example creates FavoritesView that combines fetching and rendering of the food items that are favourited. So We can't reuse the same view if we want to search for a food item. 

### Decomposing views and Container Views
To reuse views, we have to segregate small composable views. Once we decompose views, we have to pass data and render the views. Container Views fetches the data and passes it to a simple decomposed view, that renders the view. Let's look at the below example,
``` Swift
import SwiftUI

//Container View - that fetches data and passes it to rendering view
struct FavoritesContainerView: View {
    @EnvironmentObject var foods: [Food]

    var body: some View {
        FoodsView(foods: foods)
            .onAppear(perform: fetch)
    }

    private func fetch() {
        store.fetchFavorites()
    }
}

//Decomposed View
struct FoodsView : View {
    let foods: [Food]

    var body: some View {
        List {
            ForEach(foods) { food in
                HStack(alignment: .top) {
                    VStack(alignment: .leading) {
                        Text(food.name)
                            .font(.headline)
                        Text(food.description ?? "")
                            .font(.subheadline)
                    }
                }
            }
        }
    }
}
```
From the above example, we fetch the foods from `FavoritesContainerView` and the foods data are then passed to `FoodsView` that renders the view. Here we have a segregation between the View and Data-flow. Let's consider below example to search a food item,
``` Swift
import SwiftUI

struct SearchContainerView: View {
    @EnvironmentObject var foods: [Food]
    @State private var query: String = "Ghee Dosa"

    var body: some View {
        SearchView(query: $query, foods: foods, onCommit: fetch)
            .onAppear(perform: fetch)
    }

    private func fetch() {
        store.fetch(matching: query)
    }
}

struct SearchView : View {
    @Binding var query: String
    
    let foods: [Food]
    let onCommit: () -> Void

    var body: some View {
        List {
            TextField("Search here", text: $query, onCommit: onCommit)
            ForEach(foods) { food in
                HStack(alignment: .top) {
                    VStack(alignment: .leading) {
                        Text(food.name)
                            .font(.headline)
                        Text(food.description ?? "")
                            .font(.subheadline)
                    }
                }
            }
        }
    }
}
```   
Here ContainerView provides handling action closure and state binding to rendering views. ContainerView should fetch data, handle states, manage life cycles (onAppear/onDisappear) and pass data to Rendering view. RenderingView should not store any state and render the views from the data provided. 
