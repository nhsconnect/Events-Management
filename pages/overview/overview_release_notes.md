---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in Events Management Service Implementation Guide
---

This site is under active development by NHS Digital and is intended to provide guidance and FHIR components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis, and remains subject to clinical review. Changes to this Implementation Guide following the initial beta release will be documented here.

## Beta 1.3.0 ##

[Create Subscription](explore_create_subscription.html)
- Changes page layout
- Added note around only supporting XML
- updated example to be XML

[EMS Event Header Information](explore_event_header_information.html)
- Added additional population guidance and requirements around which fields should be populated with what.

[Introduction to Events Management Service](index.html)
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


## Beta 1.2.0 ##

**Create Subscription** - Added:
- subscriptionRuleType to the criteria for generic subscriptions
- references to Search Parameters applicable to the criteria.

**Manage Subscription** - Added pre-requisites.

**Search for Subscription** - Added a page to describe how to search for subscriptions by ODS code of a subscribing organisation.

**Receiver Requirements** - Added guidance on FHIR representation of an event message bundle using the ITK3 Messaging Distribution wrapper.

## Beta 1.1.0 ##

**About** - renamed to **Contact Us** - this page has been updated to share contact information. Guidance around FHIR profiles for event messages has been removed as it is not within the scope of this Implementation Guide. 

**Event Header Design** renamed to **Event Header Information** - this page has been updated to include references to FHIR profiles in use, and include further clarification.

**Messaging Overview** removed **Event message data item requirement notation** section.
 
**Overview** text edited to refer to Implementation Guides and not specifications. 

The Implementation Guide has been updated to include guidance sections for
- [Subscription Management](explore_subscriptions.html).
- [Event Publication](publication_requirements.html)
- [Event Receiver Requirements](/receiver_requirements.html) 

The EMS Event Message Bundle Structure page has been update to include clarification on the use of absolute URL references to Organization resources via the [FHIR ODS Lookup API](https://developer.nhs.uk/apis/ods).

**Error Handling**

The Implementation Guide has been updated to include guidance on [Error Handling](explore_error_handling.html), replacing the EMS Event Message Response.

The Messages section has been removed. This content has been redesigned and individual FHIR Event Message Implementation Guides have been created for this content:

- [National Population Failsafe Management](https://developer.nhs.uk/library/interoperability/national-failsafe) 
- [Demographic Update Event Messages](https://developer.nhs.uk/library/interoperability/demographic-updates)  

Added page [Versioning](explore_event_versioning.html) to clarify versioning of event instances and event definitions.

## Beta 1.0.1 ##
This implementation guide has been updated to include a guidance page for accessing example messages.
 
## Beta 1.0.0 ##
This Beta release includes implementation guidance to support the development of the following aspects of the Events Management Service:

- EMS Event Message Response
- National Failsafe Alert and Failsafe Nullify event messages
- Patient Demographics Service Updates event messages



