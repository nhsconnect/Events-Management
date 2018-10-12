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
| Contact details - at least one instance, with the mandatory instance sharing the ODS code of the Organisation requesting the subscription |1..*| contact | |
| End date/time for subscription if relevant (e.g. for a temporary subscription). If not provided the subscription will be perpertual and not expire. | 0..1 | end |
| The reason for creating the subscription (human readable description). Used primarily for reviewing the subscription in order to make it active, and also for patients / services to review what subscriptions exist and why they were created. | 1..1 | reason |
| Criteria to match events against for this subscription - see below for examples. <br/>**NOTE: the criteria will not be used as part of a RESTful operation** | 1..1 | criteria |
| The delivery channel to use to deliver the event to the subscriber (currently only "message" is supported). <br/>**NOTE: In this case "message" refers to the use of MESH for as a delivery channel.** | 1..1 | channel.type |
| The specific endpoint (initially MESH mailbox ID) to deliver to.<br/>**NOTE: The ODS code associated with the mailbox MUST match the code in the contact section of the subscription** | 1..1 | channel.endpoint |

Once submitted, additional metadata will automatically be added to the Subscription resource by the EMS:

| Requirement                                         | Cardinality  | FHIR element         |
|-----------------------------------------------------|--------------|----------------------|
| Identifier for the subscription.                    | 1..1         | id                   |
| Date the subscription was last updated              | 0..1         | meta.lastUpdated     |
| The ID for the specific version of the subscription | 0..1         | meta.versionId       |

The create request MUST NOT include the fields above, as they can only be added by the EMS (see Create Example below).

Once the subscription has been created it may require IG review prior to becoming active, at which point the status of the Subscription resource will be changed by the EMS to 'active'.

### Criteria Components ###

The criteria element of the Subscription will use the FHIR search string format using the following components:

| Component                       | Description |
| ------------------------------- | ----------- |
| /Bundle?type=message            | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message" |
| subscriptionRuleType=[CODE]     | Type of subscription rule to apply for generic/geographical subscriptions (e.g. Universal Health Visitor, Registered GP, etc). <br />For more detail see the Search Parameter [EMS Subscription Rule Type](https://fhir.nhs.uk/STU3/SearchParameter/EMS-SubscriptionRuleType-1)  |
| Organisation.identifier=[CODE]  | This is used for Rule-Based (Generic) Subscriptions to specify the organisation code that represents the organisation (or the geography the organisation covers). The [CODE] is the ODS code for the organisation. For example: *https://fhir.nhs.uk/Id/ods-organization-code\|[ODSCode]* |
| Patient.identifier=[IDENTIFIER] | This is used for Explicit Subscriptions for an individual patient. The [IDENTIFIER] is the NHS Number for the patient. <br/>For example: **&Patient.identifier=http://fhir.nhs.net/Id/nhs-number\|[NHS Number]**<br /> For more detail see the Search Parameter [EMS Patient Age](https://fhir.nhs.uk/STU3/SearchParameter/EMS-PatientAge-1)|
| Patient.age=[AGE]               | This is a filter to only match events where the age of the patient meets the criteria supplied. <br/>For example: **&Patient.age=lt19&Patient.age=gt5** |
| MessageHeader.event=[CODE]      | This is the type of event to subscribe to (see the [EMS Event Types](https://fhir.nhs.uk/STU3/CodeSystem/EMS-EventType-1)). <br/>For example: **&MessageHeader.event=PDS001&MessageHeader.event=PDS002&MessageHeader.event=PDS003** |

### Subscription Rule Types ###

There is a fixed set of subscription rule types to cater for different types of organisational boundaries and cohorts. These are likely to grow over time as requirements become clear.

Each rule type is also associated with a specific set of events that are pertinent to that type of rule. Subscriptions using a particular rule type can ONLY include event types that are within the list of events for that type.

NOTE: The specific catalogue of subscription rule types, and which events are associated with each will be published here once finalised.

## Criteria Examples ##

| Scenario                             | Subscribing Organisation | Subscription Type | Criteria String                     |
|--------------------------------------|--------------------------|-------------------|------------------------------------|
| A child health service subscribing to four PDS events | CHRD (Org: X2458)         | Rule based (Geographical) | /Bundle?type=message <br/>&subscriptionRuleType=CHRD <br/>&Organisation.identifier=X2458 <br/>&MessageHeader.event=PDS001<br/>&MessageHeader.event=PDS002<br/>&MessageHeader.event=PDS003<br/>&MessageHeader.event=PDS004 |
| A GP practice subscribing to death notification PDS events for patients registered in their practice | GP Practice (Org: E84678) | Rule based (Registered Org) | /Bundle?type=message <br/>&subscriptionRuleType=GP <br/>&Organisation.identifier=E84678<br/>&MessageHeader.event=PDS004 |
| A PHR system subscribing to change of address events for a specific patient registered for a PHR | N/A | Explicit | /Bundle?type=message <br/>&Patient.identifier=9434765919<br/>&MessageHeader.event=PDS002 |

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
  }
  "status": "requested",
  "contact": [
    {
      "system": "url",
      "value": "https://directory.spineservices.nhs.uk/STU3/Organization/RR8",
      "use": "work"
    }
  ],
  "reason": "Health visiting service responsible for Leeds",
  "criteria": "/Bundle?type=message&subscriptionRuleType=CHRD&Organisation.identifier=X2458&MessageHeader.event=PDS001&MessageHeader.event=PDS002&MessageHeader.event=PDS003&MessageHeader.event=PDS004",
  "channel": {
    "type": "message",
    "endpoint": "Mailbox1234"
  }
}
```

**Response:**

Assuming the subscription has been successfully received by Spine, it will assign an ID for the subscription. The HTTP response will be a "201 Created" HTTP status code, and SHALL also return a Location header which contains the new ID of the created Subscription resource:

```json
HTTP 201 Created
Date: Fri, 25 May 2018 16:09:50 GMT
Last-Modified: Fri, 25 May 2018 16:09:50 GMT
ETag: W/"25777f7d-27bc"
Location: https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a4851-8720-4b49-b978-bdcf7102388c
```

