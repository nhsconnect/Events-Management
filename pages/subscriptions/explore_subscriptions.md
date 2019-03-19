---
title: Subscriptions Overview
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_subscriptions.html
summary: "Types of Subscription and how they are used"
---

The flow of event messages from publishers to subscribers is described on the [Messaging Architecture Overview](explore_msg_architecture_overview.html) page.

To receive event messages from the NEMS a consumer will need to create subscriptions to events and configure their MESH mailbox to receive events:
- subscriptions can be created using the [Create Subscription](explore_create_subscription.html) interaction within the Subscription API
- the receiving MESH mailbox must be configured to receive event message types as per the requirements on the [Event Receiver Requirements](receiver_requirements.html#mesh-mailbox-configuration) page

## Types of Subscription ##

### Explicit Subscriptions ###

An explicit subscription relates to where a subscriber wishes to receive event messages for a specific patient, for example, a Pharmacist wishing to receive hospital admission and discharge events for a specific Patient.

Explicit subscriptions SHOULD only be active for patients under the subscribing organisations direct care. Explicit subscriptions for a patient should be stopped when the patient leaves the subscribing organisations direct care. This can be done either by removing the explicit subscription using the Delete Subscription API interaction or by including the `end` element as part of the subscription resource.

### Rule-Based (Generic) Subscriptions ###

A rule-based subscription relates to where a subscriber wishes to receive all published events that meet a particular rule set. There are two specific types of rule-based subscription currently:

- Geographical: Subscriptions that relate to individuals who reside within the geographic boundaries of a specific organisation (For example, a Health Visiting Service wishing to view events for all patients within a specific local authority area). 
- Registered Org: Subscriptions that relate to individuals who are registered with a specific organisation (currently only applicable for GP organisations).


## Subscription matching and message delivery ##

### Multiple matched subscriptions ###

A subscriber may create a number of different subscriptions, some explicit and some generic. If an event message published to the National Events Management Service (NEMS) matches the criteria of multiple subscriptions for a single receiving MESH mailbox, the NEMS will only send one copy of the event message to the receiving mailbox.

{% include important.html content="If a publisher sends multiple copies of the same event message, subscribers of this event will receive a copy of the event message for each repeated send by the publisher." %}
