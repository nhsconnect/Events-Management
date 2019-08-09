---
title: Message Content
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_event_content.html
summary: "Overview of options for event content"
toc: false
---

There are different ways that data can be shared between publishers and subscribers, each with their own benefits and drawbacks. This page outlines the different ways data could be shared between publishers and subscribers over the NEMS. This page also makes reference to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/), another national Spine service which is required where a subscriber was not subscribed at the point that an event message flowed through NEMS and is interested in the information they missed.

When data is shared between a publisher and subscriber, whatever the mechanism, the data shared must be in a standard format and contain all information required to give the main focal bit of information context, for example a comment is unlikely to be useful unless it is in the context of something such as an observations or procedure.


## Full Fat Event Message

A "Full Fat Event" message is where the event message contains all the data related to the event. In this scenario when the subscriber receives the event they have all the data available about that event.

There are a number of issues and risks associated with this method of communicating data from the publisher to the subscriber:
- If the consumer has not create a subscription to the event before it is sent through the NEMS, the subscriber will never receive the event and therefore will never receive the data. In this scenario another mechanism is required to retrieve that missed data when it is required, which is where the National Record Locator becomes useful as outlined in the "Missed Event Message" section further down this page.
- Data received is only valid at the point that data is published, there may be updates to the patient record within the publishing system which relate to that event but which does not trigger a new or update event to be published to the NEMS. The results of this is the creation of a clinical risk, when using the data carried within an event message. The risk increases as the elapsed time between the event being received and the data being used by a practitioner increases as there is a greater chance the data could have changed. This risk has to be considered when deciding what data should be included in the event message and how the events should be processed when they are received. 

The example diagram below shows the publisher publishing an encounter event containing all the data to NEMS and that event being forwarded onto the subscriber:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_full_fat.png"></a>
</div>


## Light Weight Event Message

A "Light Weight Event" is an event which carries minimal data along with information on where the complete set of data can be retrieved. The event message should only contain contextual information such as what type event it is, maybe where it happened and who with but none of the clinical data related to the encounter. To share the clinical data the event message will also includes a pointer to an API endpoint exposed by the publisher where the complete set of data can be retrieved when it is needed.

There is a potential drawback and risks associate with this event model:
- like with a full fat event message the content of the event including the pointer to the supporting data may become out of date. The chance of this happening with the light weight event is much lower than in a full fat event as there is less content and the content included is only contextual information. Carrying pointers to the information rather than the information means that the subscriber will get the most up to date data when they need it, even if it has changed in the publishers system.
- the potential drawback of this type of event message is that an additional request needs to be made to the publisher, in order for the subscriber to get the data they require. Where a subscriber wishes to acts on the data immediately this adds an extra step but where a period of time elapses before the subscriber requires the data, this reduces the risk of using stale or out of date information compared to a full fat event message.

In the example diagram below the event message is sent with some contextual information such as what type event it is, where it happened and who with but none of the clinical data. The message also includes a pointer to an API exposed by the provider where the data can be retrieved. At the point of receiving the event message the subscriber does not have any data but has information on how to retrieve the data, when it is needed either immediately or at some point in the future. The diagram below shows one method of retrieval proposed by the National Record Locator (NRL) which is to use the national Spine Security Proxy (SSP) to handle the security between the publisher and subscriber. The pointer information carried in the event would contain information on the available retrieval mechanisms and the format of the information that can be retrieved using those mechanisms.
 
 <div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_light_weight.png"></a>
</div>
 

## Missed Event Message

The publish and subscribe messaging pattern implemented by the NEMS means that when a subscriber becomes responsible for a patient and creates a new subscription they will not receive any of the event messages which passed through the NEMS before that subscription was created. If a subscriber is interested in data about a patient which may have flowed through NEMS before their subscription was created they will need to use another mechanism to find it.

One mechanism which can be used to find information shared for a patient is the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/). The NRL returns a list of pointers to provider endpoints where data about a patient can be retrieved, similar to the pointer which would be carried in a light weight event message. When the consumer retrieves the pointers from the NRL they do not have the patient data but information on what data is available and what mechanisms are available to retrieve the information.  Consumers can decide what information they are interested in and retrieve what they need when they need it. Un-like the NEMS the NRL does not actively notify consumers that data is available, providers need to request the pointers from the NRL which makes the two services suitable for different use cases but a consumer benefits from using both services together.

The main benefits of calling the NRL:
- consumers get the most up to date information when it is needed
- the NRL will contain pointers to information which will not flow through the NEMS as an event message meaning that more information may be available to consumers
- subscribers can get information from events which they missed if they did not have a subscription when the message flowed through the NEMS

The example diagram below shows a provider creating a pointer on the NRL, then the consumer requesting pointers from the NRL and retrieving the pointer for the provider. The consumer then makes a request for the data from the provider API endpoint through the SSP. In this example the SSP manages authentication and authorisation between the consumer and provider.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_missed.png"></a>
</div>
