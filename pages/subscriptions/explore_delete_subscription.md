---
title: Delete Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_delete_subscription.html
summary: "How to delete subscriptions"
---

## Pre-requisites

In addition to the guidance on this page the guidance and requirement on the [Generic Subscription API Requirements](subscription_general_api_guidance.html) page SHALL be followed when using the NEMS subscription API.


## Deleting a Subscription

To delete a specific subscription, the client will need to use the Logical ID that was allocated to the subscription when it was created (see [Create Subscriptions](explore_create_subscription.html))

### HTTP request

To delete a subscription by its logical ID, a standard FHIR delete operation can be used:

```http
DELETE /Subscription/[Subscription_Logical_ID]
```

### Request Headers

The system calling the API MUST include the following HTTP request headers when making the call to the Delete Subscription API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system calling the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Fixed value: `urn:nhs:names:services:clinicals-sync:SubscriptionsApiDelete` |

Additional information about standard headers and endpoint looking is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).


### Error Handling

If an error occurs while trying to process the request the NEMS will return a HTTP error code along with an `OperationOutcome` FHIR resource within the payload. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


### Response

Where a subscription is found for the logical ID and is deleted by the NEMS, the response will be:
- a HTTP status code of `200`.


### Delete Subscription Example

```http
DELETE https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c
```

```http
HTTP 200 OK
Date: Sat, 26 May 2018 12:52:12 GMT
```

