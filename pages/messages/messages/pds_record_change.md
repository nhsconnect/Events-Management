---
title: PDS Record Change
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: pds_record_change.html
summary: "Guidance for the PDS Record Change event message"
---

The `encounter` event is a event message which represent an encounter between a patient and practitioner. The event message will be used in a number of different care settings for a variety of different use cases, therefore subscribers to this event need to be aware that they will receive encounter events which may not be relevant to their use cases.

## Event Message Content


## Bundle structure


## Event Life Cycle ##


## Onward Delivery ##

The delivery of the PDS Record Change event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `PDS_RECORD_CHANGE_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](https://developer.nhs.uk/apis/ems-beta/explore_genreic_event_requirements.html) page.


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
| event | 1..1 | Fixed Value: pds-record-change-1 (Encounter) |

