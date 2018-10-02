---
title: Messaging Architecture Overview
keywords:  messaging
tags: [fhir,messaging]
sidebar: foundations_sidebar
permalink: explore_msg_architecture_overview.html
summary: "Overview of the Messaging Architecture section"
---

**Message Patterns and Message Structure**

The Events Management Service is based on a Publish and Subscribe messaging pattern. Events are created by services such as the National Population Failsafe or Patient Demographics Service. The events are published to a national events hub, which also manages subscriptions to the published events.

**Events**

The event originator will construct an event message, as outlined in this implementation guide. Event messages will be sent into the Events Management Service hub using a simple [FHIR Event Publication API](publication_publish.html).

Onward delivery to subscribers will initially be over MESH, although other delivery channels may be developed in future if there is a demand for them. For further information relating to MESH see [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health).

**Events Diagram**

The diagram shows an example of an event message being published to the hub. The hub manages subscriptions to these publications (in accordance with the Hub Registration Authority):

<img src="images/overview/Events.png" style="width:80%;max-width: 80%;">