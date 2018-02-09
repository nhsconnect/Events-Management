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

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| **StructureDefinitions**                                               |
|-----------------------------------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                                                          |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                   |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                                               |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                                                   |
| [EMS-FailsafeAlert-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-FailsafeAlert-Task-1)                                                  |
| [CareConnect-EMS-PDS-Flag-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Flag-1)                                                |
| [CareConnect-PDS-EMS-Baby-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Baby-Patient-1)                                            |
| [CareConnect-EMS-PDS-Mother-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-Mother-Patient-1)                                          |
| [CareConnect-EMS-PDS-GestationAge-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-GestationAge-Observation-1)                            |
| [CareConnect-EMS-PDS-BirthWeight-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-BirthWeight-Observation-1)                             |
| [CareConnect-EMS-PDS-NumberOfBirths-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-NumberOfBirths-Observation-1)                          |
| [CareConnect-EMS-PDS-StillbornIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-StillBornIndicator-Observation-1)                      |
| [CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-SuspectedCongenitalAbnormalityIndicator-Observation-1) |
| [CareConnect-EMS-PDS-DeliveryPlace-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-DeliveryPlace-Organization-1)                          |
| [CareConnect-EMS-PDS-RegisteringAuthority-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-PDS-RegisteringAuthority-Organization-1)                   |
| [EMS-PDS-DeathNotification-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-PersonDeath-Communication-1)                                 |
| [EMS-PDS-GPRegistration-EpisodeOfCare-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-GPRegistration-EpisodeOfCare-1)                            |
| [EMS-PDS-RelatedPerson-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-RelatedPerson-1)                                                   |

| **Extensions**                                              |
|---------------------------------------------------------|
| [Extension-EMS-MessageEventType-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-MessageEventType-1)                        |
| [Extension-EMS-FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-FailsafeAlert-SeverityLevel-1)                 |
| [Extension-EMS-FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-FailsafeAlert-EscalationLevel-1)               |
| [Extension-CareConnect-EMS-PDS-NHSCommunication-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-EMS-PDS-NHSCommunication-1)            |
| [Extension-CareConnect-EMS-PDS-NHSNumberVerificationStatus-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-EMS-PDS-NHSNumberVerificationStatus-1) |
| [Extension-EMS-PDS-CallCentreCallBackConsent-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-CallCentreCallBackConsent-1)               |
| [Extension-EMS-PDS-ContactRanking-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-ContactRanking-1)                          |
| [Extension-EMS-PDS-CorrespondenceIndicator-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-CopyCorrespondenceIndicator-1)                 |
| [Extension-EMS-PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-DeathNotificationStatus-1)                 |
| [Extension-EMS-PDS-DeathCauseComment-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-DeathCauseComment-1)                       |
| [Extension-EMS-PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-DeathCauseIdentificationMethod-1)          |
| [Extension-EMS-PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-DeathLocationType-1)                       |
| [Extension-EMS-PDS-NextOfKinIndicator-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-NextOfKinIndicator-1)                      |
| [Extension-EMS-PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-PreferredContactMethod-1)                  |
| [Extension-EMS-PDS-PreferredContactTimes-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-PreferredContactTimes-1)                   |
| [Extension-EMS-PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-PreferredWrittenCommunicationFormat-1)     |
| [Extension-EMS-PDS-RelatedPersonRole-1 ](https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-PDS-RelatedPersonRole-1)                      |


| **ValueSets**                                     |
|-----------------------------------------------|
| [EMS-EventType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-EventType-1)                               |
| [EMS-HealthcareServiceType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-HealthcareServiceType-1)                   |
| [EMS-MessageEventType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-MessageEventType-1)                        |
| [EMS-FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-FailsafeAlert-SeverityLevel-1)                 |
| [EMS-FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-FailsafeAlert-EscalationLevel-1)               |
| [EMS-FailsafeAlert-ServiceToAction-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-FailsafeAlert-ServiceToAction-1)               |
| [EMS-FailsafeAlert-Reason-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-FailsafeAlert-Reason-1)                        |
| [EMS-FailsafeAlert-ActionRequired-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-FailsafeAlert-ActionRequired-1)                |
| [EMS-PDS-CallCentreCallbackConsent-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-CallCentreCallBackConsent-1)               |
| [EMS-PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-DeathCauseIdentificationMethod-1)          |
| [EMS-PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-DeathLocationType-1)                       |
| [EMS-PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-DeathNotificationStatus-1)                 |
| [EMS-PDS-DeliveryPlaceType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-DeliveryPlaceType-1)                       |
| [EMS-PDS-InformationSensitivityIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-InformationSensitivityIndicator-1)         |
| [EMS-PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-PreferredContactMethod-1)                  |
| [EMS-PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-PreferredWrittenCommunicationFormat-1)     |
| [EMS-PDS-ReasonForRemoval-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-ReasonForRemoval-1)                        |
| [EMS-PDS-RegisteringAuthorityType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-RegisteringAuthorityType-1)                |
| [EMS-PDS-RelatedPerson-Role-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-RelatedPersonRole-1)                      |
| [EMS-PDS-RelationshipType-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-RelationshipType-1)                      |
| [EMS-PDS-StillBornIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-StillBornIndicator-1)                      |
| [EMS-PDS-SuspectedCongenitalAbnormalityIndicator-1](https://fhir.nhs.uk/STU3/ValueSet/EMS-PDS-SuspectedCongenitalAbnormalityIndicator-1) |



| **CodeSystems**                                 |
|-----------------------------------------------|
| [EMS-EventType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-EventType-1)                               |
| [EMS-HealthcareServiceType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-HealthcareServiceType-1)                   |
| [EMS-MessageEventType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-MessageEventType-1)                        |
| [EMS-FailsafeAlert-SeverityLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlert-SeverityLevel-1)                 |
| [EMS-FailsafeAlert-EscalationLevel-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlert-EscalationLevel-1)               |
| [EMS-FailsafeAlert-ServiceToAction-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlert-ServiceToAction-1)               |
| [EMS-FailsafeAlert-Reason-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlert-Reason-1)                        |
| [EMS-FailsafeAlert-ActionRequired-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-FailsafeAlert-ActionRequired-1)                |
| [EMS-PDS-CallCentreCallbackConsent-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-CallCentreCallBackConsent-1)               |
| [EMS-PDS-DeathCauseIdentificationMethod-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-DeathCauseIdentificationMethod-1)          |
| [EMS-PDS-DeathLocationType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-DeathLocationType-1)                       |
| [EMS-PDS-DeathNotificationStatus-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-DeathNotificationStatus-1)                 |
| [EMS-PDS-DeliveryPlaceType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-DeliveryPlaceType-1)                       |
| [EMS-PDS-InformationSensitivityIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-InformationSensitivityIndicator-1)         |
| [EMS-PDS-PreferredContactMethod-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-PreferredContactMethod-1)                  |
| [EMS-PDS-PreferredWrittenCommunicationFormat-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-PreferredWrittenCommunicationFormat-1)     |
| [EMS-PDS-ReasonForRemoval-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-ReasonForRemoval-1)                        |
| [EMS-PDS-RegisteringAuthorityType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-RegisteringAuthorityType-1)                |
| [EMS-PDS-RelatedPerson-Role-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-RelatedPersonRole-1)                      |
| [EMS-PDS-RelationshipType-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-RelationshipType-1)                      |
| [EMS-PDS-StillBornIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-StillBornIndicator-1)                      |
| [EMS-PDS-SuspectedCongenitalAbnormalityIndicator-1](https://fhir.nhs.uk/STU3/CodeSystem/EMS-PDS-SuspectedCongenitalAbnormalityIndicator-1) |






