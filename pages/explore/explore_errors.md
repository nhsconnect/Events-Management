---
title: Error Handling
keywords: errors
tags: [fhir,errors]
sidebar: overview_sidebar
permalink: explore_errors.html
summary: "Error Handling"
---

## Synchronous Calls: Submitting Events and Managing Subscriptions ##

When calls are made into the national Events Management Service as synchronous FHIR calls (either when submitting an event to the service, or when creating or updating subscriptions), any errors that occur will be immediately returned in the response to the call, and will use the standard Spine OperationOutcome profile used across all Spine services.

Details of this outcome resource are detailed in the Spine Core FHIR framework [here](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html).

Additionally, the Events Management Service will return an [Event Message Response](explore_ems_event_response.html) to convey a technical validation success or failure response to an event message received.

## Onward Delivery via MESH ##

Where a subscriber has specified MESH as a delivery channel for onward delivery of events, these messages will make use of the delivery and error behaviours defined in the ITK3 message distribution specification [here](https://nhsconnect.github.io/ITK3-FHIR-Messaging-Distribution/explore_response_codes.html).

