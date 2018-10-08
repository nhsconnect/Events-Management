---
title: Search for Subscriptions
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: search_subscription.html
summary: "How to search for subscriptions"
---

## Pre-requisites ##

Before a subscription can found through a search the following must be in place:

- The submitting system will require national assurance and be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).
- All requests will include a JWT with information about the requesting system and user (see [here](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details).

## Searching for a Subscription ##

Currently, the only criteria available to search for subscriptions is the ODS code of the organisation that creates/owns the subscription (held in the contact.value field in the subscription).

To search for a subscription for a specific ODS code, a standard FHIR search operation can be used

**HTTP request:**

```json
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription?contact=RR8
```

**Response:**

```json
HTTP 200 OK
Date: Sat, 26 May 2018 12:34:11 GMT
Content-type: application/json+fhir

{
  "resourceType": "Bundle",
  "id": "a59a404d-54fd-440a",
  "meta": {
    "lastUpdated": "2018-05-26T12:34:11Z"
  },
  "type": "searchset",
  "total": 1,
  "link": [
    {
      "relation": "self",
      "url": "https://clinicals.spineservices.nhs.uk/STU3?contact=RR8"
    }
  ],
  "entry": [
    {
      "resourceType": "Subscription",
      "id": "ea0a4851-8720-4b49-b978-bdcf7102388c",
      "meta": {
        "lastUpdated": "2018-05-26T00:00:00+00:00",
        "versionID": "25777f7d-27bc",
        "profile": [
          "https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"
        ]
      },
      "status": "active",
      "contact": [
        {
          "system": "url",
          "value": "https://directory.spineservices.nhs.uk/STU3/Organization/RR8",
          "use": "work"
        }
      ],
      "reason": "Health visiting service responsible for Leeds",
      "criteria": "/Bundle?type=message&orgcode=X2458&eventcode=PDS001&eventcode=PDS002&eventcode=PDS003&eventcode=PDS004",
      "channel": {
        "type": "mesh",
        "endpoint": "Mailbox1234"
      }
  ]
}
```

