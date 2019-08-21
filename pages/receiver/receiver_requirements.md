---
title: Event Receiver Requirements
keywords:  messaging, receiver
tags: [fhir,messaging,receiver]
sidebar: overview_sidebar
permalink: receiver_requirements.html
summary: "Requirements for event receivers to consume events published by the NEMS"
---

Currently the only delivery method for sending an event message to a consumer is to send it to the consumer's [Message Exchange for Social Care and Health (MESH)](https://digital.nhs.uk/message-exchange-social-care-health) mailbox. Other delivery channels may be developed in future if there is a demand for them.

The event information published to the NEMS will be unchanged and will conform to the requirements and guidance outlined in the [event message](overview_supported_events.html) specific guidance.


## MESH mailbox configuration ##

The receiving MESH mailbox will need to be configured for each of the event message types the organisation wishes to receive from the NEMS. Each event message has its own WorkflowID as specified in the [event message](overview_supported_events.html) specific guidance. Configuration of the MESH mailbox will require a service request to be sent to the MESH management team at NHS Digital.

Functionality within MESH means messages are deleted after a period of time, if not picked up, therefore subscribers MUST ensure that received MESH messages are managed in a timely and appropriate manner to mitigate the risk of losing messages.

