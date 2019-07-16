---
title: Encounter
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: generic_encounter.html
summary: "Guidance and requirements for the Encounter event message"
---

The encounter event is a [light weight](overview_msg_architecture_event_content.html) event which represent an encounter between a patient and a practitioner. The event contains minimal information about the encounter but also include pointers to where supporting information about the encounter can retrieved when required. The pointers included in the `encounter` event message shares the pointer model and retrieval mechanism with those defined by the [National Record Locator](https://developer.nhs.uk/apis/nrl/index.html) service.


## Bundle structure

The event message contains the mandatory `MessageHeader` resource as the first element of the event message as per the FHIR messaging requirements which references an `encounter` resource as the focus of the event message. This encounter resource represents the encounter which happened and should be populated as per the guidance below. The encounter resource references out to a number of different resources which add context to the event and the event message bundle includes `DocumentReference` resource which are the pointers to endpoints where the data about the encounter can be retrieved when needed.

The diagram below shows the referencing between resources within the encounter message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/generic_encounter.png" target="_blank"><img src="images/messages/generic_encounter.png"></a>
</div>


## Encounter Message Life Cycle ##

The `Encounter` event message carries minimal data but to allow publishers to notify subscribers that the data available for an encounter has been updated the encounter event supports the `new`, `update` and `delete` values within the `messageEventType` extension of the `MessageHeader` resource.

The Encounter event message event type should be sent as follows:

| Message Event Type | Description |
| --- | --- |
| new | A `new` encounter event should be sent when an encounter occurs between a practitioner and a patient. |
| update | An `update` encounter event message should be sent when any information included in or pointed to by event message is updated. To allow the information carried in the `new` event message to be linked to the information in the `update` event message the encounter resource `id` MUST be populated with the same value between the new and update versions of the event message. The `update` encounter event MUST contain all the information about the event as it does in the new event message, and not just the information which has been updated. |
| delete | A `delete` encounter event message should be sent when the information included in or pointed to by the event message is incorrect, such as when the event was sent for the wrong patient. |

If a subscriber receives multiple `Encounter` event messages for the same patient, the latest event message as indicated by the `meta.lastUpdated` element within the MessageHeader resource should be considered the source of truth for the patient's correct address.

## Onward Delivery ##

The delivery of the Encounter event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `ENCOUNTER-EVENT-1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance should be followed in addition to the requirements and guidance outlined in the [Generic Requirements](https://developer.nhs.uk/apis/ems-beta/explore_genreic_event_requirements.html) page.


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
| meta.lastUpdated | 1..1 | DateTime when the patient record was updated with the details included in this event message. This element should be used for message sequencing |
| extension(messageEventType) | 1..1 | Fixed value: `new` |
| event | 1..1 | Fixed Value: encounter-1 (Encounter) |
| responsible | 1..1 | This will reference the source organization of the event message. |
| focus | 1..1 | This will reference the "CareConnect-Encounter-1" resource which contains information relating to the event message. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

Tagging with clinical pathway to help differentiate the encounter not just by service type but also set of the clinical pathway, can be ignored if not understood.

The Encounter resource included in the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | The encounter may carry a status of  `in-progress` or `finished`. The status of `in-progress` should be used where the encounter event is published at the start of the encounter where additional encounter detail will be added at a later date, such as a hospital admission. The status of `finished` should be used when the encounter event is published at the end of an encounter when all data about the encounter is available. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| period.start | 1..1 | Then encounter event MUST include the dateTime when the encounter started. |
| period.end | 0..1 | Then encounter event MUST include the dateTime when the encounter ended if available or calculatable by the publisher. |
| type | 0..1 | Publishers **SHOULD** include the type of encounter, such as "Seen in general practitioner surgery" or "Telephone encounter" |
| participant | 0..* | Publishers **SHOULD** include the participants who were present during the encounter. |



### [NRL-DocumentReference-1](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1)

DocumentReference resource(s) **SHOULD** be included by the publisher in the encounter event, pointing the subscriber to an endpoint where they can retrieve the supporting information relating to the  encounter when it is required. These pointers will conform to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) pointer model using the same classes and types. If a subscriber does not act upon an encounter event immediately after it is received then they **SHOULD** retrieve the latest pointers from NRL rather than using the pointers included in the event message as there is a risk that the pointers received in events might become or invalid. Retrieval of the supporting information using the DocumentReference pointer will use the same mechanism as required for the [NRL retrieval](https://developer.nhs.uk/apis/nrl/retrieval_overview.html)


The pointer should point towards the same data models as NRL, there may be processing required by the subscriber to link the encounter to data they can retrieve

**OR**

The pointers should point towards endpoints which only return information which relates to this encounter.


The DocumentReference resource(s) included in the event message SHALL conform to the [NRL-DocumentReference-1](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| context.encounter | 1..1 | A reference to the encounter this document reference pointer is related to. |
