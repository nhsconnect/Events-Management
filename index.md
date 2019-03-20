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

- [Messaging Architecture](overview_msg_architecture.html)
- [Subscription Management](explore_subscriptions.html)
- [Event Publication](publication_publish.html)
- [Event Receiver Requirements](receiver_requirements.html) 

The specific event messages which have been defined for use through the NEMS can be found in the Event Message Implementation Guides listed below. If the event messages currently defined do not meet your needs you can contact us using the details on the [Help & Support](support_contact.html) page to discuss how NEMS could be enhanced to meet your requirements.


## NEMS Events

The [Supported Event Messages](overview_supported_events.html) page list the event messages currently supported by the NEMS for publication and subscription. When considering if the NEMS is suitable for a specific use case the following guidelines are generally followed.

### Events

The NEMS is designed to allow a provider to share that an event has occurred for a patient, without knowing who might be interested in that information. The NEMS is intended for use where an event may result in immediate action by another provider. 

**For example:**
1. A patient is admitted to hospital and as a result of their registration within the hospital system an 'Admission' event is sent to the NEMS.
2. A subscriber to the 'Admission' event is a health visitor service who provides care for that patient, therefore the NEMS forwards the 'Admission' event to the health visiting service.
3. When the health visiting service receives the 'Admission' event they can make appropriate changes to scheduled home visits with that patient while they are in hospital and make better use of the health visitors time.

This is the sort of use cases that would be considered an event and a suitable use of the NEMS.

### None Events

Where a provider records an encounter or information about a patient and the information would be useful for other providers to have access to, but where that data is not identified as something which would result in immediate action by another provider, this would not be considered an event or appropriate for sharing over the NEMS. There is complimentary Spine service along side the NEMS on Spine called the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrls/index.html) which is designed to help make this data sharing possible. The NRL is a collection of pointers to patient information within other systems. These pointers within NRL contain the information required to retrieve the patient information from the original source when it is required.

