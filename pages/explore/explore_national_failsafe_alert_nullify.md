---
title: National Failsafe Alert Nullify Request
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_national_failsafe_alert_nullify.html
summary: "The FHIR profiles used for the National Failsafe Alert Nullify Request event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##
The National Failsafe Alert Nullify Request event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| National Failsafe Alert Nullify Request Event Message Bundle       |
|-------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-EMS-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-FailsafeAlertNullify-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlertNullify-Task-1)                      |
| [EMS-FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlert-Task-1)                      |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| National Failsafe Alert Nullify Request data item | FHIR profile               | FHIR element                     | Mandatory/Required/Optional |
|--------------------------|----------------------------|----------------------------------|-----------------------------|
| Nullifying Service                  | CareConnect-EMS-Organization-1 |                                  | Optional                   |
| Date and Time raised     | EMS-FailsafeAlertNullify-Task-1       | authoredOn                       | Optional                   |
| Nullification Reason            | EMS-NullifyFailsafeAlert-Task-1       | reason                    |        Optional            |
| other reason for nullification         | EMS-FailsafeAlertNullify-Task-1       | description                  |     Optional               |
| User              | CareConnect-EMS-Practitioner-1      | name.family                      | Optional                   |
| SDS Job Role Name         | CareConnect-EMS-PractitionerRole-1      | code                       | Optional                   |
| Originating Failsafe Alert        | EMS-FailsafeAlert-Task-1      |                        | Optional                   |
| Time Period               | EMS-FailsafeAlertNullify-Task-1      |restriction.period | Optional                  |











