---
title: Event Lifecycle and Deprecation
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_life_cycle.html
summary: "Overview of event type life cycle"
toc: false
---

Changes to event definitions are a fact of life in event-based systems and therefore the NEMS has incorporated a mechanism to help manage these changes. The NHS is an extremely complex environment and keeping accurate track of who should be notified when changes are happening is likely to be extremely challenging.

To help manage communication of event lifecycle the NEMS will:
- include information in the response from the subscription API and publish API to allows the fact that changes are happening, or planned, to be detected by the consuming system. This information MUST be signalled to operational teams in order for them to manage the event deprecation.
- event versioning will not be supported, I.e. there is no need for an event to carry any kind of version information. Events will be replaced wholesale by a completely new event type if they change

## Who will be notified

The current technical solution notifies:
- publishers when they publish an event type which is deprecated
- subscribers when they create a subscription for a deprecated event type

To notify other providers which are not covered by the current technical capability, such as subscribers with existing subscriptions and publishers who do not publish the deprecated event during the deprecation period, NHS Digital will contact those providers to inform them that the event they are subscribed to or are assured to publish is being deprecated giving them time to make required changes. Manually contacting providers is not going to be sustainable as the NEMS scales and there is an intention, in the future, to add a new event type which will be published by the NEMS to subscribers to notify them about and changes or administrative information regarding the NEMS.


## Mechanism

The technical solution will include information in the response from the subscription API and publishing API, this information will include the following:
- A warning code to identifying the event life cycle state of the deprecated event type
- A human readable warning message containing relevant dates and a URL to a human readable web page, containing detail of the event type deprecation

Information on which resources and elements will be used to communicate these deprecation warnings can be seen on the [Create Subscription](explore_create_subscription.html) page for deprecation warnings to subscribers and the [Publish an Event Message](publication_publish.html) page for deprecation warnings to publishers.

### Event life cycle states

| State | Publisher | Subscriber |
| --- | --- | --- |
| Deprecated | Publishers **MUST** continue to publish the event message type and will receive a deprecation warning. | Subscribers may create new subscriptions to the deprecated event message type but will receive a deprecation warning. |
| No longer supported | Publishers **MUST** continue to publish the event message type and will receive a deprecation warning.<br/><br/>No new providers will be on boarded, as a publisher of the deprecated event type. | New subscriptions to the deprecated event type will be rejected, the NEMS will return an error response. |
| Withdrawn | Event messages published, containing the withdrawn event type, will be rejected by the NEMS and the publisher will receive an error response. | New subscription requests to the withdrawn event type will be rejected and the subscriber will receive an error response. |


## Example

If we have a admission event with the event type code `ADM-v1` and we want to replace it with a new admission event we will create the new admission event and give it a new event type code `ADM-v2`. A deprecation warning will be added to the old `ADM-v1` event indicating when it will no longer be supported.
 
There is another event with event type code `Other-Event-v1` which we are removing as it is no longer needed, therefore we deprecate it without there being a replacement event.

<a href="images/overview/event_life_cycle.png" target="_blank"><img src="images/overview/event_life_cycle.png"></a>

