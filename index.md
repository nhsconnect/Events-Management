---
title: Introduction to National Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the functional requirements for the National Events Management Service, and remains subject to review. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. Changes to this specification following the initial beta release will be documented in the [Release Notes](overview_release_notes.html) section." %}


<a href="images/overview/overview_message_diagram.png" target="_blank"><img src="images/overview/overview_message_diagram.png"></a>


## Introduction

The National Events Management Service (NEMS) is a national service implemented on the [Spine](https://digital.nhs.uk/services/spine) allowing for patient centric event messages to be published from one system and distributed to a number of other subscriber systems.


The NEMS is designed to be a generic transport mechanism which can support a variety of use cases and event types from a number of different care settings. This specification focuses on the transport mechanism and the common event message elements:

- [Messaging Architecture](explore_msg_architecture_overview.html)
- [Subscription Management](explore_subscriptions.html)
- [Event Publication](publication_requirements.html)
- [Event Receiver Requirements](receiver_requirements.html) 

The specific event messages which have been defined for use through the NEMS can be found in the Event Message Implementation Guides listed below. If the event messages currently defined do not meet your needs you can contact us using the details on the [Help & Support](support_contact.html) page to discuss how NEMS could be enhanced to meet your requirements.

## Event Message Implementation Guides

| Implementation Guide | Description | Date Events Available |
| --- | --- | --- |
| [Demographic Update Event Messages](https://developer.nhs.uk/apis/demographicupdates-beta/) | Specification for demographic events published by the Spine, such as birth notification and demographic change notification. | March 2019 |
| [Digital Child Health](https://developer.nhs.uk/apis/dch-beta/) | This specification contains the event messages defined by the Digital Child Health program to support the care of children. | May 2019 to<br/>TBC 2020<br/>(see guide for specific events) |
| [National Population Failsafe Management](https://developer.nhs.uk/apis/npfm-beta/) | Specification containing information around the national population failsafe functionality and the event messages the service will publish to the EMS. | TBC 2019 |

The `Date events available` column in the table is the date when the events specified within the implementation guide will be supported by the NEMS. This date does not indicate that suppliers will be publishing the event messages, only that the NEMS will accept the event message from the publishers and will distribute the event messages to the subscribers. The dates included are indicative of the current timeline for development but may change depending on priorities and feedback during development.

Implementation guides such as `Digital Child Health` which contain a large number of events may be implemented incrementally. Events will be released for use once they have been implemented within the NEMS, while other event messages are still being developed. The Event Message Implementation Guides will contain specific detail around development and release dates for the individual event messages which are part of an incremental release process.

