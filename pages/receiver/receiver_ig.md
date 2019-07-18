---
title: Receiver Information Governance
keywords:  messaging, publication
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: receiver_ig.html
summary: "IG Requirements for receivers of event messages"
---

The following requirements must be met by receiving organisations in order to meet the information governance (IG) requirements of the NEMS. These requirements are aimed at making sure that data is available to Data Protection Officers, Caldicott Guardians and IG leads if it is required.

### Auditing

The auditing done within a receiving systems to the NEMS must contain enough information to:

- identify which systems have consumed data received via the NEMS
- identify how the the data received has been used, such as has the data being consumed into the patient record, ignored, etc.
- identify who has had accessed the data received via the NEMS


### Access Control

The receiving system must have appropriate authentication and authorisation restricting access to the patient data received via the NEMS.

The access control model of the patient information system provided by the supplier of the subscribing organisation must deliver the key IG functions of: 
- Authentication
- Authorisation
- Role-based access control
- Legitimate relations
- An audit trail of access and create, amend and delete


### Legitimate Relationship

The subscribing organisation receiving events MUST ensure that a legitimate care relationship exists with a patient for whom event information is received.

For IG purposes the event receiving organisation MUST have:
- processes in place for managing legitimate relationships
- processes in place for managing legitimate relationships which have expired
- be able to prove the existence of a legitimate relationship on enquiry.