---
title: 'Navigation in SwiftUI'
description: 'Describes about navigating from one view to another using declarative code...'
category: 'swift'
date: '2019-06-20'
draft: false
---
In order to navigate from one view to another in the navigation stack, we must use `NavigationButton`. It will take a destination as its first parameter and what to show inside the button as its second parameter (or as a trailing closure), and it handles pushing the new view on the stack for us along with animation. 

Let's look at below example to understand better,
```swift
struct DetailView: View {
    var body: some View {
        Text("Detail")
    }
}

struct ContentView : View {
    var body: some View {
        NavigationView {
            NavigationButton(destination: DetailView()) {
                Text("Hello!!")
            }.navigationBarTitle(Text("Navigation"))
        }
    }
}
```
Also SwiftUI doesn't provide `didSelectRowAtIndexPath:` delegate to know when a tableview row is tapped. We have a create navigation when a row is tapped in a `List`. 
```swift
struct DetailView: View {
    var body: some View {
        Text("Detail")
    }
}

struct ContentView : View {
    var body: some View {
        NavigationView {
            List(items) { item in
              NavigationButton(destination: DetailView(),isDetail:true) {
                Text(item)
              } 
            }.navigationBarTitle(Text("List view")) 
        } 
    }
}
```
In the above examples `DetailView` represent the second view to which we want to navigate using `NavigationView`
