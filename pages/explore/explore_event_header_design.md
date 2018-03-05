---
title: EMS Event Header Design
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_event_header_design.html
summary: "The event header design for use with EMS event messages"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## Event header information ##
Each event message will carry a standard set of event header information to help identify the patient, publisher, and actual event, etc.

This event header information must of the following items and their corresponding FHIR profiles and elements:

| Requirement                                                         | Cardinality                           | FHIR Profile                                                                                                                  | FHIR element                                                                |
|---------------------------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Who this event is about e.g. NHS number, name, DOB                  | 1..1                                  | CareConnect-EMS-Patient-1                                                                                                         |                                                                             |
| NHS Number                                                          | 1..1                                  | as above                                                                                                                      | identifier using nhsNumber slice                                            |
| Date of Birth                                                       | 1..1                                  | as above                                                                                                                      | birthDate and patient-birthTime extension                                   |
| Name                                                                | 1..1                                  | as above                                                                                                                      | name                                                                        |
| The type of event e.g. PDS update, Failsafe Alert                   | 1..1                                  | EMS-MessageHeader-1                                                                                                           | event                                                                       |
| The service which originated the event e.g. PDS, Failsafe           | 0..1 (1..1 if clinical event message) | EMS-HealthcareService-1                                                                                                       | type                                                                        |
| The service provider which originated the event                     | 0..1 (1..1 if clinical event message) | CareConnect-Encounter-1.serviceProvider, or EMS-MessageHeader-1.responsible - reference to CareConnect-EMS-Organization-1 profile | CareConnect-EMS-Organization-1                                                  |
| The IT system which holds the information that originated the event | 1..1                                  | EMS-MessageHeader-1                                                                                                           | source                                                                      |
| The location in which the event occurred                            | 0..1 (1..1 if clinical event message) | CareConnect-Encounter-1.location - reference to CareConnect-Location-1 profile                                                | CareConnect-Location-1                                                      |
| When the event/communication occurred                               | 1..1                                  | CareConnect-Encounter/EMS-Communication-1                                                                                     | CareConnect-Encounter-1.period/EMS-MessageHeader-1.timestamp                |
| The publisher of the event                                          | 1..1                                  | EMS-MessageHeader-1                                                                                                           | responsible - reference to a CareConnect-EMS-Organization-1 resource            |
| When the event was published                                        | 1..1                                  | EMS-MessageHeader-1                                                                                                           | timestamp                                                                   |
| An originator/publisher unique publication reference                | 1..1                                  | EMS-MessageHeader-1                                                                                                           | The resource identifier for the MessageHeader, which will use a UUID format |

The remaining resources in the bundle depend on the event message type, see the [Messages](explore.html) section for more information.









