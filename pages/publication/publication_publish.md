---
title: Publish an Event Message
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_publish.html
summary: "Requirements for publishing event messages into the NEMS"
---

## What data to publish

To protect data quality of information passing through the NEMS:

- Event messages published to the NEMS MUST only contain event information originating from the publishing system. Publishers should not publish information they receive from other providers.

- The NEMS event message forwarding functionality is designed to send event messages based on subscription criteria and does not perform any message routing or filtering based on who the publishing and subscribing systems are. Therefore it is possible that a system/provider publishing an event message may receive back their own event message, if the subscription criteria is met for one or more of their subscriptions.

  Due to the wide variety of system architectures used by provider it is impractical and possibly unsafe to filter out these message loops centrally within the NEMS, therefore it is the responsibility of the system/provider to filter out these loop back messages where necessary to avoid duplicate data being created within their system.


## Pre-requisites ##

In addition to the guidance on this page the guidance and requirement on the [Generic Publication API Guidance](publication_general_api_guidance.html) page SHALL be followed when using the NEMS publication API.


## Publishing an event message ##


To send an event message to the National Events Management Service (NEMS) the publisher MUST:

1. construct an event message which conforms to the [NEMS message architecture requirements](explore_genreic_event_requirements.html) and one of the [event message](overview_supported_events.html) specific population requirements pages.
2. POST the event message to the National Events Management Service via the "$process-message" FHIR operation endpoint on the Spine

```http
POST https://demographics.spineservices.nhs.uk​/STU3/Events/1/$process-message
```


### Request Headers ###

The publishing system MUST include the following HTTP request headers when making the call to the Publish API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system posting to the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Value: `urn:nhs:names:services:events:[Event_Code].Write`<br/><br/>**[Event_Code]** SHALL match the event code within the MessageHeader resource of the published event message. Event codes are specified on the [Supported Event Messages](overview_supported_events.html) page and in the events specific implementation guides. |

Additional information about standard headers and endpoint look ups is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).

### Response

The National Events Management Service will perform validation on the event message it receives from the publisher and will return:

- a ```HTTP 202 Accepted``` response when the event message successfully passes validation
- an `OperationOutcome` FHIR resource containing error information when the event message fails validation. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.

### Deprecation Warnings

In order for the NEMS to communicate to a publisher that an event type is going to be deprecated, the NEMS will include an OperationOutcome payload along with the successful 202 Accepted response, when the event type being published is due to be deprecated. More information about deprecation can be found on the [Event Lifecycle and Deprecation](overview_msg_architecture_life_cycle.html).

The OperationOutcome resource will containing the following elements, containing details of the deprecation for the published event type:

| Element | Cardinality | Description |
| --- | --- | --- |
| issue.details.coding.code | 1..1 | The event life cycle warning type. |
| issue.diagnostics | 1..1 | Additional information about the event type deprecation including the date when the event will be deprecated and no longer supported by the NEMS and a URL where additional information about the event can be found. |

**Example:**
```xml
<OperationOutcome>
   <issue> 
      <severity value="information"/> 
      <code value="informational"/> 
      <details>
         <coding> 
            <system value="https://fhir.nhs.uk/STU3/CodeSystem/Spine-ErrorOrWarningCode-1"/> 
            <code value="DEPRECATED"/> 
            <display value="The operation being performed has been deprecated"/> 
         </coding> 
      </details> 
      <diagnostics value="Deprecation of the Newborn Hearing (newborn-hearing-1) event type will occur on 22/06/2019, for more information go to https://developer.nhs.uk/apis/ems-beta/overview_supported_events.html"/>
   </issue> 
</OperationOutcome>
```

When a message becomes withdrawn as part of the event lifecycle the NEMS will no longer accept publication of that event message type and will return an error. For more information on event life cycle and event type deprecation can be seen on the [Event Lifecycle and Deprecation](overview_msg_architecture_life_cycle.html) page.


## Onward Delivery of the event message to subscribers ##

Following successful validation of the event message and the ```HTTP 202 Accepted``` response being sent to the publisher, the National Events Management Service will match the event message to Subscription criteria, and forward a copy of the event message to subscribing Organisations.

## Publish Event Example ##

### Request

The event message is included in the body of the POST request:

```xml
POST https://clinicals.spineservices.nhs.uk/STU3/Events/1/$process-message HTTP/1.1

<Bundle xmlns="http://hl7.org/fhir">
	<meta>
		<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1"/>
	</meta>
	<type value="message"/>
	<entry>
		<fullUrl value="urn:uuid:b9c63b5e-a88e-47d3-9d45-081ebe9e48b5"/>
		<resource>
			<MessageHeader>
				<id value="b9c63b5e-a88e-47d3-9d45-081ebe9e48b5"/>
				<meta>
					<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-MessageHeader-1"/>
				</meta>
				<extension url="https://fhir.nhs.uk/STU3/StructureDefinition/Extension-EMS-MessageEventType-1">
					<valueCodeableConcept>
						<coding>
							<system value="https://fhir.nhs.uk/STU3/CodeSystem/EMS-MessageEventType-1"/>
							<code value="new"/>
							<display value="New event message"/>
						</coding>
					</valueCodeableConcept>
				</extension>
				<event>
					<system value="https://fhir.nhs.uk/STU3/CodeSystem/EMS-EventType-1"/>
					<code value="PDS002"/>
					<display value="PDS Change of Address"/>
				</event>
				<timestamp value="2017-11-01T15:00:00+00:00"/>
				<source>
					<endpoint value="urn:nhs-uk:addressing:ods:RX3EP"/>
				</source>
				<responsible>
					<reference value="urn:uuid:e04e172e-db43-4ff3-a30a-9d574f693d96"/>
				</responsible>
				<focus>
					<reference value="urn:uuid:58df44c5-2b01-4425-bd9a-985ac73152d0"/>
				</focus>
			</MessageHeader>
		</resource>
	</entry>

	<!-- ... Multiple entries for event content ... -->

</Bundle>
```

### Response

Successful response no deprecation warning:

```http
HTTP 202 Accepted
Date: Fri, 25 May 2018 16:09:50 GMT
```


Successful response with **deprecation** warning:

```http
HTTP 202 Accepted
Date: Fri, 25 May 2018 16:09:50 GMT

<OperationOutcome>
   <issue> 
      <severity value="information"/> 
      <code value="informational"/> 
      <details>
         <coding> 
            <system value="https://fhir.nhs.uk/STU3/CodeSystem/Spine-ErrorOrWarningCode-1"/> 
            <code value="DEPRECATED"/> 
            <display value="The operation being performed has been deprecated"/> 
         </coding> 
      </details> 
      <diagnostics value="Deprecation of the Newborn Hearing (newborn-hearing-1) event type will occur on 22/06/2019, for more information go to https://developer.nhs.uk/apis/ems-beta/overview_supported_events.html"/>
   </issue> 
</OperationOutcome>
```

