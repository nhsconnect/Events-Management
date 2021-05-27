---
title: Demographics Record Change v1
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: demographics_record_change_1.html
summary: "The Demographics Record Change event"
---

The `Demographics Record Change` event message is a notification that demographic details for a patient have changed within a record. The event message does not contain the demographics information, but will include a reference to where the latest demographic information can be retrieved.


## FHIR Event Message Structure 
 
The following is the FHIR event message structure for the Demographics Record Change event. The `MessageHeader` resource in the bundle will have a `focus` element which pointing to a `DocumentReference` resource. In the bundle the `DocumentReference` will act as the pointer to where the demographic information can be retrieved.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/demographics_record_change_1.jpg" target="_blank"><img src="images/messages/demographics_record_change_1.jpg"></a>
</div>


## Onward Delivery 

The delivery of the `Demographics Record Change` event message to subscribers, via MESH will use the following WorkflowID within the MESH control file. This WorkflowID will need to be added to the receiving MESH mailbox configuration before event messages can be received. 

| MESH WorkflowID | DEMOGRAPHICS_RECORD_CHANGE_1 |


## Resource Population Guidance 


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
| extension(routingDemographics) | 1..1 | The extension MUST contain the details of the patient who is the focus of this event message. |
| extension(routingDemographics).extension(nhsNumber) | 1..1 | The extension MUST contain the patient’s NHS Number identifier and is used by the NEMS for routing event messages to subscribers. |
| extension(routingDemographics).extension(name) | 1..1 | The extension MUST contain the human name element containing the patient’s official names as recognised by PDS,  and match the NHS number in the routingDemographics extension. |
| extension(routingDemographics).extension(birthDateTime) | 1..1 | The extension MUST contain the patient’s Date Of Birth which matches the NHS number in the routingDemographics extension. |
| extension(messageEventType) | 1..1 | Fixed value: `new` |
| event | 1..1 | Fixed Value: demographics-record-changed-1 (Demographics Record Changed) |
| focus | 1..1 | This will reference the focus “DocumentReference” resource. |


#### Superseded NHS Number

Where the event message relates to a Spine PDS record being superseded by another, the patient details included in the event will be for the record which is being superceeded rather than the record which is superseding it, as the NHS Number being Superseded will match the NHS Number used in the subscription.


### [DocumentReference](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1)

The event message will contain an "NRL-DocumentReference-1" Resource, which acts as a pointer to where the patients demographic information can be retrieved. The `DocumentReference` will include

- the endpoint URL(s) exposed by the publisher where the demographic information can be retrieved
- the format of the information that can be retrieved from the endpoint(s)

The DocumentReference resource **MUST** conform to the [NRL-DocumentReference-1](https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

|Data Item|[FHIRPath](https://hl7.org/fhirpath/)|Cardinality|Population Guidance|
|----|---------|----|-----------|-----|
| Master identifier | `masterIdentifier` | 1..1 | The master identifier MUST be unique for each pointer |
| Patient | `subject.reference` | 1..1 | The NHS Number reference **MUST** follow the structure: `https://demographics.spineservices.nhs.uk/STU3/Patient/[nhsNumber]` |
| Profile | `meta.profile` | 1..1 | Fixed value: `https://fhir.nhs.uk/STU3/StructureDefinition/NRL-DocumentReference-1` |
| Pointer owner | `custodian.reference` | 1..1 | The organization reference **MUST** follow the structure: `https://directory.spineservices.nhs.uk/STU3/Organization/[ODS Code]` |
| Pointer status | `status` | 1..1 | Fixed value: `current` |
| Information category | `class` | 1..1 | `class.coding` is bound to the [NRL-RecordClass-1](https://fhir.nhs.uk/STU3/ValueSet/NRL-RecordClass-1) ValueSet |
| | `class.coding.system` | 1..1 | Fixed value: `https://fhir.nhs.uk/STU3/CodeSystem/NRL-RecordClass-1` |
| | `class.coding.code` | 1..1 | Fixed value: `record-heading` |
| | `class.coding.display` | 1..1 | Fixed value: `Record Heading` |
| Information type | `type` | 1..1 | `type.coding` is bound to the [NRL-RecordType-1](https://fhir.nhs.uk/STU3/ValueSet/NRL-RecordType-1) ValueSet |
| | `type.coding.system` | 1..1 | Fixed value: `https://fhir.nhs.uk/STU3/CodeSystem/NRL-RecordType-1` |
| | `type.coding.code` | 1..1 | Fixed value: `demographics` |
| | `type.coding.display` | 1..1 | Fixed value: `Demographics` |
| Clinical setting | `context.practiceSetting` | 1..1 | `context.practiceSetting.coding` is bound to the [NRL-PracticeSetting-1](https://fhir.nhs.uk/STU3/ValueSet/NRL-PracticeSetting-1) ValueSet. Note that this ValueSet refers to a SNOMED CT reference set and all SNOMED CT concepts that are members of this reference set are valid clinical setting codes |
| Information owner | `author.reference` | 1..1 | The organization reference **MUST** follow the structure: `https://directory.spineservices.nhs.uk/STU3/Organization/[ODS Code]` |
| Retrieval URL | `content.attachment.url` | 1..1 | URL where the information can be retrieved in the associated retrieval format |
| Retrieval format | `content.format` | 1..1 | Bound to the [NRL-FormatCode-1](https://fhir.nhs.uk/STU3/ValueSet/NRL-FormatCode-1) ValueSet |
| Retrieval MIME type | `content.attachment.contentType` | 1..1 | The MIME type of the content available at the `content.attachment.url` (e.g. [unstructured document supported MIME types](retrieval_unstructured_document.html#content-type).)<br /><br />Where more than one data format is available for the content, there will be multiple `content` entries, one for each MIME type (which may share the same URL) |
| Information Stability | `content.extension:contentStability` | 1..1 | Information stability extension |



## Demographics Record Change Example ##

```
{% include_relative examples/demographics-record-change-1.xml %}
```