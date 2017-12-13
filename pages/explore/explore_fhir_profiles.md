---
title: FHIR Profiles
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_fhir_profiles.html
summary: "The FHIR profiles used for EMS event messages"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %} 

## Background ##
The EMS Event Message Bundle will carry a combination of resources to form the specific event message, the FHIR profiles that have been developed to inform these resources are listed below. More on their use within each event message can be found in Messages. 

These FHIR profiles will be published to the [FHIR Reference Server](https://fhir.nhs.uk) on the [NHS Developer Network](https://developer.nhs.uk/) when formal release is confirmed.

## Use of CareConnect profiles in EMS ##
Where listed, resources should conform to [the CareConnect FHIR profiles developed by INTEROPen](http://www.interopen.org/fhir-resource-profiles/). 

If further constraints are applied to support specific requirements, resources should conform to the profiles derived from the CareConnect profile.

## FHIR Profiles developed for EMS ##

| **StructureDefinitions**                                               |
|-----------------------------------------------------------------------|
| EMS-Bundle-1                                                          |
| EMS-MessageHeader-1                                                   |
| EMS-HealthcareService-1                                               |
| PDS-PreviousGPRegistration-EpisodeOfCare-1                            |
| FailsafeAlert-Task-1                                                  |
| EMS-Communication-1                                                   |
| CareConnect-PDS-Flag-1                                                |
| CareConnect-Baby-Patient-1                                            |
| CareConnect-Mother-Patient-1                                          |
| CareConnect-PDS-GestationAge-Observation-1                            |
| CareConnect-PDS-BirthWeight-Observation-1                             |
| CareConnect-PDS-NumberOfBirths-Observation-1                          |
| CareConnect-PDS-StillbornIndicator-Observation-1                      |
| CareConnect-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1 |
| CareConnect-PDS-DeliveryPlace-Organization-1                          |
| CareConnect-PDS-RegisteringAuthority-Organization-1                   |
| PDS-DeathNotification-Communication-1                                 |
| PDS-RelatedPerson-1                                                   |

| **Extensions**                                              |
|---------------------------------------------------------|
| Extension-EMS-MessageEventType-1                        |
| Extension-FailsafeAlert-SeverityLevel-1                 |
| Extension-FailsafeAlert-EscalationLevel-1               |
| Extension-PDS-DeathNotificationStatus-1                 |
| Extension-PDS-DeathCauseComment-1                       |
| Extension-PDS-DeathCauseIdentificationMethod-1          |
| Extension-PDS-DeathLocationType-1                       |
| Extension-PDS-ContactRanking-1                          |
| Extension-PDS-NextOfKinIndicator-1                      |
| Extension-PDS-CorrespondenceIndicator-1                 |
| Extension-PDS-CallCentreCallBackConsent-1               |
| Extension-PDS-PreferredContactMethod-1                  |
| Extension-PDS-PreferredContactTimes-1                   |
| Extension-PDS-PreferredWrittenCommunicationFormat-1     |
| Extension-PDS-RelatedPersonRole-1                       |
| Extension-CareConnect-PDS-NHSCommunication-1            |
| Extension-CareConnect-PDS-NHSNumberVerificationStatus-1 |

| **ValueSets**                                     |
|-----------------------------------------------|
| EMS-EventType-1                               |
| EMS-HealthcareServiceType-1                   |
| EMS-MessageEventType-1                        |
| FailsafeAlert-SeverityLevel-1                 |
| FailsafeAlert-EscalationLevel-1               |
| FailsafeAlert-ServiceToAction-1               |
| FailsafeAlert-Reason-1                        |
| FailsafeAlert-ActionRequired-1                |
| PDS-RelatedPerson-Role-1                      |
| PDS-CallCentreCallbackConsent-1               |
| PDS-PreferredContactMethod-1                  |
| PDS-PreferredWrittenCommunicationFormat-1     |
| PDS-DeathNotificationStatus-1                 |
| PDS-DeathCauseIdentificationMethod-1          |
| PDS-DeathLocationType-1                       |
| PDS-InformationSensitivityIndicator-1         |
| PDS-ReasonForRemoval-1                        |
| PDS-StillBornIndicator-1                      |
| PDS-SuspectedCongenitalAbnormalityIndicator-1 |
| PDS-DeliveryPlaceType-1                       |
| PDS-RegisteringAuthorityType-1                |

| **CodeSystems**                                 |
|-----------------------------------------------|
| EMS-EventType-1                               |
| EMS-HealthcareServiceType-1                   |
| EMS-MessageEventType-1                        |
| FailsafeAlert-SeverityLevel-1                 |
| FailsafeAlert-EscalationLevel-1               |
| FailsafeAlert-ServiceToAction-1               |
| FailsafeAlert-Reason-1                        |
| FailsafeAlert-ActionRequired-1                |
| PDS-RelatedPerson-Role-1                      |
| PDS-CallCentreCallbackConsent-1               |
| PDS-PreferredContactMethod-1                  |
| PDS-PreferredWrittenCommunicationFormat-1     |
| PDS-DeathNotificationStatus-1                 |
| PDS-DeathCauseIdentificationMethod-1          |
| PDS-DeathLocationType-1                       |
| PDS-InformationSensitivityIndicator-1         |
| PDS-ReasonForRemoval-1                        |
| PDS-StillBornIndicator-1                      |
| PDS-SuspectedCongenitalAbnormalityIndicator-1 |
| PDS-DeliveryPlaceType-1                       |
| PDS-RegisteringAuthorityType-1                |






