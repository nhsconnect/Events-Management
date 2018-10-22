---
title: Manage Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_manage_subscription.html
summary: "How to update and delete subscriptions"
---

## Pre-requisites ##

Before a subscription can be managed/updated the following must be in place:

- The submitting system will require national assurance and be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).
- Any NHS numbers submitted in a subscription request will have been traced against PDS (see [here](https://developer.nhs.uk/apis/spine-core/pds_overview.html) for details).

## Retrieving a Subscription ##

To retrieve a specific subscription, the client will need to use the ID that was allocated to the subscription when it was created (see [Create Subscription](explore_create_subscription.html))

**HTTP request:**

```http
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a4851-8720-4b49-b978-bdcf7102388c
```

**Response:**

{% include important.html content="Currently the Events Mangement Service only supports XML formatting." %}

```xml
HTTP 200 OK
Date: Sat, 26 May 2018 12:34:11 GMT
Last-Modified: Sat, 26 May 2018 00:00:00 GMT
Content-type: application/json+fhir

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
```


## Deleting a Subscription ##

To delete a specific subscription, the client will need to use the ID that was allocated to the subscription when it was created (see [Create Subscriptions](explore_create_subscription.html))

**HTTP request:**

```json
DELETE https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a4851-8720-4b49-b978-bdcf7102388c
```

**Response:**

```json
HTTP 200 OK
Date: Sat, 26 May 2018 12:52:12 GMT
```

## Updating a Subscription ##

The Events Management Service will not mantain versions of Subscriptions, so any changes to a subscription will require that the existing subscription is deleted, and a new one created.

