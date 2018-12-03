---
title: Publish an Event Message
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_publish.html
summary: "Requirements for publishing event messages into the NEMS"
---

## Pre-requisites ##

Before an event can be published, the following must be in place:

- The submitting system will require national assurance, and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).
- Any NHS numbers submitted in events MUST have been traced against PDS (see [here](https://developer.nhs.uk/apis/spine-core/pds_overview.html) for details).


## Publishing an event message ##

### Request

To send an event message to the National Events Management Service (NEMS) the publisher MUST:

1. construct an event message which conforms to the [NEMS message architecture requirements](explore_bundle_structure.html) within this specification and one of the event message implementation guides listed on the [Introduction to National Events Management Service](index.html#event-message-implementation-guides) page.
2. POST the event message to the National Events Management Service via the "$process-message" FHIR operation endpoint on the Spine

```http
POST /$process-message
```

{% include important.html content="The constructed event message SHALL NOT include any ITK3 wrapper elements, as these are added by the NEMS before passing the event message onto subscribers (see [receiver requirements](receiver_requirements.html))." %}

### Response

The National Events Management Service will perform validation on the event message it receives from the publisher and will return:

- a ```HTTP 202 Accepted``` response when the event message successfully passes validation
- an `OperationOutcome` FHIR resource containing error information when the event message fails validation. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


## Onward Delivery of the event message to subscribers ##

Following successful validation and providing a ```HTTP 202 Accepted``` response the National Events Management Service will match the event message to Subscription criteria, and forward the event message to the originating Organisation for the subscription.

## Publish Event Example ##

### Request

The event message is included in the body of the POST request:

```xml
POST https://clinicals.spineservices.nhs.uk/STU3/$process-message HTTP/1.1

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

If successfully received and validated, the response is:

```http
HTTP 202 Accepted
Date: Fri, 25 May 2018 16:09:50 GMT
```

