---
title: Use of ITK3 FHIR profiles in NEMS
keywords:  messaging, receiver
tags: [fhir,messaging,receiver]
sidebar: overview_sidebar
permalink: itk_ems_profiles.html
summary: "Use of ITK3 wrapper FHIR profiles for event receivers to consume events published by the NEMS"
---

## Use of ITK3 wrapper FHIR profiles ##

The FHIR profiles for the [ITK Messaging Distribution](https://developer.nhs.uk/apis/itk3messagedistribution) wrapper will be applied to NEMS as detailed below.

An XML example representation is available at [ITK-EMS-PDSBirthNotification-MessageBundle-Example-1](https://fhir.nhs.uk/STU3/Examples/ITK-EMS-PDSBirthNotification-MessageBundle-Example-1.xml).

## ITK-Message-Bundle-1 ##

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| id | 0..1 | Logical id of this artifact |
| meta | 0..1 | Metadata about the resource |
| identifier | 1..1 | Persistent identifier for the bundle |
| entry | 2..* | entries for [ITK-MessageHeader-2](https://fhir.nhs.uk/STU3/StructureDefinition/ITK-MessageHeader-2) and [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1) resources|

## ITK-MessageHeader-2 ##

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| id | 0..1 | Logical id of this artifact |
| meta | 0..1 | Metadata about the resource |
| extension (ITKMessageHandling) | 1..1 | An extension to support ITK message handling (see below) |
| event | 1..1 | Fixed value: ITK011M (ITK Events Management Service) |
| timestamp | 1..1 | Time that the message was sent |
| source | 1..1 | Message source application |
| focus | 1..1 | The actual content of the message i.e. [EMS-Bundle-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Bundle-1) |

## Extension-ITK-MessageHandling-2 ##

| Element | Cardinality | Additional Guidance |
| --- | --- | --- |
| extension (BusAckRequested) | 1..1 | Populated when sender requires a business level response to be returned. Currently EMS will only send the element with a fixed value of 'false'.|
| extension (InfAckRequested) | 1..1 | Populated when sender requires an infrastructure level response to be returned. Currently EMS will only send the element with a fixed value of 'false'. |
| extension (RecipientType) | 1..1 | Indicates the type of recipient. Currently EMS will only send the element with a fixed value of 'FI - For Information' |
| extension (MessageDefinition) | 1..1 | Reference to a URL for the MessageDefinition for the payload, i.e. [ITK-EMS-MessageDefinition-1](https://fhir.nhs.uk/STU3/MessageDefinition/ITK-EMS-MessageDefinition-1) |
| extension (SenderReference) | 1..1 | A reference that the sender includes, i.e. the traceID |
| extension (LocalExtension) | 1..1 | Additional Content defined by implementations. Currently EMS will only send the element with a fixed value of 'None'|