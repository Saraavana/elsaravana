---
title: Passing Data in SwiftUI
date: "2019-07-12T20:12:03.284Z"
slug: passing-data-in-SwiftUI
description: We will look into how we can pass data across views in SwiftUI...

---

Data plays a vital part in maintaining different states of our app. Using these data, SwiftUI allows us to handle various states easily.

### Retrieve data from Local Storage/Model

Let's consider the below model layer to retrieve and show profile information of a user and update his personal data.
``` Swift
import SwiftUI
import Combine

struct Profile: Identifiable {
    let id: Int
    var name: String
    var age: Int
}

final class ProfileStore: BindableObject {
    let didChange = PassthroughSubject<Void, Never>()

    var profiles: [Profile] = [] {
        didSet {
            DispatchQueue.main.async {
                self.didChange.send(())
            }
        }
    }

    func getData() {
        // Retrieve data
        profiles = [
            .init(id: 1, name: "Saravana", age: 25),
            .init(id: 2, name: "Hund", age: 10),
            .init(id: 3, name: "Bea", age: 30)
        ]
    }
}
```
The struct Profile conforms to `Identifiable` protocol. The view ProfileStore conforms to `BindableObject`, which will allow SwiftUI to refresh the views once it receives notification through `didChange`

#### List profile data:

We will now create our view that display the profile information of users.
``` Swift
struct ProfileListView : View {
    @ObjectBinding var store: ProfileStore

    var body: some View {
        NavigationView {
            List(store.profiles) { profile in
                VStack(alignment: .leading) {
                    Text(profile.name)
                        .font(.headline)
                    Text("Age: \(profile.age)")
                        .font(.subheadline)
                }
            }
                .onAppear(perform: { self.store.getData() })
                .navigationBarTitle(Text("Users"))
        }
    }
}
```

The `ProfileListView` shows array of profiles from the struct. It displays name and age of each profile in every row. 

#### Edit profile data:

We will create a new view that edits the profile data in real time. Thus, allowing the `ProfileListView` to maintain the state from updated data model layer. We will achieve this by using `Form` component.
``` Swift
struct EditingView: View {
    @Environment(\.isPresented) var isPresented: Binding<Bool>
    @Binding var profile: Profile

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Profile information")) {
                    TextField($profile.name)
                    Stepper(value: $profile.age) {
                        Text("Age: \(profile.age)")
                    }
                }

                Section {
                    Button(action: { self.isPresented?.value.toggle() }) {
                        Text("Save")
                    }
                }
            }.navigationBarTitle(Text(profile.name))
        }
    }
}
```
The property wrapper `@Binding` is used to editing and update the profile data to `Profile` struct. It will allow the view to update the value without retaining a copy of the data.

Let's look at how we can pass profile data and present `EditingView`,
``` Swift
struct ProfileListView : View {
    @ObjectBinding var store: ProfileStore

    var body: some View {
        NavigationView {
            List { 
             ForEach(0..<store.profiles.count) { index in
	           PresentationButton(destination: EditingView(profile: self.$store.profiles[index])) {
	 	         VStack(alignment: .leading) {
                    Text(self.store.profiles[index].name)
                        .font(.headline)
                    Text("Age: \(self.store.profiles[index].age)")
                        .font(.subheadline)
                 }
	           }
              }
           }
           .onAppear(perform: { self.store.getData() })
           .navigationBarTitle(Text("Users"))
        }
    }
}
```
Thus, we can edit the name using Textfield, age using Stepper and the changes will get updated in the modal layer. The data change will notify `didChange` in `ProfileListView`, which will refresh the view and displays the updated information. 