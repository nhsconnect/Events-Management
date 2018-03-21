---
title: EMS Event Message Response Event Message Bundle
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_ems_event_response.html
summary: "The FHIR profiles used for the EMS Event Message Response Event Message Bundle"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. It is advised not to develop against these specifications until a formal announcement has been made." %}

## FHIR Profiles ##
The EMS Event Message Response message bundle will include a combination of the following resources to convey a response to an event message received by the Events Management Service:

{% include important.html content="The links below will refer to the StructureDefinition url applied to the FHIR profile, which are not yet active. For queries please refer to the Help and Support section." %} 

| EMS Event Message Response Event Message Bundle       |
|-------------------------------------------|
| [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1)                              |
| [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1)                       |
| [CareConnect-EMS-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Organization-1)                |
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









