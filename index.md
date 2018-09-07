---
title: Introduction to Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

## Introduction ##

This Events Management Service (EMS) Specification provides the following functional requirements for managing event messages:

	- [Subscription Management](explore_subscriptions.html)
	- [Event Publication](publication_requirements.html)
	- [Event Receiver Requirements](receiver_requirements.html) 

The specification also details the FHIR components required to fulfill the data item requirements of the following communications published or received by the Events Management Service:

- **National Population Failsafe** including the National Failsafe Alert and National Failsafe Alert Nullify Request.
- **Patient Demographics Service (PDS) Updates** event messages will issue updates made to demographic information held by the PDS.

Additionally, the Events Management Service will manage [Digital Child Health](https://developer.nhs.uk/library/interoperability/digital-child-health) event messages containing information meaningful to those managing the personal health of themselves or their families, professionals providing direct care to children and young people and those managing the health of populations. 

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service, and remains subject to clinical review. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. Changes to this specification following the initial beta release will be documented in the [Release Notes](overview_release_notes.html) section." %}