---
title: PDS Communication Preferences
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_communication_preferences.html
summary: "The FHIR profiles used for the PDS Communication Preferences event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## PDS Communication Preferences event message bundle ##

The PDS Communication Preferences event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Communication Preferences Event Message Bundle |
|----------------------------------------------------|
| EMS-Bundle                                         |
| EMS-MessageHeader-1                                |
| CareConnect-Organization-1                         |
| EMS-HealthcareService-1                            |
| CareConnect-Patient-1                              |
| EMS-Communication-1                                |

The data item requirements are expected to be fulfilled as below:

| PDS Communication Preferences data item name | FHIR Resource         | FHIR element                         | Mandatory/Optional/Required |
|----------------------------------------------|-----------------------|--------------------------------------|-----------------------------|
| Language                                     | CareConnect-Patient-1 | nHSCommunication.language            | Mandatory                   |
| Interpreter Required Indicator               | CareConnect-Patient-1 | nHSCommunication.interpreterRequired | mandatory                   |







