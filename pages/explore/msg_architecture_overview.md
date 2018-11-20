---
title: Messaging Architecture Overview
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: explore_msg_architecture_overview.html
summary: "Overview of the Messaging Architecture section"
---

## Events Message Flow

The diagram below shows the high level requirements of an National Events Management Service (NEMS) as well as the role of the NEMS within the interaction between publishers and subscribers.

<a href="images/explore/msg_architecture_overview.png" target="_blank"><img src="images/explore/msg_architecture_overview.png"></a>

1. A subscriber subscribes to event messages by event types or patient identifier using the [Subscription](explore_create_subscription.html) API
2. A successful subscription request will return a conformation of the subscription creation
3. A publisher will generate an event message and send it to the NEMS
4. The NEMS will validate the sent event message and return an accepted response to the publisher
5. The NEMS takes the event messages and matches the content of the event message to the subscriptions. For each subscription which matches the event message being processed the NEMS will send the event message to the subscriber via MESH


## Messaging Pattern

The National Events Management Service (NEMS) is based on a Publish and Subscribe messaging pattern, where:

- a publisher sends an event message to the messaging service without being concerned who will receive the message
- a subscriber is a system which would like to receive event messages that match a set of criteria such as matching a specific event type or the patient having a specific identifier

More information around the messaging pattern is available on the NHS Digital developer network [Integration Patterns](https://developer.nhs.uk/library/architecture/integration-patterns/) pages.

## Publishers

Event messages are created by services such as the National Population Failsafe, the Spine Patient Demographics Service, a hospital, a child health service and are constructed inlined with this event message implementation guide.

The event massages have a common [Event Header Information](explore_event_header_information.html) structure which allows the receiving system of the event message to identify the patient this event relates to, the type of event message it is and some other meta data about the event message such as the originating organisation.

Once the publisher has constructed the event message they use the NEMS [publish API](publication_publish.html) to send the event message to the NEMS. If the event message is valid the NEMS will return an accepted response to the publisher before continuing to process the event message internally.


## Subscribers

A subscriber can use the [subscription API](explore_create_subscription.html) within the NEMS to request that event messages are sent to them. The subscription API allows the subscriber to specify rules around what messages they wish to receive and how they want to receive the event messages.

{% include important.html content="Subscribers will only receive event messages published to the NEMS after their subscription has been created within the NEMS. Any event messages that were processed by the NEMS before the subscription was created will not be sent to the subscriber as the NEMS does not store previously processed event messages." %}


## Delivery Of Event Messages

Onward delivery to subscribers will be over MESH. For further information relating to MESH see [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health).

