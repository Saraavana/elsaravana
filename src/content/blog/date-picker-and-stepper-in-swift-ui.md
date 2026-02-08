---
title: 'DatePicker and Stepper in SwiftUI'
description: 'Declaration and definition of DatePicker and Stepper components...'
category: 'swift'
date: '2019-06-13'
draft: false
---
### DatePicker
`DatePicker` is similar to `UIDatePicker` and it has lot of configuring options that let us to have control over the state and to obtain values from it.

Let's create a `DatePicker`, 
```swift
struct ContentView : View {
    var dateFormatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter
    }

    @State var currentDate = Date()

    var body: some View {
        VStack {
            DatePicker(
                $currentDate,
                maximumDate: Date(),
                displayedComponents: .date
            )

            Text("Date is \(currentDate, formatter: dateFormatter)")
        }
    }
}
```  
`maximumDate` is used to restrict the future date. We can also set `minimumDate` to prevent selection beyond a specific date.

### Stepper
`Stepper` is similar to `UIStepper`. Let's look at below example to create `Stepper`
```swift
struct ContentView : View {
	@State var defaultValue :Double = 5
    var body: some View {
        VStack {
            DatePicker(
                $currentDate,
                maximumDate: Date(),
                displayedComponents: .date
            )
            Stepper(value:$defaultValue,in: 2...15,step: 0.25) {
            	Text("The value is \(defaultValue,specifier:"%g")")
            }
        }
    }
}
```
This will create a `Stepper` with range of 2 to 15, default value as 5 and each step will increase/decrease by 0.25
