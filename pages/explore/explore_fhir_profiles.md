---
title: FHIR Profiles
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_fhir_profiles.html
summary: "The FHIR profiles used for NEMS event messages"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the National Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %} 

## Background ##
The NEMS Event Message Bundle will carry a combination of resources to form the specific event message, the FHIR profiles that have been developed to inform these resources are listed below. More on their use within each event message can be found in Messages. 

These FHIR profiles will be published to the [FHIR Reference Server](https://fhir.nhs.uk) on the [NHS Developer Network](https://developer.nhs.uk/) when formal release is confirmed.

## Use of CareConnect profiles in NEMS ##
Where listed, resources should conform to [the CareConnect FHIR profiles developed by INTEROPen](http://www.interopen.org/fhir-resource-profiles/). 

If further constraints are applied to support specific requirements, resources should conform to the profiles derived from the CareConnect profile.

## FHIR Profiles developed for NEMS ##

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| **StructureDefinitions**                                               |
|-----------------------------------------------------------------------|
| [NEMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Bundle-1)                                                          |
| [NEMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-MessageHeader-1)                                                   |
| [NEMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-HealthcareService-1)                                               |
| [NEMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/NEMS-Communication-1)                                                   |
| [FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/FailsafeAlert-Task-1)                                                  |
| [CareConnect-PDS-Flag-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-Flag-1)                                                |
| [CareConnect-Baby-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-Baby-Patient-1)                                            |
| [CareConnect-Mother-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-Mother-Patient-1)                                          |
| [CareConnect-PDS-GestationAge-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-GestationAge-Observation-1)                            |
| [CareConnect-PDS-BirthWeight-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-BirthWeight-Observation-1)                             |
| [CareConnect-PDS-NumberOfBirths-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-NumberOfBirths-Observation-1)                          |
| [CareConnect-PDS-StillbornIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-StillBornIndicator-Observation-1)                      |
| [CareConnect-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1) |
| [CareConnect-PDS-DeliveryPlace-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-DeliveryPlace-Organization-1)                          |
| [CareConnect-PDS-RegisteringAuthority-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-PDS-RegisteringAuthority-Organization-1)                   |
| [PDS-DeathNotification-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/PDS-PersonDeath-Communication-1)                                 |
| [PDS-GPRegistration-EpisodeOfCare-1](https://fhir.nhs.uk/STU3/StructureDefinition/PDS-GPRegistration-EpisodeOfCare-1)                            |
| [PDS-RelatedPerson-1](https://fhir.nhs.uk/STU3/StructureDefinition/PDS-RelatedPerson-1)                                                   |

| **Extensions**                                              |
|---------------------------------------------------------|
| [Extension-EMS-MessageEventType-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-MessageEventType-1)                        |
| [Extension-FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-FailsafeAlert-SeverityLevel-1)                 |
| [Extension-FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-FailsafeAlert-EscalationLevel-1)               |
| [Extension-CareConnect-PDS-NHSCommunication-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-PDS-NHSCommunication-1)            |
| [Extension-CareConnect-PDS-NHSNumberVerificationStatus-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-PDS-NHSNumberVerificationStatus-1) |
| [Extension-PDS-CallCentreCallBackConsent-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-CallCentreCallBackConsent-1)               |
| [Extension-PDS-ContactRanking-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-ContactRanking-1)                          |
| [Extension-PDS-CorrespondenceIndicator-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-CopyCorrespondenceIndicator-1)                 |
| [Extension-PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-DeathNotificationStatus-1)                 |
| [Extension-PDS-DeathCauseComment-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-DeathCauseComment-1)                       |
| [Extension-PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-DeathCauseIdentificationMethod-1)          |
| [Extension-PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-DeathLocationType-1)                       |
| [Extension-PDS-NextOfKinIndicator-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-NextOfKinIndicator-1)                      |
| [Extension-PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-PreferredContactMethod-1)                  |
| [Extension-PDS-PreferredContactTimes-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-PreferredContactTimes-1)                   |
| [Extension-PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-PreferredWrittenCommunicationFormat-1)     |
| [Extension-PDS-RelatedPersonRole-1 ](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-PDS-RelatedPersonRole-1)                      |


| **ValueSets**                                     |
|-----------------------------------------------|
| [NEMS-EventType-1](https://fhir.nhs.uk/STU3/ValueSet/NEMS-EventType-1)                               |
| [NEMS-HealthcareServiceType-1](https://fhir.nhs.uk/STU3/ValueSet/NEMS-HealthcareServiceType-1)                   |
| [NEMS-MessageEventType-1](https://fhir.nhs.uk/STU3/ValueSet/NEMS-MessageEventType-1)                        |
| [FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/ValueSet/FailsafeAlert-SeverityLevel-1)                 |
| [FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/ValueSet/FailsafeAlert-EscalationLevel-1)               |
| [FailsafeAlert-ServiceToAction-1](https://fhir.nhs.uk/STU3/ValueSet/FailsafeAlert-ServiceToAction-1)               |
| [FailsafeAlert-Reason-1](https://fhir.nhs.uk/STU3/ValueSet/FailsafeAlert-Reason-1)                        |
| [FailsafeAlert-ActionRequired-1](https://fhir.nhs.uk/STU3/ValueSet/FailsafeAlert-ActionRequired-1)                |
| [PDS-CallCentreCallbackConsent-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-CallCentreCallBackConsent-1)               |
| [PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-DeathCauseIdentificationMethod-1)          |
| [PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-DeathLocationType-1)                       |
| [PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-DeathNotificationStatus-1)                 |
| [PDS-DeliveryPlaceType-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-DeliveryPlaceType-1)                       |
| [PDS-InformationSensitivityIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-InformationSensitivityIndicator-1)         |
| [PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-PreferredContactMethod-1)                  |
| [PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-PreferredWrittenCommunicationFormat-1)     |
| [PDS-ReasonForRemoval-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-ReasonForRemoval-1)                        |
| [PDS-RegisteringAuthorityType-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-RegisteringAuthorityType-1)                |
| [PDS-RelatedPerson-Role-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-RelatedPersonRole-1)                      |
| [PDS-RelationshipType-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-RelationshipType-1)                      |
| [PDS-StillBornIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-StillBornIndicator-1)                      |
| [PDS-SuspectedCongenitalAbnormalityIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/PDS-SuspectedCongenitalAbnormalityIndicator-1) |



| **CodeSystems**                                 |
|-----------------------------------------------|
| [NEMS-EventType-1](https://fhir.nhs.uk/STU3/CodeSystem/NEMS-EventType-1)                               |
| [NEMS-HealthcareServiceType-1](https://fhir.nhs.uk/STU3/CodeSystem/NEMS-HealthcareServiceType-1)                   |
| [NEMS-MessageEventType-1](https://fhir.nhs.uk/STU3/CodeSystem/NEMS-MessageEventType-1)                        |
| [FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/FailsafeAlert-SeverityLevel-1)                 |
| [FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/FailsafeAlert-EscalationLevel-1)               |
| [FailsafeAlert-ServiceToAction-1](https://fhir.nhs.uk/STU3/CodeSystem/FailsafeAlert-ServiceToAction-1)               |
| [FailsafeAlert-Reason-1](https://fhir.nhs.uk/STU3/CodeSystem/FailsafeAlert-Reason-1)                        |
| [FailsafeAlert-ActionRequired-1](https://fhir.nhs.uk/STU3/CodeSystem/FailsafeAlert-ActionRequired-1)                |
| [PDS-CallCentreCallbackConsent-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-CallCentreCallBackConsent-1)               |
| [PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-DeathCauseIdentificationMethod-1)          |
| [PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-DeathLocationType-1)                       |
| [PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-DeathNotificationStatus-1)                 |
| [PDS-DeliveryPlaceType-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-DeliveryPlaceType-1)                       |
| [PDS-InformationSensitivityIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-InformationSensitivityIndicator-1)         |
| [PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-PreferredContactMethod-1)                  |
| [PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-PreferredWrittenCommunicationFormat-1)     |
| [PDS-ReasonForRemoval-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-ReasonForRemoval-1)                        |
| [PDS-RegisteringAuthorityType-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-RegisteringAuthorityType-1)                |
| [PDS-RelatedPerson-Role-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-RelatedPersonRole-1)                      |
| [PDS-RelationshipType-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-RelationshipType-1)                      |
| [PDS-StillBornIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-StillBornIndicator-1)                      |
| [PDS-SuspectedCongenitalAbnormalityIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/PDS-SuspectedCongenitalAbnormalityIndicator-1) |






