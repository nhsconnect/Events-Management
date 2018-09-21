---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide guidance and FHIR components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this specification following the initial beta release will be documented here.

## Beta 1.1.0 ##

The specification has been updated to include guidance sections for
- [Subscription Management](explore_subscriptions.html).
- [Event Publication](publication_requirements.html)
- [Event Receiver Requirements](/receiver_requirements.html) 

The EMS Event Message Bundle Structure page has been update to include clarification on the use of absolute URL references to Organization resources via the [FHIR ODS Lookup API](https://developer.nhs.uk/apis/ods).

**Error Handling**

The specification has been updated to include guidance on [Error Handling](explore_errors.html), replacing the EMS Event Message Response.

The Messages section has been removed. This content has been redesigned and with separate FHIR message specifications have been created for this content:

- [National Population Failsafe Management](https://developer.nhs.uk/library/interoperability/national-failsafe) 
- [Demographic Update Event Messages](https://developer.nhs.uk/library/interoperability/demographic-updates)  

Added page [Versioning](explore_event_versioning.html) to clarify versioning of event instances and event definitions.

## Beta 1.0.1 ##
This implementation guidance has been updated to include a guidance page for accessing example messages.
 
## Beta 1.0.0 ##
This Beta release includes implementation guidance to support the development of the following aspects of the Events Management Service:

- EMS Event Message Response
- National Failsafe Alert and Failsafe Nullify event messages
- Patient Demographics Service Updates event messages



