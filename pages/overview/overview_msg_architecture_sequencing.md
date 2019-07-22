---
title: Event Message Sequencing
keywords:  messaging
tags: [fhir,messaging]
sidebar: overview_sidebar
permalink: overview_msg_architecture_sequencing.html
summary: "Overview of the event message sequencing architecture"
toc: false
---

When a subscriber receives a number of different event messages for a single patient, the order in which the event messages were published to the NEMS needs to be considered in order to reduce the risk of data loss and overwriting of the latest data with data from an older event message.

Neither the NEMS or MESH guarantee that events will be sent to subscribers in the order that they were published to the NEMS. This is common behaviour in eventing systems and the use of sequence numbers and/or timestamps allows receivers to detect and handle out-of-order messages.


## Identifying Message Order

For subscribers to detect and handle out-of-order messages the NEMS has included, in the generic event requirements, two elements which can be populated by the publisher as required:
- an optional FHIR instant (time stamp with sub-second accuracy) element which represents the point in time that the change occurred in the publishing system that triggered the generation of the event message
- an optional sequence number. The sequence number SHALL be patient and event-type specific and the publisher SHALL increment the sequence number each time a new event of the same type is issued by the same system for the same patient.


## Which Method To Use

Individual event type support for out-of-order message handling and which method is the most appropriate to detect an out-of-order message will be set at a national level, as part of the formal event definition. Additional information on which elements to populate for message sequencing can be seen on the [Generic Requirements](explore_genreic_event_requirements.html) page, within the resource population guidance section for the `MessageHeader` resource.

