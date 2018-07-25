---
title: Manage Subscriptions
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_manage_subscriptions.html
summary: "How to update and delete subscriptions"
---

## Retrieving a Subscription ##

To retrieve a specific subscription, the client will need to use the ID that was allocated to the subscription when it was created (see [Create Subscriptions](explore_create_subscription.html))

**HTTP request:**

```json
GET https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a4851-8720-4b49-b978-bdcf7102388c
```

**Response:**

```json
HTTP 200 OK
Date: Sat, 26 May 2018 12:34:11 GMT
Last-Modified: Sat, 26 May 2018 00:00:00 GMT
Content-type: application/json+fhir

{
  "id": "ea0a4851-8720-4b49-b978-bdcf7102388c",
  "resourceType": "Subscription",
  "meta": {
    "lastUpdated": "2018-05-26T00:00:00Z"
  }
  "status": "active",
  "end": "2021-01-01T00:00:00Z",
  "reason": "Health visiting service responsible for Lancashire",
  "criteria": "/Bundle?type=message&orgcode=X2458&eventcode=PDS001&eventcode=PDS002&eventcode=PDS003&eventcode=PDS004",
  "channel": {
    "type": "mesh",
    "endpoint": "",
    "header": ""
  }
}
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

The NEMS will not mantain versions of Subscriptions, so any changes to a subscription will require that the existing subscription is deleted, and a new one created.

