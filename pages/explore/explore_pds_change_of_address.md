---
title: PDS Change of Address 
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_change_of_address.html
summary: "The FHIR profiles used for the PDS Change of Address event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## PDS Change of Address event message bundle ##

The PDS Change of Address Bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Change of Address Event Message Bundle |
|--------------------------------------------|
| EMS-Bundle                                 |
| EMS-MessageHeader-1                        |
| CareConnect-Organization-1                 |
| EMS-HealthcareService-1                    |
| CareConnect-Patient-1                      |
| EMS-Communication-1                        |

The data item requirements are expected to be fulfilled as below:

| PDS Change of Address data item name | FHIR Resource         | FHIR element         | Mandatory/Optional/Required |
|--------------------------------------|-----------------------|----------------------|-----------------------------|
| Current Address Type                 | CareConnect-Patient-1 | address.use          | Mandatory                   |
| Address Line 1 or 2                  |                       | address.line         | Mandatory                   |
| Address Line 3                       |                       | address.line         | Mandatory                   |
| Address Line 4                       | CareConnect-Patient-1 | address.line         | Optional                    |
| Address Line 5                       | CareConnect-Patient-1 | address.line         | Mandatory                   |
| Postcode                             | CareConnect-Patient-1 | address.postalcode   | Optional                    |
| PAF Key                              |                       | not yet profiled     | Required                    |
| Address Description                  |                       | not yet profiled     | Optional                    |
| Address Effective From Date          | CareConnect-Patient-1 | address.period.start | Required                    |
| Address Effective To Date            | CareConnect-Patient-1 | address.period.end   | Mandatory                   |
| Previous Address Type                | CareConnect-Patient-1 | address.use          | Optional                    |
| Previous Address                     | CareConnect-Patient-1 | address.line         | Mandatory                   |
| Previous Postcode                    | CareConnect-Patient-1 | address.postalCode   | Mandatory                   |
| Previous Address Description         |                       | not yet profiled     | Mandatory                   |
| Previous Address Effective From Date |                       | address.period.start | Required                    |
| Previous Address Effective To Date   | CareConnect-Patient-1 | address.period.end   | Required                    |
| Country of Birth                     | CareConnect-Patient-1 | birthPlace           | Mandatory                   |
| Notified date                        | EMS-Communication-1   | sent                 | Optional                    |










