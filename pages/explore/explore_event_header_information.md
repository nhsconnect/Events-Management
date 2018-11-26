---
title: NEMS Event Header Information
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: explore_event_header_information.html
summary: "The standard event header information applicable to National Events Management Service event messages"
---

## Event Header Information ##

Each event message will carry a standard set of event header information:

|---------------------------------------------------------------------|
| Patient NHS Number                                                  |
| Patient Date of Birth                                               |
| Patient Name                                                        |
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

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/msg_architecture/event_header_information_bundle.png" target="_blank"><img src="images/msg_architecture/event_header_information_bundle.png"></a>
	Event Message Bundle - Header Resources <a href="images/msg_architecture/event_header_information_bundle.png" target="_blank">(open in new TAB)</a>
</div>

## EMS-MessageHeader-1

The messageHeader resource included as part of the event message SHALL conform to the [EMS-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table bellow:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| extension(eventMessageType) | 1..1 | The type value which shall appear in this element will be defined within the separate event message implementation guide for each of the event messages, as the value will depend on the life cycle of the specific event message. |
| id | 1..1 | An originator/publisher unique publication reference, which will use a UUID format |
| event | 1..1 | The type of event as specified within the event message implementation guides, e.g. PDS Birth Notification, Failsafe Alert |
| source | 1..1 | The IT system which holds the information that originated the event |
| source.name | 1..1 | A human readable name for the IT system which holds the information that originated the event |
| responsible | 1..1 | A reference to the organization resource which represents the organization responsible for the event. |
| focus | 1..1 | The focus element will reference a resource as defined by the event message specific implementation guide for each specific event message. |


## EMS-Communication-1

The Communication resource included in the event message SHALL conform to the [EMS-Communication-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Communication-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | The status element will be specified within the specific event message implementation guide as it will relate the event message life cycle. |
| sent | 1..1 | When the communication occurred |
| payload | 1..1 | The payload element will reference a resource relating to the event message. The event message implementation guide will define what resource should be referenced for each event message. |


## EMS-HealthcareService-1

The HealthcareService resource included in the event message SHALL conform to the [EMS-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-HealthcareService-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| providedBy | 1..1 | A reference to an organization resource representing the managing organisation of the service which triggered this event message. |
| type | 1..1 | This element SHALL represent the ServiceType of the organisation that triggered the publication of the event message. |


## CareConnect-EMS-Patient-1

The patient resource included in the event message SHALL conform to the [CareConnect-EMS-Patient-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-EMS-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the `nhsNumber` identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the `official` name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |
| address | 0..* | If an address is included in the patient resource the publisher **SHALL** included as a minimum the `text` element containing the full address. The address SHOULD also be included as structured data if all elements of the address can be populated, a minimum of the `line` and `postalCode` elements are required. |


## CareConnect-Organization-1

Multiple organisations may be referenced from the event message. Organisations are included as part of the event header information to fulfil the following requirements:

- to convey the service provider which originated the event
- to identify the publisher of the event

### Referencing the ODS API

When referencing an organisation from an event message, the publisher constructing the event message SHALL aim to use an absolute URL reference to an Organization resource stored on the Spine directory, which can be retrieved as described in the [FHIR ODS Lookup API Implementation guide](https://developer.nhs.uk/apis/ods/restfulapis_identification_organization.html), rather than including the Organization resource within the message bundle.

The benefit of referencing the organisation resource on the Spine directory is that the information relating to that organisation such as contact details will be kept up to date. If the organisation information is included in the event message bundle as a resource the details for that organisation will become out of date.

Within the resource referencing out to the Organization resource, the `Reference` type element SHALL include:

- the `reference` with the absolute url to the Organization on the ODS API
- the `display` element within the reference with a human readable string representation of the organisation which subscribers can use if they with to display the organisation to a user


### Including an Organization resource

Where there is reason to include the Organization resource within the message bundle the following population requirements SHALL be followed:

The organization resources referenced from within the event message SHALL represent legally recognised organization which have an ODS code. The organization resources included in the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource |
| identifier | 1..1 | The organization ODS code SHALL be included within the `odsOrganizationCode` identifier slice |
| telecom | 1..* | The organization resource SHALL include a contact number for the organization |
