---
title: What is SwiftUI
date: "2019-06-12T22:12:03.284Z"
slug: what-is-swiftui
description: In WWDC 2019, Apple has introduced SwiftUI, which will replace the imperative UI used before iOS 13. SwiftUI is a user interface toolkit that require us to design apps using declarative code...

---

### SwiftUI
In WWDC 2019, Apple has introduced SwiftUI, that will replace the imperative UI used before iOS 13. SwiftUI is a user interface toolkit that require us to design apps using declarative code.  

All iOS developers are familiar with Imperative UI such as Interface Builders, XIBs and storyboards. It is complex to maintain the storyboard as the number of screen grows. Firstly, this Imperative UI is based on the XML, which is abstract from the developers to work upon. Secondly, XML coded storyboard is not a swift framework. So the compiler has to manage the Swift files and XML files individually. 

Declarative code says iOS about all the possible states so we can easily maintain the `state` in Declarative UI, whereas in case of Imperative UI we have to mange them in controllers. We are not required to write code in viewcontroller to maintain states like `showEmptyState`, `showNetworkError` state, all such state will be handled in Declarative UI. By using declarative code, we necessary create components that can be used across different places and is very easy to switch between states. When working in a team, we also need not have to worry about source control problems while committing changes to UI.

SwiftUI framework acts as a cross platform user interface layer across iOS, macOS, tvOS and watchOS. It enables us to learn single UI framework that can be adopted across multiple platforms.

Apple described SwiftUI has four things:

- **Declarative**, meaning that we say what we want rather than how we get there.
- **Automatic**, meaning that it takes care of many things we had to do by hand previously.
- **Compositional**, meaning that we build small things and combine them together into larger things.
- **Consistent**, meaning that we don’t see strange fault lines between Swift and Objective-C like we did previously, or very old APIs mixed up with very new ones.

### Migration from UIKit to SwiftUI 
Following are the components introduced instead of UIkit view elements,

- `UITableView` - `List`
- `UICollectionView` - No SwiftUI equivalent
- `UILabel` - `Text`
- `UITextField` - `TextField`
- `UITextField` with `isSecureTextEntry` set to true - `SecureField`
- `UITextView` - No SwiftUI equivalent
- `UISwitch` - `Toggle`
- `UISlider` - `Slider`
- `UIButton` - `Button`
- `UINavigationController` - `NavigationView`
- `UIAlertController` with style `.alert` - `Alert`
- `UIAlertController` with style `.actionSheet` - `ActionSheet`
- `UIStackView` with horizontal axis - `HStack`
- `UIStackView` with vertical axis - `VStack`
- `UIImageView` - `Image`
- `UISegmentedControl` - `SegmentedControl`
- `UIStepper` - `Stepper`
-`UIDatePicker` - `DatePicker`
- `NSAttributedString` - Incompatible with SwiftUI; use `Text` instead. 