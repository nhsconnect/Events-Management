---
title: NIPE Outcome Event Message Bundle
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: nipe_outcome_1.html
summary: "The FHIR profiles used for the NIPE Outcome Event Message Bundle"
---

## Event Message Content

The `NIPE Outcome` event message represents ...

All "NIPE Outcome" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page.


## Bundle Structure

Specifies referencing within the Event Message Bundle.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/nipe_outcome_bundle.png" target="_blank"><img src="images/messages/nipe_outcome_bundle.png"></a>
</div>

### NIPE Outcome Details Event data item mapping to FHIR profiles ###

The Child Health Event data items are fulfilled by elements within the FHIR resources listed below:
                                                                                                   
<table>
<tr>
<th>DCH Data Item</th><th>FHIR resource element</th><th>Mandatory/<br/>Required/<br/>Optional</th><th>Note</th>
</tr>
<tr>
<td>Date/Time</td><td>CareConnect-Encounter-1.period.start</td><td>Mandatory</td><td></td>
</tr>
<tr>
<td>ODS Site Code</td><td>CareConnect-Location-1.identifier (ODS Site Code)</td><td>Required</td><td></td>
</tr>
<tr>
<td>Professional Name</td><td>CareConnect-Practitioner-1.name</td><td>Required</td><td></td>
</tr>
<tr>
<td>SDS Job Role Name</td><td>CareConnect-PractitionerRole-1.code (SDS Job Role Name)</td><td>Required</td><td></td>
</tr>
<tr>
<td>Outcome Status Hips</td><td>CareConnect-Procedure-1.outcome</td><td>Mandatory</td><td></td>
</tr>
<tr>
<td>Outcome Status Eyes</td><td>CareConnect-Procedure-1.outcome</td><td>Mandatory</td><td></td>
</tr>
<tr>
<td>Outcome Status Testes</td><td>CareConnect-Procedure-1.outcome</td><td>Required</td><td></td>
</tr>
<tr>
<td>Outcome Status Heart</td><td>CareConnect-Procedure-1.outcome</td><td>Mandatory</td><td></td>
</tr>
<tr>
<td>Comment</td><td>CareConnect-Communication-1</td><td>Optional</td><td></td>
</tr>
</table>


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance should be followed in addition to the requirements and guidance outlined in the data item mapping above and in the [Event Header](https://developer.nhs.uk/apis/ems-beta/explore_event_header_information.html) requirements page.



### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

The Bundle resource included as part of the event message SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| type | 1..1 | Fixed value: message |


### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The Event-MessageHeader-1 resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| id | 1..1 | An originator/publisher unique publication reference, which will use a UUID format |
| extension(routingDemographics) | 1..1 | The extension MUST contain the details of the patient who is the focus of this event message. |
| extension(routingDemographics)<br>.extension(nhsNumber) | 1..1 | The extension MUST contain the patient’s NHS Number identifier and is used by the NEMS for routing event messages to subscribers. |
| extension(routingDemographics)<br>.extension(name) | 1..1 | The extension MUST contain the human name element containing the patient’s official given and family names as recognised by PDS, and match the NHS number in the routingDemographics extension. |
| extension(routingDemographics)<br>.extension(birthDateTime) | 1..1 | The extension MUST contain the patient’s Date Of Birth which matches the NHS number in the routingDemographics extension. |
| meta.versionId | 0..1 | Message Sequencing - A sequence number for the purpose of ordering messages for processing. The sequence number must be an integer which is patient and event-type specific and the publisher must increment the sequence number each time a new event of the same type is issued by the same system for the same patient. |
| meta.lastUpdated | 0..1 | Message Sequencing - A FHIR instant (time stamp with sub-second accuracy) which represents the point in time that the change occurred which should be used for ordering messages for processing. |
| extension(eventMessageType) | 1..1 | The type value which shall appear in this element will be defined within the separate event message implementation guide for each of the event messages, as the value will depend on the life cycle of the specific event message. |
| event | 1..1 | Fixed Value: nipe-outcome-1 ​NIPE outcome |
| source | 1..1 | The IT system which holds the information that originated the event |
| source.name | 1..1 | A human readable name for the IT system which holds the information that originated the event |
| source.contact | 1..1 | The email address or telephone number to be used by subscribers to contact the publisher for any issues with event message. Additional requirements and information available on the Event Feedback Mechanism page |
| source.contact.system | 1..1 | Must contain a value of phone or email matching the included contact method within the value element |
| source.contact.value | 1..1 | A phone number or email address |
| responsible | 1..1 | A reference to the organization resource which represents the organization responsible for the event. |
| focus | 1..1 | The focus element will reference the CareConnect-Encounter-1 resource which contains information relating to the event message. |


### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

The CareConnect-Organization-1 resource included as part of the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier.system | 1..1 | Fixed value: https://fhir.nhs.uk/Id/ods-organization-code |
| identifier.value | 1..1 | Organisation’s ODS Organization Code |
| name | 1..1 | Organisation’s Name |


### [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1)

The CareConnect-HealthcareService-1 resource included as part of the event message SHALL conform to the [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Required |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | This will reference the ‘sender’ organization of the event message. |
| type | 1..1 | This will represent the type of service responsible for the event message. This will have a fixed value from the ValueSet [CareConnect-CareSettingType-1](https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-CareSettingType-1) |
| specialty | 1..1 | HealthcareService.specialty SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1 |


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The CareConnect-Patient-1 resource included as part of the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the nhsNumber identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the official name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The CareConnect-Encounter-1 resource included as part of the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Encounter.type.coding(childHealthEncounterType) | 1..1 | Encounter.type.coding(childHealthEncounterType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ChildHealthEncounterType-1 |
| Encounter.reason.coding(snomedCT) | 0..1 | Encounter.reason.coding(snomedCT) SHOULD use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AdmissionReason-1 |
| serviceProvider | 1..1 | This will reference the Organisation resource hosting the Encounter |
| location | 0..1 Required | This will reference the Encounter's Location |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |


### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The CareConnect-Location-1 resource included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Required |


### [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)

The CareConnect-Practitioner-1 resource included as part of the event message SHALL conform to the [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |


### [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)

The CareConnect-PractitionerRole-1 resource included as part of the event message SHALL conform to the [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Required |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| organization | 1..1 | This will reference the Organization resource responsible for the event |
| practitioner | 1..1 | This will reference the Practitioner resource responsible for the event |
| PractitionerRole.code(careProfessionalType) | 1..1 | PractitionerRole.code(careProfessionalType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1 |
| PractitionerRole.code(keyWorkerStatus) | 0..1 | If Practitioner is a key worker, PractitionerRole.codekeyWorkerStatus SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-KeyWorkerStatus-1 |
| PractitionerRole.specialty | 1..1 | PractitionerRole.specialty SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1 |


### [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1)

The CareConnect-Procedure-1 resource included as part of the event message SHALL conform to the [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 3..4 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |

For each of the Procedure resources representing a Test Outcome:


### CareConnect-Procedure-1 (Physical Examination, Hips)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 985531000000102 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Newborn and Infant Physical Examination Screening Programme, hip examination |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/NIPE-Outcome-1 |


### CareConnect-Procedure-1 (Physical Examination, Eyes)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 988361000000105 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Newborn and Infant Physical Examination Screening Programme, eye examination |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/NIPE-Outcome-1 |


### CareConnect-Procedure-1 (Physical Examination, Testes)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 988371000000103 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Newborn and Infant Physical Examination Screening Programme, testis examination |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/NIPE-Outcome-1 |


### CareConnect-Procedure-1 (Physical Examination, Heart)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct ||
| Procedure.code.coding.code | 1..1 | Fixed Value: 988351000000107 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Newborn and Infant Physical Examination Screening Programme, heart examination |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/NIPE-Outcome-1 |


### [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1)

The CareConnect-Communication-1 resource included as part of the event message SHALL conform to the [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Optional |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | Fixed value: completed |
| sender | 1..1 | This will reference the sending organization of the event message. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| Communication.category.coding.system | 1..1 | Fixed Value: https://fhir.nhs.uk/STU3/CodeSystem/DCH-ProfessionalCommentType-1 |
| Communication.category.coding.code | 1..1 | 009 OR 010 |
| Communication.category.coding.display | 1..1 | 'Newborn and Infant Physical Examination (72 hours)' OR 'Newborn and Infant Physical Examination (6-8 Weeks)' |


## DCH NIPE Outcome Example ##

<script src="https://gist.github.com/IOPS-DEV/a90f09a24af78a977cae93b5c392ab3f.js"></script>

## Profile Change Mappings for NIPE Outcome ##

Profiles used in [Demographics Update Event Messages 1.2.1-Release Candidate](https://developer.nhs.uk/apis/demographicupdates-120-rc/index.html) are replaced with:

| Demographic-Event-Messages | Demographic-Event-Messages-CareConnect |
|----------------------------|----------------------------------------|
| DCH-Bundle-1                                                   | Bundle |
| DCH-MessageHeader-1                                            | Event-MessageHeader-1 |
| CareConnect-Organization-1                                     | CareConnect-Organization-1 |
| DCH-HealthcareService-1                                        | CareConnect-HealthcareService-1 |
| CareConnect-DCH-Patient-1                                      | CareConnect-Patient-1 |
| CareConnect-DCH-Encounter-1                                    | CareConnect-Encounter-1 |
| CareConnect-Location-1                                         | CareConnect-Location-1 |
| CareConnect-DCH-Practitioner-1                                 | CareConnect-Practitioner-1 |
| CareConnect-DCH-PractitionerRole-1                             | CareConnect-PractitionerRole-1 |
| CareConnect-DCH-PhysicalExaminationHips-Procedure-1            | CareConnect-Procedure-1 |
| CareConnect-DCH-PhysicalExaminationEyes-Procedure-1            | CareConnect-Procedure-1 |
| CareConnect-DCH-PhysicalExaminationTestes-Procedure-1          | CareConnect-Procedure-1 |
| CareConnect-DCH-PhysicalExaminationHeart-Procedure-1           | CareConnect-Procedure-1 |
| DCH-ProfessionalComment-Communication-1                        | CareConnect-Communication-1 |

<hr/>

