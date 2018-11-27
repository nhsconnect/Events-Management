---
title: Create Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_create_subscription.html
summary: ""
---

## Pre-requisites ##

Before a subscription can be created the following must be in place:

- The submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).
- Any NHS numbers submitted in a subscription request will have been traced against PDS (see [here](https://developer.nhs.uk/apis/spine-core/pds_overview.html) for details).

## Creating a Subscription ##

To create a subscription, a client MUST:
1. construct a Subscription resource conforming to the [EMS-Subscription-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1) FHIR profile and additional population guidance on this page
2. POST the constructed EMS-Subscription-1 resource to the NEMS FHIR endpoint on the Spine

```http
POST /subscription
```

{% include important.html content="Currently the National Events Management Service only supports interactions and event messages formatted in XML. JSON SHALL NOT be used when constructing and POSTing a subscription request." %}

### EMS-Subscription-1 resource population ###

| FHIR element | Cardinality | Requirement |
| --- | --- | --- |
| status | 1..1 | The status of the subscription (initially this will always be "requested" until the subscription is reviewed and activated |
| contact | 1..* | Contact details for the subscription. <br/><br/>The first instance of the `contact` element within the Subscription resource SHALL represent the organization requesting the subscription. The element SHALL contain the organisation ODS Code which matches the MESH mailbox ID specified in the `channel.endpoint` element. <br/><br/>Additional contact elements included within the Subscription resource will be stored and returned by when managing the subscriptions but will not be validated as part of the business rules. |
| end | 0..1 | End date/time for subscription if relevant (e.g. for a temporary subscription). If not provided the subscription will be perpertual and not expire. |
| reason | 1..1 | The reason for creating the subscription (human readable description). Used primarily for reviewing the subscription in order to make it active, and also for patients / services to review what subscriptions exist and why they were created. |
| criteria | 1..1 | Criteria to match events against for this subscription - see below for examples. <br/>**NOTE: Currently, the criteria cannot be used for searching.** |
| channel.type | 1..1 | The delivery channel to use to deliver the event to the subscriber (currently only "message" is supported). <br/>**NOTE: In this case "message" refers to the use of MESH for as a delivery channel.** |
| channel.endpoint | 1..1 | The specific endpoint (initially MESH mailbox ID) to deliver to.<br/>**NOTE: The ODS code associated with the mailbox MUST match the ODS code within the first instance of the `contact` element of the Subscription resource.** |

Once submitted, additional metadata will automatically be added to the Subscription resource by the NEMS:

| FHIR element | Cardinality | Requirement |
| --- | --- | --- |
| id | 1..1 | Identifier for the subscription |
| meta.lastUpdated | 0..1 | Date the subscription was last updated |
| meta.versionId | 0..1 | The ID for the specific version of the subscription |

The create request MUST NOT include the fields above, as they can only be added by the NEMS (see Create Example below).

Once the subscription has been created it may require IG review prior to becoming active, at which point the status of the Subscription resource will be changed by the NEMS to 'active'.


### Criteria Components ###

The criteria element of the Subscription will use the FHIR search string format using the following components:

| Component                       | Cardinality | Description |
| ------------------------------- | --- | ----------- |
| /Bundle?type=message            | 1..1 | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message" |
| serviceType=[CODE]     | 1..1 | This element identifies the service type making the subscription. Current accepted values are:<br/><br/>**GP** - GP Practice related services<br/>**CHO** - Child Health Organisation related services<br/>**UHV** - Health Visitor related services<br/>**EPCHR** - Electronic Personal Child Health Record services |
| Patient.identifier=[IDENTIFIER] | 1..1 |  This is used for Explicit Subscriptions for an individual patient. The [IDENTIFIER] is the NHS Number for the patient. <br/>For example: **&Patient.identifier=http://fhir.nhs.net/Id/nhs-number\|[NHS Number]**|
| MessageHeader.event=[CODE]      | 1..* |  This is the type of event to subscribe to (see the [EMS Event Types](https://fhir.nhs.uk/STU3/CodeSystem/EMS-EventType-1)). <br/>For example: **&MessageHeader.event=PDS001&MessageHeader.event=PDS002&MessageHeader.event=PDS003** <br/> is an expression to specify events where the MessageHeader.event is of type PDS001, PDS002 or PDS003 |
| Patient.age=[AGE]               | 0..2 |  This is a filter to only match events where the age of the patient meets the criteria supplied. <br/>Examples:<br/> - **&Patient.age=lt14**<br/> - **&Patient.age=gt60**<br/> - **&Patient.age=gt5&Patient.age=lt19** <br/>For more detail see the Search Parameter [EMS Patient Age](https://fhir.nhs.uk/STU3/SearchParameter/EMS-PatientAge-1)|



## Criteria Examples ##

| Scenario                             | Subscribing Organisation | Subscription Type | Criteria String                     |
|--------------------------------------|--------------------------|-------------------|------------------------------------|
| A PHR system subscribing to change of address events for a specific patient registered for a PHR | N/A | Explicit | /Bundle?type=message<br/>&serviceType=GP<br/>&Patient.identifier=9434765919<br/>&MessageHeader.event=PDS002 |

## Create Subscription Example ##

**HTTP request:**

```xml
POST https://clinicals.spineservices.nhs.uk/STU3/Subscription HTTP/1.1

<Subscription xmlns="http://hl7.org/fhir">
	<meta>
		<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"/>
	</meta>
	<status value="requested"/>
	<contact>
		<system value="url"/>
		<value value="https://directory.spineservices.nhs.uk/STU3/Organization/RR8"/>
		<use value="work"/>
	</contact>
	<reason value="Health visiting service responsible for Leeds"/>
	<criteria value="/Bundle?type=message<br/>&serviceType=UHV<br/>&Patient.identifier=9434765919<br/>&MessageHeader.event=PDS002" />
	<channel>
		<type value="message"/>
		<endpoint value="Mailbox1234"/>
	</channel>
</Subscription>
```

**Response:**

Assuming the subscription has been successfully received by Spine, it will assign an ID for the subscription. The HTTP response will be a "201 Created" HTTP status code, and SHALL also return a Location header which contains the new ID of the created Subscription resource:

```json
HTTP 201 Created
Date: Fri, 25 May 2018 16:09:50 GMT
Last-Modified: Fri, 25 May 2018 16:09:50 GMT
ETag: W/"25777f7d-27bc"
Location: https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c
```

