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

If a publisher or subscriber experience an issues with the NEMS un-related to a specific event message, such as issues connecting to the publish or subscription API, then these issues would follow the same issue processes as other Spine services where an issue would need to be raised with the National Service Desk.


## Process

<a href="images/overview/feedback_process.png" target="_blank"><img src="images/overview/feedback_process.png"></a>

1. The publisher constructs the event message include contact information that should be used if a subscriber wishes to raise an issue for that specific event message and publishes the event to the NEMS.
2. The NEMS will forward the event message on to any subscribers with matching subscriptions.
3. If the subscriber has an issue processing the event message this needs to be investigated to identify if this is an internal issue with the system or if it is an issue with the published event message. If the investigation identifies the issue is with the event message the subscriber may contact the publisher using the contact details in the event message to raise an issue for the event message that was published.
4. If the message can be processed correctly but the subscriber believes there is an issue with the content of the event message the subscriber may use the contact details in the event message to contact the publisher and raise an issue for the event message so that the publish can make necessary corrections and publish and update or delete message where appropriate.
5. If an issue is identified by a subscriber as relating to the NEMS rather than the content or event message structure create by the publisher then this should be raised as an issue with the National Service Desk.


## Requirements

The publisher MUST include either an email address or telephone number, within the following `MessageHeader` resource element:

| Element | Cardinality | Description |
| --- | --- | --- |
| source.contact | 1..1 | The email address or telephone number to be used by subscribers to contact the publisher for any issues with event message. |
| source.contact.system | 1..1 | Must contain a value of `phone` or `email` matching the included contact method within the `value` element. |
| source.contact.value | 1..1 | The phone number or email address to be used by the subscriber. |

Additional information on the population of the MessageHeader resource can be seen on the [Generic Requirements](explore_genreic_event_requirements.html) page