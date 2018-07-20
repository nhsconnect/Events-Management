---
title: Create Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_create_subscription.html
summary: ""
---

## Creating a Subscription ##


### Subscription Resource ###

The subscription will be submitted as a FHIR Subscription resource.

For example:

```
{
  "resourceType": "Subscription",
  "id": "caa70405-7880-4be2-9a3e-ee34973a0920",
  "status": "requested",
  "contact": [
    {
      "system": "phone",
      "value": "0113 111 1111"
    }
  ],
  "end": "2021-01-01T00:00:00Z",
  "reason": "Health visiting service responsible for Lancashire",
  "criteria": [SEE BELOW FOR EXAMPLES],
  "channel": {
    "type": "mesh",
  }
}
```

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
