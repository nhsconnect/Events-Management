---
title: Publisher Information Governance
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_ig.html
summary: "IG Requirements for publishing event messages into the NEMS"
---

The following requirements MUST be met by publishing organisations in order to meet the information governance (IG) requirements of the NEMS. These requirements are aimed at making sure that data is not shared when it should not be and that a record of shared data is available to Data Protection Officers, Caldicott Guardians and IG leads if it is required.


### Patient Dissent To Share

The presence of any local patient dissent to share rules within the publishing system must be adhered to when publishing event messages to the NEMS.


### Spine PDS Flags

If the Spine PDS record for a patient has been marked with an 'S' or 'I' flags, then the publishing system MUST NOT send event messages for this patient.


### Data Rectification

Patients have a legal right to have any incorrect data held within their record rectified. If information held by a publishing system is found to be incorrect and that information was previously shared through the NEMS, the publishing system must be able to correct the information and send relevant update and/or delete event messages to the NEMS allowing for correction of that information within subscribing systems.


### Identification of Shared Data

Publishers must be able to identify what event messages have been published to the NEMS and what data was published, for any of those sent event messages.

The publisher should audit or be able to identify the following data about the published event messages:
- the 'DateTime' the event was published
- the 'eventType' that was published
- meta data about the event (id, sequence number, etc.)
- what data was published (able to present the complete payload which was sent at the point of publishing including all headers and JWT)