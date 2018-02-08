---
title: National Failsafe Alert
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_national_failsafe_alert.html
summary: "The FHIR profiles used for the National Failsafe Alert event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the National Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##
The Failsafe Alert event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| Failsafe Alert Event Message Bundle       |
|-------------------------------------------|
| [NEMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Bundle-1)                              |
| [NEMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [NEMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-HealthcareService-1)                   |
| [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)                     |
| [NEMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Communication-1)                       |
| [FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/FailsafeAlert-Task-1)                      |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| Failsafe Alert data item | FHIR profile               | FHIR element                     | Mandatory/Required/Optional |
|--------------------------|----------------------------|----------------------------------|-----------------------------|
| Alerter                  | CareConnect-Organization-1 |                                  | Mandatory                   |
| Date and Time raised     | FailsafeAlert-Task-1       | authoredOn                       | Mandatory                   |
| Severity Level           | FailsafeAlert-Task-1       | severityLevel                    | Mandatory                   |
| Escalation level         | FailsafeAlert-Task-1       | escalationLevel                  | Mandatory                   |
| Family Name              | CareConnect-Patient-1      | name.family                      | Mandatory                   |
| First Given Name         | CareConnect-Patient-1      | name.given                       | Mandatory                   |
| Person Birth Date        | CareConnect-Patient-1      | birthDate                        | Mandatory                   |
| NHS Number               | CareConnect-Patient-1      | identifier using nhsNumber slice | Mandatory                   |
| Gender                   | CareConnect-Patient-1      | gender                           | Mandatory                   |
| Post Code                | CareConnect-Patient-1      | address.postalCode               | Mandatory                   |
| GP Practice              | CareConnect-Patient-1      | generalPractitioner              | Optional                    |
| Condition ID             | FailsafeAlert-Task-1       | task.reason                      | Required                    |
| Condition Description    | FailsafeAlert-Task-1       | task.reason.display              | Required                    |
| Reason for alert         | FailsafeAlert-Task-1       | task.reason.display              | Required                    |
| Service needed to action | FailsafeAlert-Task-1       | task.performerType               | Required                    |
| Action Required          | FailsafeAlert-Task-1       | task.code                        | Required                    |
| Action Required by Date  | FailsafeAlert-Task-1       | task.restriction.period.end      | Required                    |
| Readable Format          | FailsafeAlert-Task-1       | task.description                 | Required                    |










