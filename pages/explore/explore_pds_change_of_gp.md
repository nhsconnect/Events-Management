---
title: PDS Change of GP 
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_change_of_gp.html
summary: "The FHIR profiles used for the PDS Change of GP event message bundle"
---

## FHIR Profiles ##

The PDS Change of GP event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Change of GP Event Message Bundle |
|---------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-PDS-GPRegistration-EpisodeOfCare-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-GPRegistration-EpisodeOfCare-1)                            |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Change of GP data item name           | FHIR Resource              | FHIR element              | Mandatory/Optional/Required |
|-------------------------------------------|----------------------------|---------------------------|-----------------------------|
| Current GP Practice Code                  | CareConnect-Organization-1 | identifier using ODS Code | Required                   |
| Commissioning organisation of current GP  | CareConnect-Organization-1 | identifier using ODS Code | Required                   |
| Previous GP Practice Code                 | CareConnect-Organization-1 | identifier using ODS Code | Required                   |
| Commissioning organisation of previous GP | CareConnect-Organization-1 | identifier using ODS Code | Required                   |
| Business Effective from date                 | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.start | Mandatory                   |
| Business Effective to date | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.end | Optional                   |
| System Effective from date                 | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.start | Mandatory                   |
| System Effective to date | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.end | Optional                   |

