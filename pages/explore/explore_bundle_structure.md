---
title: Bundle Structure
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_bundle_structure.html
summary: "The structure of the bundle used for EMS event messages"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis. More detail is given in [Guide Versioning](/overview_guide_versioning.html). It is advised not to develop against these specifications until a formal announcement has been made." %}

## Background ##
To enable a standardised structure to carry information regarding communication requirements within the scope of the Events Management Service, the EMS Message Bundle and the EMS Message Header combine to make up the initial EMS event message bundle. 

## The EMS Event Message Bundle Structure ##

The diagram below demonstrates the components needed to meet the initial EMS Event Message Bundle structure depending on the nature of the event being represented.

<img src="images/explore/emsbundlestructure.png" style="width:50%;max-width: 50%;">

**MessageHeader focus**

The root class of the MessageHeader is fulfilled using the 'focus' element in the resource. This will reference the appropriate resource depending on the following conditions:

- for clinical events, the 'focus' will reference an [Encounter](http://hl7.org/fhir/encounter.html)
- for informational alerts or updates, the 'focus' will reference a [Communication](http://hl7.org/fhir/communication.html) resource
- fror any other events yet to be scoped, the 'focus' may be any FHIR resource where the 'subject' element is fulfilled by a reference to a [Patient](http://hl7.org/fhir/patient.html) resource.









