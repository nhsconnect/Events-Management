---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in National Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide guidance and FHIR components for the National Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this Implementation Guide following the initial beta release will be documented here.

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


## 1.5.4-Beta (19/06/2019) ##

[Generic Publication API Guidance](publication_general_api_guidance.html)
- Updated specification around the use of NHS Numbers, making clear the requirement that NHS Numbers included in an event must be verified against the Spine at the point of publishing or directly before publishing an event message


## 1.5.3-Beta (02/05/2019) ##

[Supported Event Messages](overview_supported_events.html)
- Updated Physical Exam link to be the new NIPE Outcome link


## 1.5.2-Beta (28/02/2019) ##

[Generic Subscription API Guidance](subscription_general_api_guidance.html)
- Updated claims information relating to `requesting_user` to align with validation performed by the NEMS


## 1.5.1-Beta (26/02/2019) ##

[Event Header Information](explore_genreic_event_requirements.html)
- Corrected generic sections to align with the generic requirements for events passed through NEMS


## 1.5.0-Beta (21/02/2019) ##

[Event Header Information](explore_genreic_event_requirements.html)
- Made page content more generic rather than being PDS event message orientated to allow for the variation in FHIR resources within the DCH event messages.

[Introduction to National Events Management Service](index.html)
- Updated DCH spec link to the release candidate spec rather than the beta spec.
- Added information highlighting the intended use cases and what is considered an event.
- Added information pointing to National Record Locator (NRL) for record retrieval.

[Messaging Architecture Overview](overview_msg_architecture.html)
- Added additional wording to `Delivery Of Event Messages` section of the page, linking to the `Event Receiver Requirements` within the spec.

[Publish an Event Message](publication_publish.html)
- Added the `What data to publisher` section to outline some requirements around when to publish data and highlight the risk that a publisher may receive back their own published event message.
- Added the fixed value for the `InteractionID` http header.

[Supported Event Messages](overview_supported_events.html)
- Added page to indicate which event messages are currently supported by the NEMS.


## 1.4.3-Beta (22/01/2019) ##

[Create Subscription](explore_create_subscription.html)
- Corrected examples to use the encoded `&amp;` rather than the `&` character as required to be valid xml.

[Generic Publication API Guidance](publication_general_api_guidance.html)
- Added detail around the content type required for publishing event messages.

## 1.4.2-Beta (17/01/2019) ##

[Create Subscription](explore_create_subscription.html)
- Moved the Pre-requisites section to the "Generic Subscription API Guidance" page
- Corrected text in criteria element of the example xml to encode characters as required to be valid xml

[Generic Publication API Guidance](publication_general_api_guidance.html)
- Page added with additional information around MIME types and JWT population for the publish API

[Generic Subscription API Guidance](subscription_general_api_guidance.html)
- Page added with additional information around MIME types and JWT population for subscription API

[Manage Subscription](explore_manage_subscription.html)
- Moved the Pre-requisites section to the "Generic Subscription API Guidance" page
- Corrected text in criteria element of the example xml to encode characters as required to be valid xml

[Publish an Event Message](publication_publish.html)
- Moved the Pre-requisites section to the "Generic Publication API Guidance" page

## 1.4.1-Beta (15/01/2019) ##

[Create Subscription](explore_create_subscription.html)
- Updated the wording within the "EMS-Subscription-1 resource population" table to make the expectations around the `contact` element more clear.


## 1.4.0-Beta (11/01/2019) ##

[Create Subscription](explore_create_subscription.html)
- Updated wording relating to use of JSON and XML for API's as both are supported for the publish and subscription API's, the event messages currently can only be sent to subscribers in XML
- Added guidance around required headers for interactions with the subscription API
- Added information around error responses
- Updated serviceType subscription criteria to be optional

[Event Receiver Requirements](receiver_requirements.html)
- Updated wording around the configuration of MESH and the use of WorkflowIDs.

[Manage Subscription](explore_manage_subscription.html)
- Added guidance around required headers for interactions with the subscription API
- Added information around error responses

[PDS Change of GP](explore_pds_change_of_gp.html)
- Updated EpisodeOfCare resource guidance making clear that the time periods within the resource are optional.

[Publish an Event Message](publication_publish.html)
- Added guidance around required headers for interactions with the publish API

[Publisher Information Governance](publication_ig.html)
- Added new page with new requirements

[Search for Subscriptions](search_subscription.html)
- REMOVED - this has not been implemented yet so has been removed until it is implemented

[Subscriber Information Governance](subscription_ig.html)
- Added new page with new requirements


## 1.3.0-Beta ##

[Create Subscription](explore_create_subscription.html)
- Changes page layout
- Added note around only supporting XML
- updated example to be XML

[EMS Event Header Information](explore_genreic_event_requirements.html)
- Added additional population guidance and requirements around which fields should be populated with what.

Error Handling
- Removed this page as the content is now specified in more detail on the interaction specific pages, [Publish an Event Message](publication_publish.html) and [Event Receiver Requirements](receiver_requirements.html#itk3-acknowledgements-and-errors)

[Introduction to National Events Management Service](index.html)
- Updated all content with new wording, added a diagram and added a short description to the linked event message implementation guides.

[Manage Subscription](explore_manage_subscription.html)
- Updated example to be XML and added note about only XML support

[Messaging Architecture Overview](overview_msg_architecture.html)
- Updated information with more detail around publishers and subscribers

[Search for Subscriptions](search_subscription.html)
- Added note around only support for XML
- Updated example to be XML

[Subscriptions Overview](explore_subscriptions.html)
- Added additional information around multiple subscription matches for a single event message

Versioning
- Removed this versioning page as it contained incorrect and missleading information. Any details which need to be included will be added to the other spec versioning page.


## 1.2.0-Beta ##

**Create Subscription** - Added:
- subscriptionRuleType to the criteria for generic subscriptions
- references to Search Parameters applicable to the criteria.

**Manage Subscription** - Added pre-requisites.

**Search for Subscription** - Added a page to describe how to search for subscriptions by ODS code of a subscribing organisation.

**Receiver Requirements** - Added guidance on FHIR representation of an event message bundle using the ITK3 Messaging Distribution wrapper.

## 1.1.0-Beta ##

**About** - renamed to **Contact Us** - this page has been updated to share contact information. Guidance around FHIR profiles for event messages has been removed as it is not within the scope of this Implementation Guide. 

**Event Header Design** renamed to **Event Header Information** - this page has been updated to include references to FHIR profiles in use, and include further clarification.

**Messaging Overview** removed **Event message data item requirement notation** section.
 
**Overview** text edited to refer to Implementation Guides and not specifications. 

The Implementation Guide has been updated to include guidance sections for
- [Subscription Management](explore_subscriptions.html).
- [Event Publication](publication_requirements.html)
- [Event Receiver Requirements](/receiver_requirements.html) 

The NEMS Event Message Bundle Structure page has been update to include clarification on the use of absolute URL references to Organization resources via the [FHIR ODS Lookup API](https://developer.nhs.uk/apis/ods).

**Error Handling**

The Implementation Guide has been updated to include guidance on [Error Handling](explore_error_handling.html), replacing the NEMS Event Message Response.

The Messages section has been removed. This content has been redesigned and individual FHIR Event Message Implementation Guides have been created for this content:

- [National Population Failsafe Management](https://developer.nhs.uk/library/interoperability/national-failsafe) 
- [Demographic Update Event Messages](https://developer.nhs.uk/library/interoperability/demographic-updates)  

Added page [Versioning](explore_event_versioning.html) to clarify versioning of event instances and event definitions.

## 1.0.1-Beta ##
This implementation guide has been updated to include a guidance page for accessing example messages.
 
## 1.0.0-Beta ##
This Beta release includes implementation guidance to support the development of the following aspects of the National Events Management Service:

- NEMS Event Message Response
- National Failsafe Alert and Failsafe Nullify event messages
- Patient Demographics Service Updates event messages



