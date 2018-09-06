---
title: Event Receiver Requirements
keywords:  messaging, receiver
tags: [fhir,messaging,receiver]
sidebar: overview_sidebar
permalink: receiver_requirements.html
summary: "Requirements for event receivers to consume events published by the EMS"
---

## Use of ITK3 wrapper ##

Events are submitted as FHIR messages, and will be wrapped in an ITK3 message distribution FHIR bundle by the Events Management Service before onward delivery to subscribers. This will use a Bundle as defined in the [ITK3 Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution/) specification.

The event bundle itself will be unchanged and is as described on the [Bundle Structure](explore_bundle_structure.html) page, but once wrapped, the bundle structure will be as per the below diagram:

![ITK3 wrapped event bundle](images/receiver/ITK3WrappedEvent.gif)

The original event is shown in green in the above diagram, with the ITK3 wrappers shown in blue.

## ITK3 Acknowledgements and Errors ##

The reason that the Spine will wrap the message in an ITK3 wrapper is to allow receivers of events to apply receiver behaviours to event messages that are common across other national messaging specifications such as the [Transfer of Care](https://developer.nhs.uk/transfer-care-specification-versions/) messaging.

A key use-case for this is to allow for both positive aknowledgements and errors to be returned to the Events Management Service.

{% include important.html content="There are currently no requirements defined for the Events Management Service to recieve or act upon failures in subscribing systems. For this reason, the ITK3 wrappers will currently always specify that NO acknowledgements or errors should be returned to the Events Management Service. In future there may be a business need to allow this additional tracking for specific events, so subscribers MUST implement the receiver behaviours defined in the [ITK3 Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution/) specification so they are able to return these responses if requested in future." %}

