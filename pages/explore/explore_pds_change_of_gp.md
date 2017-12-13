---
title: PDS Change of GP 
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_change_of_gp.html
summary: "The FHIR profiles used for the PDS Change of GP event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. More detail is given in [Guide Versioning](/overview_guide_versioning.html). It is advised not to develop against these specifications until a formal announcement has been made." %}

## PDS Change of GP event message bundle ##

The PDS Change of GP event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Change of GP Event Message Bundle |
|---------------------------------------|
| EMS-Bundle                            |
| EMS-MessageHeader-1                   |
| CareConnect-Organization-1            |
| EMS-HealthcareService-1               |
| CareConnect-Patient-1                 |
| EMS-Communication-1                   |
| PDS-GPRegistration-EpisodeOfCare-1    |

The data item requirements are expected to be fulfilled as below:

| PDS Change of GP data item name           | FHIR Resource              | FHIR element              | Mandatory/Optional/Required |
|-------------------------------------------|----------------------------|---------------------------|-----------------------------|
| Current GP Practice Code                  | CareConnect-Organization-1 | identifier using ODS Code | Mandatory                   |
| Commissioning organisation of current GP  | CareConnect-Organization-1 | identifier using ODS Code | Mandatory                   |
| Previous GP Practice Code                 | CareConnect-Organization-1 | identifier using ODS Code | Mandatory                   |
| Commissioning organisation of previous GP | CareConnect-Organization-1 | identifier using ODS Code | Mandatory                   |



