---
title: 'Using iOS Strong Password'
description: 'From iOS 12, strong password can be recommended whenever a new user sign up to iOS application. It is a simple and straight forward approach to implement this feature in your iOS application...'
category: 'swift'
date: '2019-04-16'
draft: false
---
### iOS Strong Password

From iOS 12, strong password can be recommended whenever a new user sign up to iOS application. It is a simple and straight forward approach to implement this feature in your iOS application.

### Autofill Strong password
A strong password can be autofilled to your password textfield by specifying its contentType as `.newPassword`

```swift
passwordTxtField.contentType = .newPassword
```

This strong passwords are usually 20 characters long. It can contains more than 71 bits of entropy. By default, password generation rule includes _lowercase, uppercase, digits, hypen_ 

<!-- ![](./images/strong-password.png) -->
![](https://res.cloudinary.com/dsykbphvz/image/upload/v1563209632/elsaravana/using-ios-strong-password/images/strong-password_jciz7w.png)

The password generation rules can be customized for your app. The rule can be created and validated from [Password rules validation tool](https://developer.apple.com/password-rules/) 

A sample implementation of strong password autofill using custom password generation rule is as follows,

```swift
let passwordTxtField = UITextField()
let rulesDescriptor = "required: lower; required: upper; required: digit; required: [-,_]; minlength: 20; maxlength: 8;"
passwordTxtField.passwordRules = UITextInputPasswordRules(descriptor:rulesDescriptor)
```
