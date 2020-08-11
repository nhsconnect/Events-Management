---
title: Observations
keywords:  messaging, bundles, observations
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: observations.html
summary: "The FHIR profiles used for the Observations Event Message Bundle"
---

## Event Message Content

The `Allergies and Adverse Reactions` event message represents a single allergy or adverse reaction finding for a patient and relevant supporting information.

All “Allergy and Adverse Reaction” event messages that are published to the NEMS MUST be created in line with guidance and requirements specified on this page and on the [Generic Event Message Requirements](https://developer.nhs.uk/apis/ems-beta/explore_generic_event_requirements.html) page.

## Bundle structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The `MessageHeader` resource references an `AllergyIntolerance` resource as the focus of the event message. The `AllergyIntolerance` represents the allergy or adverse reaction finding that was recorded.

The diagram below shows the referencing between FHIR resources within the event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/allergies-adverse-reactions.png" target="_blank"><img src="images/messages/allergies-adverse-reactions.png"></a>
</div>


## Event Life Cycle ##

The `MessageHeader` resource contains the `messageEventType` extension which represents the action the event message represents at a resource level, for example the resource being shared is new, the resource or supporting resources have been updated or the resource has been deleted. The `messageEventType` extension shall contain a value as per the table below:

| Value | Description |
| --- | --- |
| new |  The `new` value must be used when the resource is being shared for the first time. |
| update | The `update` value must be used when the resource and supporting resources have previously been shared, but have been updated and the updated resources are being shared. |
| delete | The `delete` value must be used when the resource record has been deleted and the record no longer exists. |

### Identifying Information

To allow subscribers to identify information between `new`, `update` and `delete` event messages the publisher must:

- publish a complete event message for all event types
- included identifiers within resources which are maintained between different event messages

### Message Sequencing

As the event message may change and therefore `new`, `update` and `delete` types of the event are supported. To allow a consumer to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.

## Onward Delivery ##

The delivery of the event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `OBSERVATIONS_1` |

## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](explore_generic_event_requirements.html) page.

## Resource Mapping Overview  ##

| DCH Data   Item            | FHIR resource element                 | Description                                                                                                                                                                       |
|----------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date and   Time            | CareConnect-Observation-1             | The date and time on which the   observation was recorded                                                                                                                         |
| ODS/ORD Site Code          | CareConnect-Organization-1.identifier | The location   where the observation was recorded                                                                                                                                 |
| Performing Professional    | CareConnect-Practitioner-1.name       | Name of the   professional performing the observation                                                                                                                             |
| SDS Job Role Name          | CareConnect-PractitionerRole-1.code   | The job role   associated with the person                                                                                                                                         |
| Birth Weight               | CareConnect-Observation-1             | Weight of baby   in kg (to 3 decimal places) at Birth                                                                                                                             |
| Head   Circumference       | CareConnect-Observation-1             | Head   Circumference in cm (to 1 decimal place)                                                                                                                                   |
| Weight                     | CareConnect-Observation-1             | Weight in kg (to   3 decimal places)                                                                                                                                              |
| Height /Length             | CareConnect-Observation-1             | Height /Length   in cm (to 1 decimal place)                                                                                                                                       |
| BMI   centile              | CareConnect-Observation-1             | BMI centile calculated using the   height/weight/gender and age of the person using the UK90 and WHO data   tables. The result will be a percentage from 0-100 to 1 decimal place |
| Systolic   Blood Pressure  | CareConnect-Observation-1             | The Systolic Blood Pressure   reading of the person                                                                                                                               |
| Diastolic Blood Pressure   | CareConnect-Observation-1             | The Diastolic   Blood Pressure reading of the person                                                                                                                              |
| Heart Rate (bpm)           | CareConnect-Observation-1             | The beat of the   heart as felt through the walls of a peripheral artery measured in bpm                                                                                          |
| Temperature                | CareConnect-Observation-1             | The measurement   of the person's temperature in Celsius (OC)                                                                                                                     |
| Respiration rate           | CareConnect-Observation-1             | The numbers of   breaths taken by minute, measured by counting the number of times the chest   rises                                                                              |
| Oxygen Saturation          | CareConnect-Observation-1             | The measurement   of oxygen within the blood (expressed as a percentage of 100)                                                                                                   |
| NCMP   Withdrawal Reason   | CareConnect-Observation-1             | Reason for child   being withdrawn from the measurement as part of the National Child   Measurement Programme                                                                     |




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
| meta.lastUpdated | 1..1 | The dateTime when the information was changed within the publishing system, for the use of event sequencing. |
| extension(messageEventType) | 1..1 | See the "Event Life Cycle" section above. |
| event | 1..1 | Fixed Value: vaccinations-1 (Vaccinations) |
| focus | 1..1 | This will reference the `CareConnect-Immunization-1` resource which contains information about the vaccination this event relates to. |

### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

All Organization resources included in the bundle SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..* | The organization ODS code identifier SHALL be included within the `odsOrganizationCode` identifier slice. |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource. |

### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number identifier SHALL be included within the nhsNumber identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the official name element slice |
| birthDate | 1..1 | The patients date of birth |

### [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)

The Practitioner resources included as part of the event message SHALL conform to the [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1) constrained FHIR profile.

| Resource Cardinality | 0..* |

### [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)

The PractitionerRole resources included as part of the event message SHALL conform to the [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1) constrained FHIR profile.

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| organization | 1..1 | Reference to the Organization where the practitioner performs this role |
| practitioner | 1..1 | Reference to the Practitioner who this role relates to |
| code | 1..* | The practitioner role SHALL included a value from the [ProfessionalType-1](https://fhir.nhs.uk/STU3/ValueSet/ProfessionalType-1) value set. The PractitionerRole.code should also include the SDS Job Role name where available. |
| specialty | 1..1 | PractitionerRole.specialty SHALL use a value from [Specialty-1](https://fhir.nhs.uk/STU3/ValueSet/Specialty-1) value set |

### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The Encounter resource included as part of the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Encounter.type | 1..* | The encounter type SHOULD include a value from the [EncounterType-1](https://fhir.nhs.uk/STU3/ValueSet/EncounterType-1) value set. This value set is extensible so additional values and code systems may be added where required. |
| location | 0..1 | Reference to the location at which the encounter took place |
| subject | 1..1 | A reference to the patient resource representing the subject of this event |

### [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1)

The HealthcareService resource included as part of the event message SHALL conform to the [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | Reference to the organization who provides the healthcare service |
| type | 1..1 | This will represent the type of service responsible for the event message. This will have a fixed value from the ValueSet [CareConnect-CareSettingType-1](https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-CareSettingType-1) |
| specialty | 1..1 | The specialty SHALL be a value from the [Specialty-1](https://fhir.nhs.uk/STU3/ValueSet/Specialty-1) value set |

### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The Location resources included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 0..* | Where available the ODS Site Code slice should be populated |

### [CareConnect-AllergyIntolerance-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1)

The CareConnect-AllergyIntolerance-1 resource included as part of the event message SHALL conform to the [CareConnect-AllergyIntolerance-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| patient | 1..1 | This will reference the patient resource representing the subject of this event |

## Examples

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="new">New</span>
		<span class="tabHeading" id="update">Update</span>
		<span class="tabHeading" id="delete">Delete</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="newBody" markdown="span">
			```{% include_relative examples/allergies-adverse-reactions-new.xml %}```
		</div>
		
		<div class="tabBody" id="updateBody" markdown="span">
			```{% include_relative examples/allergies-adverse-reactions-update.xml %}```
		</div>
		
		<div class="tabBody" id="deleteBody" markdown="span">
			```{% include_relative examples/allergies-adverse-reactions-delete.xml %}```
		</div>
		
	</div>
</div>