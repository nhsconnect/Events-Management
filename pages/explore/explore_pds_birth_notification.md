---
title: PDS Birth Notification
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_birth_notification.html
summary: "The FHIR profiles used for the PDS Birth Notification event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. More detail is given in [Guide Versioning](/overview_guide_versioning.html). It is advised not to develop against these specifications until a formal announcement has been made." %}

## PDS Birth Notification event message bundle ##

The PDS Birth Notification event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Birth Notification Event Message Bundle                           |
|-----------------------------------------------------------------------|
| EMS-Bundle                                                            |
| EMS-MessageHeader-1                                                   |
| CareConnect-Organization-1                                            |
| EMS-HealthcareService-1                                               |
| CareConnect-Baby-Patient-1                                            |
| EMS-Communication-1                                                   |
| CareConnect-Mother-Patient-1                                          |
| PDS-GPRegistration-EpisodeOfCare-1                                    |
| CareConnect-PDS-BirthWeight-Observation-1                             |
| CareConnect-PDS-GestationAge-Observation-1                            |
| CareConnect-PDS-NumberOfBirths-Observation-1                          |
| CareConnect-PDS-StillbornIndicator-Observation-1                      |
| CareConnect-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1 |
| CareConnect-PDS-DeliveryPlace-Organization-1                          |
| CareConnect-Practitioner-1                                            |
| CareConnect-PDS-RegisteringAuthority-Organization-1                   |

The data item requirements are expected to be fulfilled as below:

| PDS Birth Notification data item name                   | FHIR Resource                                       | FHIR element                                      | Mandatory/Optional/Required |
|--------------------------------------------|-----------------------------------------------------|---------------------------------------------------|-----------------------------|
| NHS Number                                 | CareConnect-PDS-Baby-Patient-1                      | identifier using NHS Number slice                 | Mandatory                   |
| Name Type                                  | CareConnect-PDS-Baby-Patient-1                      | name.use                                          |                             |
| Family Name                                | CareConnect-PDS-Baby-Patient-1                      | name.family                                       | Required                    |
| First Given Name                           | CareConnect-PDS-Baby-Patient-1                      | name.given                                        | Required                    |
| Other given names (s)                      | CareConnect-PDS-Baby-Patient-1                      | name.given                                        | Required                    |
| Name prefix                                | CareConnect-PDS-Baby-Patient-1                      | name.prefix                                       | Required                    |
| Name Suffix                                | CareConnect-PDS-Baby-Patient-1                      | name.suffix                                       | Required                    |
| Name Business Effective from date          | CareConnect-PDS-Baby-Patient-1                      | name.period.start                                 | Required                    |
| Name Business Effective to date            | CareConnect-PDS-Baby-Patient-1                      | name.period.end                                   | Required                    |
| Gender                                     | CareConnect-PDS-Baby-Patient-1                      | gender                                            | Mandatory                   |
| Person birth date                          | CareConnect-PDS-Baby-Patient-1                      | birthDate                                         | Mandatory                   |
| Delivery Time                              | CareConnect-PDS-Baby-Patient-1                      | birthDate.patient-birthTime                       | Mandatory                   |
| Death Date                                 | CareConnect-PDS-Baby-Patient-1                      | deceased.dateTime                                 | Required                    |
| Death Time                                 | CareConnect-PDS-Baby-Patient-1                      | deceased.dateTime                                 | Required                    |
| Status of Death Notification               |                                                     | not yet profiled                                  | Required                    |
| Current Address Type                       | CareConnect-PDS-Baby-Patient-1                      | address.use                                       | Mandatory                   |
| Address Line                               | CareConnect-PDS-Baby-Patient-1                      | address.line                                      | Mandatory                   |
| Postcode                                   | CareConnect-PDS-Baby-Patient-1                      | address.postalCode                                | Required                    |
| PAF Key                                    |                                                     | not yet profiled                                  | Optional                    |
| Address Description                        |                                                     | not yet profiled                                  | Required                    |
| Business Effective From Date               | CareConnect-PDS-Baby-Patient-1                      | address.period.start                              | Required                    |
| Business Effective To Date                 | CareConnect-PDS-Baby-Patient-1                      | address.period.end                                | Required                    |
| Telecom Usage                              | CareConnect-PDS-Baby-Patient-1                      | telecom.use                                       | Required                    |
| Communication Contact Method               | CareConnect-PDS-Baby-Patient-1                      | telecom.system                                    | Required                    |
| Communication Contact string               | CareConnect-PDS-Baby-Patient-1                      | telecom.value                                     | Mandatory                   |
| Business Effective From Date               | CareConnect-PDS-Baby-Patient-1                      | telecom.period.start                              | Required                    |
| Business Effective To Date                 | CareConnect-PDS-Baby-Patient-1                      | telecom.period.end                                | Required                    |
| Birth Order                                | CareConnect-PDS-Baby-Patient-1                      | multipleBirth[x]                                  | Mandatory                   |
| Birth Weight                               | CareConnect-PDS-BirthWeight-Observation-1           | valueQuantity                                     | Mandatory                   |
| Town of Birth                              | CareConnect-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| County or District of Birth                | CareConnect-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| Country of Birth                           | CareConnect-PDS-Baby-Patient-1                      | birthPlace                                        | Required                    |
| Mother's NHS Number                        | CareConnect-PDS-Mother-Patient-1                    | identifier using NHS Number slice                 | Required                    |
| Mothers Date of Birth                      | CareConnect-PDS-Mother-Patient-1                    | birthDate                                         | Required                    |
| Mothers Family Name                        | CareConnect-PDS-Mother-Patient-1                    | name.family                                       | Mandatory                   |
| Mothers First Given Name                   | CareConnect-PDS-Mother-Patient-1                    | name.given                                        | Mandatory                   |
| Mothers Second Given Name                  | CareConnect-PDS-Mother-Patient-1                    | name.given                                        | Required                    |
| Mothers Primary Care Identifier            | CareConnect-Organization-1                          | identifier using appropriate ODS identifier slice | Required                    |
| Business Effective From Date               | PDS-GPRegistration-EpisodeOfCare-1                  | period.start                                      | Required                    |
| Business Effective To Date                 | PDS-GPRegistration-EpisodeOfCare-1                  | period.end                                        | Required                    |
| Patient Care Provision Type                |                                                     | not yet profiled                                  | Mandatory                   |
| Mothers GP Practice Name                   | CareConnect-Organization-1                          | name                                              | Required                    |
| Senior Partner Code                        | CareConnect-Practitioner-1                          | identifier                                        | Required                    |
| Senior Partner Name                        | CareConnect-Practitioner-1                          | name                                              | Required                    |
| GP Practice Line                           | CareConnect-Organization-1                          | address.line                                      | Mandatory                   |
| GP Postcode                                | CareConnect-Organization-1                          | address.postalCode                                | Required                    |
| Partner Child Health Organisation Code     | CareConnect-Organization-1                          | identifier                                        | Mandatory                   |
| Responsible Child Health Organisation Code | CareConnect-Organization-1                          | identifier                                        | Mandatory                   |
| Ethnic Category                            | CareConnect-PDS-Baby-Patient-1                      | ethnicCategory                                    | Mandatory                   |
| Delivery Place Code                        | CareConnect-PDS-DeliveryPlace-Organization-1        | identifier using appropriate ODS identifier slice | Required                    |
| Delivery Place Name                        | CareConnect-PDS-DeliveryPlace-Organization-1        | name                                              | Required                    |
| Notifying Person Family Name               | CareConnect-Practitioner-1                          | name.family                                       | Mandatory                   |
| First Given Name                           | CareConnect-Practitioner-1                          | name.given                                        | Mandatory                   |
| Second Name Given                          | CareConnect-Practitioner-1                          | name.given                                        | Required                    |
| Registering Authority Type                 | CareConnect-PDS-RegisteringAuthority-Organization-1 | type                                              | Mandatory                   |
| Organisation Identifier                    | CareConnect-PDS-RegisteringAuthority-Organization-1 | identifier using appropriate ODS identifier slice | Mandatory                   |


