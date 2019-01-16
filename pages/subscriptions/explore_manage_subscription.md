---
title: Manage Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_manage_subscription.html
summary: "How to update and delete subscriptions"
---

## Pre-requisites ##

Before a subscription can be managed or updated, the following must be in place:

- The submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).

# Retrieving a Subscription #

To retrieve a specific subscription, the client will need to use the ID that was allocated to the subscription when it was created (see [Create Subscription](explore_create_subscription.html))

## HTTP Request ##

To read a subscription by its logical ID, a standard FHIR read operation can be used:

```http
GET /Subscription/[Subscription_Logical_ID]
```


## Request Headers ##

The system calling the API MUST include the following HTTP request headers when making the call to the Read Subscription API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system calling the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Fixed value: `urn:nhs:names:services:clinicals-sync:SubscriptionsApiGet` |

Additional information about standard headers and endpoint looking is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).


## Error Handling ##

If an error occurs while trying to process the request the NEMS will return a HTTP error code along with an `OperationOutcome` FHIR resource within the payload. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


## Response ##

Where a subscription is found for the logical ID the response will be:
- a HTTP status code of 200
- a payload containing the requested `Subscription` resource. The subscription resource returned SHALL conform to the [EMS-Subscription-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1) FHIR profile.


## Retrieve Subscription Example ##

```http
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c
```

```xml
HTTP 200 OK
Date: Sat, 26 May 2018 12:34:11 GMT
Last-Modified: Sat, 26 May 2018 00:00:00 GMT
Content-type: application/xml+fhir

<Subscription>
	<id value="ea0a485187204b49b978bdcf7102388c"/>
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
```


# Deleting a Subscription #

To delete a specific subscription, the client will need to use the Logical ID that was allocated to the subscription when it was created (see [Create Subscriptions](explore_create_subscription.html))

## HTTP request ##

To delete a subscription by its logical ID, a standard FHIR delete operation can be used:

```http
DELETE /Subscription/[Subscription_Logical_ID]
```

## Request Headers ##

The system calling the API MUST include the following HTTP request headers when making the call to the Delete Subscription API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system calling the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Fixed value: `urn:nhs:names:services:clinicals-sync:SubscriptionsApiDelete` |

Additional information about standard headers and endpoint looking is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).


## Error Handling ##

If an error occurs while trying to process the request the NEMS will return a HTTP error code along with an `OperationOutcome` FHIR resource within the payload. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


## Response ##

Where a subscription is found for the logical ID and is deleted by the NEMS, the response will be:
- a HTTP status code of `200`.


## Delete Subscription Example ##

```http
DELETE https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c
```

```http
HTTP 200 OK
Date: Sat, 26 May 2018 12:52:12 GMT
```


# Updating a Subscription #

The National Events Management Service will not maintain versions of Subscriptions, so any changes to a subscription will require that the existing subscription is deleted, and a new one created.

