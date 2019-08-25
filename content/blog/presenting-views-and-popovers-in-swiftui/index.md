---
title: Presenting Views and Popovers in SwiftUI
date: "2019-08-25T22:12:03.284Z"
slug: presenting-views-and-popovers-in-swiftui
description: We will discuss about how to present different views, modals, popovers...

---

As we know SwiftUI is declarative, we can easily present different views such as alerts, actionsheets, modals, popovers. Let's implement each of the view type using SwiftUI.

### Alert & ActionSheet
Alert and ActionSheet can be presented in a similar way. Both *alert* and *actionSheet* modifiers follows *Boolean* and *Optional Identifiable* binding to present it's view. 
``` Swift
struct ParentView: View {
	//Using Boolean binding
    @State private var showView = false

    var body: some View {
        VStack {
            Button("Show View") {
                self.showView = true
            }
        }
        // "actionSheet" modifier used to present an ActionSheet  
        .actionSheet(isPresented: $showView) {
            ActionSheet(
                title: Text("Title"),
                message: Text("All actions"),
                buttons: [
                    .cancel { print(self.showView) },
                    .default(Text("Action")),
                    .destructive(Text("Delete"))
                ]
            )
        }
        // ".alert" modifier used to present an AlertView
        .alert(isPresented: $showView) { 
            Alert(
                title: Text("Title"),
                dismissButton: .cancel()
            )
        } 
    }
}
```
SwiftUI changes the binding values to default value when the view is dismissed. We can also create Alert and ActionSheet from the parameters passed on to the closure using *Optional Identifiable* binding.
``` SwiftUI
struct Message: Identifiable {
    let text: String
}

struct ParentView: View {
    @State private var message: Message? = nil

    var body: some View {
        VStack {
            Button("Show View") {
                self.message = Message(text: "Hello Wonderland!")
            }
        }
        // "actionSheet" modifier used to present an ActionSheet  
        .actionSheet(item: $message) {
            ActionSheet(
                title: Text("Title"),
                message: Text(message.text),
                buttons: [
                    .cancel { print("Cancelled") },
                    .default(Text("Action")),
                    .destructive(Text("Delete"))
                ]
            )
        }
        // ".alert" modifier used to present an AlertView
        .alert(item: $message) { message in
            Alert(
                title: Text(message.text),
                dismissButton: .cancel()
            )
        }
    }
}
```

### Modal & Popover
Modal and Popover can also be presented using *Boolean* and *Optional Identifiable* binding. Modals can be presented using *sheet* modifier. Modals creates the content view from the closure and also contains an optional *onDismiss* closure, which gets called when view dismisses. 
``` Swift
import SwiftUI
import Combine

struct ParentView: View {
    @State private var displayModal = false

    var body: some View {
        VStack {
            Button("Present modal") {
                self.displayModal = true
            }
        }.sheet(isPresented: $displayModal, onDismiss: {
            print(self.displayModal)
        }) {
            ModalView(message: "Modal view")
        }
    }
}

struct ModalView: View {
    @Environment(\.presentationMode) var presentation
    //.presentationMode is an Environment binding to current Presentation Mode
    let message: String

    var body: some View {
        VStack {
            Text(message)
            Button("Dismiss") {
                self.presentation.value.dismiss()
            }
        }
    }
}
``` 
PopOver can be presented using *popover* modifier and it is similar to Alert and ActionSheet. *popover* modifier has an additional parameter *arrowEdge*, which allows us to draw arrow in specified direction from the given edge value.
``` Swift
struct MasterView: View {
    @State private var showPopover: Bool = false

    var body: some View {
        VStack {
            Button("Show popover") {
                self.showPopover = true
            }.popover(
                isPresented: self.$showPopover,
                arrowEdge: .bottom
            ) { Text("Popover") }
        }
    }
}
```
When PopOver/Modal view is dismissed, the *binding* resets to it's initial value.  