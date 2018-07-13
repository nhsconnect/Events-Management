---
title: National Failsafe Alert
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_national_failsafe_alert.html
summary: "The FHIR profiles used for the National Failsafe Alert event message bundle"
---

## FHIR Profiles ##
The Failsafe Alert event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| National Failsafe Alert Event Message Bundle       |
|-------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlert-Task-1)                      |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| Failsafe Alert data item | FHIR profile               | FHIR element                     | Mandatory/Required/Optional |
|--------------------------|----------------------------|----------------------------------|-----------------------------|
| Alerter                  | CareConnect-Organization-1 |                                  | Mandatory                   |
| Date and Time raised     | EMS-FailsafeAlert-Task-1       | authoredOn                       | Mandatory                   |
| Severity Level           | EMS-FailsafeAlert-Task-1       | severityLevel                    | Mandatory                   |
| Escalation level         | EMS-FailsafeAlert-Task-1       | escalationLevel                  | Mandatory                   |
| Family Name              | CareConnect-EMS-Patient-1      | name.family                      | Mandatory                   |
| First Given Name         | CareConnect-EMS-Patient-1      | name.given                       | Mandatory                   |
| Person Birth Date        | CareConnect-EMS-Patient-1      | birthDate                        | Mandatory                   |
| NHS Number               | CareConnect-EMS-Patient-1      | identifier using nhsNumber slice | Mandatory                   |
| Gender                   | CareConnect-EMS-Patient-1      | gender                           | Mandatory                   |
| Post Code                | CareConnect-EMS-Patient-1      | address.postalCode               | Mandatory                   |
| GP Practice              | CareConnect-EMS-Patient-1      | generalPractitioner              | Required                    |
| Condition ID             | EMS-FailsafeAlert-Task-1       | task.reason                      | Required                    |
| Condition Description    | EMS-FailsafeAlert-Task-1       | task.reason.display              | Required                    |
| Reason for alert         | EMS-FailsafeAlert-Task-1       | task.reason.display              | Required                    |
| Service needed to action | EMS-FailsafeAlert-Task-1       | task.performerType               | Required                    |
| Provider needed to action| EMS-FailsafeAlert-Task-1       | task.owner               | Required                    |
| Action Required          | EMS-FailsafeAlert-Task-1       | task.code                        | Required                    |
| Action Required by Date  | EMS-FailsafeAlert-Task-1       | task.restriction.period.end      | Optional                    |
| Readable Format          | EMS-FailsafeAlert-Task-1       | task.description                 | Mandatory                    |










