---
title: PDS Record Change
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: pds_record_change_1.html
summary: "Guidance for the PDS Record Change event message"
---

The `PDS Record Change` event is intended to notify subscribers that a Spine PDS record associated with an NHS Number they are subscribed to has been changed in some way, so that the subscriber can perform any required tasks such as performing a PDS synchronisation and updating their subscriptions where the change might include a change to the patients NHS number.

This event has been created to reduce the risk of providers have subscriptions to NHS Numbers which have been superseded or where the patients PDS record has been invalidated (an I flag is added to the record). The risk being that if an NHS Number is changed and the providers subscription are not updated the subscriber will stop receiving event messages for that patient, as future event messages will be published against a different NHS Number. This event is intended to notify subscribers that the PDS record has changed and allows them check their record and make sure they have a valid NHS Number for the patient, making any required changes to subscriptions so they don't miss events for that patients in the future.


## Event Message Content

The event message will not contain any detail relating to the change that has been made to the patients PDS record, the event only indicates that the PDS record has changed.

Where the change is related to the patients NHS Number, for example the patients NHS number has been superseded the event will be sent against the previous NHS Number as this will be the NHS Number that providers will have used for their subscriptions.


## Bundle structure

<a href="images/messages/pds_record_change.png" target="_blank"><img src="images/messages/pds_record_change.png"></a>


## Event Life Cycle ##

The `PDS Record Change` event message will always contain a `messageEventType` extension with value `new` in the MessageHeader resource. There will be no `update` or `delete` version of this event message.

The date and time the PDS record was updated will be indicated by the meta.lastUpdated element within the MessageHeader resource.


## Onward Delivery ##

The delivery of the `PDS Record Change` event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `PDS_RECORD_CHANGE_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance will be followed in addition to the requirements and guidance outlined in the [Generic Requirements](https://developer.nhs.uk/apis/ems-beta/explore_genreic_event_requirements.html) page.


### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

The Bundle resource is the container for the event message and SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) FHIR profile.

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| type | 1..1 | Fixed value: `message` |


### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The MessageHeader resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| extension(messageEventType) | 1..1 | Fixed value `new` |
| event | 1..1 | Fixed Value: pds-record-change-1 (PDS Record Change) |

### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

The Organization resource(s) included in the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
|---------|-------------|---------------------|
| identifier.system | 1..1 | Fixed value: https://fhir.nhs.uk/Id/ods-organization-code |
| identifier.value | 1..1 | Organisation's ODS Organization Code |
| name | 1..1 | Organisation's Name |
