---
title: 'How to download images/files and show progress'
description: 'Most of the iOS developers would have come across this situation to download images/files in their project...'
category: 'swift'
date: '2019-04-04'
draft: false
---
Most of the iOS developers would have come across this situation to download images/files in their project. And we have to show progress of the download for better User Experience.

### Download images/files:

```urlsession```is a subclass of ```nsobject```that coordinates group of network related tasks. This class provides APIs related to downloading and uploading data from the endpoints given by URLs. The API also enables the app to perform background tasks when the app isn't running or when the app is in suspended state. This class provides a instance method ```downloadtask(with:completionHandler:)```that is used to retrieve the contents from the specified URL and calls a handler after completion.


```swift
func download(completion: @escaping((Any?)->Void)) -> Progress

guard let imageURL = URL(string: "https://www.gstatic.com/webp/gallery/5.jpg") else {return}

let downloadTask = URLSession.shared.downloadTask(with: imageURL) { url, urlResponse, error in
    if let contentUrl = url {
            do {
            	// If the content downloaded is image
                let imageData = try Data(contentsOf: contentUrl)
                let image = UIImage(data: imageData)

                //If the content downloaded is file
                let string = try String(contentsOf: contentUrl)
                print("The contents of file is \(string)") 
                completion(contentUrl)               
            } catch {
              print("Error:\(error.debugDescription())")
              completion(nil)
            }
    }
}
downloadTask.resume()
return downloadTask.progress
``` 

Once the downloadTask is created, it should call ```resume()```method to perform the call. The downloading task will be handled by ```urlsession```

### Show progress:

Progress is used to represent completion of certain task that app is doing like downloading/uploading a file. 

Let's have a look at basic properties of Progress,

1. totalUnitCount
2. completedUnitCount
3. fractionCompleted
4. localizedDescription

#### totalUnitCount

The total number of units of work tracked for the current progress

#### completedUnitCount

The number of units of work for the current job that have already been completed

#### fractionCompleted

It represents the fraction of work completed by overall task, it also includes work done by any children it may have. It is fractioned between 0 and 1, where 0 means no work is completed and 1 means overall work is completed

#### localizedDescription

It provides more information about the progress tracked by the receiver. Using *Kind* property one can parameterize what its unit represent. For eg. if Kind is *ProgressKind.file* the *localizedAdditionalDescription* will give byte formatted string

The progress of download/upload can be tracked and its state can be shown in the UI

```swift
private var taskProgress: Progress? {
        didSet {
            observation?.invalidate()
            progressView.observedProgress = nil

            guard let progress = taskProgress else {return}

            progressView.observedProgress = progress
            progressDescriptionLabel.text = progress.localizedDescription

            observation = progress.observe(\.localizedAdditionalDescription, options: [.initial, .new]) { [weak self] _, change in
                print("The progress value is\(change.newValue)")
                //This progress value can be shown in UI
            }
        }
    }
```
