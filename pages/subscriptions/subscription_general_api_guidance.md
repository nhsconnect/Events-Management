---
title: Generic Subscription API Requirements
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: subscription_general_api_guidance.html
summary: "Generic additional guidance for using the Subscription API"
---

## NHS Numbers

Any NHS numbers used when submitting a request to the NEMS subscription API SHALL have been traced against PDS (see the [Spine Core](https://developer.nhs.uk/apis/spine-core/pds_overview.html) specification for details).

## Endpoint Registration

To use the NEMS subscription API the submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).


## JWT

All requests SHALL include a JWT with information about the requesting system and user (see [the Spine Core specification](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details). Additional NEMS specific requirements for population of the JWT are outlined below.

### JWT Claims

| claim | Required | requirements |
| --- | --- | --- |
| scope | Mandatory | The `scope` claim must be either `patient/Subscription.read` or `patient/Subscription.write` |
| Sub | Mandatory | The `sub` claim value must match the value of the `id` element within the `requesting_system` claim resource. |
| requesting_patient | Optional | If included the `requesting_patient` is provided it SHALL include a valid NHS number. |
| requesting_system | Mandatory | The `requesting_system` claim SHALL include the ASID of the system making the request to the API. This ASID must be valid and be registered with the Spine. |
| requesting_organisation | Mandatory | The `requesting_organisation` claim SHALL include the ODS code for the requesting organisation. The ODS code must be known to Spine and it must be associated with the ASID included within the `requesting_system` JWT claim. |


## NEMS Supported MIME-types

The supported MIME-types for the NEMS, for use in the "Content-Type" and "Accept" headers are:

- application/fhir+xml
- application/fhir+json
- application/fhir+xml;charset=utf-8
- application/fhir+json;charset=utf-8
- application/xml+fhir
- application/json+fhir
- application/xml+fhir;charset=utf-8
- application/json+fhir;charset=utf-8

Where the MIME-type is not supplied the NEMS will default to `application/xml+fhir;charset=utf-8`