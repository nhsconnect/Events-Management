---
title: Newborn Hearing
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: newborn_hearing_1.html
summary: "The FHIR profiles used for the Newborn Hearing Event Message Bundle"
---


## Event Message Content

The `Newborn Hearing` event message represents a record of a Newborn Hearing test in relation to a patient. Either creation, an update or deletion of the record.

All "Newborn Hearing" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_generic_event_requirements.html) page. Where requirements on this page contradict the requirements on the Generic Event Message Requirements page, then the requirements on this page take precedence.


## Bundle Structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references a `Encounter` resource as the focus of the event message. The test procedures, results and comment are linked to this encounter focus resource within the event message.

The diagram below shows the referencing between FHIR resources within the event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/newborn_hearing_bundle.png" target="_blank"><img src="images/messages/newborn_hearing_bundle.png"></a><br/>
	Newborn Hearing Bundle
	
	<a href="images/messages/newborn_hearing_result_concept.png" target="_blank"><img src="images/messages/newborn_hearing_result_concept.png"></a><br/>
	Procedure and Outcome Concept
</div>


## Event Life Cycle ##

The `MessageHeader` resource contains the `messageEventType` extension which represents the action the event message represents at a resource level, for example the `Newborn Hearing` results being shared are new or have been updated, or the `Newborn Hearing` results have been deleted. The `messageEventType` extension shall contain a values as per the table below:

| Value | Description |
| --- | --- |
| new | The `new` value must be used when the `Newborn Hearing` is being shared for the first time, or is being shared because of an `update` to the information. |
| update | A value of `update` **will not** be used for this type of event due to the way the Newborn Hearing is recorded and managed within the current National Screening Service, a value of **new** shall be used instead. |
| delete | The `delete` value must be used when the Newborn Hearing record has been deleted and the record no longer exists. |


### Identifying Information

To support the event life cycle outlined above the following requirements MUST be followed:

- For `new` and `update` type event messages, all procedures, results and other information MUST be included within each of the event messages.

- The information included in the `Newborn Hearing` event message should be treated as atomic and stored under the `identifier` included within focus `CareConnect-Encounter-1` resource. Where a `new` type event message is received with the same `identifier` the previous information should be overwritten with the information in the later event message as identified by the `MessageHeader.meta.lastUpdated` element within the event message.

- In a `delete` type event message the event message should be populated with the payload of the original new (or update) message where possible, to allow for additional validation of the information being removed. Where this is not possible the event message SHALL including, as a minimum, the `MessageHeader` resource and the focus `CareConnect-Encounter-1` resource. It is important that the `CareConnect-Encounter-1` resource includes the relevant `identifier` element, as included in new (or update) event messages so the subscriber can identify the `Newborn Hearing` that the delete relates to.


### Message Sequencing

As the Newborn Hearing may change in the source system, this would be represented by multiple `new`, `new (update)` and `delete` type event messages being published. To allow a subscribers to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.


## Onward Delivery ##

The delivery of the `Newborn Hearing` event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `NEWBORNHEARING_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](explore_generic_event_requirements.html) page.

## Resource Mapping Overview  ##

| Element Name                                               | FHIR resource element                                            | Description                                                                                                                                  |
|------------------------------------------------------------|------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Date/Time                                                  | CareConnect-Encounter-1.period.start                             | The start date of the encounter in which the screening test took place                                                                                                       |
| Location                                                   | CareConnect-Location-1.identifier                                | The location that is recorded as to where the newborn hearing screening examination took place                                               |
| Performing Professional                                    | CareConnect-Practitioner-1.name                                  | The name of the Healthcare Professional responsible for the person                                                                           |
| SDS Job Role Name                                          | CareConnect-PractitionerRole-1.codeableConcept                   | The professional role that the Healthcare Professional has in relation to the person (e.g. Nursery Nurse, Health Visitor, School Nurse etc.) |
| Hearing Test Result                                        | CareConnect-Procedure-1.outcome                                  | The outcome of the individual screening test performed                                                                                       |
| CareConnect-Procedure-1.Procedure.outcome.coding(snomedCT) |                                                                  |                                                                                                                                              |
| Summary Outcome                                            | CareConnect-Observation-1.valueCodeableConcept                   | Overall outcome of the newborn hearing screening                                                                                             |
| Comments                                                   | CareConnect-Communication-1.Communication.category.coding.system | Supporting text may be given covering regarding the screening test, outcome and actions taken.                                               |

### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

The Bundle resource included as part of the event message SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 1..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| type | 1..1 | Fixed value: message |


### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The Event-MessageHeader-1 resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 1..1 (delete) |

| Element | Cardinality `new` | Cardinality `delete` | Additional Guidance |
| --- | --- | --- | --- |
| extension(routingDemographics) | 1..1 | 1..1 | The extension MUST contain the details of the patient who is the focus of this event message. |
| extension(routingDemographics)<br>**.extension(nhsNumber)** | 1..1 | 1..1 | The extension MUST contain the patient’s NHS Number identifier and is used by the NEMS for routing event messages to subscribers. |
| extension(routingDemographics)<br>**.extension(name)** | 1..1 | 0..1 | The extension MUST contain the human name element containing the patient’s official given and family names as recognised by PDS, and match the NHS number in the routingDemographics extension. |
| extension(routingDemographics)<br>**.extension(birthDateTime)** | 1..1 | 0..1 | The extension MUST contain the patient’s Date Of Birth which matches the NHS number in the routingDemographics extension. |
| meta.lastUpdated | 1..1 | 1..1 | Message Sequencing - A FHIR instant (time stamp with sub-second accuracy) which represents the point in time that the change occurred which should be used for ordering messages for processing. |
| extension(eventMessageType) | 1..1 | 1..1 | See the “Event Life Cycle” section above. |
| event | 1..1 | 1..1 | Fixed Value: ​newborn-hearing-1 (Newborn Hearing) |
| focus | 1..1 | 1..1 | The focus element will reference the CareConnect-Encounter-1 resource which contains information relating to the event message. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The CareConnect-Encounter-1 resource included as part of the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 1..1 (delete) |

| Element | Cardinality `new` | Cardinality `delete` | Additional Guidance |
| --- | --- | --- | --- |
| identifier | 1..1 | 1..1 | A publisher defined unique identifier for the Newborn Hearing which will be maintained across different event messages to allow subscribers to identify the information within subsequent new (i.e. updated) or delete event messages. |
| Encounter.type.coding(childHealthEncounterType) | 1..1 | 0..1 | Encounter.type.coding(childHealthEncounterType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ChildHealthEncounterType-1 |
| Encounter.reason.coding(snomedCT) | 0..1 | 0..1 | Encounter.reason.coding(snomedCT) SHOULD use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AdmissionReason-1 |
| serviceProvider | 1..1 | 0..1 | This will reference the Organisation resource hosting the Encounter |
| location |  0..1 | 0..1 | This will reference the Encounter's Location |
| subject | 1..1 | 0..1 | This will reference the patient resource representing the subject of this event |
| period.start | 1..1 | 0..1 | The start date of the encounter in which the screening test took place |


### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

The CareConnect-Organization-1 resource included as part of the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier.system | 1..1 | Fixed value: https://fhir.nhs.uk/Id/ods-organization-code |
| identifier.value | 1..1 | Organisation’s ODS Organization Code |
| name | 1..1 | Organisation’s Name |


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The CareConnect-Patient-1 resource included as part of the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the nhsNumber identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the official name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |


### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The CareConnect-Location-1 resource included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |



### [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)

The CareConnect-Practitioner-1 resource included as part of the event message SHALL conform to the [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |



### [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)

The CareConnect-PractitionerRole-1 resource included as part of the event message SHALL conform to the [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| organization | 1..1 | This will reference the Organization resource responsible for the event |
| practitioner | 1..1 | This will reference the Practitioner resource responsible for the event |
| PractitionerRole.code(careProfessionalType) | 1..1 | PractitionerRole.code(careProfessionalType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1 |



### [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1)

The CareConnect-HealthcareService-1 resource included as part of the event message SHALL conform to the [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | This will reference the ‘sender’ organization of the event message. |
| type | 1..1 | This will represent the type of service responsible for the event message. This will have a fixed value from the ValueSet [CareConnect-CareSettingType-1](https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-CareSettingType-1) |
| specialty | 1..1 | HealthcareService.specialty SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1 |



### [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1)

The CareConnect-Procedure-1 resource included as part of the event message SHALL conform to the [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..6 Required (new) | 0..6 Required (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |

For each of the Procedure resources representing a Test Outcome:

### CareConnect-Procedure-1 (AABR Hearing Test)

| Resource Cardinality | 0..2 Required | Two occurrences of this resource are required, one for each ear |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 413083006 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Automated auditory brainstem response test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AABRHearingTest-Outcome-1 |


### CareConnect-Procedure-1 (AOAE  Hearing Test)

| Resource Cardinality | 0..4 Required | Up to four occurrences of this resource are required, with two for each test performed (one for each ear) |


| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 446077009 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Automated otoacoustic emission test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AOAEHearingTest-Outcome-1 |


### [CareConnect-Observation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Observation-1) (Hearing Screening Summary Outome)

The CareConnect-Observation-1 resource included as part of the event message SHALL conform to the [CareConnect-Observation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Observation-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | The Hearing Screening Summary Outome observation will reference the patient resource. |
| Observation.valueCodeableConcept | 1..1 | Observation.valueCodeableConcept SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-HearingScreeningOutcome-1 |


### [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1)

The CareConnect-Communication-1 resource included as part of the event message SHALL conform to the [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | Fixed value: completed |
| sender | 1..1 | This will reference the sending organization of the event message. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| Communication.category.coding.system | 1..1 | Fixed Value: https://fhir.nhs.uk/STU3/CodeSystem/DCH-ProfessionalCommentType-1 |
| Communication.category.coding.code | 1..1 | Fixed Value: 008 |
| Communication.category.coding.display | 1..1 | Fixed Value: Newborn Hearing Screening |


## Examples

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="new">New</span>
		<span class="tabHeading" id="update">Update</span>
		<span class="tabHeading" id="delete">Delete</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="newBody" markdown="span">
			```{% include_relative examples/newborn-hearing-1-new.xml %}```
		</div>
		
		<div class="tabBody" id="updateBody" markdown="span">
			```{% include_relative examples/newborn-hearing-1-update.xml %}```
		</div>
		
		<div class="tabBody" id="deleteBody" markdown="span">
			```{% include_relative examples/newborn-hearing-1-delete.xml %}```
		</div>
		
	</div>
</div>

