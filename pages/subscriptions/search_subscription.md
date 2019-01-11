---
title: Search for Subscriptions
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: search_subscription.html
summary: "How to search for subscriptions"
---

## Pre-requisites ##

Before a subscription can found through a search, the following must be in place:

- The submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).

## Searching for a Subscription ##

Currently, the only criteria available to search for subscriptions is the ODS code of the organisation that creates/owns the subscription (held in the contact.value field in the subscription).

### HTTP Request ###

To search for a subscription for a specific ODS code, a standard FHIR search operation can be used:

```http
GET /Subscription?contact=[ODS_Code]
```

### Request Headers ###

The system calling the API MUST include the following HTTP request headers when making the call to the Search Subscription API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system calling the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Fixed value: `urn:nhs:names:services:clinicals-sync:SubscriptionsApiGet` |

Additional information about standard headers and endpoint looking is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).



## Error Handling ##

If an error occurs while trying to process the request the NEMS will return a HTTP error code along with an `OperationOutcome` FHIR resource within the payload. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


## Response ##

A successful request will result in:

- a HTTP status code of `200`
- a FHIR `Bundle` resource within the payload containing all the subscription resources matching the search parameters. The subscription resources returned SHALL conform to the [EMS-Subscription-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1) FHIR profile.

If no subscription resources are found matching the search parameters then a 200 response and FHIR Bundle resource will still be returned but the returned bundle resource will contain no subscriptions.


## Search Subscription Example ##

```http
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription?contact=RR8
```

```xml
HTTP 200 OK
Date: Sat, 26 May 2018 12:34:11 GMT
Content-type: application/xml+fhir

<Bundle xmlns="http://hl7.org/fhir">
	<id value="a59a404d-54fd-440a"/>
	<meta>
		<lastUpdated value="2018-05-26T12:34:11Z"/>
	</meta>
	<type value="searchset"/>
	<total value="1"/>
	<link>
		<relation value="self"/>
		<url value="https://clinicals.spineservices.nhs.uk/STU3?contact=RR8"/>
	</link>
	<entry>
		<fullUrl value="https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c"/> 
		<resource>
			<Subscription>
				<id value="ea0a4851-8720-4b49-b978-bdcf7102388c"/>
				<meta>
					<lastUpdated value="2018-05-26T00:00:00+00:00"/>
					<versionID value="25777f7d-27bc"/>
					<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"/>
				</meta>
				<status value="active"/>
				<contact>
					<system value="url"/>
					<value value="https://directory.spineservices.nhs.uk/STU3/Organization/RR8"/>
					<use value="work"/>
				</contact>
				<reason value="Health visiting service responsible for Leeds"/>
				<criteria value="/Bundle?type=message&Organization.identifier=X2458&MessageHeader.event=PDS001&MessageHeader.event=PDS002&MessageHeader.event=PDS003&MessageHeader.event=PDS004"/>
				<channel>
					<type value="message"/>
					<endpoint value="Mailbox1234"/>
				</channel>
			</Subscription>
		</resource>
	</entry>
</Bundle>
```

