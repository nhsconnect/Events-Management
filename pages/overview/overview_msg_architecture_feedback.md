---
title: Event Feedback Mechanism
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_feedback.html
summary: "Overview of the process for event message feedback"
toc: false
---

The NEMS [messaging architecture](overview_msg_architecture.html) means that publishers of events publish without knowing which subscribers are going to receive the event message and subscribers subscribe without knowing who will be publishing the events they are subscribed to. This could make it difficult for subscribers to know who and how to contact the published when an event message they receive contains invalid or incorrect information which needs to be corrected. To address this the NEMS is mandating that contact details are included in the event message by the publisher, which can be used to raise issue relating to that specific event message.

If a publisher or subscriber experience an issues with the NEMS, un related to a specific event message such as issues connecting to the publish or subscription API, these issues would follow the same processes as other Spine services and an issue would need to be raised with the National Service Desk.


## Process

<a href="images/overview/event_life_cycle.png" target="_blank"><img src="images/overview/feedback_process.png"></a>

1. The publisher constructs the event message include contact information that should be used if a subscriber wishes to raise an issue for that specific event message and publishes the event to the NEMS.
2. The NEMS will forward the event message on to any subscribers with matching subscriptions.
3. If the subscriber has an issue processing the event message this needs to be investigated to identify if this is an internal issue with the system or if it is an issue with the published event message. If the investigation identifies the issue is with the event message the subscriber may contact the publisher using the contact details in the event message to raise an issue for the event message that was published.
4. If the message can be processed correctly but the subscriber believes there is an issue with the content of the event message the subscriber may use the contact details in the event message to contact the publisher and raise an issue for the event message so that the publish can make necessary corrections and publish and update or delete message where appropriate.
5. If an issue is identified by a subscriber as relating to the NEMS rather than the content or event message structure create by the publisher then this should be raised as an issue with the National Service Desk.


## Requirements

Contact details for use in contacting the publisher SHALL be added to the event message by the publisher within the `Organization` resource reference from the `responsible` element within the `MessageHeader` resource and must contain the following elements:

| Element | Cardinality | Description |
| --- | --- | --- |
| contact | 1..2 | A generic contact for all issues or two separate contact details, one for technical issues with the published event message and one for issues with data within the event message. |
| contact.purpose.coding.code | 1..1 | A code of `generic`, `technical`, `clinical` |
| contact.telecom.system | 1..1 |  Fixed value: `email` |
| contact.telecom.value | 1..1 | A single email address which issues should be raised. |

We are requiring that an email address is the initial method of contact for all issues as this allows the publishers to manage the raised issues and work them into their internal workflow. Phone is not being use as this will is more likely to create disruption for publishers and does not allow filtering of issues.

To simplify standardise the issues raised by the subscribers when they get to publisher, in order to allow publishers to setup rules within their mail client and to make sure there is enough information to start addressing the issue the following requirements SHALL be followed when raising an issue with a publisher. 

The email `Subject` must follow the following format:

```[NHS_Number]:[Published_Message_ID]:[Published_Event_Type]:[technical/clinical]```

The email content SHALL contain the following information:
- NHS Number
- Published event MessageID
- Published event type
- Description of the issue being raised, patient identifiable data should not be included for IG reasons.
- Contact details of the person raising the issue to be used by the publish if they have any queries about the issue being raised.
