---
title: Publishers and Subscribers in Combine framework
date: "2019-07-06T22:12:03.284Z"
slug: publishers-and-subscribers-in-combine-framework
description: We will learn about basics in Combine framework...

---

### Combine
Combine framework is used to perform asynchronous tasks by using event-processing operators. It can be used to perform async operations, UI tasks and network requests. Combine framework is similar to RxSwift. It enables us to process values over time using its declarative Swift API. This declarative API allows us to expose and receive values by using _publishers_ and _subscribers_ respectively. It is described by Apple as,

> The Combine framework provides a declarative Swift API for processing values over time. These values can represent many kinds of asynchronous events. Combine declares _publishers_ to expose values that can change over time, and _subscribers_ to receive those values from the publishers.


### Publishers
Publishers are similar to Observables in RxSwift. A publisher expose values that changes in run time to its subscribers. Let's look at below example to understand better,
``` Swift
import Combine

struct Post {
	let caption: String
	let imageURL: URL
}

let postPublisher = NotificationCenter.Publisher(center: .default, name: Notification.Name("post"), object:nil)
                    .map{(notification)-> String? in
                    	return (notification.object as? Post)?.caption ?? ""
                    }
``` 
The `Publisher` watches the changes to the Notification name _"post"_. When the change occurs, it exposes the _caption_ property of the _struct Post_ to its subscriber. Zero/more values can be published. The [publisher documentation](https://developer.apple.com/documentation/combine/publisher) will provide detailed list of Publisher operators.     

### Subscribers
Subscribers are similar to Observers in RxSwift. Subscribers receives the changes provided from publishers and performs specified actions.
A subscriber can have only one subscription. Subscriber may have a completion block. 
``` Swift
let captionLabel = UILabel()
let postCaptionSubscriber = Subscribers.Assign(object: captionLabel, keyPath: \.text)
postPublisher.subscribe(postCaptionSubscriber)

let post = Post(caption:"Beautiful snaps", imageURL:URL(string: "./hues")!)
NotificationCenter.default.post(name: Notification.Name("post"), object: post)
print("The latest post caption is \(captionLabel.text)") //"The latest post caption is Beautiful snaps"
```

#### @Published
`@Published` is a property wrapper that adds a `Publisher` to any property. Let's look at below example,
``` Swift
class QuestionnaireVC: UIViewController {
    
    @Published var toAllowSubmit: Bool = false

    @IBOutlet private weak var questionSwitch: UISwitch!
    @IBOutlet private weak var nextButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        $toAllowSubmit.receive(on: DispatchQueue.main).assign(to: \.isEnabled, on: nextButton)
    }

    @IBAction func didSwitch(_ switch: UISwitch) {
        toAllowSubmit = switch.isOn
    }
}
```
By means of _@Published_ property wrapper, `toAllowSubmit` receives updates when `questionSwitch` is turned on and assigns `.isEnabled` property to `nextButton`.
