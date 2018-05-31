---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this specification following the initial beta release will be documented here.

## Beta 2.0.0 ##
Following stakeholder feedback, this implementation guidance has been updated as follows:
 - **National Failsafe Alert Nullify Request** - Nullification Reason corrected to refer to EMS-FailsafeAllertNullify-Task-1

FHIR Profiles - 

- **EMS-FailsafeAllertNullify-Task-1** - upversioned to 2.0.0
	- focus.reference changed to 1..1 to mandate originating Failsafe Alert
- **CodeSystem-EMS-FailsafeAlertReason-1** - upversioned to 2.0.0
	- display names for codes updated to align with specification.

Added page [Versioning](explore_event_versioning.html) to clarify versioning of event instances and event definitions.

## Beta 1.0.1 ##
This implementation guidance has been updated to include a guidance page for accessing example messages.
 
## Beta 1.0.0 ##
This Beta release includes implementation guidance to support the development of the following aspects of the Events Management Service:

- EMS Event Message Response
- National Failsafe Alert and Failsafe Nullify event messages
- Patient Demographics Service Updates event messages
