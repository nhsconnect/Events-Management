---
title: Encounter
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: encounter_1.html
summary: "Guidance and requirements for the Encounter event message"
---

The `encounter` event is a generic event message which represent an encounter between a patient and a practitioner. The event message will be used in a number of different care settings for a variety of different use cases, therefore publishers will have to populate the encounter event message in a way that allows subscribers from any care setting to understand the encounter that took place. Subscribers also need to be aware that they may receive encounter events about encounters which are not relevant to their use case.

The requirements and guidance on this page aims to set out a minimum set of information along with population guidance for the encounter event to allow subscribers from any care setting to understand the type of encounter that are published to the NEMS. The encounter event will contain contextual information about the encounter and define how publishers will share supporting information for the encounter.


## Event Message Content

The `encounter` event is designed to be a [light weight](overview_msg_architecture_event_content.html) event message, which will contain minimal information to describe the encounter that occurred. As outlined on the [Message Content](overview_msg_architecture_event_content.html) page within the `Light Weight Event Messages` section, the supporting information for the event should not be included in the encounter event but rather made available by the publishers via an API and pointed to within the event message. Within the encounter event the pointers to additional information will be included in the form of DocumentReference resources. The DocumentReference resources that are included in the event message will shares the pointer model and retrieval mechanism with those defined by the [National Record Locator](https://developer.nhs.uk/apis/nrl/index.html) service.

The focus of the encounter event message is an `Encounter` resource which will contain elements and references that give context to the event message.

Programs who choose to use this encounter event will define what they want their publishers to populate in the event message and what their subscribers should look out for in the event message to fulfil their use case, but in addition to these program specific requirements all encounter event messages that are published to the NEMS **MUST** also be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page, to make the encounter event message useful and understandable by all subscribers of the event.


## Bundle structure

The event message contains a mandatory `MessageHeader` resource as the first element within the event message bundle as per the FHIR messaging requirements. The MessageHeader resource references an `encounter` resource as the focus of the event message. The encounter resource represents the encounter that happened and should be populated as per the guidance below.

Publishers **MUST** include DocumentReference resources pointing to supporting information, where supporting information is available. Where there is a strong use case for including the supporting information within the event message bundle, it may be include as resources but the event message **MUST** also contain a pointer to where the same data can be retrieved as the consistent method of accessing supporting information. Subscribers **MUST** not expect supporting information to be included as resources within the event message and should assume any data will be included as a pointer to be retrieved when the data is needed.

The diagram below shows the referencing between resources within the encounter message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/generic_encounter.png" target="_blank"><img src="images/messages/generic_encounter.png"></a>
</div>


## Encounter Message Life Cycle ##

The `Encounter` event message is light weight and carries minimal data so the content of the event message is unlikely to change within the publishing system. The information within the publishers system pointed to by the DocumentReference resources is more likely to be updated or changed so the generic encounter event allow publishers to notify subscribers that the data available related to the encounter has been updated using the `messageEventType` extension within the `MessageHeader` resource to indicate `new`, `update` and `delete` in relation to the encounter.

The message event type should be published by publishers as follows:

| Message Event Type | Description |
| --- | --- |
| new | A `new` encounter event should be sent when an encounter occurs between a practitioner and a patient. |
| update | An `update` encounter event message should be sent when any information related to the encounter is updated (contained in the event message or pointed to by the DocumentReference resources within the event message).<br/><br/>The `update` encounter event MUST contain all the information which was shared in the `new` event message, and not just the information which has been updated. Resources should not be removed in the `update` event message if they were present in the `new` event message. If an included resource is incorrect and should not have been included in the event message, it should still be included in the `update` message but the resource should contain the `status` element with the value `entered-in-error` to indicate that it should not be used. Additional resources may be added within an `update` type of event message, for example a new DocumentReference resource may be added if additional information is added to the patient record and associated with the encounter.<br/><br/>Any additional resource and element requirements for update events will be outline in the population guidance below. |
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
| focus | 1..1 | This will reference the "CareConnect-Encounter-1" resource which contains information relating to the encounter that occurred. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The Encounter resource included in the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.tag | 0..* | Tags may be included to give more context to the encounter, such as a clinical pathway the encounter occurred on. Use of this field should be minimised, the primary indicator of the event that took place should be the `type` element within this encounter resource. |
| status | 1..1 | The encounter may carry a status of  `in-progress` or `finished`. The status of `in-progress` should be used where the encounter event is published at the start of the encounter where additional encounter detail will be added at a later date, such as a hospital admission. The status of `finished` should be used when the encounter event is published at the end of an encounter when all data about the encounter is available. |
| identifier | 0..* | The encounter should include a unique identifier to allow the encounter to be recognised between different event messages and other retrieval methods. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. The patient referenced from the encounter resource MUST NOT be changed as part of an `update` version of the same encounter event.  |
| period.start | 1..1 | Then encounter event **MUST** include the dateTime when the encounter started. Partial dates **MUST NOT** be used, both date and time must be include. |
| period.end | 0..1 | Then encounter event **MUST** include the dateTime when the encounter ended if available or calculatable by the publisher. Partial dates **MUST NOT** be used, both date and time must be include. |
| **type** | 1..* | Publishers **MUST** include one or more SNOMED codes to indicate the type of encounter that took place. The "Encounter Type" table below highlights some generic high level SNOMED codes which should be used where appropriate.<br/><br/>The encounter event **MUST** include a type which describes the encounter at a high level but **MAY** also include additional type elements which describing the encounter at a lower level.<br/><br/>For example the encounter might contain a high level  type such as patient `Seen in GP's surgery` and then a low level type giving more context to the encounter such as  a `Maternity booking before 15th week`. |
| participant | 0..* | Publishers **SHOULD** include the participants who were present during the encounter. |


#### Encounter Types

**Preferred High Level Types**

The following high level SNOMED encounter types SHOULD be used in the `encounter` resource `type` element where applicable, but other SNOMED codes may be used where the high level types are not appropriate. Additional SNOMED codes describing the low level type of the encounter MAY also be included in the encounter where applicable.

The purpose of the high level type within the encounter is to allow subscribers from any care setting to understand the encounter to a certain level, where they might not recognise a low level more program specific types within the encounter.

| Code | Description |
| --- | --- |
| 185202000 | Seen in GP's surgery |
| 305907000 | Seen in day hospital |
| 185210004 | Seen in hospital casualty |
| 270420001 | Seen in own home |
| 386472008 | Telephone Consultation |
| 307321000000107 | Video-link encounter |


**Example Low Level Types**

| Code | Description |
| --- | --- |
| 442162000 | Child 6 to 8 week examination |
| 6551000000108 | Maternity booking before 15th week |


### [DocumentReference](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1)

DocumentReference resources **SHOULD** be included in the event message as pointers to endpoints where the subscriber can retrieve information specifically related to the encounter.

The included DocumentReference pointers will conform to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) pointer model using the same classes and types. These DocumentReferences may point to data at different levels of granularity, some may point at an encounter as a whole or may point at specific data such as vaccinations or allergies as defined within the NRL specification. Retrieval of the supporting information using the information in the DocumentReference pointer will use the same mechanisms as required for the [NRL retrieval](https://developer.nhs.uk/apis/nrl/retrieval_overview.html)

The DocumentReference resource(s) included in the event message MUST conform to the requirements in the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) specification and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| context.encounter | 1..1 | A reference to the encounter this document reference pointer is related to. |
