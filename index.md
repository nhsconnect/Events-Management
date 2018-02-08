---
title: Introduction to Events Management Service
keywords: homepage
tags: [overview]
sidebar: overview_sidebar
permalink: index.html
toc: false
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis.  It is advised not to develop against these specifications until a formal announcement has been made." %}

## Introduction ##

The Events Management Service (EMS) Specification supports the following communications:

- **National Failsafe** this event message is intended to support both population tracking and population screening. It will alert  parents and professionals if the standard programme of care is not delivered or undertaken as expected.
- **Patient Demographics Service (PDS) Updates** these event messages will issue updates to demographic information held by the PDS.
- **Digital Child Health** event messages containing contain information meaningful to those managing the personal health of themselves or their families, those professionals providing direct care to children and young people and those managing the health of populations. 

The FHIR profiles in this specification have been developed to explore the event message design options using the [Digital Child Health Event Catalogue Specification](https://nhsconnect.github.io/Digital-Child-Health-STU3/) as a use case. 