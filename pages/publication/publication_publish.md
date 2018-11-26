---
title: Event Publication API Details
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_publish.html
summary: "API for publishing events into the EMS"
---

## Pre-requisites ##

Before an event can be published, the following must be in place:

- The submitting system will require national assurance and be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).
- Any NHS numbers submitted in events MUST have been traced against PDS (see [here](https://developer.nhs.uk/apis/spine-core/pds_overview.html) for details).

## API for publishing an event message ##

Events published into the Spine (acting as a national event management service), will be in the form of a FHIR message, so will be POSTed using a $process-message operation into a Spine URL. The message will then be validated, and any errors returned in an OperationOutcome response. If the message is successfully validated, a ```HTTP 202 Accepted``` will be returned, and the Spine will then continue processing any subscriptions for onward delivery.

## Publish Event Example ##

**HTTP Request:**

The event message is included in the body of the POST request:

```xml
POST https://clinicals.spineservices.nhs.uk/STU3/$process-message HTTP/1.1

<Bundle xmlns="http://hl7.org/fhir">
	<id value="f14bbabb-0592-4b58-96b1-93dbb6631106"/>
	<meta>
		<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/DCH-Bundle-1"/>
	</meta>
	<type value="message"/>
			<entry>
		<fullUrl value="urn:uuid:b9c63b5e-a88e-47d3-9d45-081ebe9e48b5"/>
		<resource>
			<MessageHeader>
				<id value="b9c63b5e-a88e-47d3-9d45-081ebe9e48b5"/>
				<meta>
					<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/DCH-MessageHeader-1"/>
				</meta>
				<extension url="https://fhir.nhs.uk/STU3/StructureDefinition/Extension-DCH-MessageEventType-1">
					<valueCodeableConcept>
						<coding>
							<system value="https://fhir.nhs.uk/STU3/CodeSystem/DCH-MessageEventType-1"/>
							<code value="new"/>
							<display value="New event message"/>
						</coding>
					</valueCodeableConcept>
				</extension>
				<event>
					<system value="https://fhir.nhs.uk/STU3/CodeSystem/DCH-ChildHealthEventType-1"/>
					<code value="CH002"/>
					<display value="Admission Details"/>
				</event>
				<timestamp value="2017-11-01T15:00:00+00:00"/>
				<source>
					<endpoint value="urn:nhs-uk:addressing:ods:RX3EP"/>
				</source>
				<responsible>
					<reference value="urn:uuid:e04e172e-db43-4ff3-a30a-9d574f693d96"/>
					<display value="UNIVERSITY HOSPITAL OF NORTH DURHAM"/>
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

**Response:**

If successfully received and validated, the response is:

```json
HTTP 202 Accepted
Date: Fri, 25 May 2018 16:09:50 GMT
```

Any errors will be returned in an OperationOutcome and will use the [standard error codes](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) used across all Spine APIs.

