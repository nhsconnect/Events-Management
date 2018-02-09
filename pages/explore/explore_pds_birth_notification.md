---
title: PDS Birth Notification
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_birth_notification.html
summary: "The FHIR profiles used for the PDS Birth Notification event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##
The PDS Birth Notification event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| PDS Birth Notification Event Message Bundle                           |
|-----------------------------------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                                                          |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                   |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                                            |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                                                 |
| [CareConnect-PDS-EMS-Baby-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Baby-Patient-1)                                            |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                                                   |
| [CareConnect-EMS-PDS-Mother-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Mother-Patient-1)                                          |
| [EMS-PDS-GPRegistration-EpisodeOfCare-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-GPRegistration-EpisodeOfCare-1)                                    |
| [CareConnect-EMS-PDS-NumberOfBirths-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-NumberOfBirths-Observation-1)                             |
| [CareConnect-EMS-PDS-GestationAge-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-GestationAge-Observation-1)                            |
| [CareConnect-EMS-PDS-NumberOfBirths-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-NumberOfBirths-Observation-1)                          |
| [CareConnect-EMS-PDS-StillbornIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-StillBornIndicator-Observation-1)                      |
| [CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1) |
| [CareConnect-EMS-PDS-DeliveryPlace-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-DeliveryPlace-Organization-1)                          |
| [CareConnect-EMS-PDS-RegisteringAuthority-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-RegisteringAuthority-Organization-1)                   |
| [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)                                            |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Birth Notification data item name                   | FHIR Resource                                       | FHIR element                                      | Mandatory/Optional/Required |
|--------------------------------------------|-----------------------------------------------------|---------------------------------------------------|-----------------------------|
| NHS Number                                 | CareConnect-EMS-PDS-Baby-Patient-1                      | identifier using NHS Number slice                 | Mandatory                   |
| Name Type                                  | CareConnect-EMS-PDS-Baby-Patient-1                      | name.use                                          |                             |
| Family Name                                | CareConnect-EMS-PDS-Baby-Patient-1                      | name.family                                       | Required                    |
| First Given Name                           | CareConnect-EMS-PDS-Baby-Patient-1                      | name.given                                        | Required                    |
| Other given names (s)                      | CareConnect-EMS-PDS-Baby-Patient-1                      | name.given                                        | Required                    |
| Name prefix                                | CareConnect-EMS-PDS-Baby-Patient-1                      | name.prefix                                       | Required                    |
| Name Suffix                                | CareConnect-EMS-PDS-Baby-Patient-1                      | name.suffix                                       | Required                    |
| Name Business Effective from date          | CareConnect-EMS-PDS-Baby-Patient-1                      | name.period.start                                 | Required                    |
| Name Business Effective to date            | CareConnect-EMS-PDS-Baby-Patient-1                      | name.period.end                                   | Required                    |
| Gender                                     | CareConnect-EMS-PDS-Baby-Patient-1                      | gender                                            | Mandatory                   |
| Person birth date                          | CareConnect-EMS-PDS-Baby-Patient-1                      | birthDate                                         | Mandatory                   |
| Delivery Time                              | CareConnect-EMS-PDS-Baby-Patient-1                      | birthDate.patient-birthTime                       | Mandatory                   |
| Death Date                                 | CareConnect-EMS-PDS-Baby-Patient-1                      | deceased.dateTime                                 | Required                    |
| Death Time                                 | CareConnect-EMS-PDS-Baby-Patient-1                      | deceased.dateTime                                 | Required                    |
| Status of Death Notification               |                                                     | not yet profiled                                  | Required                    |
| Current Address Type                       | CareConnect-EMS-PDS-Baby-Patient-1                      | address.use                                       | Mandatory                   |
| Address Line                               | CareConnect-EMS-PDS-Baby-Patient-1                      | address.line                                      | Mandatory                   |
| Postcode                                   | CareConnect-EMS-PDS-Baby-Patient-1                      | address.postalCode                                | Required                    |
| PAF Key                                    |                                                     | not yet profiled                                  | Optional                    |
| Address Description                        |                                                     | not yet profiled                                  | Required                    |
| Business Effective From Date               | CareConnect-EMS-PDS-Baby-Patient-1                      | address.period.start                              | Required                    |
| Business Effective To Date                 | CareConnect-EMS-PDS-Baby-Patient-1                      | address.period.end                                | Required                    |
| Telecom Usage                              | CareConnect-EMS-PDS-Baby-Patient-1                      | telecom.use                                       | Required                    |
| Communication Contact Method               | CareConnect-EMS-PDS-Baby-Patient-1                      | telecom.system                                    | Required                    |
| Communication Contact string               | CareConnect-EMS-PDS-Baby-Patient-1                      | telecom.value                                     | Mandatory                   |
| Business Effective From Date               | CareConnect-EMS-PDS-Baby-Patient-1                      | telecom.period.start                              | Required                    |
| Business Effective To Date                 | CareConnect-EMS-PDS-Baby-Patient-1                      | telecom.period.end                                | Required                    |
| Birth Order                                | CareConnect-EMS-PDS-Baby-Patient-1                      | multipleBirth[x]                                  | Mandatory                   |
| Birth Weight                               | CareConnect-EMS-PDS-BirthWeight-Observation-1           | valueQuantity                                     | Mandatory                   |
| Town of Birth                              | CareConnect-EMS-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| County or District of Birth                | CareConnect-EMS-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| Country of Birth                           | CareConnect-EMS-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| Mother's NHS Number                        | CareConnect-EMS-PDS-Mother-Patient-1                    | identifier using NHS Number slice                 | Required                    |
| Mothers Date of Birth                      | CareConnect-EMS-PDS-Mother-Patient-1                    | birthDate                                         | Required                    |
| Mothers Family Name                        | CareConnect-EMS-PDS-Mother-Patient-1                    | name.family                                       | Mandatory                   |
| Mothers First Given Name                   | CareConnect-EMS-PDS-Mother-Patient-1                    | name.given                                        | Mandatory                   |
| Mothers Second Given Name                  | CareConnect-EMS-PDS-Mother-Patient-1                    | name.given                                        | Required                    |
| Mothers Primary Care Identifier            | CareConnect-Organization-1                          | identifier using appropriate ODS identifier slice | Required                    |
| Business Effective From Date               | EMS-PDS-GPRegistration-EpisodeOfCare-1                  | period.start                                      | Required                    |
| Business Effective To Date                 | EMS-PDS-GPRegistration-EpisodeOfCare-1                  | period.end                                        | Required                    |
| Patient Care Provision Type                |                                                     | not yet profiled                                  | Mandatory                   |
| Mothers GP Practice Name                   | CareConnect-Organization-1                          | name                                              | Required                    |
| Senior Partner Code                        | CareConnect-Practitioner-1                          | identifier                                        | Required                    |
| Senior Partner Name                        | CareConnect-Practitioner-1                          | name                                              | Required                    |
| GP Practice Line                           | CareConnect-Organization-1                          | address.line                                      | Mandatory                   |
| GP Postcode                                | CareConnect-Organization-1                          | address.postalCode                                | Required                    |
| Partner Child Health Organisation Code     | CareConnect-Organization-1                          | identifier                                        | Mandatory                   |
| Responsible Child Health Organisation Code | CareConnect-Organization-1                          | identifier                                        | Mandatory                   |
| Ethnic Category                            | CareConnect-EMS-PDS-Baby-Patient-1                      | ethnicCategory                                    | Mandatory                   |
| Delivery Place Code                        | CareConnect-EMS-PDS-DeliveryPlace-Organization-1        | identifier using appropriate ODS identifier slice | Required                    |
| Delivery Place Name                        | CareConnect-EMS-PDS-DeliveryPlace-Organization-1        | name                                              | Required                    |
| Notifying Person Family Name               | CareConnect-Practitioner-1                          | name.family                                       | Mandatory                   |
| First Given Name                           | CareConnect-Practitioner-1                          | name.given                                        | Mandatory                   |
| Second Name Given                          | CareConnect-Practitioner-1                          | name.given                                        | Required                    |
| Registering Authority Type                 | CareConnect-EMS-PDS-RegisteringAuthority-Organization-1 | type                                              | Mandatory                   |
| Organisation Identifier                    | CareConnect-EMS-PDS-RegisteringAuthority-Organization-1 | identifier using appropriate ODS identifier slice | Mandatory                   |


