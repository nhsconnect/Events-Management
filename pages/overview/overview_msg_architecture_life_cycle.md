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

To simplify the management of event lifecycle the NEMS will:
- including information in the response to use of the subscription API and publish API to allows the fact that changes are happening or planned to be detected by the consuming system so that it can be signalled to operational teams.
- event versioning will not be supported, I.e. there is no need for an event to carry any kind of version information. Events will be replaced wholesale by a completely new event type if they change

## Mechanism

The response from the subscription API and publishing API will include the following information when event lifecycle is changing:
- An optional warning that the event is either:
  - Deprecated
  - No longer supported
- An associated, optional date which will indicate:
  - For deprecated events, the date on which the event will become no longer supported
  - For no longer supported events, the date on which publication requests will be rejected
- A URL to a human-readable web-page detailing the event-lifecycle changes occurring

Information on which resources and elements will be used to communicate these deprecation warnings can be seen on the [Create Subscription](explore_create_subscription.html) page for deprecation warnings to subscribers and the [Publish an Event Message](publication_publish.html) page for deprecation warnings to publishers.

## Example

If we have a admission event with the event type code `ADM-v1` and we want to replace it with a new admission event we will create the new admission event and give it a new event type code `ADM-v2`. A deprecation warning will be added to the old `ADM-v1` event indicating when it will no longer be supported.
 
There is another event with event type code `Other-Event-v1` which we are removing as it is no longer needed, therefore we deprecate it without there being a replacement event.

<a href="images/overview/event_life_cycle.png" target="_blank"><img src="images/overview/event_life_cycle.png"></a>
