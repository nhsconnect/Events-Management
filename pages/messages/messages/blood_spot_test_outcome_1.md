---
title: Blood Spot Test Outcome
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: blood_spot_test_outcome_1.html
summary: "The FHIR profiles used for the Blood Spot Test Outcome Event Message Bundle"
---


## Event Message Content

The `Blood Spot Test Outcome` event message represents a record of a blood spot test outcome in relation to a patient. Either creation, an update or deletion of the record.

 All "Blood Spot Test Outcome" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_generic_event_requirements.html) page. Where requirements on this page contradict the requirements on the Generic Event Message Requirements page, then the requirements on this page take precedence.


## Bundle Structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references a `Encounter` resource as the focus of the event message. The bloodspot test procedures, results and comment are linked to this encounter focus resource within the event message.

The diagram below shows the referencing between FHIR resources within the event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/bloodspot_test_outcome_bundle.png" target="_blank"><img src="images/messages/bloodspot_test_outcome_bundle.png"></a>
</div>


## Event Life Cycle ##

The `MessageHeader` resource contains the `messageEventType` extension which represents the action the event message represents at a resource level, for example the `Blood Spot Test Outcome` being shared is new or has been updated, or the `Blood Spot Test Outcome` has been deleted. The `messageEventType` extension shall contain a values as per the table below:

| Value | Description |
| --- | --- |
| new | The `new` value must be used when the `Blood Spot Test Outcome` is being shared for the first time, or is being shared because of an `update` to the information. |
| update | A value of `update` **will not** be used for this type of event due to the way the Blood Spot Tests are recorded and managed within the current National Screening Service, a value of **new** shall be used instead. |
| delete | The `delete` value must be used when the Blood Spot Test Outcome record has been deleted and the record no longer exists. |


### Identifying Information

To support the event life cycle outlined above the following requirements MUST be followed:

- For `new` and `update` type event messages, all procedures, results and other information MUST be included within each of the event messages.

- The information included in the `Blood Spot Test Outcome` event message should be treated as atomic and stored under the `identifier` included within focus `CareConnect-Encounter-1` resource. Where a `new` type event message is received with the same `identifier` the previous information should be overwritten with the information in the later event message as identified by the `MessageHeader.meta.lastUpdated` element within the event message.

- In a `delete` type event message the event message should be populated with the payload of the original new (or update) message where possible, to allow for additional validation of the information being removed. Where this is not possible the event message SHALL including, as a minimum, the `MessageHeader` resource and the focus `CareConnect-Encounter-1` resource. It is important that the `CareConnect-Encounter-1` resource includes the relevant `identifier` element, as included in new (or update) event messages so the subscriber can identify the `Blood Spot Test Outcome` that the delete relates to.


### Message Sequencing

As the Blood Spot Test Outcome may change in the source system, this would be represented by multiple `new`, `new (update)` and `delete` type event messages being published. To allow a subscribers to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.


## Onward Delivery ##

The delivery of the `Blood Spot Test Outcome` event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `BLOODSPOTTESTOUTCOME_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](explore_generic_event_requirements.html) page.

## Resource Mapping Overview  ##

| Element Name                                             | FHIR resource element                                            | Description |
|---|---|---|
| Date of Blood Test Outcome Received | CareConnect-DiagnosticReport-1.issued | The date that a Blood Spot Test outcome (status) was received by a Health Care Provider from the testing laboratory. |
| Outcome - PHENYLKETONURIA                                | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for PKU   |
| Outcome - SICKLE CELL DISEASE                            | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for SCD   |
| Outcome - CYSTIC FIBROSIS                                | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for CF    |
| Outcome - CONGENITAL HYPOTHYROIDISM                      | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for CHT   |
| Outcome - MEDIUM CHAIN ACYL-COA DEHYDROGENASE DEFICIENCY | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for MCADD |
| Outcome - HOMOCYSTINURIA                                 | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for HCU   |
| Outcome - MAPLE SYRUP URINE DISEASE                      | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for MSUD  |
| Outcome - GLUTARIC ACIDURIA TYPE 1                       | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for GA1   |
| Outcome - ISOVALERIC ACIDAEMIA                           | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for IVA   |
| Outcome - SEVERE COMBINED IMMUNODEFICIENCY               | CareConnect-Procedure-1.Procedure.outcome                        | Outcome of screening for SCID  |
| Comments | CareConnect-Communication-1.Communication.category.coding.system | Supporting text may be given covering regarding the screening test, outcome and actions taken. |


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
| extension(messageEventType) | 1..1 | 1..1 | See the “Event Life Cycle” section above. |
| event | 1..1 | 1..1 | Fixed Value: blood-spot-test-outcome-1 (Blood Spot Test Outcome) |
| focus | 1..1 | 1..1 | The focus element will reference the CareConnect-Encounter-1 resource which contains information relating to the event message. |


### [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1)

The CareConnect-Encounter-1 resource included as part of the event message SHALL conform to the [CareConnect-Encounter-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 1..1 (delete) |

| Element | Cardinality `new` | Cardinality `delete` | Additional Guidance |
| --- | --- | --- | --- |
| identifier | 1..1 | 1..1 | A publisher defined unique identifier for the Blood Spot Test Outcome which will be maintained across different event messages to allow subscribers to identify the information within subsequent new (i.e. updated) or delete event messages. |
| Encounter.type.coding(childHealthEncounterType) | 1..1 | 0..1 | Encounter.type.coding(childHealthEncounterType) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-ChildHealthEncounterType-1 |
| Encounter.reason.coding(snomedCT) | 0..1 | 0..1 | Encounter.reason.coding(snomedCT) SHOULD use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-AdmissionReason-1 |
| serviceProvider | 1..1 | 0..1 | This will reference the Organisation resource hosting the Encounter |
| location | 0..1 | 0..1 | This will reference the Encounter's Location |
| subject | 1..1 | 0..1 | This will reference the patient resource representing the subject of this event |


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


### [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1)

The CareConnect-HealthcareService-1 resource included as part of the event message SHALL conform to the [CareConnect-HealthcareService-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | This will reference the ‘sender’ organization of the event message. |
| type | 1..1 | This will represent the type of service responsible for the event message. This will have a fixed value from the ValueSet [CareConnect-CareSettingType-1](https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-CareSettingType-1) |
| specialty | 1..1 | HealthcareService.specialty SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1 |


### [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)

The CareConnect-Location-1 resource included as part of the event message SHALL conform to the [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |


### [CareConnect-DiagnosticReport-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DiagnosticReport-1)

The CareConnect-DiagnosticReport-1 resource included as part of the event message SHALL conform to the [CareConnect-DiagnosticReport-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DiagnosticReport-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 1..1 | This will reference the patient resource representing the subject of this event |
| issued | 1..1 | This will hold Date/Time the Blood Spot Test Outcome is received |


### [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1)

The CareConnect-Procedure-1 resource included as part of the event message SHALL conform to the [CareConnect-Procedure-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..10 (new) | 0..10 (delete) |

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


### CareConnect-Procedure-1 (Blood Spot Screening, Severe Combined Immunodeficiency)

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| Procedure.code.coding.system | 1..1 | Fixed Value: http://snomed.info/sct |
| Procedure.code.coding.code | 1..1 | Fixed Value: 1239891000000106 |
| Procedure.code.coding.display | 1..1 | Fixed Value: Severe combined immunodeficiency screening test |
| Procedure.outcome.coding(snomedCT) | 1..1 | Procedure.outcome.coding(snomedCT) SHALL use a value from https://fhir.nhs.uk/STU3/ValueSet/DCH-BloodSpotOutcome-1 |



### [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1)

The CareConnect-Communication-1 resource included as part of the event message SHALL conform to the [CareConnect-Communication-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 (new) | 0..1 (delete) |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | Fixed value: completed |
| sender | 1..1 | This will reference the sending organization of the event message. |
| subject | 1..1 | This will reference the patient resource representing the patient who is the subject of this event. |
| Communication.category.coding.system | 1..1 | Fixed Value: https://fhir.nhs.uk/STU3/CodeSystem/DCH-ProfessionalCommentType-1 |
| Communication.category.coding.code | 1..1 | Fixed Value: 007 |
| Communication.category.coding.display | 1..1 | Fixed Value: Newborn Blood Spot Screening |


## Examples

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="new">New</span>
		<span class="tabHeading" id="update">Update</span>
		<span class="tabHeading" id="delete">Delete</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="newBody" markdown="span">
			```{% include_relative examples/blood-spot-test-outcome-1-new.xml %}```
		</div>
		
		<div class="tabBody" id="updateBody" markdown="span">
			```{% include_relative examples/blood-spot-test-outcome-1-update.xml %}```
		</div>
		
		<div class="tabBody" id="deleteBody" markdown="span">
			```{% include_relative examples/blood-spot-test-outcome-1-delete.xml %}```
		</div>
		
	</div>
</div>

