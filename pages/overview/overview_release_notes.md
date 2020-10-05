---
title: Release Notes
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_release_notes.html
summary: Summary release notes of the versions released in National Events Management Service Implementation Guide
---


## 2.8.0-Beta () ##

[Failsafe Message](failsafe_message.html)
- Removed until required for use

[PDS Record Change](pds_record_change.html)
- Added PDS Record Change event


## 2.7.0-Beta (17/09/2020) ##

[Create Subscription](explore_create_subscription.html)
- Added optional `tag` criteria element requirements to the subscription

[Event Receiver Requirements](receiver_requirements.html)
- Added information on how the new optional subscription `tag` criteria will be shared with the subscriber when they receive event messages, so that they can identify which subscriptions resulted in the event message being sent to the MESH mailbox.

[Receiver Information Governance](receiver_ig.html)
- Added additional detail about the current Access Control requirements, to improve clarity and make clear the requirements for access to information received via NEMS.


## 2.6.0-Beta (28/08/2020) ##

[Onboarding & Assurance](assurance_overview.html)
- Added guidance around the on-boarding and assurance process


## 2.5.0-Beta (04/06/2020) ##

[Controller Catalogue](controller_catalogue.html)
- Added a controller catalogue to help providers meeting their information governance obligations.


## 2.4.0-Beta (09/04/2020) ##

[Create Subscription](explore_create_subscription.html)
- Updated examples for generic subscription criteria

[Failsafe Message](failsafe_message.html)
- Added new page for the Failsafe Message guidance
- New profile created > CareConnect-Task-1 as a copy of the base Task resource 
- New extension created linked to the Task resource > Extension-CareConnect-IncrementNumber-1
- New extension created linked to the Task resource > Extension-CareConnect-FailsafeRuleVersion-1
- Resource Mapping Overview tables added to Blood Spot Test Outcome, Failsafe Message, Newborn Hearing and NIPE Outcome

i.	Failsafe message added to specification

ii.	New entries have been added to the `EventType` CodeSystem (https://fhir.nhs.uk/STU3/CodeSystem/EventType-1) for Failsafe messages. 

| Code | Display |
| failsafe-message-gp-1 | Failsafe Message GP |
| failsafe-message-hvs-1 | Failsafe Message HVS |
| failsafe-message-bloodspot-outcome-1 | Failsafe Message Bloodspot Outcome |
| failsafe-message-nipe-newborn-1 | Failsafe Message NIPE Newborn |
| failsafe-message-newborn-hearing-1 | Failsafe Message Newborn Hearing |

## 2.3.1-Beta (31/03/2020) ##

[Blood Spot Test Outcome](blood_spot_test_outcome_1.html)
- Added missing encounter type to examples

[Newborn Hearing](newborn_hearing_1.html)
- Updated encounter type in examples

[NIPE Outcome](nipe_outcome_1.html)
- Added missing encounter type to examples
- Removed non ascii character from examples

[PDS Birth Notification](pds_birth_notification.html)
- Removed non ascii character from examples

[PDS Change of GP](pds_change_of_gp.html)
- Removed non ascii character from examples

[PDS Death Notification](pds_death_notification.html)
- Removed non ascii character from examples


## 2.3.0-Beta (06/03/2020) ##

[Create Subscription](explore_create_subscription.html)
- enhanced subscriptions API to allow generic rule based subscriptions to be created using the NEMS subscription API

[Blood Spot Test Outcome](blood_spot_test_outcome_1.html)
- Added event message to specification with addition of event life cycle

[Newborn Hearing](newborn_hearing_1.html)
- Added event message to specification with addition of event life cycle

[NIPE Outcome](nipe_outcome_1.html)
- Added event message to specification with addition of event life cycle

[PDS Birth Notification](pds_birth_notification.html)
- Updated example to remove XML prolog for specification consistency.

[PDS Change of Address](pds_change_of_address.html)
- Added guidance around intended use of the event and risk as a result in difference in address format
- Corrected guidance and example of address lines and how they will be included (city and district)

[PDS Death Notification](pds_death_notification.html)
- Updated examples to remove XML prolog for specification consistency.
- Update example to add the bundle resource id element

[Professional Contacts](professional_contacts_1.html)
- Updated example to remove XML prolog for specification consistency.
- Added examples of `update` and `delete` type event messages

[Publish an Event Message](publication_publish.html)
- Updated requirements around `interactionID` and the event code to include as there was a miss alignment between the specification, what is accepted by the NEMS and what current publishers are using.

[Supported Event Messages](overview_supported_events.html)
- Updated interaction event codes in Event messages table to match the expectation in NEMS and what current publishers are sending with the request.

[Vaccinations](vaccinations_1.html)
- Update example to add the bundle resource id element
- Added examples of `update` and `delete` type event messages
- Added example of Immunization Not Given


## 2.2.1-Beta (23/01/2020) ##

[Professional Contacts](professional_contacts_1.html)
- Added guidance on the use of a value set for the episode of care type

[Generic Publication API Guidance](publication_general_api_guidance.html)
- update "sub" claim case to reflect expectation.

[Vaccinations](vaccinations_1.html)
- Corrected unclear guidance around the vaccinationProcedure extension.
- Added missing identifier to the example


## 2.2.0-Beta (22/01/2020) ##

[PDS Birth Notification](pds_birth_notification.html)
- Correction to birth notification example where mothers NHS Number is not included. Also made example full message rather than just parts which were considered different to the example for where mothers details were included.

[Supported Event Messages](overview_supported_events.html)
- Event maturity labels added to give developers a better indication of the chance of change to specific event types.


## 2.1.1-Beta (15/01/2020) ##

[PDS Birth Notification](pds_birth_notification.html)
- {% include warning.html content="A change to element cardinalities within some resources" %}
   
   A birth can be registered on PDS without the mothers details, including her NHS Number. Previously the publication of these birth registrations as a `PDS Birth Notification` event messages resulted in an invalid event message being sent to subscribers. The `PDS Birth Notification` event message has been updated to support birth registrations without the mothers details, through relaxation of the cardinalities within some resources. Changes have been made to the `routingDemographic` extension in the `MessageHeader` resource and within the `Patient` resource representing the mother.
   
   For `PDS Birth Notification` event messages where there is no NHS number for the mother, these event messages will only be sent to subscribers who have a geographic based generic subscription and will not be sent to subscribers based on an explicit subscription.


## 2.1.0-Beta (09/01/2020) ##

[Create Subscription](explore_create_subscription.html)
- updated age criteria to include clarification on use of years

[Event Message Sequencing](overview_msg_architecture_sequencing.html)
- Added additional guidance around the use of sequence numbers in relation to update type event messages.

[Event Receiver Requirements](receiver_requirements.html)
- Generic subscription information moved to [Subscriptions Overview](explore_subscriptions.html) page.

[Generic Event Message Requirements](explore_generic_event_requirements.html)
- Guidance added for population of dateTime elements and the use of time zone offsets.
- Added a section on use of `new`, `update` and `delete` versions of event messages and how that links to the use of `identifiers`.

[Message Content](overview_msg_architecture_event_content.html)
- Page added to explain message content, contained data, linked data and missed messages

[Professional Contacts](professional_contacts_1.html)
- Added new Professional Contacts event message

[Publish an Event Message](publication_publish.html)
- Addition of guidance related to the maximum event message size that could be accepted by the NEMS

[Subscriptions Overview](explore_subscriptions.html)
- Additional information regarding generic subscriptions added

[Supported Event Messages](overview_supported_events.html)
- Professional Contacts event added to supported event messages
- Vaccinations event added to the supported event messages

[Vaccinations](vaccinations_1.html)
- Addition of the Vaccinations event message


## 2.0.1-Beta (09/08/2019) ##

[Event Message Sequencing](overview_msg_architecture_sequencing.html)
- Improved wording around where the type of sequencing indicator will be defined for each event message to make it more clear that it will be defined per event type.

[Generic Publication API Guidance](publication_general_api_guidance.html)
- Added guidance around batch verification of NHS Numbers not being suitable to meet the NEMS requirements

[Generic Subscription API Requirements](subscription_general_api_guidance.html)
- Added guidance around batch verification of NHS Numbers not being suitable to meet the NEMS requirements

[Receiver Information Governance](receiver_ig.html)
- Moved requirements from DPIA into specification around data retention
- Moved requirements from DPIA into specification around data being received only being used for Direct Care
- Moved requirements from DPIA into specification around lawful basis of receiving data about a patient

[Subscription Information Governance](subscription_ig.html)
- Page added for IG requirements on the subscriber
- Moved requirements from DPIA into specification around data being received only being used for Direct Care
- Moved requirements from DPIA into specification around legitimate relationships for subscribers
- Moved requirements from DPIA into specification around lawful basis of receiving data about a patient


## 2.0.0-Beta (22/07/2019) ##

{% include important.html content="Release 2.0.0-Beta includes a significant specification re-structure to improve navigation and readability." %}

[Create Subscription](explore_create_subscription.html)
- Updated event codes to align with new event type value set (**Breaking Change**)

[Event Feedback Mechanism](overview_msg_architecture_feedback.html)
- Added page with information on the feedback mechanism for NEMS

[Event Lifecycle and Deprecation](overview_msg_architecture_life_cycle.html)
- Added page with information on Event-Lifecycle and Deprecation

[Event Message Sequencing](overview_msg_architecture_sequencing.html)
- Added page with information on Event Message Sequencing

[Event Receiver Requirements](receiver_requirements.html)
- Removed ITK3 Wrapper from solution (**Breaking Change**)
- Added requirement highlighting risk around MESH.

[Generic Publication API Requirements](publication_general_api_guidance.html)
- Added clarification on level of NHS Number validation required for NHS numbers used in the event messages.

[Generic Requirements](explore_generic_event_requirements.html)
- Name of page and content changes to match new concept of message header, making this just generic population requirements. Name changed from `Event Header Information` -> `Generic Requirements`
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- Added information about sequencing elements in MessageHeader resource
- Added information about feedback contact information to MessageHeader resource (**Breaking Change**)
- Added required extension to the MessageHeader resource which MUST contain details of the Patient who is the focus of the event message which will be used for routing to subscribers (**Breaking Change**)
- Added requirement for new extension `routingDemographics` which is use by NEMS for message routing
- Added wording to make clear that the MessageHeader will be the first resource in the bundle but other resources may appear in any order and order should not be assumed from the specification order.

[Generic Subscription API Requirements](subscription_general_api_guidance.html)
- Added clarification for use of MIME types
- Added clarification on level of NHS Number validation required for NHS numbers used in subscriptions.
- Added additional audit requirements for use of the subscription API

[Introduction to National Events Management Service](index.html)
- Updated wording around definition of what is an event within the context of the NEMS.

[Manage Subscription]()
- Page divided into two separate pages for the subscription interactions, [Read Subscription](explore_read_subscription.html) and [Delete Subscription](explore_delete_subscription.html)

[PDS Birth Notification](pds_birth_notification.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- WorkflowID updated

[PDS Change of Address](pds_change_of_address.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- WorkflowID updated
- Added guidance about volumes and known issues with the way providers update PDS resulting in flip flopping of addresses

[PDS Change of GP](pds_change_of_gp.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- WorkflowID updated

[PDS death Notification](pds_death_notification.html)
- Added resource cardinality information to specification
- Updated event codes to align with new event type value set (**Breaking Change**)
- FHIR Resource profiles updated to use CareConnect profiles rather than EMS profiled fhir resources (**Breaking Change**)
- WorkflowID updated

[Publish an Event Message](publication_publish.html)
- Updated request header `interactionID` requirement

[Publisher Information Governance](publication_ig.html)
- Improved audit requirements guidance

[Read Subscription](explore_read_subscription.html)
- Updated event codes to align with new event type value set

[Receiver Information Governance](receiver_ig.html)
- Moved the Subscription IG page to the Receiver section as requirements are around audit of received events rather than around use of the subscription API.
- Added additional detail to make clear security requirements
- Added specific requirements around legitimate relationships which originally was in the DPIA

[Subscriptions Overview](explore_subscriptions.html)
- Added information to the geographical rule based subscriptions section around appropriate use of this type of subscription.

