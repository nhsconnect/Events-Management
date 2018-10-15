---
title: Introduction to Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the functional requirements for the Events Management Service, and remains subject to review. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. Changes to this specification following the initial beta release will be documented in the [Release Notes](overview_release_notes.html) section." %}


<img src="images/overview/overview_message_diagram.png">


## Introduction

The Events Management Service (EMS) is a national service implemented on the [Spine](https://digital.nhs.uk/services/spine) allowing for patient centric event messages to be published from one system and distributed to a number of other systems which have subscribed an interest in that type of message or messages related to that specific patient.

The EMS is designed to be a generic transport mechanism which can support a variety of use cases and event types from a number of different care settings. This specification focuses on the transport mechanism and the common event message elements:

- [Messaging Architecture](explore_msg_architecture_overview.html)
- [Subscription Management](explore_subscriptions.html)
- [Event Publication](publication_requirements.html)
- [Event Receiver Requirements](receiver_requirements.html) 

The specific event messages which have been defined for use through the EMS can be found in the Event Message Implementation Guides listed below. If the event messages currently defined do not meet your needs you can contact us using the details on the [Help & Support](support_contact.html) page to discuss how EMS could be enhanced to meet your requirements.

## Event Message Implementation Guides

| Implementation Guide | Description |
| --- | --- |
| [Demographic Update Event Messages](https://developer.nhs.uk/library/interoperability/demographic-updates) | Specification for demographic events published by the Spine, such as birth notification and demographic change notification. |
| [Digital Child Health](https://developer.nhs.uk/library/interoperability/digital-child-health) | This specification contains the event messages defined by the Digital Child Health program to support the care of children. |
| [National Population Failsafe Management](https://developer.nhs.uk/library/interoperability/national-failsafe) | Specification containing information around the national population failsafe functionality and the event messages the service will publish to the EMS. |
