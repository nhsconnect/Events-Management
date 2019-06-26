---
title: Event Header Information
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: explore_event_header_information.html
summary: "The standard event header information applicable to National Events Management Service event messages"
---

## Event Header Information

Each event message will carry a standard set of event header information:

- Patient NHS Number
- Patient Details
- The type of event e.g. PDS Birth Notification, Failsafe Alert
- Details of the service which published the event e.g. PDS, Failsafe
- When the event was published

This page provides an overview of the core FHIR profiles and elements required for as part of the event header information. Additional guidance and requirements are outlined in the [event messages](overview_supported_events.html) specific guidance.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/event_header_information_bundle.png" target="_blank"><img src="images/messages/event_header_information_bundle.png"></a>
	Event Message Bundle - Header Resources <a href="images/messages/event_header_information_bundle.png" target="_blank">(open in new TAB)</a>
</div>


## [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

The event Bundle resource which contains the event message resources SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) base FHIR profile and be of type `message`.

This follows the [HL7 FHIR specification](http://hl7.org/fhir/bundle.html#message) for the Bundle resource when being used for messaging, which states that 'A message bundle (type = "message") consists of a series of entries, the first of which is a MessageHeader.'


## [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The MessageHeader resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table bellow:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.versionId | 0..1 | **Message Sequencing** - A sequence number for the purpose of ordering messages for processing. The sequence number must be an integer which is patient and event-type specific and the publisher must increment the sequence number each time a new event of the same type is issued by the same system for the same patient. |
| meta.lastUpdated | 0..1 | **Message Sequencing** - A FHIR instant (time stamp with sub-second accuracy) which represents the point in time that the change occurred which should be used for ordering messages for processing. |
| extension(eventMessageType) | 1..1 | The type value which shall appear in this element will be defined within the separate event message implementation guide for each of the event messages, as the value will depend on the life cycle of the specific event message. |
| id | 1..1 | An originator/publisher unique publication reference, which will use a UUID format |
| event | 1..1 | **Event Type** - The type of event as specified within the event message implementation guides, e.g. PDS Birth Notification, Failsafe Alert |
| source | 1..1 | The IT system which holds the information that originated the event |
| source.name | 1..1 | A human readable name for the IT system which holds the information that originated the event |
| responsible | 1..1 | A reference to the organization resource which represents the organization responsible for the event. |
| focus | 1..1 | The focus element will reference a resource as defined by the event message specific implementation guide for each specific event message. |


## Resource

The FHIR resource referenced by the `focus` element within the `MessageHeader` will be defined within the individual event message implementation guides for the event message being published. This resource will contain a `subject` element pointing to a Patient resource which represents the patient who is the focus of the event message.


## [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the `nhsNumber` identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the `official` name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |
| address | 0..* | If an address is included in the patient resource the publisher **SHALL** included as a minimum the `text` element containing the full address. The address SHOULD also be included as structured data if all elements of the address can be populated, a minimum of the `line` and `postalCode` elements are required. |


## [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

Multiple organisations may be referenced from the event message. Organisations are included as part of the event header information to fulfil the following requirements:

- to convey the service provider which originated the event
- to identify the publisher of the event

### Referencing the ODS API

When referencing an organisation from an event message, the publisher constructing the event message SHOULD use an absolute URL reference to an Organization resource stored on the Spine directory, which can be retrieved as described in the [FHIR ODS Lookup API Implementation guide](https://developer.nhs.uk/apis/ods/restfulapis_identification_organization.html), rather than including the Organization resource within the message bundle.

The benefit of referencing the organisation resource on the Spine directory is that the information relating to that organisation such as contact details will be kept up to date. If the organisation information is included in the event message bundle as a resource the details for that organisation will become out of date.

Within the resource referencing out to the Organization resource, the `Reference` type element SHALL include:

- the `reference` with the absolute url to the Organization on the ODS API
- the `display` element within the reference with a human readable string representation of the organisation which subscribers can use if they with to display the organisation to a user


### Including an Organization resource

Where there is reason to include the Organization resource within the message bundle the following population requirements SHALL be followed:

The organization resources included to fulfill the event header requirements SHALL represent legally recognised organization which have an ODS code. The organization resources included in the event message SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource |
| identifier | 1..1 | The organization ODS code SHALL be included within the `odsOrganizationCode` identifier slice |
| telecom | 1..* | The organization resource SHALL include a contact number for the organization |
