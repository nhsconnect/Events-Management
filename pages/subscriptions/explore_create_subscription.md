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

- The submitting system will require national assurance and be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).
- Any NHS numbers submitted in a subscription request will have been traced against PDS (see [here](https://developer.nhs.uk/apis/spine-core/pds_overview.html) for details).

## Creating a Subscription ##

To create a subscription, a client will POST a FHIR Subscription resource to the EMS FHIR endpoint.

### Subscription Resource ###

The Subscription resource will conform to the [EMS-Subscription-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1) FHIR profile. 

### Subscription Information ###

| Requirement                                | Cardinality  | FHIR element         |
|--------------------------------------------|--------------|----------------------|
| The status of the subscription (initially this will always be "requested" until the subscription is reviewed and activated   | 1..1   | status   |
| Contact details - at least one instance, with the mandatory instance sharing the ODS code of the Organisation requesting the subscription |1..*| contact |
| End date/time for subscription if relevant (e.g. for a temporary subscription). If not provided the subscription will be perpertual and not expire. | 0..1 | end |
| The reason for creating the subscription (human readable description). Used primarily for reviewing the subscription in order to make it active, and also for patients / services to review what subscriptions exist and why they were created. | 1..1 | reason |
| Criteria to match events against for this subscription - see below for examples | 1..1 | criteria |
| The delivery channel to use to deliver the event to the subscriber (currently only "mesh" is supported) | 1..1 | channel.type |
| The specific endpoint (initially MESH mailbox ID) to deliver to | 1..1 | channel.endpoint |
| Additional parameters for the endpoint (initially this would be the MESH workflow ID) | 0..1 | channel.header |

Once submitted, additional metadata will automatically be added to the Subscription resource by the EMS:

| Requirement                                | Cardinality  | FHIR element         |
|--------------------------------------------|--------------|----------------------|
| Identifier for the subscription.           | 1..1         | id |
| Date the subscription was last updated     | 0..1         | meta.lastUpdated |

The create request MUST NOT include the fields above, as they can only be added by the EMS (see Create Example below).

On completion, the status of the Subscription resource will be changed by the EMS to 'active'.

### Criteria Components ###

The criteria element of the Subscription will use the FHIR search string format using the following components:

| Component              | Description |
| ---------------------- | ----------- |
| /Bundle?type=message   | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message" |
| orgcode=[CODE]         | This is used for Rule-Based (Generic) Subscriptions to specify the organisation code that represents the organisation (or the geography the organisation covers). The [CODE] is the ODS code for the organisation. For example: *https://fhir.nhs.uk/Id/ods-organization-code\|[ODSCode]* |
| nhsnumber=[IDENTIFIER] | This is used for Rule-Based (Generic) Subscriptions to specify the organisation code that represents the organisation (or the geography the organisation covers). The [IDENTIFIER] is the ODS code for the organisation. <br/>For example: **&nhsnumber=https://fhir.nhs.uk/Id/ods-organization-code\|[ODSCode]** |
| subject=[IDENTIFIER]   | This is used for Explicit Subscriptions for an individual subject. The [IDENTIFIER] is the NHS Number for the subject. <br/>For example: **&subject=http://fhir.nhs.net/Id/nhs-number\|[NHS Number]** |
| subject-age=[AGE]      | This is a filter to only match events where the age of the subject meets the criteria supplied. <br/>For example: **&subject-age=lt19&subject-age=gt5** |
| eventcode=[CODE]       | This is the type of event to subscribe to (see the [EMS Event Types](https://fhir.nhs.uk/STU3/CodeSystem/EMS-EventType-1)). <br/>For example: **&eventcode=PDS001&eventcode=PDS002&eventcode=PDS003** |


## Criteria Examples ##

| Scenario                             | Subscribing Organisation | Subscription Type | Criteria String                     |
|--------------------------------------|--------------------------|-------------------|------------------------------------|
| A child health service subscribing to four PDS events | CHO (Org: X2458)         | Rule based (Geographical) | /Bundle?type=message <br/>&orgcode=X2458<br/>&eventcode=PDS001<br/>&eventcode=PDS002<br/>&eventcode=PDS003<br/>&eventcode=PDS004 |
| A GP practice subscribing to death notification PDS events for patients registered in their practice | GP Practice (Org: E84678) | Rule based (Registered Org) | /Bundle?type=message <br/>&orgcode=E84678<br/>&eventcode=PDS004 |
| A PHR system subscribing to change of address events for a specific patient registered for a PHR | N/A | Explicit | /Bundle?type=message <br/>&nhsnumber=9434765919<br/>&eventcode=PDS002 |

## Create Subscription Example ##

**HTTP request:**

```json
POST https://clinicals.spineservices.nhs.uk/STU3/Subscription HTTP/1.1

{
  "resourceType": "Subscription",
  "meta": {
    "profile": [
      "https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"
    ]
  },
  "status": "requested",
  "contact": [
    {
      "system": "url",
      "value": "https://directory.spineservices.nhs.uk/STU3/Organization/RR8",
      "use": "work"
    }
  ],
  "reason": "Health visiting service responsible for Leeds",
  "criteria": "Bundle?type=message&MessageHeader?event=PDS001&MessageHeader?event=PDS001",
  "channel": {
    "type": "message",
    "endpoint": "urn:nhs-uk:addressing:ods:RR8"
  }
}
```

**Response:**

Assuming the subscription has been successfully received by Spine, it will assign an ID for the subscription. The HTTP response will be a "201 Created" HTTP status code, and SHALL also return a Location header which contains the new ID of the created Subscription resource:

```json
HTTP 201 Created
Date: Fri, 25 May 2018 16:09:50 GMT
Last-Modified: Fri, 25 May 2018 16:09:50 GMT
Location: https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a4851-8720-4b49-b978-bdcf7102388c
```

