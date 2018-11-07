---
title: Event Receiver Requirements
keywords:  messaging, receiver
tags: [fhir,messaging,receiver]
sidebar: overview_sidebar
permalink: receiver_requirements.html
summary: "Requirements for event receivers to consume events published by the NEMS"
---

Currently the only delivery method for sending an event message to a consumer is to send it to the consumer's [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health) mailbox. Other delivery channels may be developed in future if there is a demand for them.

To allow the receivers of event messages to apply receiver behaviours that are common across national messaging specifications, such as the [Transfer of Care](https://developer.nhs.uk/transfer-care-specification-versions) messaging specification, the event message will be enclosed in an ITK3 wrapper when sent via MESH. The ITK3 wrapper adds an option for acknowledgements and errors to be returned if required by the National Events Management Service (NEMS).

## Use of ITK3 wrapper ##

Events are submitted as FHIR messages, and will be wrapped in an ITK3 message distribution FHIR bundle by the National Events Management Service before onward delivery to subscribers. This will use a Bundle as defined in the [ITK3 Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution) specification.

The event bundle itself will be unchanged and is as described on the [Bundle Structure](explore_bundle_structure.html) page, but once wrapped, the bundle structure will be as per the below diagram:

![ITK3 wrapped event bundle](images/receiver/ITK3WrappedEvent.gif)

The original event is shown in green in the above diagram, with the ITK3 wrapper shown in blue.

## ITK3 Acknowledgements and Errors ##

The ITK3 wrapper allows for the sending system to specify if it requires positive acknowledgements and/or errors responses to be returned, along with the information required to make these acknowledgments.

There are currently no requirements defined for the National Events Management Service to receive or act upon failures in consuming systems, but there may be a business need to allow additional tracking for specific events. To allow for this additional tracking of events receiving systems **MUST** implement the receiver behaviours defined in the [ITK3 Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution) specification.
