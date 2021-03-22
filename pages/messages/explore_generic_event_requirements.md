---
title: Generic Event Message Requirements
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: explore_generic_event_requirements.html
summary: "These are a set of generic requirements applicable to all event messages passing through the NEMS."
---

## Glossary of terms ##

The following terms are used throughout the Messages specifications:

| Term                    | Description                                       |
|-------------------------|---------------------------------------------------|
| Healthcare Professional | The care professional / clinician / health worker |
| Individual              | The parent/carer for the patient                  |
| Person                  | The patient                                       |

## Event Message Structure ##

Each event message which passes through the NEMS will carry a standard set of event information to allow the receiver to identify:
- the patient who is the focus of the event
- information about the provider who published the event message, including [contact details](overview_msg_architecture_feedback.html) for issues with the event message
- information about the event that occurred
- information to allow receivers to perform [message sequencing](overview_msg_architecture_sequencing.html)

All event messages will be wrapped in a FHIR bundle resource of type `message` and therefore will also include a `MessageHeader` resource as the first resource in the bundle. Other resources included in the event message bundle may appear in any order, subscribers should not assume any set order based on the order of requirements and resources within this specification.

The `MessageHeader` resource will contain the NHS Number, Forename, Surname and Date of Birth of the patient who is the focus of the event message, these details are used by the NEMS to perform subscription matching.

This page provides common FHIR resource population requirements for all event messages, which should be followed in addition to the requirements outlined in the individual [event message specific](overview_supported_events.html) guidance pages.

## New, Update, Delete and use of Identifiers ##

The `MessageHeader` resource in all event messages contain the `messageEventType` extension that indicates if the event message is a `new`, `update` or `delete` version of the event message. This element and its value  indicates if this event relates to new information, a change to the information sent in a previous event or a delete of information previously sent.

As this extension allows for subsequent changes to information to be sent by publishers, it is necessary for a consumer to be able to link the information sent in one message with the information sent in another message. To do this the individual bits of information in the event message need to have identifiers which are persisted across event messages by the publisher and can be used by the subscriber.

## Message ID ##

The event message ID sent within the `MessageHeader.id` element must be unique to that specific event message, for use in support functions (e.g. I received event message xyz and there’s a problem with it) and for duplicate message identification by subscribers. The message ID should not be re-used within subsequent event messages or referenced from `update` and `delete` event messages.

## Identifiers ##

`identifier` elements present within resources should be used to link data between event messages, for the purposes of managing updates and deletes.

For example, if a `new` event message is published containing a `Procedure` resource, representing a test performed on the patient, this procedure should contain an `identifier` (which could be an internal supplier ID). If an update is made to that test information within the publishing system, then the publishing system would be able to publish an `update` event message containing the updated `Procedure` resource with the same `identifier`, allowing the consumer to link the data to the data sent in the previous event message.

## Use of New, Update and Delete ##

Publishers MUST use the appropriate `messageEventType` values to indicate the information that is being published. For example a publisher must not use a `new` message to send an update to a previously sent data.

## Resource Population ##

### Element order in Resources

{% include important.html content="The order of elements in resources must conform to the FHIR resource schemas" %}

The base FHIR resource schemas contain the “xs:sequence” tag which indicates the elements must be in the specified order. The CareConnect profiles which we use in the NEMS spec are built on these base FHIR resources, so the event messages must be valid against these schemas to be compliant with the NEMS publisher requirements. The FHIR Schema for each of the different resources can be found on the individual HL7 base FHIR resource pages.

Examples:

**MessageHeader**

| Resource Page | [https://www.hl7.org/fhir/stu3/messageheader.html](https://www.hl7.org/fhir/stu3/messageheader.html) |
| Schema | [https://www.hl7.org/fhir/stu3/messageheader.xsd](https://www.hl7.org/fhir/stu3/messageheader.xsd) |


**Patient**

| Resource | [https://www.hl7.org/fhir/stu3/patient.html](https://www.hl7.org/fhir/stu3/patient.html) |
| Schema | [https://www.hl7.org/fhir/stu3/patient.xsd](https://www.hl7.org/fhir/stu3/patient.xsd) |

**Organization**

| Resource | [https://www.hl7.org/fhir/stu3/organization.html](https://www.hl7.org/fhir/stu3/organization.html) |
| Schema | [https://www.hl7.org/fhir/stu3/organization.xsd](https://www.hl7.org/fhir/stu3/organization.xsd) |



### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) ##

The event Bundle resource which contains the event message resources SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) base FHIR profile and be of type `message`.

This follows the [HL7 FHIR specification](http://hl7.org/fhir/bundle.html#message) for the Bundle resource when being used for messaging, which states that 'A message bundle (type = "message") consists of a series of entries, the first of which is a MessageHeader.'

### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) ##

The MessageHeader resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table bellow:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| extension(routingDemographics) | 1..1 | The extension MUST contain the details of the patient who is the focus of this event message. |
| extension(routingDemographics)<br/>**.extension(nhsNumber)** | 1..1 | The extension MUST contain the patient's NHS Number identifier and is used by the NEMS for routing event messages to subscribers. |
| extension(routingDemographics)<br/>**.extension(name)** | 1..1 | The extension MUST contain the human name element containing the patient's official names as recognised by PDS, and match the NHS number in the routingDemographics extension. |
| extension(routingDemographics)<br/>**.extension(birthDateTime)** | 1..1 | The extension MUST contain the patient's Date Of Birth which matches the NHS number in the routingDemographics extension. |
| meta.versionId | 0..1 | **Message Sequencing** - A sequence number for the purpose of ordering messages for processing. The sequence number must be an integer which is patient and event-type specific and the publisher must increment the sequence number each time a new event of the same type is issued by the same system for the same patient. |
| meta.lastUpdated | 0..1 | **Message Sequencing** - A FHIR instant (time stamp with sub-second accuracy) which represents the point in time that the change occurred which should be used for ordering messages for processing. |
| extension(messageEventType) | 1..1 | The type value which shall appear in this element will be defined within the separate event message implementation guide for each of the event messages, as the value will depend on the life cycle of the specific event message. |
| id | 1..1 | An originator/publisher unique publication reference, which will use a UUID format |
| event | 1..1 | **Event Type** - The type of event as specified within the event message implementation guides, e.g. PDS Birth Notification, Failsafe Alert |
| source | 1..1 | The IT system which holds the information that originated the event |
| source.name | 1..1 | A human readable name for the IT system which holds the information that originated the event |
| source.contact | 1..1 | The email address or telephone number to be used by subscribers to contact the publisher for any issues with event message. Additional requirements and information available on the [Event Feedback Mechanism](overview_msg_architecture_feedback.html) page |
| source.contact.system | 1..1 | Must contain a value of `phone` or `email` matching the included contact method within the `value` element |
| source.contact.value | 1..1 | A phone number or email address |
| responsible | 1..1 | A reference to the organization resource which represents the organization responsible for the event. |
| focus | 1..1 | The focus element will reference a resource as defined by the event message specific implementation guide for each specific event message. |

### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) ##

Patient resources included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the `nhsNumber` identifier slice |
| name (official) | 1..1 | Patients name as registered on PDS, included within the resource as the `official` name element slice |
| birthDate | 1..1 | The patient birth date shall be included in the patient resource |
| address | 0..* | If an address is included, the publisher SHOULD use the structured data elements if possible, ideally including a minimum of `line` and `postalCode`. |

### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) ##

Organization resources included in event messages SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| name | 0..1 | A human readable name for the organization SHOULD be included in the organization resource |
| identifier | 0..1 | The organization ODS code SHOULD be included within the `odsOrganizationCode` identifier slice |

## Data Type Population ##

### "dateTime" Elements ##

Population of a `dateTime` element within FHIR resource should conform to the requirements within the [FHIR specification](http://hl7.org/fhir/stu3/datatypes.html#datetime), so where a time is included the time zone MUST be populate to represent the offset of the include time from Coordinated Universal Time (UTC).

For a date and time within **BST** such as "27th July 2019" at "14:22" the dateTime should be included in the FHIR resource either with a time zone offset or with the time changed to GMT:

`2019-07-27T14:22:00+01:00` or `2019-07-27T13:22:00+00:00`

For a date and time within **GMT** such as "14th January 2019" at "13:35" the dateTime should be included in the FHIR resource with a time zone offset of zero hours and minutes:

`2019-01-14T13:35:00+00:00`

#### "dateTime" regex ###

To check if a dateTime field is in a valid format, the following regex can be used:
```
([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?
```
