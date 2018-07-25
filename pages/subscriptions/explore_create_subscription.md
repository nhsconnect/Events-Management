---
title: Create Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_create_subscription.html
summary: ""
---

## Creating a Subscription ##

To create a subscription, a client will POST a FHIR subscription resource to the EMS FHIR endpoint.

### Subscription Resource ###

The subscription will be submitted as a FHIR Subscription resource.

For example:

```
{
  "resourceType": "Subscription",
  "id": "caa70405-7880-4be2-9a3e-ee34973a0920",
  "meta": {
    "lastUpdated": "2018-05-25T00:00:00Z"
  },
  "status": "requested",
  "end": "2021-01-01T00:00:00Z",
  "reason": "Health visiting service responsible for Lancashire",
  "criteria": [SEE BELOW FOR EXAMPLES],
  "channel": {
    "type": "mesh",
    "endpoint": "",
    "header": ""
  }
}
```

**TO BE CONFIRMED: Capturing the Org/User who created the subscription? Should we include a contained provenance resource for this?**

### Subscription Information ###

| Requirement                                                         | Cardinality                           | FHIR element                                                                |
|---------------------------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| The status of the subscription (initially this will always be "requested" until the subscription is reviewed and activated   | 1..1   | status   |
| Contact details 
| Date the subscription was last updated | 0..1 | meta.lastUpdated |
| Identifier for the subscription | 1..1 | id |
| End date/time for subscription if relevant (e.g. for a temporary subscription). If not provided the subscription will be pepertual and not expire. | 0..1 | end |
| The reason for creating the subscription (human readable description). Used primarily for reviewing the subscription in order to make it active, and also for patients / services to review what subscriptions exist and why they were created. | 1..1 | reason |
| Criteria to match events against for this subscription - see below for examples | 1..1 | criteria |
| The delivery channel to use to deliver the event to the subscriber (currently only "mesh" is supported) | 1..1 | channel.type |
| The specific endpoint (initially MESH mailbox ID) to deliver to | 1..1 | channel.endpoint |
| Additional parameters for the endpoint (initially this would be the MESH workflow ID) | 0..1 | channel.header |


**NOTE: In the base profile, endpoint and header are optional - do we need to profile it to make them mandatory?**

### Criteria Components ###

| Component              | Description |
| /Bundle?type=message   | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message" |
| orgcode=[CODE]         | This is used for Rule-Based (Generic) Subscriptions to specify the organisation code that represents the organisation (or the geography the organisation covers). The [CODE] is the ODS code for the organisation. For example: *https://fhir.nhs.uk/Id/ods-organization-code\|[ODSCode]* |
| nhsnumber=[IDENTIFIER] | This is used for Rule-Based (Generic) Subscriptions to specify the organisation code that represents the organisation (or the geography the organisation covers). The [IDENTIFIER] is the ODS code for the organisation. <br/>For example: **&nhsnumber=https://fhir.nhs.uk/Id/ods-organization-code\|[ODSCode]** |
| subject=[IDENTIFIER]   | This is used for Explicit Subscriptions for an individual subject. The [IDENTIFIER] is the NHS Number for the subject. <br/>For example: **&subject=http://fhir.nhs.net/Id/nhs-number\|[NHS Number]** |
| subject-age=[AGE]      | This is a filter to only match events for sujects who's age meets the criteria supplied. <br/>For example: **&subject-age=lt19&subject-age=gt5** |
| eventcode=[CODE]       | This is the type of event to subscribe to. <br/>For example: **&eventcode=CH006&eventcode=CH012&eventcode=CH014** |


### Criteria Examples ###


TBC


## Create Subscription Example ##

Create Subscription Request

HTTP request:

```
POST https://clinicals.spineservices.nhs.uk/STU3/Subscription HTTP/1.1
```

Request body:

See examples here [TO BE PROVIDED]


