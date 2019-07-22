---
title: Encounter
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: encounter_1.html
summary: "Guidance and requirements for the Encounter event message"
---

The `encounter` event is a [light weight](overview_msg_architecture_event_content.html) event which represent an encounter between a patient and a practitioner. The event contains minimal information about what happened during the encounter but the event message can include DocumentReference resources which are pointers to where more information about the encounter can retrieved when required by the subscriber. The pointers included in the `encounter` event message shares the pointer model and retrieval mechanism with those defined by the [National Record Locator](https://developer.nhs.uk/apis/nrl/index.html) service.


## Bundle structure

The event message contains a mandatory `MessageHeader` resource as the first element of the event message as per the FHIR messaging requirements which references an `encounter` resource as the focus of the event message. This encounter resource represents the encounter that happened and should be populated as per the guidance below.

The `encounter` resource references out to a number of other resources which add context to the encounter within the event message. The event message also includes `DocumentReference` resources which are the pointers to endpoints exposed by the provider where the data, including additional clinical data, about the encounter can be retrieved when needed by the subscriber. The encounter event may contain additional resources containing supporting information for the encounter but should not be expected by subscribers. The diagram below shows the referencing between resources within the encounter message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/generic_encounter.png" target="_blank"><img src="images/messages/generic_encounter.png"></a>
</div>


## Encounter Message Life Cycle ##

The `Encounter` event message is light weight and carries minimal data so the content of the event message is unlikely to change within the publishing system. The information within the publishers system pointed to by the DocumentReference resources is more likely to be updated or changed so the generic encounter event allow publishers to notify subscribers that the data available has been updated using the `messageEventType` extension within the `MessageHeader` resource to indicate `new`, `update` and `delete` in relation to the encounter.

The message event type should be published by publishers as follows:

| Message Event Type | Description |
| --- | --- |
| new | A `new` encounter event should be sent when an encounter occurs between a practitioner and a patient. |
| update | An `update` encounter event message should be sent when any information related to the encounter is updated (contained in the event message or pointed to by the event message DocumentReference).<br/><br/>The `update` encounter event MUST contain all the information which was shared in the `new` event message, and not just the information which has been updated. Resources should not be removed in the `update` event message if they were present in the `new` event message. If an included resource is incorrect and should not have been included in the event message, it should still be included in the `update` message but the resource should contain the `status` element with the value `entered-in-error` to indicate that it should not be used. |
| delete | A `delete` encounter event message should be sent when the event message was sent incorrectly and should not have been sent, such as when the event was sent for the wrong patient. All resources should still be included in the event message. If a `delete` type of event is sent for an encounter event this MUST not be followed by any `update` type events for the same encounter. |

If a subscriber receives multiple `Encounter` event messages for the same patient, the latest event message as indicated by the `meta.lastUpdated` element within the MessageHeader resource should be considered the source of truth for the patient's correct address.


## Onward Delivery ##

The delivery of the Encounter event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `ENCOUNTER_1` |


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
| extension(messageEventType) | 1..1 | Value as per the "Encounter Message Life Cycle" table above |
| event | 1..1 | Fixed Value: encounter-1 (Encounter) |
| responsible | 1..1 | This will reference the source organization of the event message. |
| focus | 1..1 | This will reference the "CareConnect-Encounter-1" resource which contains information relating to the event message. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The Encounter resource included in the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.tag | 0..* | Tags may be included to give more context to the encounter, such as a clinical pathway the encounter occurred on. Use of this field should be minimal and the `type` element should be the primary indicator of the event that took place. |
| status | 1..1 | The encounter may carry a status of  `in-progress` or `finished`. The status of `in-progress` should be used where the encounter event is published at the start of the encounter where additional encounter detail will be added at a later date, such as a hospital admission. The status of `finished` should be used when the encounter event is published at the end of an encounter when all data about the encounter is available. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| period.start | 1..1 | Then encounter event **MUST** include the dateTime when the encounter started. |
| period.end | 0..1 | Then encounter event **MUST** include the dateTime when the encounter ended if available or calculatable by the publisher. |
| type | 1..* | Publishers **MUST** include one or more SNOMED codes to indicate the type of encounter that took place. The "Encounter Type" table below highlights some generic SNOMED codes which should be used where possible.<br/><br/>The encounter event should include types describing the encounter at different levels, starting at a generic level such as patient `seend in own home` and then more specific type(s) which describe the encounter, such as . |
| participant | 0..* | Publishers **SHOULD** include the participants who were present during the encounter. |


#### Encounter Types

The following SNOMED encounter types SHOULD be included in the `encounter` resource `type` element where appropriate. Other SNOMED codes may also be used in addition to these codes where appropriate.

**High level types**

| Code | Description |
| --- | --- |
| | GP Surgery Attendance |
| | Hospital Attendance |
| | Home Visit |
| | Telephone Consultation |
| | Video Call Consultation |


**Example Low level types**

| Code | Description |
| --- | --- |
| 442162000 | Child 6 to 8 week examination |
| 6551000000108 | Maternity booking before 15th week |



### [DocumentReference](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1)

DocumentReference resource(s) **SHOULD** be included in the event message by publishers. The DocumentReference MUST point to an endpoint where the subscriber can retrieve information specifically about the encounter contained within the event. Document references may point to data at different levels of granularity, they may point at an encounter as a whole or may point at specific data such as vaccinations or allergies.

Included DocumentReference pointers will conform to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) pointer model using the same classes and types. If a subscriber does not act upon an encounter event immediately after it is received then they **SHOULD** retrieve the latest pointers from NRL rather than using the pointers included in the event message to make sure the subscriber has all the latest available information for the patient. Retrieval of the supporting information using the information in the DocumentReference pointer will use the same mechanisms as required for the [NRL retrieval](https://developer.nhs.uk/apis/nrl/retrieval_overview.html)

The DocumentReference resource(s) included in the event message SHALL conform to the requirements in the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) specification and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| context.encounter | 1..1 | A reference to the encounter this document reference pointer is related to. |
