---
title: PDS Person Death   
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_person_death.html
summary: "The FHIR profiles used for the PDS Person Death event message bundle"
---

## FHIR Profiles ##

The PDS Person Death event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Person Death Event Message Bundle |
|---------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-PDS-DeathNotification-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-PersonDeath-Communication-1) |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Person Death data item name   | FHIR Resource                   | FHIR element                   | Mandatory/Optional/Required |
|-----------------------------------|---------------------------------|--------------------------------|-----------------------------|
| Death Date                        | CareConnect-EMS-Patient-1           | deceased                       | Mandatory                   |
| Death Time                        | CareConnect-EMS-Patient-1           | deceased                       | Mandatory                   |
| Notified Date                     | EMS-PDS-PersonDeath-Communication-1 | sent                           | Mandatory                   |
| Status of Death Notification      | EMS-PDS-PersonDeath-Communication-1 | personDeathStatus              | Required                    |
| Death Cause Comment               | EMS-PDS-PersonDeath-Communication-1 | deathCauseComment              | Required                    |
| Death Cause Identification Method | EMS-PDS-PersonDeath-Communication-1 | deathCauseIdentificationMethod | Required                    |
| Death Location Type               | EMS-PDS-PersonDeath-Communication-1 | deathLocationType              | Required                    |




