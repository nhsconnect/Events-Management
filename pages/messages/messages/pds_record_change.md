---
title: PDS Record Change
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: pds_record_change.html
summary: "The PDS Record Change event"
---

The `PDS Record Change` event message is generated and published by the Spine, when a change is made to a patient record within the Patient Demographics Service (PDS). The event message will not contain all the PDS information, as the event message is only intended to be a notification that the referenced patient record has changed which allows the subscriber to trigger their PDS synchronisation processes.

Any change to a patients PDS record will trigger the publication of this event, some example of changes that would trigger this event are:

- The NHS Number on the record being superseded
- Changes to demographic information
- Changes to contact details
- Application/Removal of S-Flags, I-Flags


## FHIR Event Message Structure 
 
The following is the FHIR event message structure for the PDS Record Change event.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/messages/pds_record_change.png" target="_blank"><img src="images/messages/pds_record_change.png"></a>
</div>


## Onward Delivery 

The delivery of the PDS Record Change event messages to subscribers via MESH will use the following WorkflowID within the MESH control file. This WorkflowID will need to be added to the receiving MESH mailbox configuration before event messages can be received. 

| MESH WorkflowID | PDS_RECORD_CHANGE_1 |



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
| extension(routingDemographics).extension(name) | 1..1 | The extension MUST contain the human name element containing the patient’s official names as recognised by PDS, and match the NHS number in the routingDemographics extension. |
| extension(routingDemographics).extension(birthDateTime) | 1..1 | The extension MUST contain the patient’s Date Of Birth which matches the NHS number in the routingDemographics extension. |
| extension(messageEventType) | 1..1 | Fixed value: `new` |
| event | 1..1 | Fixed Value: pds-record-change-1 (PDS Record Change) |
| focus | 1..1 | This will reference the focus “Patient” resource. |

**Note:** Where the event message relates to a PDS record being superseded by another, the patient details included in the event will be for the record which is being superceeded rather than the record which is superseding it.


### [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1)

This Patient resource included in the event message SHALL conform to the [CareConnect-Patient-1](https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1) constrained FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 1..1 |

The following table outlines the key elements which will be included, but additional elements and extensions may be included in the resource if required.

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| meta.versionId | 1..1 | This element will contain the serial change number (SCN) of the patient's record within Spine at the time this event was published. |
| identifier | 1..* | The NHS Number of the patient will be included in the nhsNumber identifier slice. If the event message is the result of the PDS record being superseeded this will include the NHS Number of the record being superseded and not the record which is superseding it. |
| name | 1..* | The patient's name(s) registered on PDS. |
| telecom | 0..* | Information such as email and telephone numbers held on PDS. |
| birthDate | 1..1 | The patients date of birth. |


### [Provenance](https://www.hl7.org/fhir/stu3/provenance.html)

The Provenance resource will be included where appropriate to indicate who performed the change which trigged the publish of this event message. The resource SHALL conform to the [Provenance](https://www.hl7.org/fhir/stu3/provenance.html) FHIR profile and the additional population guidance as per the table below:

| Resource Cardinality | 0..1 |

The following table outlines the key elements which will be included, but additional elements and extensions may be included in the resource.

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| target | 1..1 | The target will reference the Patient resource |
| recorded | 1..1 | The date and time the change was made to the record |
| agent | 1..* | The agent which performed the change to the PDS record |
| agent.whoReference | 1..1 | This will reference the agent who updated the record.<br/><br/>When this is a citizen updating their own PDS record this will reference the Patient resource in the event message.<br/><br/>Otherwise this will be the organisation who updated the event message, with reference to the ODS API. |



## Examples

<div class="tabPanel">

	<div class="tabHeadings">
		<span class="tabHeading" id="citizenUpdate">Citizen Update</span>
		<span class="tabHeading" id="orgUpdate">Organization Update</span>
	</div>
	
	<div class="tabBodies">
	
		<div class="tabBody" id="citizenUpdateBody" markdown="span">
			```{% include_relative examples/PDS-Record-Change-Citizen.xml %}```
		</div>
		
		<div class="tabBody" id="orgUpdateBody" markdown="span">
			```{% include_relative examples/PDS-Record-Change.xml %}```
		</div>
				
	</div>
</div>
