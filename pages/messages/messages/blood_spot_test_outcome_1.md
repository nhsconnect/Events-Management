---
title: Blood Spot Test Outcome Event Message Bundle
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: blood_spot_test_outcome_1.html
summary: "The FHIR profiles used for the Blood Spot Test Outcome Event Message Bundle"
---


## Event Message Content

The `Blood Spot Test Outcome` event message represents a change to a record of a blood spot test outcome in relation to a patient, creation, an update or deletion of the record. All "Blood Spot Test Outcome" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page.


## Bundle Structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references a `Encounter` resource as the focus of the event message. The bloodspot test procedures, results and comment are linked to this encounter focus resource within the event message.


The diagram below shows the referencing between FHIR resources within the event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/bloodspot_test_outcome_bundle.png" target="_blank"><img src="images/messages/bloodspot_test_outcome_bundle.png"></a>
</div>


## Event Life Cycle ##

The MessageHeader resource contains the messageEventType extension which represents the action the event message represents at a resource level, for example the `Blood Spot Test Outcome` being shared is new or has been updated, or the `Blood Spot Test Outcome` has been deleted. The messageEventType extension shall contain a values as per the table below:

| Value | Description |
| --- | --- |
| new | The `new` value must be used when the `Blood Spot Test Outcome` is being shared for the first time, or is being shared because of an update to the information. |
| update | A value of `update` will not be used for this type of event due to the way the Blood Spot Tests are recorded and managed within the current National Screening Service, a value of `new` shall be used instead. |
| delete | The `delete` value must be used when the Blood Spot Test Outcome record has been deleted and the record no longer exists. |


### Identifying Information

For new and update event message all procedures, results and other information should be included within each event message. The information included in this event message should be treated as atomic and stored under the `identifier` included within focus `CareConnect-Encounter-1` resource. Where a `new` type event message is received with the same `identifier` the previous information should overwritten with the details in the later event message as identified by the `MessageHeader.meta.lastUpdated` element within the event message.

In a `delete` type event message the full event message should be populated with the payload of the original new (or update) message where possible, to allow for additional validation of the information being removed. Where this is not possible the event message may be populated with a minimum set of resources, including the MessageHeader and the focus `CareConnect-Encounter-1` resource.


### Message Sequencing

As the Blood Spot Test Outcome shared using the `Blood Spot Test Outcome` event message may change and this would be represented by multiple `new` and `delete` types event messages. To allow a subscribers to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.



## Blood Spot Test Outcome Event data item mapping to FHIR profiles ##

The Child Health Event data items are fulfilled by elements within the FHIR resources listed below.

| DCH Data Item                                            | FHIR resource element             | Mandatory/Required/Optional |
|----------------------------------------------------------|-----------------------------------|-----------------------------|
| Date of Blood Test Outcome Received                      | CareConnect-DiagnosticReport-1.issued     | Mandatory                   |
| Procedure Outcome <br/> for each Procedure               | CareConnect-Procedure-1.outcome | Mandatory                   |
| Comment                                                  | CareConnect-Communication-1   						| Optional                    | 


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
| meta.lastUpdated | 1..1 | Message Sequencing - A FHIR instant (time stamp with sub-second accuracy) which represents the point in time that the change occurred which should be used for ordering messages for processing. |
| extension(messageEventType) | 1..1 |  |
| event | 1..1 | Fixed Value: blood-spot-test-outcome-1 (Blood Spot Test Outcome) |
| source | 1..1 | The IT system which holds the information that originated the event |
| source.name | 1..1 | A human readable name for the IT system which holds the information that originated the event |
| source.contact | 1..1 | The email address or telephone number to be used by subscribers to contact the publisher for any issues with event message. Additional requirements and information available on the Event Feedback Mechanism page |
| source.contact.system | 1..1 | Must contain a value of phone or email matching the included contact method within the value element |
| source.contact.value | 1..1 | A phone number or email address |
| responsible | 1..1 | A reference to the organization resource which represents the organization responsible for the event. |
| focus | 1..1 | The focus element will reference the CareConnect-Encounter-1 resource which contains information relating to the event message. |


### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

The CareConnect-Organization-1 resource included as part of the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* Mandatory|

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
| identifier | 1..1 | A publisher defined unique identifier for the Blood Spot Test Outcome which will be maintained across different event messages to allow subscribers to be identify the information within subsequent new (i.e. updated) or delete event messages. |
| Encounter.type.coding(childHealthEncounterType) | 1..1 | Encounter.type.coding(childHealthEncounterType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ChildHealthEncounterType-1 |
| Encounter.reason.coding(snomedCT) | 0..1 | Encounter.reason.coding(snomedCT) SHOULD use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AdmissionReason-1 |
| serviceProvider | 1..1 | This will reference the Organisation resource hosting the Encounter |
| location | 0..1 Required | This will reference the Encounter's Location |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |


### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The CareConnect-Location-1 resource included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Optional |


### [CareConnect-DiagnosticReport-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DiagnosticReport-1)

The CareConnect-DiagnosticReport-1 resource included as part of the event message SHALL conform to the [CareConnect-DiagnosticReport-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DiagnosticReport-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 Mandatory |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |
| issued | 1..1 | This will hold Date/Time the Blood Spot Test Outcome is received |


### [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1)

The CareConnect-Procedure-1 resource included as part of the event message SHALL conform to the [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..9 Required |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |

For each of the Procedure resources representing a Test Outcome:

### CareConnect-Procedure-1 (Blood Spot Screening, Phenylketonuria)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 314081000 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Phenylketonuria screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Sickle Cell Disease)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 314090007 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Sickle cell disease screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Cystic Fibrosis)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 314080004 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Cystic fibrosis screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Congenital Hypothyroidism)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 400984005 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Congenital hypothyroidism screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Medium-chain Acyl-Coenzyme A Dehydrogenase Deficiency)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 428056008 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Medium-chain acyl-coenzyme A dehydrogenase deficiency screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Homocystinuria)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 940201000000107 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Blood spot homocystinuria screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Maple Syrup Urine Disease)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 940221000000103 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Blood spot MSUD (maple syrup urine disease) screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Glutaric Aciduria Type 1)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 940131000000109 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Blood spot glutaric aciduria type 1 screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |

### CareConnect-Procedure-1 (Blood Spot Screening, Isovaleric Acidaemia)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 940151000000102 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Blood spot isovaleric acidaemia screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |



### [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1)

The CareConnect-Communication-1 resource included as part of the event message SHALL conform to the [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 Optional |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | Fixed value: completed |
| sender | 1..1 | This will reference the sending organization of the event message. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| Communication.category.coding.system | 1..1 | Fixed Value: https://fhir.nhs.uk/STU3/CodeSystem/DCH-ProfessionalCommentType-1 |
| Communication.category.coding.code | 1..1 | Fixed Value: 007 |
| Communication.category.coding.display | 1..1 | Fixed Value: Newborn Blood Spot Screening |

## DCH Blood Spot Test Outcome Example ##

<script src="https://gist.github.com/IOPS-DEV/52d8bc5a3299890d15b90a8b9b39b4be.js"></script>

## Profile Change Mappings for Blood Spot Test Outcome ##

Profiles used in [Demographics Update Event Messages 1.2.1-Release Candidate](https://developer.nhs.uk/apis/demographicupdates-120-rc/index.html) are replaced with:

| Demographic-Event-Messages | Demographic-Event-Messages-CareConnect |
|----------------------------|----------------------------------------|
| DCH-Bundle-1 | Bundle |
| DCH-MessageHeader-1 | Event-MessageHeader-1 |
| CareConnect-Organization-1 | CareConnect-Organization-1 |
| DCH-HealthcareService-1 | CareConnect-HealthcareService-1 |
| CareConnect-DCH-Patient-1 | CareConnect-Patient-1 |
| CareConnect-DCH-Encounter-1 | CareConnect-Encounter-1 |
| CareConnect-Location-1 | CareConnect-Location-1 |
| DCH-NewbornBloodSpotScreening-DiagnosticReport-1 | CareConnect-DiagnosticReport-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningPKU-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningSCD-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningCF-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningCHT-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningMCADD-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningHCU-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningMSUD-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningGA1-Procedure-1 | CareConnect-Procedure-1 |
| CareConnect-DCH-NewbornBloodSpotScreeningIVA-Procedure-1 | CareConnect-Procedure-1 |
| DCH-ProfessionalComment-Communication-1 | CareConnect-Communication-1 |


<hr/>

