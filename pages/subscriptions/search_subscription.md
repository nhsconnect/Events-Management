---
title: Search for Subscriptions
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: search_subscription.html
summary: "How to search for subscriptions"
---

## Pre-requisites

In addition to the guidance on this page the guidance and requirement on the [Generic Subscription API Requirements](subscription_general_api_guidance.html) page SHALL be followed when using the NEMS subscription API.


## Searching for a Subscription

The subscription search API interaction allows the requesting system to search for subscriptions which match a set of optional parameters. The search will return a bundle containing all subscriptions which meet the search parameters.


### Search Parameters

| Parameter | Cardinality | Description | Example |
| --- | --- | --- | --- |
| criteria:contains | 0..* | Search and filter based on the subscription `criteria` element containing the specified search value. | GET /Subscription?criteria:contains=[NHS_Number] |
| channel.endpoint | 0..1 | Search and filter on the MESH mailbox id within the subscriptions. | GET /Subscription?channel.endpoint=[MESH_MAILBOX_ID] |
| contact | 0..1 | Search and filter on Organisation ODS code. | GET /Subscription?contact=[ODS_Code] |

The Search subscription API interaction allows a combination of the search parameters to be specified to help filter the result. For example:

```http
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription?criteria%3Acontains%3D9434765919%26channel.endpoint%3DMailbox1234
```
 
### Request Headers

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
				<id value="ea0a485187204b49b978bdcf7102388c"/>
				<meta>
					<lastUpdated value="2018-05-26T00:00:00+00:00"/>
					<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"/>
				</meta>
				<status value="active"/>
				<contact>
					<system value="url"/>
					<value value="https://directory.spineservices.nhs.uk/STU3/Organization/RR8"/>
					<use value="work"/>
				</contact>
				<reason value="Health visiting service responsible for Leeds"/>
				<criteria value="/Bundle?type=message&amp;serviceType=UHV&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number|9434765919&amp;MessageHeader.event=PDS002"/>
				<channel>
					<type value="message"/>
					<endpoint value="Mailbox1234"/>
				</channel>
			</Subscription>
		</resource>
	</entry>
	<entry>
		<fullUrl value="https://clinicals.spineservices.nhs.uk/STU3/Subscription/f0963530f5e3411fb03e295399b226d9"/> 
		<resource>
			<Subscription>
				<id value="f0963530f5e3411fb03e295399b226d9"/>
				<meta>
					<lastUpdated value="2018-11-04T00:00:00+00:00"/>
					<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"/>
				</meta>
				<status value="active"/>
				<contact>
					<system value="url"/>
					<value value="https://directory.spineservices.nhs.uk/STU3/Organization/RR8"/>
					<use value="work"/>
				</contact>
				<reason value="Child Health service responsible for Leeds"/>
				<criteria value="/Bundle?type=message&amp;serviceType=UHV&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number|9303712862&amp;MessageHeader.event=PDS002&amp;MessageHeader.event=PDS004"/>
				<channel>
					<type value="message"/>
					<endpoint value="Mailbox1234"/>
				</channel>
			</Subscription>
		</resource>
	</entry>
</Bundle> 
```

