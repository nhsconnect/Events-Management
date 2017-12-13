---
title: PDS Person Death   
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_person_death.html
summary: "The FHIR profiles used for the PDS Person Death event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. More detail is given in [Guide Versioning](/overview_guide_versioning.html). It is advised not to develop against these specifications until a formal announcement has been made." %}

## PDS Person Death event message bundle ##

The PDS Person Death event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

| PDS Person Death Event Message Bundle |
|---------------------------------------|
| EMS-Bundle                            |
| EMS-MessageHeader-1                   |
| CareConnect-Organization-1            |
| EMS-HealthcareService-1               |
| CareConnect-Patient-1                 |
| EMS-Communication-1                   |
| PDS-DeathNotification-Communication-1 |

The data item requirements are expected to be fulfilled as below:

| PDS Person Death data item name   | FHIR Resource                   | FHIR element                   | Mandatory/Optional/Required |
|-----------------------------------|---------------------------------|--------------------------------|-----------------------------|
| Death Date                        | CareConnect-Patient-1           | deceased                       | Mandatory                   |
| Death Time                        | CareConnect-Patient-1           | deceased                       | Mandatory                   |
| Notified Date                     | PDS-PersonDeath-Communication-1 | sent                           | Mandatory                   |
| Status of Death Notification      | PDS-PersonDeath-Communication-1 | personDeathStatus              | Required                    |
| Death Cause Comment               | PDS-PersonDeath-Communication-1 | deathCauseComment              | Required                    |
| Death Cause Identification Method | PDS-PersonDeath-Communication-1 | deathCauseIdentificationMethod | Required                    |
| Death Location Type               | PDS-PersonDeath-Communication-1 | deathLocationType              | Required                    |




