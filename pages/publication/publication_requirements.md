---
title: Event Publisher Requirements
keywords:  messaging, publication
tags: [fhir,messaging,publication]
sidebar: overview_sidebar
permalink: publication_requirements.html
summary: "Requirements for event publishers to publish events into the EMS"
---

## Publisher Requirements ##

Publishers will POST events into the Spine as a synchronous HTTP call.

NOTE: This will NOT include any ITK3 wrappers, which are added by Spine to specify the acknowledgement behaviours expected of event receivers (see [receiver requirements](receiver_requirements.html)).

