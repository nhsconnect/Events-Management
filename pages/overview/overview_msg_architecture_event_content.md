---
title: Message Content
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_event_content.html
summary: "Overview of options for event content"
toc: false
---

There are different ways that data can be shared between publishers and subscribers, each with their own benefits and drawbacks. This page outlines the different ways in which the NEMS supports for sharing between publishers and subscribers and makes reference to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/), another national Spine service which is required where a subscriber was not subscribed at the point where information they are interested in flowed as an event message or where the event message does not contain all the information the subscriber is interested in.
 

## Full Fat Event Message

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_full_fat.png"></a>
</div>

The "NEMS Full Fat Event" message is where the event message contains all the data so when the consumer receives the event they have all the data and therefore do not need to retrieve anything additionally from the publisher (Provider). The issue with this method of sending data from the provider to the consumer is that, if the consumer does not have a subscription for the event before it is sent they will miss the event and the data. This is why this method needs to be used in conjunction with the NRL functionality so that if an event message was missed the consumer can get the data at a later date.

Benefits
- Get all the data immediately

Drawbacks
- The data can become stale or incorrect if update in the publishers system


## Light Weight Event Message

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_light_weight.png"></a>
</div>

The "NEMS Light Weight Event" is an event which carries minimal data and carries where the consumer should go for the data when they need it. In the diagram above the Event message would be sent with some contextual information but no clinical data and a pointer to the provider endpoint which they would need to call to get the data. After the consumer receives the event they would not have the encounter data, they would only have a pointer to where they could retrieve it from. When they needed the data they could use the pointer to call the Provider through the SSP and retrieve the data.
 
This minimizes the risk of the data the consumer uses becoming stale or being incorrect. There is a risk that the pointer could become stale or incorrect so this method should also be used with the NRL functionality so that the latest data can be retrieved and used by the consumer.
 
The pointer in the event message may not match the pointers pushed to the NRL as the pointer in the event might point to data specifically about that event where as the pointers in NRL may point to a list of data no specifically about that event.

Reduces the risk of context being lost if not all data is included by including only the minimum to indicate that a business event has happened.


## Misses Event message

Using the NEMS will allow retrieval of information from the provider without ever receiving an event. The NRL will also make available information which does not flow through the NEMS as an event. The NEMS is designed to inform subscribers something has happened when they need to know, if the subscriber wants information from other suppliers to improve patient care at the point of care then NRL is an appropriate service to use as it give the subscriber the most up to date and complete information for all providers who have information about the patient.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_missed.png"></a>
</div>

If an event is missed as a subscription did not exist in NEMS when the event flowed through the NEMS the consumer will need to use another mechanism to retrieve the data when they need it. The NRL will allow the consumer to identify that data is available within a provider and the NRL will give them a pointer to where they can retrieve the data, at this stage they only have a pointer to where the data is and not the actual data. The consumer then needs to use the data in the pointer to call the providers API through the SSP in order to retrieve the data.

NRL does not actively notify providers that data is available, providers need to request the pointers from the NRL. This is not a drawback when the information is only needed during a consultation with the patient but for something such as admission and discharge, some subscribers would like to know that a patient has been admitted or discharged as it affects their workflow therefore this would be appropriate for NEMS but the information about that hospital admission would be useful as historical information for future reference so it is useful as a NRL pointer as well.

Benefits
- Returns up to date information
- Makes available additional information which will not flow through the NEMS as an event message.
- Do not have to have a subscription when information about a patient was recorded, the information can be retrieved at any point.
