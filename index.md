---
title: Introduction to Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. More detail is given in [Guide Versioning](overview/overview_guide_versioning.html). It is advised not to develop against these specifications until a formal announcement has been made." %}

## Introduction ##

The Events Management System (EMS) Specification supports the following communications using the generic EMS event header items:

**National Failsafe** - this event message is intended to support both population tracking and population screening. It will alert  parents and professionals if the standard programme of care is not delivered or undertaken as expected.

**Patient Demographics Service (PDS) Updates** - these event messages will issue updates to demographic information held by the PDS.
 
**Note:** These experimental state FHIR profiles have been developed to explore the event message design options using the [Digital Child Health Event Catalogue Specification](https://nhsconnect.github.io/Digital-Child-Health/Generated/Chapter.1.About/index.html) as a use case. 