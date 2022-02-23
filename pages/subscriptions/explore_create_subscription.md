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

Additional information about standard headers and endpoints is available in the [Spine Core specification](https://developer.nhs.uk/apis/spine-core/build_directory.html).


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

### Criteria Components ###

The criteria element of the Subscription will use the FHIR search string format using the following components. Information on the difference between `explicit` and `generic` subscriptions can be found on the [Subscriptions Overview](explore_subscriptions.html) page.

{% include warning.html content="Generic subscriptions are stored against a key made up of the `\"Event type\"`, `\"subscriptionRuleType\"`, `\"Organisation Identifier\"`, `\"Mailbox ID\"` and `\"Service Provider ID\"`. As a result if you create a generic subscription with the same set of components as an existing subscription, the original one will be overwritten by the new subscription." %}


| Component | Explicit Subscription Cardinality | Generic Subscription Cardinality | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------- | --- | --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /Bundle?type=message            | 1..1 | 1..1 | This identifies that we are interested in events (which are sent as Bundles in FHIR), of type "message"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| serviceType=[CODE]     | 0..1 | 0..1 | This element identifies the service type making the subscription. Current accepted values are:<br/><br/>**GP** - GP Practice related services<br/>**CHO** - Child Health Organisation related services<br/>**UHV** - Health Visitor related services<br/>**EPCHR** - Electronic Personal Child Health Record services                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Patient.identifier=[IDENTIFIER] | 1..1 | 0..0 | This is used for Explicit Subscriptions for an individual patient. The [IDENTIFIER] is the NHS Number for the patient. <br/><br/>For example: "```&amp;Patient.identifier=http://fhir.nhs.net/Id/nhs-number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |[NHS Number]```" |
| MessageHeader.event=[CODE]      | 1..* | 1..1 | This is the type of event to subscribe to (see the [Event Types](https://fhir.nhs.uk/STU3/CodeSystem/EventType-1)). <br/><br/>For example: <br/> "```&amp;MessageHeader.event=pds-birth-notification-1&amp;MessageHeader.event=vaccinations-1&amp;MessageHeader.event=pds-change-of-address-1```" <br/><br/> is an expression to specify events where the MessageHeader.event is of type "pds-birth-notification-1", "vaccinations-1" or "pds-change-of-address-1"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Patient.age=[AGE]               | 0..2 |  0..2 | This is a filter to only match events where the age of the patient (in years) meets the criteria supplied. <br/><br/>Examples:<br/> - "```&amp;Patient.age=lt14```"<br/> - "```&amp;Patient.age=gt60```"<br/> - "```&amp;Patient.age=gt5&amp;Patient.age=lt19```" <br/><br/>For more detail see the Search Parameter [EMS Patient Age](https://fhir.nhs.uk/STU3/SearchParameter/EMS-PatientAge-1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| subscriptionRuleType=[CODE] | 0..0 | 1..1 | This identifies the type of matching the NEMS will do between the patient demographics and the organisation code specified in the "Organization.identifier" criteria component. Important to note that although CCG is replaced by ICS, rule type name will remain the same. Suppliers should make necessary "label" changes if displaying the rule type names to end users. Current accepted values are:<br/><br/>**GP_GP_GP** - This will be a match if the patients registered GP matches the GP Practice code within the "Organization.identifier" criteria component.<br/><br/>**UHV_POSTCODE_LACODE** - This will be a match if the Local Authority Code responsible for the geographical location of the patients post code matches the code within the "Organization.identifier" criteria component.<br/><br/>**CHO_GP_CCG** - This will be a match if the ICS Code responsible for the geographical location of the patients registered GP matches the code within the "Organization.identifier" criteria component.<br/><br/>**CHO_POSTCODE_CCG** - This will be a match if the ICS Code responsible for the geographical location of the patients postcode matches the code within the "Organization.identifier" criteria component.<br/><br/>**COUNTRYCODE** - National subscription, subscription criteria is a match for any patients in the country specified in the `Organizaiton.identifier` criteria element.<br/>Supported values:<br/>- `E92000001 = England`<br/>- `W92000004 = Wales`<br/>- `S92000003 = Scotland`<br/>- `N92000002 = Northern Ireland`<br/>- `L93000001 = Channel Islands`<br/>- `M83000003 = Isle of Man`<br/> |
| Organization.identifier=[CODE]  | 0..0 | 0..1 | This element is required as part of the generic subscription to specify the organisation code which the NEMS will match to, based on the rule specified within the subscriptionRuleType criteria component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| tag=[tag_value]  | 0..1 | 0..1 | The optional `tag` criteria element allows the subscriber to include a tag for the subscription that will be sent with the event message, when delivered through MESH, as outlined on the [Event Receiver](receiver_requirements.html) page.<br/><br/>The `tag` element value must only include<br/> - letters (`[a-z][A-Z]`)<br/> - numbers (`[0-9]`)<br/> - hyphens (`-`)<br/> - underscores (`_`)<br/> - pipes (`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |`)<br/> - commas (`,`)<br/><br/>The `tag` value must contain a maximum of 100 characters. |


## Criteria Examples ##

| Scenario                                                                                                                                            | Subscription Type | Criteria String                                                                                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A PHR system subscribing to change of address event for a specific patient registered for a PHR                                                     | Explicit | ```/Bundle?type=message&amp;serviceType=GP&amp;```<br/>```Patient.identifier=http://fhir.nhs.net/Id/nhs-number                                                                               |9434765919```<br/>```&amp;MessageHeader.event=pds-change-of-address-1``` |
| A child health service subscribing to change of address event for patients who's postcode is within the catchment area of a ICS with the ID "X2458" | Generic | ```/Bundle?type=message&amp;subscriptionRuleType=```<br/>```CHO_POSTCODE_CCG&amp;Organization.identifier=```<br/>```X2458&amp;MessageHeader.event=pds-change-of-address-1&amp;tag=site123``` |

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


## Create Subscription Example ##

### HTTP request (explicit subscription) ###

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

### HTTP request (generic subscription) ###

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
	<criteria value="/Bundle?type=message&amp;subscriptionRuleType=CHO_POSTCODE_CCG&amp;Organization.identifier=X2458&amp;MessageHeader.event=pds-change-of-address-1" />
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

