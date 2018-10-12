---
title: EMS Event Header Information
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: explore_event_header_information.html
summary: "The standard event header information applicable to Events Management Service EMS event messages"
---

## Event Header Information ##

Each event message will carry a standard set of event header information:

|---------------------------------------------------------------------|
| Who this event is about e.g. NHS number, name, DOB                  |
| NHS Number                                                          |
| Date of Birth                                                       |
| Name                                                                |
| The type of event e.g. PDS Birth Notification, Failsafe Alert       |
| The service which originated the event e.g. PDS, Failsafe           |
| The service provider which originated the event                     |
| The IT system which holds the information that originated the event |
| The location in which the event occurred                            |
| When the communication occurred                                     |
| The publisher of the event                                          |
| When the event was published                                        |
| An originator/publisher unique publication reference                |

This page details the FHIR profiles and elements required for the event header information, and which event header information requirements they support.

![Event Header Resources Img](images\msg_architecture\event_header_information_bundle.png)

## EMS-MessageHeader-1

The messageHeader resource included as part of the event message should conform to the [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table bellow:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| id | 1..1 | An originator/publisher unique publication reference, which will use a UUID format |
| event | 1..1 | The type of event e.g. PDS Birth Notification, Failsafe Alert |
| timestamp | 1..1 | When the event was published |
| source | 1..1 | The IT system which holds the information that originated the event |


## EMS-Communication-1

The Communication resource included in the event message SHALL conform to the [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| sent | 1..1 | When the communication occurred |


## CareConnect-EMS-Patient-1

The patient resource included in the event message SHALL conform to the [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the `nhsNumber` identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the `official` name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |


## CareConnect-Organization-1

Multiple organization resources MAY be included as part of the event header information to fulfill the following requirements:

- to convey the service provider which originated the event
- to identify the publisher of the event

{% include important.html content="Where possible, resources within the EMS bundle will contain an absolute URL reference to an Organization resource, which can be retrieved as described in the [FHIR ODS Lookup API Implementation guide](https://developer.nhs.uk/apis/ods/restfulapis_identification_organization.html) rather than including the organization resource within the event message bundle." %}


The organization resources included in the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource |

