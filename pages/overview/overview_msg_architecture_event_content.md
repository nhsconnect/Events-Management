---
title: Message Content
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_event_content.html
summary: "Overview of options for event content"
toc: false
---

There are different ways that data can be shared between publishers and subscribers, each with their own benefits and drawbacks. This page outlines the different ways in which the NEMS supports for sharing between publishers and subscribers, additionally making reference to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/), another national Spine service which is required where a subscriber was not subscribed at the point where an event message flowed that contained information they are interested in or where the event message does not contain all the information the subscriber is interested in.

When data is shared between a publisher and subscriber, whatever the mechanism, the data shared must be in a format and contain all relevant information to give the main focal bit of information context, for example a practitioner comment is not useful unless it is in the context of something such as an observations or procedure.


## Full Fat Event Message

A "Full Fat Event" message is where the event message contains all the data related to the event. In this scenario when the subscriber receives the event they have all the data available about that event.

There are a number of issues and risks associated with this method of communicating data from the publisher to the subscriber:
- If the consumer has not create a subscription to the event before it is sent through the NEMS, the subscriber will never receive the event and therefore will never receive the data. In this scenario another mechanism is required to retrieve that missed data when it is required, which is where the National Record Locator becomes useful as outlined in the "Missed Event Message" section further down this page.
- Data received is only valid at the point that data is published, there may be updates to the patient record within the publishing system which relate to that event but do not trigger a new or update event to be published to the NEMS. The results is a clinical risk when using the data carried within an event message, which increases the longer the amount of time between the event being received and the data being used by a practitioner. This risk has to be considered when deciding what data should be included in the event message and how the events should be processed when it is received. 

The example diagram below shows the publisher publishing an encounter event containing all the data to NEMS and that event being forwarded onto the subscriber:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_full_fat.png"></a>
</div>


## Light Weight Event Message

A "Light Weight Event" is an event which carries minimal data along with information on where the complete set of data can be retrieved. In the example diagram below the event message is sent with some contextual information such as what type event it is, maybe where it happened and who with but none of the clinical data. The message also includes a pointer to an API exposed by the provider where the data can be retrieved when it is needed. At the point of receiving the event message the subscriber does not have any data but has information on how to retrieve the data, when it is needed either immediately or at some point in the future. The diagram shows one method of retrieval proposed by the National Record Locator (NRL) which is to use the national Spine Security Proxy (SSP) to handle the security between the publisher and subscriber. The pointer information carried in the event would contain information on the available retrieval mechanism and the format of the information that can be retrieved by those mechanisms.
 
 <div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_light_weight.png"></a>
</div>

There is a couple of issues and risks associate with this event model:
- like with a full fat event message the content of the event including the pointer might become out of date. The chance of this happening with the light weight event is much lower as there is less content and as little to no clinical data is shared in the event message then the clinical risk is some what mitigated.
- the main drawback of this type of event message is that an additional request(s) needs to be made to the publisher to get the data for the event. Where a subscriber acts on the event immidiatly 

This minimizes the risk of the data the consumer uses becoming stale or being incorrect. There is a risk that the pointer could become stale or incorrect so this method should also be used with the NRL functionality so that the latest data can be retrieved and used by the consumer.
 
The pointer in the event message may not match the pointers pushed to the NRL as the pointer in the event might point to data specifically about that event where as the pointers in NRL may point to a list of data no specifically about that event.

Reduces the risk of context being lost if not all data is included by including only the minimum to indicate that a business event has happened.


The diagram below shows the publisher publishing an encounter event which contains a minimal set of encounter data but also a pointer to the publishers endpoint where the subscriber can call in order to retrieve the latest information about that patient including all the information about that encounter. The NEMS forwards on the event message to the subscriber who then makes a request to the publisher through the Spine Security Proxy (SSP) for the events supporting data when they need it.

## Missed Event Message

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
