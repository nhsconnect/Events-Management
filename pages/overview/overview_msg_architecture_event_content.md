---
title: Message Content
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_event_content.html
summary: "Overview of options for event content"
toc: false
---

There are different ways that event-related information can be shared between publishers and subscribers, each with their own benefits and drawbacks. This page outlines different ways event-related information could be shared between publishers and subscribers over the NEMS but a combination of the different approaches is also possible. This page also makes reference to the [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/), another national Spine service which is required where a subscriber was not subscribed at the point that an event message flowed through NEMS and is interested in the information related to that event message.

When event-related information is shared between a publisher and subscriber, whatever the mechanism, the information shared must be in a standard format and contain all information required to give the main focal bit of information context, for example a comment is unlikely to be useful unless it is in the context of something such as an observations or procedure.


## "Contained information" Event Message

A "Contained information" event message is where the event message contains all the event-related information related to the event. In this scenario when the subscriber receives the event they have all the event-related information available about that event.

There are a number of issues and risks associated with this method of communicating event-related information between the publisher to the subscriber:
- If the consumer has not create a subscription to the event before it is sent through the NEMS, the subscriber will never receive the event and therefore will never receive the event-related information. In this scenario another mechanism is required to retrieve that missed event-related information when it is required, which is where the National Record Locator becomes useful as outlined in the "Missed or Not Received Event" section further down this page.
- Event-related information received is only valid at the point that information is published, there may be updates to the patient record within the publishing system which relate to that event but which does not trigger a new or update event to be published to the NEMS. The results of this is the creation of a clinical risk, when using the event-related information carried within an event message. The risk increases as the elapsed time between the event being received and the information being used by a practitioner increases as there is a greater chance the event-related information could have changed. This risk has to be considered when deciding what event-related information should be included in the event message and how the events should be processed when they are received. 

The example diagram below shows the publisher publishing an encounter event containing all the event-related information to NEMS and that event being forwarded onto the subscriber:

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_full_fat.png"></a>
</div>


## "Linked information" Event Message

A "Linked information" type event message is an event which carries minimal event-related information but instead carries information on where the full set of event-related information can be retrieved. The event message should only contain contextual information such as what type event it is, maybe where it happened and who with but none of the clinical event-related information related to the event. To share the event-related information the event message will include National Record Locator (NRL) format pointers which link to an API endpoint exposed by the publisher where the full set of event-related information available can be retrieved when it is needed.

This approach does not completely mitigate the risk that the content of the event may become out of date, but the chance of this happening within the linked information event message and the risk associated with it is much less than in a contained information event message as there is less content and the content included is only contextual information.

Carrying pointers to the information rather than the information means that the subscriber will get the most up to date event-related information when they need it, even if it has changed in the publishers system. This type of linked information architecture may result in additional calls needing to being made by the subscriber to retrieve the event-related information but where a period of time elapses between receiving the event and the subscriber using the event-related information, this reduces the clinical risk associated with using stale or out of date information.

This linked information approach is also advantageous for messages where the nature and scope of the data could be very broad (e.g. encounters). Using the linked information approach allows for greater control around authenticated and authorised on retrieval of information such as in situations where information may be considered sensitive.

In the example diagram below the event message is sent with some contextual information such as what type event it is, where it happened and who with but none of the clinical event-related information. The message also includes a pointer to an API exposed by the provider where the event-related information can be retrieved. At the point of receiving the event message the subscriber does not have any event-related information but has information on how to retrieve the information from the publisher, when it is needed. The diagram below shows the National Record Locator (NRL) retrieval mechanism which uses the national Spine Security Proxy (SSP) to handle the security between the publisher and subscriber. The NRL pointer carried in the event contains information on the retrieval mechanism and the format of the information that can be retrieved.
 
 <div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_light_weight.png"></a>
</div>
 

## Missed or Not Received Events

The publish and subscribe messaging pattern implemented by the NEMS means that when a subscriber becomes responsible for a patient and creates a new subscription they will not receive any of the event messages which passed through the NEMS before that subscription was created. If a subscriber is interested in event-related information about a patient which may have flowed through NEMS before their subscription was created they will need to use another mechanism to find it.

The [National Record Locator (NRL)](https://developer.nhs.uk/apis/nrl/) should be used to locate and retrieve event-related information. The NRL returns a list of pointers to provider endpoints where information about a patient can be retrieved, in the same format as the pointers carried in a linked information type event message.

When the consumer retrieves the pointers from the NRL they do not have the information about the patient but a list of what information is available and how to retrieve that information. Consumers can decide what information they are interested in and retrieve what they need when they need it. Un-like the NEMS the NRL does not actively notify consumers that information is available, providers need to request the pointers from the NRL which makes the two services suitable for different use cases.

The main benefits of calling the NRL:
- consumers get the most up to date information when it is needed
- the NRL will contain pointers to information which will not flow through the NEMS as an event message, meaning that more information may be available to consumers
- subscribers can get information from events which they missed or did not receive

The example diagram below shows a provider creating a pointer on the NRL. The consumer then requesting pointers from the NRL and receiving the pointers including the one for the providers API. The consumer then makes a request to the provider API endpoint for information through the SSP. In this example the SSP manages authentication and authorisation between the consumer and provider and is the retrieval mechanism required by NRL.

<div style="text-align:center; margin-bottom:20px" >
	<a href="images/overview/msg_full_fat.png" target="_blank"><img src="images/overview/msg_missed.png"></a>
</div>
