---
title: Introduction to National Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

{% include important.html content="This specification contains requirements and guidance for the current version of the National Events Management Service (NEMS), for reference the previous major version of the NEMS specification is available [here](https://developer.nhs.uk/apis/ems-beta-previous/)." %}

{% include warning.html content="This site is under active development by NHS Digital, iterative updates to the content may be done on a regular basis. Changes to this specification will be documented on the [Release Notes](overview_release_notes.html) page." %}


<a href="images/overview/overview_message_diagram.png" target="_blank"><img src="images/overview/overview_message_diagram.png"></a>


## Introduction

The National Events Management Service (NEMS) is a national service implemented on the [Spine](https://digital.nhs.uk/services/spine) allowing for patient centric event messages to be published from one system and distributed to a number of other subscriber systems.


The NEMS is designed to be a generic transport mechanism which can support a variety of use cases and event types from a number of different care settings. This specification focuses on the transport mechanism and the event messages structure for events supported by the NEMS:

- [Messaging Architecture](overview_msg_architecture.html)
- [Subscription Management](explore_subscriptions.html)
- [Event Publication](publication_publish.html)
- [Event Receiver Requirements](receiver_requirements.html) 


## NEMS Events

The [Supported Event Messages](overview_supported_events.html) page list the event messages currently supported by the NEMS for publication and subscription. If the event messages currently defined do not meet your needs you can contact us using the details on the [Help & Support](support_contact.html) page to discuss how NEMS could be enhanced to support your use case.

When considering if the NEMS is suitable for a specific use case the following criteria must be met:

- those generating the information don't typically know all those who should receive it.
- those receiving the information don't typically know who has produced it.
- The recipient(s) need to be informed that an event has occurred and can't wait until they next access the patient's record.

Where this criteria cannot be satisfied other complimentary Spine services should be considered as an alternative mechanism for integration. One such service is the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrls/index.html) which is designed to make data sharing possible between different organisations. The NRL is a collection of pointers to patient information within other systems. The pointers within NRL contain the information required to retrieve the patient information from the original source at the point where the information is required.

