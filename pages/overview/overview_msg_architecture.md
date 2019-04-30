---
title: Messaging Architecture Overview
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture.html
summary: "Overview of the Messaging Architecture section"
---

## Events Message Flow

The diagram below shows the high level requirements of an National Events Management Service (NEMS) as well as the role of the NEMS within the interaction between publishers and subscribers.

<a href="images/overview/msg_architecture_overview.png" target="_blank"><img src="images/overview/msg_architecture_overview.png"></a>

1. A subscriber subscribes to event messages by event types or patient identifier using the [Subscription](explore_create_subscription.html) API

2. A successful subscription request will return a confirmation of the subscription creation
3. A publisher will generate an event message and send it to the NEMS
4. The NEMS will validate the sent event message and return an accepted response to the publisher
5. The NEMS takes the event messages and matches the content of the event message to the subscriptions. For each event message which matches the subscription criteria the NEMS will send the event message to the subscriber via [MESH](https://digital.nhs.uk/message-exchange-social-care-health).

## Messaging Pattern

The National Events Management Service (NEMS) is based on a Publish and Subscribe messaging pattern, where:

- a publisher sends an event message to the messaging service without being concerned who will receive the message
- a subscriber is a system which would like to receive event messages that match a set of criteria, such as matching a specific event type or the patient having a specific identifier

More information around the messaging pattern is available on the NHS Digital developer network [Integration Patterns](https://developer.nhs.uk/library/architecture/integration-patterns) pages.

## Publishers

Event messages are created by services such as the Spine Patient Demographics Service, hospitals, child health service, etc. The event messages are constructed in line with this specification and the contained event message guidance.

Once the publisher has constructed the event message they use the NEMS [publish API](publication_publish.html) to send the event message to the NEMS. If the event message is valid the NEMS will return an accepted response to the publisher before continuing to process the event message internally.

## Subscribers

A subscriber can use the [subscription API](explore_create_subscription.html) within the NEMS to request that event messages are sent to them. The subscription API allows the subscriber to specify rules around what messages they wish to receive and how they want to receive the event messages.

{% include important.html content="Subscribers will only receive event messages published to the NEMS after their subscription has been created within the NEMS. Any event messages that were processed by the NEMS before the subscription was created will not be sent to the subscriber as the NEMS does not store previously processed event messages." %}


## Delivery Of Event Messages

Onward delivery of event messages to subscribers will be over [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health).

The event messages have a common [Event Header Information](explore_event_header_information.html) structure which allows the receiving system of the event message to identify the patient this event relates to, the type of event message and additional meta data about the event message such as the originating organisation.

## Event Message Sequencing

Neither the NEMS or MESH guarantee that events will be sent to subscribers in the order that they are received by the NEMS via the publish API. This is common in eventing systems and the use of sequence numbers and/or timestamps allows receivers to detect and handle out-of-order messages.

For subscribers to detect and handle out-of-order messages the NEMS has included in the common event header resources:
- an optional FHIR instant (time stamp with sub-second accuracy) element which represents the point in time that the change occurred which should be used for ordering messages for processing
- an optional sequence number, to be assigned by the publisher. The sequence number shall be patient and event-type specific and the publisher must increment the sequence number each time a new event of the same type is issued by the same system for the same patient.

Individual event support for out-of-order message handling and which method is the most appropriate to detect an out-of-order message will be set at a national level per event type, as part of the formal event definition.


## Event-Lifecycle and Deprecation

Changes to event definitions are a fact of life in event-based systems and therefore the NEMS has incorporated a mechanism to help manage these changes. The NHS is an extremely complex environment and keeping accurate track of who should be notified when changes are happening is likely to be extremely challenging. It is also not practical to rely on the operators of systems using NEMS to read emailed notifications or keep track of changes which we publish outside of the of the system.


To simplify the management of event lifecycle the NEMS will:
- including information in the event message and on the publish API interaction responses to allows the fact that changes are happening or planned to be detected by the consuming system and signalled to operational teams.
- event versioning will not be supported, I.e. there is no need for an event to carry any kind of version information. Events will be replaced wholesale by a completely new event type if they change

### Mechanism

The event message generic header and the publishing API response will include/return the following information when event lifecycle is changing:
- An optional warning that the event is either:
  - Deprecated
  - No longer supported
- An associated, optional date which will indicate:
  - For deprecated events, the date on which the event will become no longer supported
  - For no longer supported events, the date on which no new publication requests will be accepted
- A URL to a human-readable web-page detailing the event-lifecycle changes occurring

{% include important.html content="This deprecation information will be set by NEMS and will not be populated by publishers." %}

### Example

If we have a admission event with the event type code `ADM-v1` and we want to replace it with a new admission event we will create the new admission event and give it a new event type code `ADM-v2`. A deprecation warning will be added to the old `ADM-v1` event indicating when it will no longer be supported.
 
There is another event with event type code `Other-Event-v1` which we are removing as it is no longer needed, therefore we deprecate it without there being a replacement event.

<a href="images/overview/event_life_cycle.png" target="_blank"><img src="images/overview/event_life_cycle.png"></a>