---
title: Error Handling
date: "2019-06-05T22:12:03.284Z"
slug: error-handling
description: Error handling is the process of responding to and recovering from error conditions in our program...

---

Error handling is the process of responding to and recovering from error conditions in our program. Swift provides first-class support for throwing, catching, propagating, and manipulating recoverable errors at runtime.

Some operations aren’t guaranteed to always complete execution or produce a useful output. Optionals are used to represent the absence of a value, but when an operation fails, it’s often useful to understand what caused the failure, so that our code can respond accordingly.

Swift provides a native way to define and handle errors using the Error protocol. Conforming to it doesn’t require us to add any specific properties or methods, so we can make any type conform to it with ease.

``` Swift
enum ValidationError: Error {
    case tooShort
    case tooLong
    case invalidCharacterFound(Character)
}
```

Let's inherit `LocalizedError` protocol to `ValidationError` enum, so that we can return approriate error message to each of the case individually. 
``` Swift
extension ValidationError: LocalizedError {
    var errorDescription: String? {
        switch self {
        case .tooShort:
            return NSLocalizedString(
                "Your username needs to be at least 4 characters long",
                comment: ""
            )
        case .tooLong:
            return NSLocalizedString(
                "Your username can't be longer than 14 characters",
                comment: ""
            )
        case .invalidCharacterFound(let character):
            let format = NSLocalizedString(
                "Your username can't contain the character '%@'",
                comment: ""
            )

            return String(format: format, String(character))
        }
    }
} 
```

The above function enables us to validate the username. We will look two ways to implement this error handling.
1. Using try-catch block
2. Using closure

#### Using try-catch block
``` Swift
func validate(username: String) throws {
    guard username.count > 3 else {
        throw ValidationError.tooShort
    }

    guard username.count < 15 else {
        throw ValidationError.tooLong
    }

    for character in username {
        guard character.isLetter else {
            throw ValidationError.invalidCharacterFound(character)
        }
    }
}
```
The above function validates the username and throws the corresponds ValidationError case. We have to implement try-catch block to receive the validate passed from above method. `isLetter` is a new API introduced in Swift 5.
``` Swift
func userDidPickName(_ username: String) {
    do {
        try validate(username: username)
        // validation success, no error was thrown. 
        submit(username)
    } catch {
        errorLabel.text = error.localizedDescription
    }
}
```
#### Using closure
``` Swift
func validate(username: String,
              then handler: @escaping (ValidationError?) -> Void) {
    guard username.count > 3 else {
        handler(ValidationError.tooShort)
    }

    guard username.count < 15 else {
        handler(ValidationError.tooLong)
    }

    for character in username {
        guard character.isLetter else {
            handler(ValidationError.invalidCharacterFound(character))
        }
    }
}
```
If will be slightly different to handle the callback from the closure, let's have a look at below code
``` Swift
func userDidPickName(_ username: String) {
    validate(username: username) { error in
        if let error = error {
            errorLabel.text = error.localizedDescription
        } else {
            submit(username)
        }
    }
}
```
Now that we can show the user the appropriate validation message. By giving proper error codes/message, we give directions for the user to proceed then on. Even if we show error, valid localized error message will set the right context about the state, so users might be happy even if something goes wrong. 