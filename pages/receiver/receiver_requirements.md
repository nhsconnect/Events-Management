---
title: Event Receiver Requirements
keywords:  messaging, receiver
tags: [fhir,messaging,receiver]
sidebar: overview_sidebar
permalink: receiver_requirements.html
summary: "Requirements for event receivers to consume events published by the NEMS"
---

Currently the only delivery method for sending an event message to a consumer is to send it to the consumer's [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health) mailbox. Other delivery channels may be developed in future if there is a demand for them.

The event information published to the NEMS will be unchanged and will conform to the requirements and guidance outlined in the [event message](overview_supported_events.html) specific guidance.


## MESH mailbox configuration ##

The receiving MESH mailbox will need to be configured for each of the event message types the organisation wishes to receive from the NEMS. Each event message has its own WorkflowID as specified in the [event message](overview_supported_events.html) specific guidance. Configuration of the MESH mailbox will require a service request to be sent to the MESH management team at NHS Digital.

Functionality within MESH means messages are deleted after a period of time, if not picked up, therefore subscribers MUST ensure that received MESH messages are managed in a timely and appropriate manner to mitigate the risk of losing messages.


## Subscription IDs and Tags ##

Subscription `tags` allow the subscriber to identify which subscription resulted in the event message being sent to their MESH Mailbox.

On the [Create Subscription](explore_create_subscription.html) page, the criteria section defines an optional criteria element with the name `tag`. If a `tag` element was included in the subscription(s) which resulted in the event message being to the MESH mailbox, the `subscriptionID` and `tag` value will be shared with the subcriber.

The `subscriptionID` and `tag` value will be included in the `Mex-Partnerid` header as part of the MESH delivery wrapper. The two elements will be separated by a pipe delimiter (`|`) as follows:

```http
Mex-Partnerid: [subscription_id]|[tag_value]
```

### Multiple Subscriptions ###

It is possible that an event message may match multiple subscriptions which deliver to the same MESH Mailbox. When this happens the NEMS de-duplicates the message and sends one copy of the event message to the MESH mailbox.

In this scenario the `SubscriptionID` and `tag` value for any subscriptions that matched the event message and contain a `tag` criteria element will be included and will be delimited with the value `~~~` as follows:

```http
Mex-Partnerid: subA|tagA~~~subB|tagB~~~subC|tagC
```

{% include important.html content="The `SubscriptionIDs` and `Tags` are not inserted into the actual event message, they are included in the MESH delivery wrapper around the message." %}
