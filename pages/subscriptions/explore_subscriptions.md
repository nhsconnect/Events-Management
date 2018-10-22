---
title: Subscriptions Overview
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_subscriptions.html
summary: "Types of Subscription and how they are used"
---

To recieve event messages a consumer will need to subscribe to events they want to recieve. The flow of event messages from publishers to subscribers is described on the [Messaging Architecture Overview](explore_msg_architecture_overview.html) page.


## Types of Subscription ##

### Explicit Subscriptions ###

An explicit subscription relates to where a subscriber wishes to receive events for a particular set of records, for example, a Pharmacist wishing to view Hospital admission events for a set of Patients. In this case the subscription would be for a set of NHS numbers. 

### Rule-Based (Generic) Subscriptions ###

A rule-based subscription relates to where a subscriber wishes to receive all published events that meet a particular rule set. There are two specific types of rule-based subscription currently:

  - Geographical: Subscriptions that relate to individuals who reside within the geographic boundaries of a specific organisation (For example, a Health Visitor service wishing to view events for all children within a specific local authority area). 
  - Registered Org: Subscriptions that relate to individuals who are registered with a specific organisation (currently only applicable for GP organisations).
