---
title: PDS Change of Contact Details by Citizen
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: pds_contact_details_citizen_1.html
summary: "The PDS Change of Contact Details by Citizen event"
---

The `PDS Change of Contact Details by Citizen` event message is generated and published by the Spine when a change is made to the contact details within the PDS record, by the citizen using a mechanism such as NHS Login with an appropriate level of identity verification.


## FHIR Event Message Structure 
 
The following is the FHIR event message structure for the event message.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/pds_change_of_contact_details_by_citizen_1.png" target="_blank"><img src="images/messages/pds_change_of_contact_details_by_citizen_1.png"></a>
</div>


## Onward Delivery 

The delivery of the PDS Change of Contact Details by Citizen event messages to subscribers via MESH will use the following WorkflowID within the MESH control file. This WorkflowID will need to be added to the receiving MESH mailbox configuration before event messages can be received. 

| MESH WorkflowID | NEMS_EVENT_1 |

{% include important.html content="This workflow ID is generic for multiple NEMS event messages. Subscribers will need to identify the type of event by looking at the '`event`' element within the '`MessageHeader`' resource." %}


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
| event | 1..1 | Fixed Value:<br/>`pds-contact-details-citizen-1`<br/>( PDS Change of Contact Details by Citizen ) |
| focus | 1..1 | This will reference the focus “Patient” resource. |



### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

This Patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

The following table outlines the key elements which will be included, but additional elements and extensions may be included in the resource.

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.versionId | 1..1 | This element will contain the serial change number (SCN) of the patient's record within Spine at the time this event was published. |
| identifier | 1..1 | The NHS Number of the patient will be included in the nhsNumber identifier slice. If the event message is the result of the PDS record being superseeded this will be the NHS Number of the record being superseded and not the record which is superseding it. |
| name (official) | 1..1 | The patient's name as registered on PDS, included within the resource as the `official` name element slice |
| birthDate | 1..1 | The patients date of birth. |
| telecom | 1..* | The contact details updated by the citizen. |



## PDS Record Change Example ##

```xml
{% include_relative examples/pds_contact_details_citizen_1.xml %}
```
