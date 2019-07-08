---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in National Events Management Service Implementation Guide
---


## 2.0.0-Beta () ##

{% include important.html content="Release 2.0.0-Beta includes a significant specification re-structure to improve navigation and readability." %}

[Create Subscription](explore_create_subscription.html)
- Updated event codes to align with new event type value set (**Breaking Change**)

[Event Feedback Mechanism](overview_msg_architecture_feedback.html)
- Added page with information on the feedback mechanism for NEMS

[Generic Requirements](explore_genreic_event_requirements.html)
- Name of page and content changes to match new concept of message header, making this just generic population requirements. Name changed from `Event Header Information` -> `Generic Requirements`
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- Added information about sequencing elements in MessageHeader resource
- Added information about feedback contact information to MessageHeader resource
- Added required extension to the MessageHeader resource which MUST contain details of the Patient who is the focus of the event message which will be used for routing to subscribers.

[Event Lifecycle and Deprecation](overview_msg_architecture_life_cycle.html)
- Added page with information on Event-Lifecycle and Deprecation

[Event Message Sequencing](overview_msg_architecture_sequencing.html)
- Added page with information on Event Message Sequencing

[Event Receiver Requirements](receiver_requirements.html)
- Removed ITK3 Wrapper from solution (**Breaking Change**)

[Generic Publication API Requirements](publication_general_api_guidance.html)
- Added clarification on level of NHS Number validation required for NHS numbers used in the event messages.

[Generic Subscription API Requirements](subscription_general_api_guidance.html)
- Added clarification for use of MIME types
- Added clarification on level of NHS Number validation required for NHS numbers used in subscriptions.

[Introduction to National Events Management Service](index.html)
- Updated wording around definition of what is an event within the context of the NEMS.

[Manage Subscription]()
- Page divided into two separate pages for the subscription interactions, [Read Subscription](explore_read_subscription.html) and [Delete Subscription](explore_delete_subscription.html)

[PDS Birth Notification](pds_birth_notification.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)

[PDS Change of Address](pds_change_of_address.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)

[PDS Change of GP](pds_change_of_gp.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)

[PDS death Notification](pds_death_notification.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)

[Publish an Event Message](publication_publish.html)
- Updated request header `interactionID` requirement

[Read Subscription](explore_read_subscription.html)
- Updated event codes to align with new event type value set

[Receiver Information Governance](receiver_ig.html)
- Moved the Subscription IG page to the Receiver section as requirements are around audit of received events rather than around use of the subscription API.

[Subscriptions Overview](explore_subscriptions.html)
- Added information to the geographical rule based subscriptions section around appropriate use of this type of subscription.

