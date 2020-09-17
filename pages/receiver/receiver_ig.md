---
title: Receiver Information Governance
keywords:  messaging, publication
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: receiver_ig.html
summary: "IG Requirements for receivers of event messages"
---

The following requirements must be met by receiving organisations in order to meet the information governance (IG) requirements of the NEMS. These requirements are aimed at making sure that data is available to Data Protection Officers, Caldicott Guardians and IG leads if it is required.


## Data Use

Any data which is received via the NEMS SHALL only be used for the purposes of direct care.


## Auditing

The provider system must audit all event messages it attempts to process, even if the event message is discarded. The auditing done within a receiving systems must contain enough information to:

- identify which systems have consumed data received via the NEMS
- identify how the data received has been used, such as has the data being consumed into the patient record, ignored, etc.
- identify who has had accessed the data received via the NEMS
- identify when the data was received
- identify when the data was accessed


## Access Control

The receiving system must have appropriate authentication and authorisation restricting access to the patient data received via the NEMS.

The access control model of the patient information system provided by the supplier of the subscribing organisation must deliver the key IG functions of: 
- Authentication
- Authorisation
- Role Based Access Controls (RBAC)
- Legitimate relations
- An audit trail of access and create, amend and delete


### Healthcare Professional Access

The system integrated with NEMS must ensure that prior to accessing the data a user is authenticated.  The subscribing system must ensure that a user:

1. is authenticated using a standard NHS Smartcard that complies with SPINE authentication requirements applicable to NHS Smartcards.
2. has a valid current SPINE authenticated session in place.

Technical requirements and guidance associated with the use of NHS Smartcards, can be found in the [External Interface Specification (EIS)](https://digital.nhs.uk/developer/api-specifications/spine-external-interface-specification), specifically: 
- Part 6 for details of the Spine Security Broker
- Part 7 for details of the Spine Security Broker API


### Citizen Access

Where access is being given to a citizen the following requirements must be met:

- A subscribing system must authenticate the citizen to the DCB3051 Identity Verification and Authentication Standard for Digital Health and Care Services (as used by [NHS Login](https://digital.nhs.uk/services/nhs-login)).
- A subscribing system must authenticate to the standards. defined in the [Good Practice Guide No. 44: Authentication and Credentials for use with HMG Online Services](https://www.gov.uk/government/publications/authentication-credentials-for-online-government-services).



## Legitimate Relationship

The subscribing organisation receiving events MUST ensure that a legitimate care relationship exists with a patient for whom event information is received.

For IG purposes the event receiving organisation MUST have:
- processes in place for managing legitimate relationships
- processes in place for managing legitimate relationships which have expired
- be able to prove the existence of a legitimate relationship on enquiry.


## Lawful Basis

Data received MUST only be used where there is a lawful basis for use of the data.


## Data Retention

Data received via the NEMS SHALL be kept no longer than is necessary for the purposes for which it is being processed.
