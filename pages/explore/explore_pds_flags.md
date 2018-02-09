---
title: PDS Flags
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_flags.html
summary: "The FHIR profiles used for the PDS Flags event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##

The PDS Flags event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %}

| PDS Flags Event Message Bundle   |
|----------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [CareConnect-EMS-PDS-Flag-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Flag-1)           |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Flags data item name          | FHIR Resource       | FHIR element | Mandatory/Optional/Required |
|-----------------------------------|---------------------|--------------|-----------------------------|
| Information Sensitivity Indicator | CareConnect-EMS-PDS-Flag-1  | category     | Required                    |
| Reason for Removal                | CareConnect-EMS-PDS-Flag-1  | code         | Required                    |
| Business Effective from date      | CareConnect-EMS-PDS-Flag-1  | period.start | Required                    |
| Business Effective to date        | CareConnect-EMS-PDS-Flag-1  | period.end   | Required                    |
| Requested date                    | EMS-Communication-1 | authoredOn   | Required                    |









