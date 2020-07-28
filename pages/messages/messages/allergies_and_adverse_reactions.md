---
title: Allergies and Adverse Reactions
keywords:  messaging, bundles, allergies, adverse, reactions
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: allergies_and_adverse_reactions.html
summary: "The FHIR profiles used for the Allergies and Adverse Reactions Event Message Bundle"
---

## Event Message Content

The `Allergies and Adverse Reactions` event message represents .................

All "Allergies and Adverse Reactions" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page.








## Bundle structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references a `Immunization` resource as the focus of the event message. The `Immunization` represents the vaccination that was given or not given to the patient.


The diagram below shows the referencing between FHIR resources within the event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/vaccinations_1.png" target="_blank"><img src="images/messages/vaccinations_1.png"></a>
</div>


## Event Life Cycle ##

The `MessageHeader` resource contains the `messageEventType` extension which represents the action the event message represents at a resource level, for example the `Vaccination` being shared is new, the `Vaccination` or supporting resources have been updated or the `Vaccination` has been deleted. The `messageEventType` extension shall contain a values as per the table below:

| Value | Description |
| --- | --- |
| new |  The `new` value must be used when the Vaccination is being shared for the first time. |
| update | The `update` value must be used when the Vaccination and supporting resources have previously been shared, but have been updated and the updated resources are being shared. |
| delete | The `delete` value must be used when the Vaccination record has been deleted and the record no longer exists. |

### Identifying Information

To allow subscribers to identify information between `new`, `update` and `delete` event messages the publisher must:

- publish a complete event message for all event types
- included identifiers within resources which are maintained between different event messages

### Message Sequencing

As vaccinations shared using the vaccinations event message may change and therefore `new`, `update` and `delete` types of the event are supported. To allow a consumer to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.


## Onward Delivery ##

The delivery of the `Vaccinations` event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `VACCINATIONS_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](explore_genreic_event_requirements.html) page.

## Resource Mapping Overview  ##

| DCH Data Item           | FHIR resource element                                            | Description                                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date/Time Recorded      | CareConnect-AllergyIntolerance-1.assertedDate                    |                                                                                                                                                                                                                                                                                                                                                                  |
| Causative Agent         | CareConnect-AllergyIntolerance-1.code                            | Where a SNOMED CT code for a Causative Agent is not available, then code.text should be used to contain a text representation of the Causative Agent                                                                                                                                                                                                             |
| Description of Reaction | CareConnect-AllergyIntolerance-1.reaction.manifestation.coding   | When no code manifestation coded value is available, a description of the manifestation should be entered in manifestation.code.text                                                                                                                                                                                                                             |
| Type of Reaction        | CareConnect-AllergyIntolerance-1.type                            |                                                                                                                                                                                                                                                                                                                                                                  |
| Certainty               | CareConnect-AllergyIntolerance-1.verficationStatus               | Use the mapping defined in the verificationStatus valueSet (http:hl7.org/fhir/ValueSet/allergy-verification-status) to find the actual values to flow. When no code for certainty is available (or a more detailed certainty description is needed), a free text representation in CareConnect-AllergyIntolerance-1.note should be sent*                         |
| Severity                | CareConnect-AllergyIntolerance-1.reaction.manifestation.severity | Use the mapping defined in the CareConnect-ReactionEventServerity-1 valueSet (http:hl7.org/STU3/ValueSet/CareConnect-ReactionEventSeverity-1) to find the actual values to flow. When no code for severity is available (or a more detailed severity description is needed), a free text representation in CareConnect-AllergyIntolerance-1.note should be sent* |
| Evidence                | CareConnect-AllergyIntolerance-1.note*                           |                                                                                                                                                                                                                                                                                                                                                                  |
| Date First Experienced  | CareConnect-AllergyIntolerance-1.onset                           |                                                                                                                                                                                                                                                                                                                                                                  |
| Comment                 | CareConnect-AllergyIntolerance-1.note*                           |                                                                                                                                                                                                                                                                                                                                                                  |


### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| type | 1..1 | Fixed value: message |

### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The Event-MessageHeader-1 resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| extension(messageEventType) | 1..1 |  |
| event | 1..1 | Fixed Value: ‘allergies-and-adverse-reactions-1 \| Allergies and Adverse Reactions’ |
| responsible | 1..1 | This will reference the responsible Organization resource |
| focus | 1..1 | This will reference the CareConnect-Encounter-1 resource which contains information relating to the event message. |

### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

The CareConnect-Organization-1 resource included as part of the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier.system | 1..1 | Fixed value: https://fhir.nhs.uk/Id/ods-organization-code |
| identifier.value | 1..1 | Organisation’s ODS Organization Code |
| name | 1..1 | Organisation’s Name |


### [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1)

The CareConnect-HealthcareService-1 resource included as part of the event message SHALL conform to the [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | This will reference the ‘sender’ organization of the event message. |
| type | 1..1 | This will represent the type of service responsible for the event message. This will have a fixed value from the ValueSet [CareConnect-CareSettingType-1](https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-CareSettingType-1) |
| specialty | 1..1 | HealthcareService.specialty SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1 |


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The CareConnect-Patient-1 resource included as part of the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the nhsNumber identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the official name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The CareConnect-Encounter-1 resource included as part of the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Encounter.type.coding(childHealthEncounterType) | 1..1 | Encounter.type.coding(childHealthEncounterType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ChildHealthEncounterType-1 |
| Encounter.reason.coding(snomedCT) | 1..1 | Encounter.reason.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AdmissionReason-1 |
| serviceProvider | 1..1 | This will reference the Organisation resource hosting the Encounter |
| location | 1..1 | This will reference the Encounter's Location |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |


### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The CareConnect-Location-1 resource included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 |



### [CareConnect-AllergyIntolerance-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1)

The CareConnect-AllergyIntolerance-1 resource included as part of the event message SHALL conform to the [CareConnect-AllergyIntolerance-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| patient | 1..1 | This will reference the patient resource representing the subject of this event |


## Examples

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="new-given">New (Given)</span>
		<span class="tabHeading" id="new-notgiven">New (Not Given)</span>
		<span class="tabHeading" id="update">Update</span>
		<span class="tabHeading" id="delete">Delete</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="new-givenBody" markdown="span">
			```{% include_relative examples/vaccinations-1-new.xml %}```
		</div>
		
		<div class="tabBody" id="new-notgivenBody" markdown="span">
			```{% include_relative examples/vaccinations-1-notgiven-new.xml %}```
		</div>
		
		<div class="tabBody" id="updateBody" markdown="span">
			```{% include_relative examples/vaccinations-1-update.xml %}```
		</div>
		
		<div class="tabBody" id="deleteBody" markdown="span">
			```{% include_relative examples/vaccinations-1-delete.xml %}```
		</div>
		
	</div>
</div>