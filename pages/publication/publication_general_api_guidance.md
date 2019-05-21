---
title: Generic Publication API Guidance
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_general_api_guidance.html
summary: "Generic additional guidance for using the Publication API"
---

## NHS Numbers

Any NHS numbers used within an event message published to the NEMS SHALL be traced against PDS (see the [Spine Core](https://developer.nhs.uk/apis/spine-core/pds_overview.html) specification for details) before sending it to the NEMS Publish API.

Level of NHS number validation required:

- Suppliers SHALL have a way of validating/independently checking that the NHS number belongs to the patients that the event is about.
- Suppliers must be able to react to changes in a patients NHS Number and changes to their PDS record. Even if an NHS number has previously been validated, that NHS number could have since been invalidated, superseded, or similar. If a supplier cannot perform a PDS synchronisation or retrieve an NHS number for a patient, they will not be able to handle these eventualities and therefore will not be able to successfully publish events to the NEMS.

The NEMS performs a standard cross-check trace but this is not so strict that it would be impossible for the NEMS to accept an NHS number and demographic details that belong to different patients. For this reason the NHS number validation performed by the NEMS does not negate the need for suppliers to validate an NHS numbers they are going to use in event messages they publish to the NEMS.


## Endpoint Registration

To use the NEMS Publication API the submitting system will require national assurance and must be set up as a Spine Endpoint with an associated endpoint certificate (see [here](https://developer.nhs.uk/apis/spine-core/build_endpoints.html) for details).


## JWT

All requests to the Publication API SHALL include a JWT with information about the sending system and organisation (see [the Spine Core specification](https://developer.nhs.uk/apis/spine-core/security_jwt.html) for details). Additional NEMS specific requirements for population of the JWT are outlined below.

### JWT Claims

| claim | Required | requirements |
| --- | --- | --- |
| scope | Mandatory | The `scope` claim must be `patient/Bundle.write` |
| Sub | Mandatory | If `requesting_user` claim is included in the JWT then the value of the `sub` claim must match the value of the `requesting_user`. If `requesting_user` claim is not present in the JWT then `sub` claim value must match the value of the `requesting_system` claim. |
| requesting_system | Mandatory | The `requesting_system` claim SHALL include the ASID of the system making the request to the API. This ASID must be valid and be registered with the Spine. |
| requesting_organisation | Mandatory | The `requesting_organisation` claim SHALL include the ODS code for the sending organisation. The ODS code must be known to Spine and it must be associated with the ASID included within the `requesting_system` JWT claim. |
| requesting_user | Optional | The `requesting_user` should contain the identity of the Health or Social Care professional making the request. |


## NEMS Supported MIME-types

The supported MIME-types for the NEMS, for use in the "Content-Type" and "Accept" headers are:

- application/fhir+xml
- application/fhir+xml;charset=utf-8
- application/xml+fhir
- application/xml+fhir;charset=utf-8

Where the MIME-type is not supplied the NEMS will default to `application/xml+fhir;charset=utf-8`

{% include important.html content="Currently the National Events Management Service (NEMS) only supports XML for interactions with the publish API, therefore any event message published to NEMS must have a `Content-Type` containing one of the XML format above." %}