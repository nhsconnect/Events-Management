---
title: Professional Contacts
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: professional_contacts_1.html
summary: "Guidance and requirements for the Professional Contacts event message"
---

The `Professional Contacts` event is a event message which represent a episode of care in which an organisation has or had a responsibility of care for a patient.

## Event Message Content

All "Professional Contacts" event messages that are published to the NEMS **MUST** be created inline with guidance and requirements specified on this page and on the [Generic Event Message Requirements](explore_genreic_event_requirements.html) page.


## Bundle structure

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references an `EpisodeOfCare` resource as the focus of the event message. The `EpisodeOfCare` resource represents the current status and the period in which the organisation is/was responsible for the patients care.


The diagram below shows the referencing between FHIR resources within the professional contacts message bundle:
<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/professional_contacts_1.png" target="_blank"><img src="images/messages/professional_contacts_1.png"></a>
</div>


## Event Life Cycle ##

The information carried in the `Professional Contacts` event message allows the `current` state of the organisations professional responsibility for a patient to be expressed clearly, so in most use cases the use of the `messageEventType` extension within the `MessageHeader` resource will only include the `new` value. Use of the `update` or `delete` values relates to changes to the original event message and should not be used to indicate an update or removal of the organisations professional responsibility for the patient.

As an organisations professional responsibility for a patient will change over time, organisations will most likely published this event multiple times for each patient. To allow a consumer to perform message sequencing, if required, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date event message is.


## Onward Delivery ##

The delivery of the `Professional Contacts` event messages to subscribers via MESH will use the following `WorkflowID` within the MESH control file. This `WorkflowID` will need to be added to the receiving MESH mailbox configuration before event messages can be received.

| MESH WorkflowID | `PROFESSIONALCONTACTS_1` |


## Resource Population Requirements and Guidance ##

The following requirements and resource population guidance must be followed in addition to the requirements and guidance outlined in the [Generic Requirements](https://developer.nhs.uk/apis/ems-beta/explore_genreic_event_requirements.html) page.


### [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle)

The Bundle resource is the container for the event message and SHALL conform to the [Bundle](http://hl7.org/fhir/STU3/StructureDefinition/Bundle) FHIR profile.

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| type | 1..1 | Fixed value: `message` |


### [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1)

The MessageHeader resource included as part of the event message SHALL conform to the [Event-MessageHeader-1](https://fhir.nhs.uk/STU3/StructureDefinition/Event-MessageHeader-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.lastUpdated | 1..1 | The dateTime when the information was changed within the publishing system, for the use of event sequencing. |
| extension(messageEventType) | 1..1 | In most use cases the `new` value should be used. |
| event | 1..1 | Fixed Value: professional-contacts-1 (Professional Contacts) |
| focus | 1..1 | This will reference the `CareConnect-EpisodeOfCare-1` resource which contains information outlining the professional responsibility for the patient. |


### [CareConnect-EpisodeOfCare-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-EpisodeOfCare-1)

The EpisodeOfCare resource included in the event message SHALL conform to the [CareConnect-EpisodeOfCare-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-EpisodeOfCare-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| status | 1..1 | The `status` element MUST represent the current status of the organisations responsibility for the patient. |
| type | 1..* | The `type` element MUST represent the type of care/service the organisation is providing during this episode of care. For example "Health visiting service (1078501000000104)"  |
| managingOrganization | 1..1  | This MUST reference the organisation who is responsibility for this episode of care. |
| period.start | 0..1 | Date on which the organisation took responsibility for the patients care. |
| period.end | 0..1 | Date on which the organisation stopped being responsible for the patients care. |
| team | 0..* | The EpisodeOfCare may reference specific care teams for this episode of care. |


### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

Within the bundle there will be multiple organization resources, including one for the organisation taking professional responsibility for the patient. Other Organization resources may be included where referenced from within other resources in the bundle. The Organization resources included in the bundle SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | The organization ODS code SHALL be included within the odsOrganizationCode identifier slice. |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource. |
| **telecom** | 0..* | Where the Organisation resource represents the organisation responsible for the EpisodeOfCare, referenced from the `EpisodeOfCare` resource `managingOrganization` element, the Organisation resource **MUST** include contact details for use by consumers in relation to communications about this episode of care. |


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the nhsNumber identifier slice |


### [CareConnect-CareTeam-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-CareTeam-1)

The CareConnect-CareTeam-1 resource included as part of the event message SHALL conform to the [CareConnect-CareTeam-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-CareTeam-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 0..1 | This will reference the Patient resource representing the subject of the episode of care. |
| name | 0..1 | The care team name should be included to assist consumers of the information to contact the organisation if required. |
| participant | 0..* | The members of the care team may be referenced and should include their role within the care team. |


### [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)

The CareConnect-Practitioner-1 resource included as part of the event message SHALL conform to the [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1) constrained FHIR profile.

| Resource Cardinality | 0..* |


### [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)

The CareConnect-PractitionerRole-1 resource included as part of the event message SHALL conform to the [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1) constrained FHIR profile.

| Resource Cardinality | 0..* |
