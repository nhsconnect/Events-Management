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

The ITK3 wrapper allows for the sending system to specify if it requires positive acknowledgements and/or errors responses to be returned, along with the information required to make these acknowledgements.

There are currently no requirements defined for the National Events Management Service to receive or act upon failures in consuming systems, but there may be a business need to allow additional tracking for specific events. To allow for this additional tracking of events receiving systems **SHOULD** implement the receiver behaviours defined in the [ITK3 Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution) specification.


## MESH mailbox configuration ##

The receiving MESH mailbox will need to be configured for each event message types the organisation wishes to receive from the NEMS. Each event message has its own WorkflowID as specified in the event message [implementation guides](index.html), within the specific event message guidance. Configuration of the MESH mailbox will require a service request to be sent to the MESH management team at NHS Digital.

If the subscribing organisation wishes to use generic subscriptions, the request for setup of generic subscriptions should be submitted in addition to the request for creation or update of the MESH mailbox. Details of the information required to create generic subscriptions is outlined in the `Requesting generic subscriptions` section below.


### Requesting generic subscriptions:

As part of the Private Beta NHS Digital intends to validate the generic subscription functionality by working closely with suppliers and providers to identify and configure their generic subscriptions. As part of this collaborative approach, during private beta, an interim process for submitting generic subscriptions has been implemented as follows:

1. providers start by downloading and completing the "Request Generic Subscriptions" spreadsheet
2. once complete the provider needs to raise an NHS Digital service desk issue asking for the generic subscriptions to be configured
3. NHS digital will validate and configure the generic subscriptions with the NEMS

The intention is to use this process during the Private Beta but an improved process is planned as part of the wider roll out of NEMS service.


More details relating to the columns within the spreadsheet are as follows:

| Column | Required | Description |
| --- | --- | --- |
| ServiceType | Mandatory | The following ServiceTypes are available for generic subscriptions: <br/><br/>**GP_GP_GP** - When you are a GP practice and wish to receive event messages for patients registered at your GP Practice. <br/><br/>**UHV_POSTCODE_LACODE** - When you are a health visitor service and you wish to recieve event messages for patients where their postcode is in the catchment area of your Local Authority. <br/><br/>**CHO_GP_CCG** - When you are a Child Health Organization and you wish to receive event messages for patients where their registered GP is in the catchment area of you CHO's CCG. <br/><br/>**CHO_POSTCODE_CCG** - When you are a Child Health Organization and you wish to receive event messages for patients where the patients post code is in the catchment area of your CHO's CCG. |
| EventType | Mandatory | The event types which should be sent using this generic subscription. |
| idCode | Mandatory | LA Code, CCG code |
| ServiceProviderID | Mandatory | ODS code of the receiving organization. |
| MESH Mailbox | Mandatory | Indication of if a new MESH mailbox is required or if the events for this generic subscription should be sent to an existing MESH mailbox. For an existing mailbox please include the mailbox ID, for a new mailbox include the word "New Mailbox" and a number. The number is so that if you want to setup multiple generic subscription rules which go to different mesh mailboxes, you can indicate which mesh mailbox you want the event messages to go to, e.g. "New Mailbox1", "New Mailbox2". |
| fromAge | Optional | Youngest age of patients in years. |
| toAge | Optional | Oldest age of patient in years. This is inclusive so if the `toAge` is set to 19, event messages will be sent for patients up to 19 Years and 364 Days old. |
| fromDate | Optional | Date when you wish the generic subscription rule to start sending event messages to the MESH mailbox. |
| toDate | Optional | Date when you wish the generic subscription rule to stop sending event messages to the MESH mailbox. |


