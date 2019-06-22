---
title: Implementing QR code scanner to iOS app
date: "2019-04-10T22:12:03.284Z"
slug: implementing-qr-code-scanner-to-ios-app
description: An QR (Quick Response) code is two dimensional barcode. It can carry information in both vertical and horizontal direction...

---

### QR Code
An QR (Quick Response) code is two dimensional barcode. It can carry information in both vertical and horizontal direction. QR code can be used to display product descriptions, provide URLs/address, give contact cards, initiate payments, deeplink any iOS application. It is used to market and advertise the brands.

In iOS, QR code can be scanned using default Camera app. Also, certain apps use their own QR code scanner to maintain their in-app experience, accessibility and invoke specific functionality. A custom interface to scan QR can be build using `AVFoundation` framework.

### Configuring Capture Session
`AVCaptureSession` manages the audio & video sessions in iOS. `AVCaptureDevice` is the physical capturing device present in your phone and it gives one or more `AVCaptureOutputs`. We will use default camera as input and the output will be instance of `AVCaptureMetadataOutput` that will provide us metadata of the video session. The output type of the metadata can be set by setting `metadataObjectTypes` to `.qr`

```Swift
func captureSession() {
    guard let videoDevice = deviceType.default(for: .video),
        let captureInput = try? AVCaptureDeviceInput(device: videoDevice),
        session.canAddInput(captureInput) else {
            //If the device is not present/cannot be added to the capturing session.
            return
    }

    let metaOutput = AVCaptureMetadataOutput()
    guard session.canAddOutput(metaOutput) else {
        //If the output cannot be added to the capturing session.
        return
    }

    session.addInput(captureInput)
    session.addOutput(metaOutput)

    guard metaOutput.availableMetadataObjectTypes.contains(.qr) else {
        //QR metadata output not present in this device
        return
    }

    metadataOutput.metadataObjectTypes = [.qr]
    metadataOutput.setMetadataObjectsDelegate(self, queue: queue)
}
```
### Loading Camera
We need to provide permission to access camera. To request for permission we must add `NSCameraUsageDescription` key to `info.plist` with description stating why do we need access the camera. To load a Camera view, we must create custom view with `AVCaptureVideoPreviewLayer` as its sublayer. The session can be initiated by calling `startRunning`

```Swift
func requestPermission() {
    switch AVCaptureDevice.authorizationStatus(for: AVMediaType.video) {
    case .authorized:
    // If authorized to access the camera.
    case .notDetermined:
        // We have never requested access to the camera before.
        AVCaptureDevice.requestAccess(for: .video) { authorized in
                guard authorized else {
                    // Denied the camera access request.
                    return
                }
                // Authorized to access the camera.
            }
        }
    case .denied, .restricted:
        // Denied the camera access request or if camera usage is restriced.
        return
    }
}
```

### Scanning QR Code
We will look how to extract URL from QR code. We have set up camera video session, configured our video preview layer and permission to access camera is granted by user. `AVCaptureMetaDataOutputObjectsDelegate` provides a delegate method `captureOutput:didOutputMetadataObjects:fromConnection:` that is called when QR code is scanned. 

```Swift
func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        guard let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
            let stringValue = object.stringValue,
            let url = URL(string: stringValue) else do {
                return
        }
        //If the URL is valid, perform required action
    }
```

Thus, we have implemented custom QR code scanner, which will enable user to perform multiple actions by identifying QR code.