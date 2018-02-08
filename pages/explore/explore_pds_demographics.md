---
title: PDS Demographics
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_demographics.html
summary: "The FHIR profiles used for the PDS Demographics event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the National Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##

The PDS Demographics event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| PDS Demographics Event Message Bundle |
|---------------------------------------|
| [NEMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Bundle-1)                              |
| [NEMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [NEMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-HealthcareService-1)                   |
| [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)                     |
| [NEMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Communication-1)                       |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Demographics data item name                                       | FHIR Resource         | FHIR element                           | Mandatory/Optional/Required |
|----------------------------------------------------------------|-----------------------|----------------------------------------|-----------------------------|
| Local Patient Identifier                                       | CareConnect-Patient-1 | identifier using localIdentifier slice | Mandatory                   |
| NHS Number                                                     | CareConnect-Patient-1 | identifier using NHSNumber slice       | Mandatory                   |
| Temporary NHS number issued by an NHAIS registration authority |                       | not yet profiled                       | Required                    |
| Name Type                                                      |                       | not yet profiled                       | Mandatory                   |
| Family Name                                                    | CareConnect-Patient-1 | name.family                            | Mandatory                   |
| First Given Name                                               | CareConnect-Patient-1 | name.given                             | Mandatory                   |
| Other given names (s)                                          | CareConnect-Patient-1 | name.given                             | Required                    |
| Name prefix                                                    | CareConnect-Patient-1 | name.prefix                            | Required                    |
| Name Suffix                                                    | CareConnect-Patient-1 | name.suffix                            | Required                    |
| Business Effective from date                                   | CareConnect-Patient-1 | name.period                            | Mandatory                   |
| Business Effective to date                                     | CareConnect-Patient-1 | name.period                            | Required                    |
| Gender                                                         | CareConnect-Patient-1 | gender                                 | Mandatory                   |
| Notified date                                                  | NEMS-Communication-1   | sent                                   | Required                    |
| Person birth date                                              | CareConnect-Patient-1 | birthDate                              | Required                    |
| Delivery Time                                                  | CareConnect-Patient-1 | patient-birthTime                      | Required                    |
| Notified date                                                  | NEMS-Communication-1   | sent                                   | Required                    |
| Town of Birth                                                  | CareConnect-Patient-1 | birthPlace                             | Required                    |
| County of Birth                                                | CareConnect-Patient-1 | birthPlace                             | Required                    |
| Country of Birth                                               | CareConnect-Patient-1 | birthPlace                             | Required                    |
| Notified date                                                  | NEMS-Communication-1   | sent                                   | Required                    |









