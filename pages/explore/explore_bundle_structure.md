---
title: Bundle Structure
keywords:  messaging, bundles
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_bundle_structure.html
summary: "The structure of the bundle used for EMS event messages"
---

## The EMS Event Message Bundle Structure ##

To enable a standardised structure to carry information within the scope of the Events Management Service, the EMS Message Bundle and the EMS Message Header combine to make up the initial event message bundle structure: 

<img src="images/explore/emsbundlestructure.png" style="width:50%;max-width: 50%;">

This is consistent with the [FHIR specification for the Bundle resource](http://hl7.org/fhir/bundle.html#message), which states that 'A message bundle (type = "message") consists of a series of entries, the first of which is a MessageHeader.'  

**MessageHeader focus**

The root class of the MessageHeader is fulfilled using the 'focus' element in the resource. This will reference the appropriate resource depending on the following conditions:

- for clinical events, the 'focus' will reference an [Encounter](http://hl7.org/fhir/encounter.html) resource
- for information alerts or updates, the 'focus' will reference a [Communication](http://hl7.org/fhir/communication.html) resource
- for any other events yet to be scoped, it is expected that the 'focus' may be any FHIR resource where the 'subject' element is fulfilled by a reference to a [Patient](http://hl7.org/fhir/patient.html) resource.

## The EMS Event Message Bundle Structure with Event Header Items ##

The following components are then added to the initial EMS Event Message Bundle structure in order to fulfill the [event header requirement](explore_event_header_design.html).

<img src="images/explore/emsheaderitems.png" style="width:75%;max-width:75%;">

**Organisation resources in EMS Event Message Bundle Structure**

Where possible, the EMS bundle will contain contain an absolute URL reference to an Organization resource, which can be retrieved as described in the [FHIR ODS Lookup API Implementation guide](https://developer.nhs.uk/apis/ods/restfulapis_identification_organization.html).

## The EMS Event Message Bundle Structure with EMS Data Items ##

Finally, using the [National Failsafe Alert](explore_national_failsafe_alert.html) as an example, the following components are added to the EMS Event Message Bundle structure in order to fulfill the data item requirements specific to the event.

<img src="images/explore/emsdataitems.png" style="width:90%;max-width:90%;">

