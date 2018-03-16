---
title: PDS Change of GP 
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_change_of_gp.html
summary: "The FHIR profiles used for the PDS Change of GP event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##

The PDS Change of GP event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| PDS Change of GP Event Message Bundle |
|---------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-EMS-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-PDS-GPRegistration-EpisodeOfCare-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-GPRegistration-EpisodeOfCare-1)                            |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Change of GP data item name           | FHIR Resource              | FHIR element              | Mandatory/Optional/Required |
|-------------------------------------------|----------------------------|---------------------------|-----------------------------|
| Current GP Practice Code                  | CareConnect-EMS-Organization-1 | identifier using ODS Code | Mandatory                   |
| Commissioning organisation of current GP  | CareConnect-EMS-Organization-1 | identifier using ODS Code | Mandatory                   |
| Previous GP Practice Code                 | CareConnect-EMS-Organization-1 | identifier using ODS Code | Mandatory                   |
| Commissioning organisation of previous GP | CareConnect-EMS-Organization-1 | identifier using ODS Code | Mandatory                   |
| Business Effective from date                 | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.start | Mandatory                   |
| Business Effective to date | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.end | Optional                   |
| System Effective from date                 | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.start | Mandatory                   |
| System Effective to date | EMS-PDS-GPRegistration-EpisodeOfCare-1 | period.end | Optional                   |

