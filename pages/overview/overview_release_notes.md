---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this specification following the initial beta release will be documented here.

## Beta 1.1.0 ##

**Subscription API**

The specification has been updated to include a section on [Subscription Management](explore_subscriptions.html). 

THE EMS Event Message Bundle Structure page has been update to include clarification on the use of absolute URL references to Organization resources via the [FHIR ODS Lookup API](https://developer.nhs.uk/apis/ods).

**Error Handling**

The specification has been updated to include guidance on [Error Handling](explore_errors.html).

Following stakeholder feedback and INTEROPen curation, this implementation guidance has been updated as follows:

- **National Failsafe Alert** - changes to data item requirements
	- GP Practice - changed to Required
	- Condition ID - changed to Mandatory
	- Condition Description - changed to Mandatory
	- Reason for alert - changed to Mandatory
	- Service needed to action - changed to Mandatory
	- Provider needed to action - new Mandatory item
	- Action Required - changed to Mandatory
	- Action required By Date - changed to Optional
	- Readable Format - changed to Mandatory

- **National Failsafe Alert Nullify Request** - Nullification Reason corrected to refer to EMS-FailsafeAlertNullify-Task-1
- **PDS Change of Address** - removed Country of Birth and notified date - not listed in specification
**FHIR Profiles**
- [CareConnect-EMS-PDS-DeliveryPlace-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-DeliveryPlace-Organization-1) - upversioned to 1.1.0
	 - valueCodeableConcept.coding.display is 0..1
- [CareConnect-EMS-PDS-Mother-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Mother-Patient-1) - upversioned to 1.1.0
	- generalPractitioner corrected to 1..1
	- added 'Extension-CareConnect-RegistrationDetails-1' to share GP registration period information
- [CareConnect-EMS-PDS-StillBornIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-StillBornIndicator-Observation-1) - upversioned to 1.1.0
	- valueCodeableConcept.coding.display is 0..1
- [CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1) - upversioned to 1.1.0
	- type.coding.display is 0..1
- [EMS-FailsafeAlertEscalationLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlertEscalationLevel-1) - upversioned to 1.1.0
	- codes updated to use numeric values
- [EMS-FailsafeAlertNullify-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlertNullify-Task-1) - upversioned to 1.1.0
	- focus.reference changed to 1..1 to mandate originating Failsafe Alert
	- code, code.coding changed to 1..1
	- description changed to 1..1
	- performerType, performerType.coding changed to 1..1
	- owner changed to 1..1
	- reason, reason.coding changed to 1..1
- [EMS-FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlert-Task-1) - upversioned to 1.1.0
	- code, code.coding changed to 1..1
	- description changed to 1..1
	- performerType, performerType.coding changed to 1..1
	- owner changed to 1..1
	- reason, reason.coding changed to 1..1
- [EMS-FailsafeAlertNullifyReason-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlertNullifyReason-1) - CodeSystem upversioned to 1.1.0
	- codes updated to align with specification.
- [EMS-FailsafeAlertReason-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlertReason-1) - CodeSystem upversioned to 1.1.0
	- display names for codes updated to align with specification.
- [EMS-FailsafeAlertSeverityLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlertSeverityLevel-1) - upversioned to 1.1.0
	- codes updated to use numeric values
- [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1) - upversioned to 1.1.0 
	- id is now 1..1
	- responsible.reference is now 1..1

- Following INTEROPen curation, the following Level 3 profiles have been removed and replaced with Level 2 CareConnect profiles:
	- CareConnect-EMS-Organisation-1
	- CareConnect-EMS-Practitioner-1
	- CareConnect-EMS-PractitionerRole-1

All FHIR profiles referencing these profiles have been updated and upversioned to reflect this change.

**Examples** 
- all relevant example instances updated to reflect all of the changes above.

Added page [Versioning](explore_event_versioning.html) to clarify versioning of event instances and event definitions.

## Beta 1.0.1 ##
This implementation guidance has been updated to include a guidance page for accessing example messages.
 
## Beta 1.0.0 ##
This Beta release includes implementation guidance to support the development of the following aspects of the Events Management Service:

- EMS Event Message Response
- National Failsafe Alert and Failsafe Nullify event messages
- Patient Demographics Service Updates event messages



