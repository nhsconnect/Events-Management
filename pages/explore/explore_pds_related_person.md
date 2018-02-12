---
title: PDS Related Person
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_pds_related_person.html
summary: "The FHIR profiles used for the PDS Related Person event message bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##

The PDS Related Person event message bundle is expected to include a combination of the following resources to support the event header and data item requirements:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| PDS Related Person Event Message Bundle |
|-----------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-EMS-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-PDS-RelatedPerson-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-PDS-RelatedPerson-1)                     |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| PDS Related Person data item name              | FHIR Resource       | FHIR element                                     | Mandatory/Optional/Required |
|------------------------------------------------|---------------------|--------------------------------------------------|-----------------------------|
| Related Person Role                            | EMS-PDS-RelatedPerson-1 | extension relatedPersonRole                                         | Mandatory                   |
| Relationship type                              | EMS-PDS-RelatedPerson-1 | relationship                                     | Mandatory                   |
| NHS Number                                     | EMS-PDS-RelatedPerson-1 | identifier using NHSNumber slice                 | Required                    |
| Contact ranking                                | EMS-PDS-RelatedPerson-1 | extension contactRanking                         | Required                    |
| Next of Kin indicator                          | EMS-PDS-RelatedPerson-1 | extension nextOfKinIndicator                     | Mandatory                   |
| Copy correspondence indicator                  | EMS-PDS-RelatedPerson-1 | extension copyCorrespondenceIndicator            | Required                    |
| Call centre call back consent                  | EMS-PDS-RelatedPerson-1 | extension callCentreCallbackConsent              | Required                    |
| Relationship Business Effective from date      | EMS-PDS-RelatedPerson-1 | period.start                                     | Mandatory                   |
| Relationship Business Effective to date        | EMS-PDS-RelatedPerson-1 | period.end                                       | Required                    |
| Name type                                      | EMS-PDS-RelatedPerson-1 | name.use                                         | Mandatory                   |
| Family name                                    | EMS-PDS-RelatedPerson-1 | name.family                                      | Mandatory                   |
| First given name                               | EMS-PDS-RelatedPerson-1 | name.given                                       | Required                    |
| Other given name(s)                            | EMS-PDS-RelatedPerson-1 | name.given                                       | Required                    |
| Name prefix                                    | EMS-PDS-RelatedPerson-1 | name.prefix                                      | Required                    |
| Name suffix                                    | EMS-PDS-RelatedPerson-1 | name.suffix                                      | Required                    |
| Address type                                   | EMS-PDS-RelatedPerson-1 | address.use                                      | Required                    |
| Address line                                   | EMS-PDS-RelatedPerson-1 | address.line                                     | Required                    |
| Postcode                                       | EMS-PDS-RelatedPerson-1 | address.postalCode                               | Required                    |
| PAF Key                                        |                     | not yet profiled                                 | Required                    |
| Address Business Effective from date           | EMS-PDS-RelatedPerson-1 | address.period.start                             | Mandatory                   |
| Address Business Effective to date             | EMS-PDS-RelatedPerson-1 | address.period.end                               | Required                    |
| Telecom usage                                  | EMS-PDS-RelatedPerson-1 | telecom.use                                      | Required                    |
| Communication contact method                   | EMS-PDS-RelatedPerson-1 | telecom.system                                   | Required                    |
| Communication contact string                   | EMS-PDS-RelatedPerson-1 | telecom.value                                    | Required                    |
| Telecommunication Business Effective from date | EMS-PDS-RelatedPerson-1 | telecom.period.start                             | Mandatory                   |
| Telecommunication Business Effective to date   | EMS-PDS-RelatedPerson-1 | telecom.period.end                               | Required                    |
| Language                                       | EMS-PDS-RelatedPerson-1 | extension nHSCommunication.language              | Mandatory                   |
| Interpreter required indicator                 | EMS-PDS-RelatedPerson-1 | extension relatedPersonCommunication.interpreter | Mandatory                   |
| Preferred contact method                       | EMS-PDS-RelatedPerson-1 | extension.preferredContactMethod                 | Mandatory                   |
| Preferred contact times                        | EMS-PDS-RelatedPerson-1 | extension.preferredContactTimes                  | Required                    |
| Preferred written communication format         | EMS-PDS-RelatedPerson-1 | extension.preferredWrittenCoomunicationFormat    | Required                    |











