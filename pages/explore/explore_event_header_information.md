---
title: EMS Event Header Information
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_event_header_information.html
summary: "The standard event header information applicable to Events Management Service EMS event messages"
---

## Event Header Information ##

Each event message will carry a standard set of event header information. The event header information items for communication event messages and their corresponding FHIR profiles and elements are detailed below.

## Event Header Information - Communications ##

| Requirement                                                         | Cardinality                           | FHIR Profile                                                                                                                  | FHIR element                                                                |
|---------------------------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Who this event is about e.g. NHS number, name, DOB                  | 1..1                                  | [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                                                                                                         |                                                                             |
| NHS Number                                                          | 1..1                                  | [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                                                                                                                      | identifier using 'nhsNumber' slice                                            |
| Date of Birth                                                       | 1..1                                  | [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                                                                                                                      | birthDate and patient-birthTime extension                                   |
| Name                                                                | 1..1                                  | [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                                                                                                                      | name using 'official' slice                                                                       |
| The type of event e.g. PDS Birth Notification, Failsafe Alert                   | 1..1                                  | [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                                                                           | event                                                                       |
| The service which originated the event e.g. PDS, Failsafe           | 0..1  | [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                                                                                                       | type                                                                        |
| The service provider which originated the event                     | 0..1  | [CareConnect-Organisation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) |                                                  |
| The IT system which holds the information that originated the event | 1..1                                  | [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                                                                           | source                                                                      |
| The location in which the event occurred                            | 0..1  | [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)                                                 |                                                       |
| When the communication occurred                               | 1..1                                  | [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                                                                                     | sent                |
| The publisher of the event                                          | 1..1                                  | [CareConnect-Organisation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                                                                                                            |            |
| When the event was published                                        | 1..1                                  | [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                                                                          | timestamp                                                                   |
| An originator/publisher unique publication reference                | 1..1                                  | [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                                                                                                            | The resource identifier for the MessageHeader, which will use a UUID format |


## Event header Information - Resources ##

An example of resources required to form the header component of the event message is given below, note there may be variations depending on the requirements of each event message:

- [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)
- [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)
- [CareConnect-Organisation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) representing the Service Provider
- [CareConnect-Organisation-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) representing the Publisher
- [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)
- [CareConnect-Location-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Location-1)
- [CareConnect-EMS-Patient](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)
- [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)


See [Bundle Structure](explore_bundle_structure.html) for a visual representation of the header component.








