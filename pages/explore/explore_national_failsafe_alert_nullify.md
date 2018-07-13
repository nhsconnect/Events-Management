---
title: National Failsafe Alert Nullify Request
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_national_failsafe_alert_nullify.html
summary: "The FHIR profiles used for the National Failsafe Alert Nullify Request event message bundle"
---

## FHIR Profiles ##
The National Failsafe Alert Nullify Request event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| National Failsafe Alert Nullify Request Event Message Bundle       |
|-------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-FailsafeAlertNullify-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlertNullify-Task-1)                      |
| [EMS-FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlert-Task-1)                      |
| [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)                |
| [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)                |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| National Failsafe Alert Nullify Request data item | FHIR profile               | FHIR element                     | Mandatory/Required/Optional |
|--------------------------|----------------------------|----------------------------------|-----------------------------|
| Nullifying Service                  | CareConnect-Organization-1 |                                  | Mandatory                   |
| Date and Time raised     | EMS-FailsafeAlertNullify-Task-1       | authoredOn                       | Mandatory                   |
| Nullification Reason            | EMS-NullifyFailsafeAlertNullify-Task-1       | reason                    |        Mandatory            |
| other reason for nullification         | EMS-FailsafeAlertNullify-Task-1       | description                  |     Required               |
| User              | CareConnect-Practitioner-1      | name.family                      | Requiredl                   |
| SDS Job Role Name         | CareConnect-PractitionerRole-1      | code                       | Required                   |
| Originating Failsafe Alert        | EMS-FailsafeAlert-Task-1      |                        | Mandatory                   |
| Time Period               | EMS-FailsafeAlertNullify-Task-1      |restriction.period | Optional                  |











