---
title: Subscription Information Governance
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: subscription_ig.html
summary: "IG Requirements for subscribing to event messages in the NEMS"
---

The following requirements MUST be met by subscribing organisations in order to meet the information governance (IG) requirements of the NEMS. These requirements are aimed at making sure that data is not shared when it should not be and that a record of shared data is available to Data Protection Officers, Caldicott Guardians and IG leads if it is required.

## Data Use

Subscriptions SHALL only be create in order to receive data for the purpose of direct care.


## Legitimate Relationship

The organisation creating a subscription MUST ensure that a legitimate care relationship exists with the patient which is the focus of the subscription and be able to prove the existence of a legitimate relationship on enquiry.

The organisation MUST also have processes in place for managing legitimate relationships which have expired or changed.


## Lawful Basis

Subscriptions MUST only be created where the subscribing organisation has a lawful basis for use of the data they will receive.


## Audit

Providers using the subscription API MUST audit all interactions with the API, including `Create`, `Read` and `Delete`.

The audit data MUST include:

- who or what triggered the subscription create, read or delete
- the date and time when the subscription was created / read / deleted
- details about the subscription such as the event type, the start and end dates for the subscriptions if included and the NHS Number the subscription was for


### Spine PDS Flags

The NEMS will not flow event messages for a patient if the Spine PDS record for that patient has been marked with an 'S' or 'I' flag.
