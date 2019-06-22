---
title: iOS Password and OTP autofill
date: "2019-04-19T22:12:03.284Z"
slug: ios-password-and-otp-autofill
description: From iOS 12, Password and OTP can be suggessted in the QuickType bar, which can be filled to corresponding textfields in a single tap...

---

### Password Autofill

From iOS 12, Password and OTP can be suggessted in the QuickType bar, which can be filled to corresponding textfields in a single tap. It is easy to enable this feature in your app. When your app is installed to an iOS device, the OS associate with all the domains mentioned in App's _Associated domains_ entitlement. 

#### Configuring App's Associated Domains
Select _Project File from Project Navigator -> Target -> Capabilities -> Associated Domains_. Add new domain with _webcredentials:_ prefix, to include all the subdomains of the associated domain, use _*<Domain Name>_. The domain should follow the below structure

``` Swift
<service>:<Domain Name>[:port number]
```

#### Include Apple App Site Association File (AASAF) to your domain
Create a file without extension named as `apple-app-site-association`. It must be accessible via HTTPS. The file should contain associated app information in following structure.

``` Json
{
	"webcredentials":{
		"apps":[
			"abcdef1234.com.password.ios12",
			"abcdef1234.com.otp.ios12"
		]
	}
}
``` 
The `apps` array should include identifier with format `<Team ID>.<appID>`. This will enable two way connection between the app and your domain.

To enable password autofill, we must set values to `contentType` properties.

``` Swift
usernameTxtField.contentType = .username
passwordTxtField.contentType = .password
```

### OTP/Security Code autofill
To enable OTP autofill, we must set values to contentType property as follows,

``` Swift
otpTxtField.contentType = .oneTimeCode 
```

Please note, when sign-in autofill is tapped, a FaceID or TouchID authentication is required to fill the necessary credentials to your application.