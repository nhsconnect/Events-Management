---
title: EMS Event Message Response Event Message Bundle
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_ems_event_response.html
summary: "The FHIR profiles used for the EMS Event Message Response Event Message Bundle"
---

## FHIR Profiles ##
The EMS Event Message Response message bundle will include a combination of the following resources to convey a success or failure response to an event message received by the Events Management Service:

| EMS Event Message Response Event Message Bundle       |
|-------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)                |
| [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1)                   |
| [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1)                     |
| [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1)                       |
| [EMS-EventMessageResponse-Task-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-EventMessageResponse-Task-1)                      |

## Data item requirements  ##

The data item requirements are expected to be fulfilled as below:

| EMS Event Message Rejection item       | FHIR profile                   | FHIR element               |
|----------------------|---------------------------------|-----------------------|
| Alerter              | EMS-Communication-1             | sender                |
| Date and Time raised | EMS-Communication-1             | sent                  |
| Response level       | EMS-EventMessageResponse-Task-1| input.responseLevel      |
| Message ID           | EMS-EventMessageResponse-Task-1 | input.messageID       |
| Line number          | EMS-EventMessageResponse-Task-1 | input.lineNumber      |
| Response ID          | EMS-EventMessageResponse-Task-1 | reason.coding.code    |
| Response Description | EMS-EventMessageResponse-Task-1 | reason.coding.display |
| Action Required      | EMS-EventMessageResponse-Task-1 | code                  |









