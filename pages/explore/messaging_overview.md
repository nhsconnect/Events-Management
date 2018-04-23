---
title: Messaging Architecture Overview
keywords:  messaging
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore.html
summary: "Overview of the Messaging Architecture section"
---

{% include important.html content="This site is under active development by NHS Digital and is intended to provide the FHIR messaging components for the Events Management Service. This project is being developed using an agile methodology so iterative updates to content will be added on a regular basis.  It is advised not to develop against these specifications until a formal announcement has been made." %}

**Message Patterns and Message Structure**

The Events Management Service is based on a Publish and Subscribe messaging pattern. Events are created by services such as the National Population Failsafe or Patient Demographics Service. The events are published to a national events hub, which also manages subscriptions to the published events.

**Events**

The event originator will construct an event message, as outlined in this implementation guide. Event messages will be sent over the NHS Message Exchange for Social Care and Health (MESH) to the Events Management Service hub. 

For further information relating to MESH see [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health).

**Events Diagram**

The diagram shows an example of an event message being published to the hub. The hub manages subscriptions to these publications (in accordance with the Hub Registration Authority):

<img src="images/overview/Events.png" style="width:80%;max-width: 80%;">

**Event message data item requirement notation**

Each event message will detail the information requirements applicable to each data item requirement, these are described as: 

**Mandatory:** should always be included in the electronic communication. Where there is no information then the message will contain appropriate coded text to identify this.   
**Required:** where information should be recorded (and communicated) if available.           
**Optional:** where local decisions can be made about whether or not to communicate the information 
