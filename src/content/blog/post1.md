---
title: "swiftDialog EDR alerts"
description: "Using swiftDialog with an EDR solution to notify users of threats and remediation progress."
pubDate: "Sep 10 2024"
badge: "macOS"
heroImage: "https://raw.githubusercontent.com/jasonad123/dialog-edr-popup-inator/refs/heads/main/screenshots/allclear.png"
tags: ["macOS","sysadmin"]
---
## The Opportunity

Through the course of my [macOS management](projects/macos-management-things/) work, I had a thought about what a user may experience when our endpoint protection product encounters suspicious activity (a threat, makes a detection, etc). What if there was a way to provide a "bold" response when something happens, appropriately scaled to the severity of the event, and would limit user interaction whilst remediation was going on - specifically in a macOS environment with Crowdstrike as the endpoint product?

## The example

On macOS, Jamf Protect has an integration with [DEPNotify](https://www.jamf.com/blog/jamf-protect-remediation-workflows/), a notification tool that plays a similar role to SwiftDialog.

## The tools

To make this happen in my environment, we'd only really need two tools to make this happen - the notification product (swiftDialog) and the source of the endpoint detections/a way to deploy them.

### **swiftDialog**

[swiftDialog](https://github.com/swiftDialog/swiftDialog), or just Dialog, is an amazing notification tool that no Mac admin should be without.

### **Crowdstrike** 

This organization uses Crowdstrike for next-gen antivirus and EDR and Crowdstrike provides us with two essential tools for making this work: Real-Time-Response (RTR) and Fusion SOAR. 

RTR allows us to run scripts (zsh scripts on macOS specifically) and can store them for deployment in an RTR session.

Fusion SOAR is the built in automation tool within Crowdstrike and can run RTR scripts as part of a workflow (if one makes the scripts available).

## The process

1. Prepare the scripts for each "threat severity level"
2. Test the scripts for the desired outcome
3. Upload to Crowdstrike as RTR scripts and make them available to Fusion
4. Use during RTR hands-on remediation (manual) and/or launch them on detection with Fusion (automatic)

## Screenshots

## More about the code

#### Timeouts

To ensure that users pay attention, we use a function to disable the "continue" button until a specified timeout. This is a simple "while" loop that increments through the number of seconds before re-enabling the button.

Have a look at the repository [on Github](https://github.com/jasonad123/dialog-edr-popup-inator).
