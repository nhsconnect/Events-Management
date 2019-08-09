---
title: Generic Subscription API Requirements
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: subscription_general_api_guidance.html
summary: "Generic additional guidance for using the Subscription API"
---

## Updating a Subscription

The National Events Management Service does not support different versions of Subscriptions, therefore any changes to a subscription will require that the existing subscription is deleted, and a new one created.


## NHS Numbers

Any NHS Numbers included within a subscription sent to the NEMS Subscription API MUST have been verified against the Spine PDS at the point of calling the subscription API.
 
Information on how to verify an NHS Number against the Spine PDS is available on the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/pds_overview.html).

**Note:** The Demographics Batch Service (DBS) should not be used as it will not meet the requirement above.


## Endpoint Registration

To use the NEMS subscription API the submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details). The endpoint ASID on which the subscription API message set is register MUST contain the ODS Codes which will be used within the subscriptions and match the MESH mailbox ODS Code.


## JWT

All requests SHALL include a JWT with information about the requesting system and user (see [the Spine Core specification](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details). Additional NEMS specific requirements for population of the JWT are outlined below.

### JWT Claims

| claim | Required | requirements |
| --- | --- | --- |
| scope | Mandatory | The `scope` claim must be either `patient/Subscription.read` or `patient/Subscription.write` |
| sub | Mandatory | If `requesting_user` claim is included in the JWT then the value of the `sub` claim must match the value of the `requesting_user`. If `requesting_user` claim is not present in the JWT then `sub` claim value must match the value of the `requesting_system` claim. |
| requesting_system | Mandatory | The `requesting_system` claim SHALL include the ASID of the system making the request to the API. This ASID must be valid and be registered with the Spine. |
| requesting_organisation | Mandatory | The `requesting_organisation` claim SHALL include the ODS code for the requesting organisation. The ODS code must be known to Spine and it must be associated with the ASID included within the `requesting_system` JWT claim. |
| requesting_user | Optional | The `requesting_user` should contain the identity of the Health or Social Care professional making the request. |
| requesting_patient | Optional | If included the `requesting_patient` is provided it SHALL include a valid NHS number. |


## NEMS Supported MIME-types

{% include important.html content="Currently the National Events Management Service (NEMS) only supports XML for interactions with the publish API and onward delivery of event messages, therefore subscribers will not receive event messages in a JSON format." %}

The supported MIME-types for the Subscription API are:

- application/fhir+xml
- application/fhir+json
- application/fhir+xml;charset=utf-8
- application/fhir+json;charset=utf-8
- application/xml+fhir
- application/json+fhir
- application/xml+fhir;charset=utf-8
- application/json+fhir;charset=utf-8

Where the MIME-type is not supplied the NEMS will default to `application/xml+fhir;charset=utf-8`

