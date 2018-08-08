---
title: PDS Change of Address 
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_change_of_address.html
summary: "The FHIR profiles used for the PDS Change of Address event message bundle"
---

## FHIR Profiles ##

The PDS Change of Address Bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Change of Address Event Message Bundle |
|--------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Change of Address data item name | FHIR Resource         | FHIR element         | Mandatory/Optional/Required |
|--------------------------------------|-----------------------|----------------------|-----------------------------|
| Current Address Type                 | CareConnect-EMS-Patient-1 | address.use          | Mandatory                   |
| Address Line 1 or 2                  |                       | address.line         | Mandatory                   |
| Address Line 3                       |                       | address.line         | Mandatory                   |
| Address Line 4                       | CareConnect-EMS-Patient-1 | address.line         | Optional                    |
| Address Line 5                       | CareConnect-EMS-Patient-1 | address.line         | Mandatory                   |
| Postcode                             | CareConnect-EMS-Patient-1 | address.postalcode   | Optional                    |
| PAF Key                              |                       | not yet profiled     | Required                    |
| Address Description                  |                       | not yet profiled     | Optional                    |
| Address Effective From Date          | CareConnect-EMS-Patient-1 | address.period.start | Required                    |
| Address Effective To Date            | CareConnect-EMS-Patient-1 | address.period.end   | Mandatory                   |
| Previous Address Type                | CareConnect-EMS-Patient-1 | address.use          | Optional                    |
| Previous Address                     | CareConnect-EMS-Patient-1 | address.line         | Mandatory                   |
| Previous Postcode                    | CareConnect-EMS-Patient-1 | address.postalCode   | Mandatory                   |
| Previous Address Description         |                       | not yet profiled     | Mandatory                   |
| Previous Address Effective From Date |                       | address.period.start | Required                    |
| Previous Address Effective To Date   | CareConnect-EMS-Patient-1 | address.period.end   | Required                    |









