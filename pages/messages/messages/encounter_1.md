---
title: Encounter
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: encounter_1.html
summary: "Guidance and requirements for the Encounter event message"
---

The `encounter` event is a generic event message which represent an encounter between a patient and a practitioner. The event message will be used in a number of different care settings for a variety of different use cases, therefore publishers should populate the encounter event message in a way that allows subscribers from any care setting to understand the encounter that took place. Subscribers also need to be aware that they will receive encounter events about encounters which are not relevant to their use cases.

## Event Message Content

The `encounter` event is designed to be a [linked data](overview_msg_architecture_event_content.html) event message, which will contain minimal information to describe the encounter that occurred. As described on the [Message Content](overview_msg_architecture_event_content.html) page within the `Linked Data Event Messages` section, the supporting information for the event should not be included in the encounter event but rather made available by the publishers via an API and pointed to from the event message. Within the encounter event the pointers to additional information will be included in the form of DocumentReference resources. The DocumentReference resources that are included in the event message will shares the pointer model and retrieval mechanism with those defined by the [National Record Locator](https://developer.nhs.uk/apis/nrl/index.html) service.

The focus of the encounter event message is an `Encounter` resource which will contain elements and references that give context to the event message.

Programs who choose to use this encounter event will define what they want their publishers to populate in the event message and what their subscribers should look out for in the event message to fulfil their use case, but in addition to these program specific requirements all encounter event messages that are published to the NEMS **MUST** also be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page, to make the encounter event message useful and understandable by all subscribers of the event type.


## Bundle structure

The event message contains a mandatory `MessageHeader` resource as the first element within the event message bundle as per the FHIR messaging requirements. The MessageHeader resource references an `encounter` resource as the focus of the event message. The encounter resource represents the encounter that happened and should be populated as per the guidance below.

Publishers **MUST** include DocumentReference resources pointing to supporting information, where supporting information is available. Where there is a strong use case for including the supporting information within the event message bundle, it may be include as resources but the event message **SHOULD** also contain a pointer to where the same data can be retrieved as the consistent method of accessing supporting information.

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="logicalModelTab">Logical Model</span>
		<span class="tabHeading" id="fhirModelTab">FHIR Model</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="logicalModelTabBody">
			The diagram below shows the logical model of data in the event message:
			<div style="text-align:center; margin-bottom:20px" >
				<a href="images/messages/generic_encounter_logical.png" target="_blank"><img src="images/messages/generic_encounter_logical.png"></a>
			</div>
		</div>

		<div class="tabBody" id="fhirModelTabBody">
			The diagram below shows the referencing between resources within the encounter message bundle:
			<div style="text-align:center; margin-bottom:20px" >
				<a href="images/messages/generic_encounter.png" target="_blank"><img src="images/messages/generic_encounter.png"></a>
			</div>
		</div>
		
	</div>
</div>


## Encounter Message Life Cycle ##

The `Encounter` event message is light weight and carries minimal data so the content of the event message is unlikely to change within the publishing system. There is still a chance the information within the event message will changed so the generic encounter event will support using the `messageEventType` extension within the `MessageHeader` resource to indicate `new`, `update` and `delete` versions of the event message when they are required.

The different types of the encounter event message should be published by publishers as follows:

| Message Event Type | Description |
| --- | --- |
| new | A `new` encounter event should be sent when the encounter occurs. |
| update | An `update` encounter event message should be sent when information related to the encounter event is updated. |
| delete | A `delete` encounter event message should be sent when the encounter event message should not be used by subscribers, such as when the event sent incorrectly and should not have been sent. |


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
| extension(messageEventType) | 1..1 | Value as per the "Encounter Message Life Cycle" table above |
| event | 1..1 | Fixed Value: encounter-1 (Encounter) |
| responsible | 1..1 | This will reference the source organization of the event message. |
| focus | 1..1 | This will reference the "CareConnect-Encounter-1" resource which contains information relating to the encounter that occurred. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The Encounter resource included in the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| period.start | 0..1 | Then encounter event **SHOULD** include the dateTime when the encounter started. |
| period.end | 0..1 | Then encounter event **SHOULD** include the dateTime when the encounter ended if available or calculatable by the publisher. |
| **type** | 0..* | The `type` element within the encounter **SHOULD** be used to identify the type of encounter which took place. |
| participant | 0..* | Publishers **SHOULD** include the participants who were present during the encounter. |


### [DocumentReference](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1)

DocumentReference resources **SHOULD** be included in the event message as pointers to endpoints where the subscriber can retrieve information specifically related to the encounter.

The included DocumentReference pointers will conform to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) pointer model using the same classes and types. These DocumentReferences may point to data at different levels of granularity, some may point at an encounter as a whole or may point at specific data such as vaccinations or allergies as defined within the NRL specification. Retrieval of the supporting information using the information in the DocumentReference pointer will use the same mechanisms as required for the [NRL retrieval](https://developer.nhs.uk/apis/nrl/retrieval_overview.html)

The DocumentReference resource(s) included in the event message MUST conform to the requirements in the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) specification and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| context.encounter | 1..1 | A reference to the encounter this document reference pointer is related to. |
