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

The event message will contain a mandatory `MessageHeader` resource as the first element within the event message bundle as per FHIR messaging requirements. The MessageHeader resource references an `EpisodeOfCare` resource as the focus of the event message. The `EpisodeOfCare` resource represents the current status and the period in which the organisation is or was responsible for the patients care.


The diagram below shows the referencing between FHIR resources within the professional contacts event message bundle:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/professional_contacts_1.png" target="_blank"><img src="images/messages/professional_contacts_1.png"></a>
</div>


## Event Life Cycle ##

The information carried in a `Professional Contacts` event message must represent the `current` state of the organisations professional responsibility for a patient.

The contents of the `EpisodeOfCare` resource and its supporting resources conveys the current state of the organisations professional responsibility for the patient, such as if it is active, finished, cancelled, etc.

The `MessageHeader` resource contains the `messageEventType` extension which represents the action the event message represents at a resource level, for example the `EpisodeOfCare` being shared is new, the `EpisodeOfCare` or supporting resources have been updated or the `EpisodeOfCare` has been deleted. The `messageEventType` extension shall contain a values as per the table below:

| Value | Description |
| --- | --- |
| new |  The `new` value must be used when the EpisodeOfCare is being shared for the first time. |
| update | The `update` value must be used when the EpisodeOfCare and supporting resources have previously been shared, but have updated and the updated resources are being shared. |
| delete | The `delete` value must be used when the EpisodeOfCare record has been delete and the record no longer exists. |

### Identifying Information

To allow subscribers to identify information between `new`, `update` and `delete` event messages the publisher must:

- publish a complete event message for all event types
- included identifiers within resources which are maintained between different event messages

### Message Sequencing

As an organisations professional responsibility for a patient will change over time, the organisation will most likely publish multiple `professional contacts` events. To allow a consumer to perform message sequencing, the event MUST include the `meta.lastUpdated` element within the `MessageHeader` resource allowing the consumer to identify the latest and most up to date information.


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
| extension(messageEventType) | 1..1 | See the "Event Life Cycle" section above. |
| event | 1..1 | Fixed Value: professional-contacts-1 (Professional Contacts) |
| focus | 1..1 | This will reference the `CareConnect-EpisodeOfCare-1` resource which contains information outlining the professional responsibility for the patient. |


### [CareConnect-EpisodeOfCare-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-EpisodeOfCare-1)

The EpisodeOfCare resource included in the event message represents the organisations professional responsibility for the patient and SHALL conform to the [CareConnect-EpisodeOfCare-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-EpisodeOfCare-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | A publisher defined unique identifier for the episode of care which will be maintained across different event messages to allow subscribers to be identify the information within `update` or `delete` event messages. |
| status | 1..1 | The `status` element MUST represent the current status of the organisations responsibility for the patient. |
| type | 1..* | The `type` element MUST represent the type of care/service the organisation is providing during this episode of care. For example "Health visiting service (1078501000000104)"  |
| managingOrganization | 1..1  | This MUST reference the organisation who is responsibility for this episode of care, which contains contact details for that organisation in relation to this episode of care. |
| period.start | 0..1 | Date on which the organisation took responsibility for the patients care. |
| period.end | 0..1 | Date on which the organisation stopped being responsible for the patients care. |
| team | 0..* | The EpisodeOfCare may reference specific care teams for this episode of care. |


### [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1)

Within the bundle there may be multiple organization resources, including one for the organisation taking responsibility for the patients care. Other Organization resources may be included when referenced from within other resources in the bundle.

To satisfy a number of use cases for the professional contacts event, the contact details for the organisation taking professional responsibility for the patient are required. Contact details for other organisations included in the event message bundle are not required.

The Organization resources included in the bundle SHALL conform to the [CareConnect-Organization-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..* | The organization ODS code SHALL be included within the odsOrganizationCode identifier slice. |
| name | 1..1 | A human readable name for the organization SHALL be included in the organization resource. |
| **telecom** | 0..* | Where the Organisation resource represents the organisation responsible for the EpisodeOfCare, referenced from the `EpisodeOfCare` resource `managingOrganization` element, the Organisation resource **MUST** include contact details for use by subscribers in relation to communications about this episode of care. |


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

The patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| identifier | 1..1 | Patient NHS Number SHALL be included within the nhsNumber identifier slice |


### [CareConnect-CareTeam-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-CareTeam-1)

The CareConnect-CareTeam-1 resource may be included as part of the event message to give more detail on a specific team who is responsible for the patients care.

Any CareTeam resource SHALL conform to the [CareConnect-CareTeam-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-CareTeam-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..* |

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| subject | 0..1 | This should reference the Patient resource representing the subject of the episode of care. |
| name | 0..1 | The care team name should be included to assist subscribers of the information to contact the organisation if required. |
| participant | 0..* | The members of the care team may be referenced and should include their role within the care team. |


### [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1)

The CareConnect-Practitioner-1 resource included as part of the event message SHALL conform to the [CareConnect-Practitioner-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Practitioner-1) constrained FHIR profile.

| Resource Cardinality | 0..* |


### [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1)

The CareConnect-PractitionerRole-1 resource included as part of the event message SHALL conform to the [CareConnect-PractitionerRole-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-PractitionerRole-1) constrained FHIR profile.

| Resource Cardinality | 0..* |


## Professional Contacts Example ##

```xml
{% include_relative examples/Professional-Contacts-example.xml %}
```