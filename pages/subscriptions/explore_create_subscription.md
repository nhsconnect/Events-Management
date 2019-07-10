---
title: Create Subscription
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_create_subscription.html
summary: ""
---

## Pre-requisites ##

In addition to the guidance on this page the guidance and requirement on the [Generic Subscription API Requirements](subscription_general_api_guidance.html) page SHALL be followed when using the NEMS subscription API.

## Creating a Subscription ##

To create a subscription, a client MUST:
1. construct a Subscription resource conforming to the [EMS-Subscription-1](https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1) FHIR profile and additional population guidance on this page
2. POST the constructed EMS-Subscription-1 resource to the NEMS FHIR endpoint on the Spine

```http
POST /Subscription
```

{% include important.html content="Currently the National Events Management Service (NEMS) supports JSON and XML formats for interactions with the subscription API, but currently all event messages will be forwarded to subscribers in an XML format." %}

### Request Headers ###

The subscribing organisation MUST include the following HTTP request headers when making the call to the Create Subscription API endpoint:

| Header | Description |
| --- | --- |
| fromASID | ASID of the system posting to the Subscription API |
| toASID | ASID of the NEMS service |
| InteractionID | Fixed value: `urn:nhs:names:services:clinicals-sync:SubscriptionsApiPost` |

Additional information about standard headers and endpoint looking is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).


### EMS-Subscription-1 resource population ###

| FHIR element | Cardinality | Requirement |
| --- | --- | --- |
| status | 1..1 | The status of the subscription (initially this will always be "requested" until the subscription is reviewed and activated |
| contact | 1..* | Contact details for the subscription. <br/><br/>The first instance of the `contact` element within the Subscription resource SHALL represent the organization requesting the subscription. The element SHALL contain the organisation ODS Code which matches the MESH mailbox ID specified in the `channel.endpoint` element. The elements within the first contact element should be as follows:<br/><br/> **"use"** must have a fixed value of "*work*"<br/> **"system"** must have fixed value of "*url*"<br/> **"value"** must have the URL to the organization accessable via the ODS API, for example: <br/> "*https://directory.spineservices.nhs.uk/STU3/Organization/[Org_ODS_Code]* "<br/><br/>Additional contact elements included within the Subscription resource will be stored and returned by when managing the subscriptions but will not be validated as part of the business rules. |
| end | 0..1 | End date/time for subscription if relevant (e.g. for a temporary subscription). If not provided the subscription will be perpertual and not expire. |
| reason | 1..1 | The reason for creating the subscription (human readable description). Used primarily for reviewing the subscription in order to make it active, and also for patients / services to review what subscriptions exist and why they were created. |
| criteria | 1..1 | Criteria to match events against for this subscription - see below for examples. |
| channel.type | 1..1 | The delivery channel to use to deliver the event to the subscriber (currently only "message" is supported). <br/>**NOTE: In this case "message" refers to the use of MESH for as a delivery channel.** |
| channel.endpoint | 1..1 | The specific endpoint (initially MESH mailbox ID) to deliver to.<br/>**NOTE: The ODS code associated with the mailbox MUST match the ODS code within the first instance of the `contact` element of the Subscription resource.** |

Once submitted, additional metadata will automatically be added to the Subscription resource by the NEMS:

| FHIR element | Cardinality | Requirement |
| --- | --- | --- |
| id | 1..1 | Identifier for the subscription |
| meta.lastUpdated | 0..1 | Date the subscription was last updated |
| meta.versionId | 0..1 | The ID for the specific version of the subscription |

The create request MUST NOT include the fields above, as they can only be added by the NEMS (see Create Example below).

Once the subscription has been created it may require IG review prior to becoming active, at which point the status of the Subscription resource will be changed by the NEMS to 'active'.


### Criteria Components ###

The criteria element of the Subscription will use the FHIR search string format using the following components:

| Component                       | Cardinality | Description |
| ------------------------------- | --- | ----------- |
| /Bundle?type=message            | 1..1 | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message" |
| serviceType=[CODE]     | 0..1 | This element identifies the service type making the subscription. Current accepted values are:<br/><br/>**GP** - GP Practice related services<br/>**CHO** - Child Health Organisation related services<br/>**UHV** - Health Visitor related services<br/>**EPCHR** - Electronic Personal Child Health Record services |
| Patient.identifier=[IDENTIFIER] | 1..1 |  This is used for Explicit Subscriptions for an individual patient. The [IDENTIFIER] is the NHS Number for the patient. <br/><br/>For example: "```&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number|[NHS Number]```" |
| MessageHeader.event=[CODE]      | 1..* |  This is the type of event to subscribe to (see the [Event Types](https://fhir.nhs.uk/STU3/CodeSystem/EventType-1)). <br/><br/>For example: <br/> "```&amp;MessageHeader.event=pds-birth-notification-1&amp;MessageHeader.event=vaccinations-1&amp;MessageHeader.event=pds-change-of-address-1```" <br/><br/> is an expression to specify events where the MessageHeader.event is of type "pds-birth-notification-1", "vaccinations-1" or "pds-change-of-address-1" |
| Patient.age=[AGE]               | 0..2 |  This is a filter to only match events where the age of the patient meets the criteria supplied. <br/><br/>Examples:<br/> - "```&amp;Patient.age=lt14```"<br/> - "```&amp;Patient.age=gt60```"<br/> - "```&amp;Patient.age=gt5&amp;Patient.age=lt19```" <br/><br/>For more detail see the Search Parameter [EMS Patient Age](https://fhir.nhs.uk/STU3/SearchParameter/EMS-PatientAge-1)|



## Criteria Examples ##

| Scenario                             | Subscribing Organisation | Subscription Type | Criteria String                     |
|--------------------------------------|--------------------------|-------------------|------------------------------------|
| A PHR system subscribing to change of address events for a specific patient registered for a PHR | N/A | Explicit | ```/Bundle?type=message&amp;serviceType=GP&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number|9434765919&amp;MessageHeader.event=pds-change-of-address-1``` |


## Error Handling ##

If an error occurs when the NEMS processes the subscription request, a HTTP error status code will be returned along with an `OperationOutcome` FHIR resource within the payload. The OperationOutcome resource will contain one of the [Spine ErrorOrWarning Codes](https://fhir.nhs.uk/STU3/ValueSet/Spine-ErrorOrWarningCode-1) and conform to the structure set out in the [Spine Core FHIR](https://developer.nhs.uk/apis/spine-core/resources_error_handling.html) specification.


## Response ##

When a subscription request is successfully received by the NEMS, the Subscription will be assigned a logical ID and the NEMS will return:
- a HTTP status code of `201 Created`
- a `Location` header containing the new logical ID of the created Subscription resource

No payload will be returned with the successful response unless the event message type being subscribed to is being deprecated.


### Deprecation Warnings

In order for the NEMS to communicate to a subscriber that an event type is deprecated, the NEMS will include an OperationOutcome payload along with the successful 201 Created response, when the event type being subscribed to is due to be deprecated. More information about deprecation can be found on the [Event Lifecycle and Deprecation](overview_msg_architecture_life_cycle.html).

The OperationOutcome resource will contain one or more issue elements, one for each event type which is being deprecated. The following elements, containing details of the event type deprecation will be populated:

| Element | Cardinality | Description |
| --- | --- | --- |
| issue | 1..* | One issue will be included for each event type which is being deprecated. Each issue may have a different code and supporting information. |
| issue.details.coding.code | 1..1 | The event life cycle warning type. |
| issue.diagnostics | 1..1 | Additional information about the event type deprecation including the date when the event will be deprecated and no longer supported by the NEMS and a URL where additional information about the event can be found. |

**Example:**
```xml
<OperationOutcome>
   <issue> 
      <severity value="information"/> 
      <code value="informational"/> 
      <details>
         <coding> 
            <system value="https://fhir.nhs.uk/STU3/CodeSystem/Spine-ErrorOrWarningCode-1"/> 
            <code value="DEPRECATED"/> 
            <display value="The operation being performed has been deprecated"/> 
         </coding> 
      </details> 
      <diagnostics value="Deprecation of the Newborn Hearing (newborn-hearing-1) event type will occur on 22/06/2019, for more information go to https://developer.nhs.uk/apis/ems-beta/overview_supported_events.html"/>
   </issue> 
   <issue> 
      <severity value="fatal"/> 
      <code value="not-supported"/> 
      <details>
         <coding> 
            <system value="https://fhir.nhs.uk/STU3/CodeSystem/Spine-ErrorOrWarningCode-1"/> 
            <code value="NO_LONGER_SUPPORTED"/> 
            <display value="Event message type is no longer supported"/> 
         </coding> 
      </details> 
      <diagnostics value="Withdrawal of Event message type `pds-birth-notification-1` will occur on 01/01/2020, for more information go to https://developer.nhs.uk/apis/ems-beta/overview_supported_events.html"/>
   </issue> 
</OperationOutcome>
```

When a message becomes deprecated the NEMS will no longer accept publication of that event message type and will return an error. For more information on event life cycle and event type deprecation can be seen on the [Messaging Architecture Overview](overview_msg_architecture.html#event-lifecycle-and-deprecation) page.



## Create Subscription Example ##

### HTTP request ###

```xml
POST https://clinicals.spineservices.nhs.uk/STU3/Subscription HTTP/1.1

<Subscription xmlns="http://hl7.org/fhir">
	<meta>
		<profile value="https://fhir.nhs.uk/STU3/StructureDefinition/EMS-Subscription-1"/>
	</meta>
	<status value="requested"/>
	<contact>
		<system value="url"/>
		<value value="https://directory.spineservices.nhs.uk/STU3/Organization/RR8"/>
		<use value="work"/>
	</contact>
	<reason value="Health visiting service responsible for Leeds"/>
	<criteria value="/Bundle?type=message&amp;serviceType=UHV&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number|9434765919&amp;MessageHeader.event=pds-change-of-address-1" />
	<channel>
		<type value="message"/>
		<endpoint value="Mailbox1234"/>
	</channel>
</Subscription>
```

### HTTP response ###

```json
HTTP 201 Created
Date: Fri, 25 May 2018 16:09:50 GMT
Last-Modified: Fri, 25 May 2018 16:09:50 GMT
ETag: W/"25777f7d-27bc"
Location: https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c
```

Successful response with **deprecation** warning:

```http
HTTP 201 Created
Date: Fri, 25 May 2018 16:09:50 GMT
Last-Modified: Fri, 25 May 2018 16:09:50 GMT
ETag: W/"25777f7d-27bc"
Location: https://clinicals.spineservices.nhs.uk/STU3/Subscription/ea0a485187204b49b978bdcf7102388c

<OperationOutcome>
   <issue> 
      <severity value="information"/> 
      <code value="informational"/> 
      <details>
         <coding> 
            <system value="https://fhir.nhs.uk/STU3/CodeSystem/Spine-ErrorOrWarningCode-1"/> 
            <code value="DEPRECATED"/> 
            <display value="The operation being performed has been deprecated"/> 
         </coding> 
      </details> 
      <diagnostics value="Deprecation of the Newborn Hearing (newborn-hearing-1) event type will occur on 22/06/2019, for more information go to https://developer.nhs.uk/apis/ems-beta/overview_supported_events.html"/>
   </issue> 
</OperationOutcome>
```

