---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in National Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide guidance and FHIR components for the National Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this Implementation Guide following the initial beta release will be documented here.

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

[EMS Event Header Information](explore_event_header_information.html)
- Added additional population guidance and requirements around which fields should be populated with what.

Error Handling
- Removed this page as the content is now specified in more detail on the interaction specific pages, [Publish an Event Message](publication_publish.html) and [Event Receiver Requirements](receiver_requirements.html#itk3-acknowledgements-and-errors)

[Introduction to National Events Management Service](index.html)
- Updated all content with new wording, added a diagram and added a short description to the linked event message implementation guides.

[Manage Subscription](explore_manage_subscription.html)
- Updated example to be XML and added note about only XML support

[Messaging Architecture Overview](explore_msg_architecture_overview.html)
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



