---
title: Subscriptions Overview
keywords:  messaging, subscriptions
tags: [fhir,messaging,subscriptions]
sidebar: overview_sidebar
permalink: explore_subscriptions.html
summary: "Types of Subscription and how they are used"
---

To receive event messages a consumer will need to subscribe to events they want to receive. The flow of event messages from publishers to subscribers is described on the [Messaging Architecture Overview](overview_msg_architecture.html) page.


## Types of Subscription ##

### Explicit Subscriptions ###

An explicit subscription relates to where a subscriber wishes to receive event messages for a specific patient, for example, a Pharmacist wishing to receive hospital admission and discharge events for a specific Patient.

Explicit event message subscriptions for patients can be created using the Subscription API, using the [Create Subscription](explore_create_subscription.html) interaction. The organizations MESH mailbox must be configured to receive the required event message types as per the requirements on the [Event Receiver Requirements](receiver_requirements.html#mesh-mailbox-configuration) page.

Explicit subscriptions SHOULD only be active for patients under the subscribing organisations direct care. Explicit subscriptions for a patient should be stopped when the patient leaves the subscribing organisations direct care. This can be done either by removing the explicit subscription using the Delete Subscription API interaction or by including the `end` element as part of the subscription resource.


### Rule-Based (Generic) Subscriptions ###

A rule-based subscription relates to where a subscriber wishes to receive events that meet a particular rule set rather than for a specific patient. There is currently two specific types of rule-based subscriptions:

- Geographical: Subscriptions that relate to individuals who lives in or are registered with a GP that is located within the geographic boundaries of a specific organisation (For example, a Health Visiting Service wishing to view events for all children within a specific local authorities area of responsibility). 
  
  A geographical rule based subscription will result in a subscriber receiving events for any patients within the specified geographical area, therefore a subscriber wishing to use this form of subscription must demonstrate that they have a legitimate relationship with all patients in the area. If a provider is only responsible for a subset of patients within a geographical area, then geographical subscriptions are not appropriate as the provider will receive information for patients with which they do not have a legitimate relationship. In this scenario the provider should use explicit subscriptions to receive events for the patients with which they have a legitimate relationship.
  
- Registered Org: Subscriptions that relate to individuals who are registered with a specific organisation (currently only applicable for GP organisations).

The following diagram and table demonstrates the way in which generic subscription rules work:

<div id="subImageContainer" >
	<img id="sub-background" src="images/subscription/generic/background.png">
	<img class="overlay" id="pc-ccg-1" src="images/subscription/generic/PostCode_CCG_ODSCode1.png">
	<img class="overlay" id="pc-ccg-2" src="images/subscription/generic/PostCode_CCG_ODSCode2.png">
	<img class="overlay" id="gp-ccg-1" src="images/subscription/generic/GP_CCG_ODSCode1.png">
	<img class="overlay" id="gp-ccg-2" src="images/subscription/generic/GP_CCG_ODSCode2.png">
	<img class="overlay" id="gp-gp-1" src="images/subscription/generic/GP_GP1.png">
	<img class="overlay" id="gp-gp-2" src="images/subscription/generic/GP_GP2.png">
	<img class="overlay" id="gp-gp-3" src="images/subscription/generic/GP_GP3.png">
	<img class="overlay" id="gp-gp-4" src="images/subscription/generic/GP_GP4.png">
	<img class="overlay" id="pc-la" src="images/subscription/generic/PostCode_LA.png">
	<img class="overlay" id="hss" src="images/subscription/generic/HSS.png">
</div>

<table id="subscriptionRuleTable">
	<tr class="subTableHeading">
		<th>Subscription Rule</th>
		<th class="pc-ccg-head">Patients Postcode within CCGs area of responsibility</th>
		<th class="gp-ccg-head">Patients Registered GPs Postcode within area of CCGs area of responsibility</th>
		<th class="gp-gp-head">Patients Registered GP Code matches GP Code</th>
		<th class="pc-la-head">Patients Postcode within LAs area of responsibility</th>
		<th class="hss-head">All Patients in England</th>
	</tr>
	<tr class="subTableHeading">
		<td>
			<button type="button" onClick="selectAllCheckboxes()">Select All</button><br/>
			<button type="button" onClick="clearAllCheckboxes()">Clear All</button>
		</td>
		<td class="pc-ccg-head">
			<input type="checkbox" onclick='handleClick(this, "pc-ccg-1");'> ODSCode1 <br/>
			<input type="checkbox" onclick='handleClick(this, "pc-ccg-2");'> ODSCode2
		</td>
		<td class="gp-ccg-head">
			<input type="checkbox" onclick='handleClick(this, "gp-ccg-1");'> ODSCode1<br/>
			<input type="checkbox" onclick='handleClick(this, "gp-ccg-2");'> ODSCode2
		</td>
		<td class="gp-gp-head">
			<input type="checkbox" onclick='handleClick(this, "gp-gp-1");'> GP 1 <br/>
			<input type="checkbox" onclick='handleClick(this, "gp-gp-2");'> GP 2 <br/>
			<input type="checkbox" onclick='handleClick(this, "gp-gp-3");'> GP 3 <br/>
			<input type="checkbox" onclick='handleClick(this, "gp-gp-4");'> GP 4 <br/>
		</td>
		<td class="pc-la-head">
			<input type="checkbox" onclick='handleClick(this, "pc-la");'> LACode1
		</td>
		<td class="hss-head">
			<input type="checkbox" onclick='handleClick(this, "hss");'> National patients
		</td>
	</tr>
	<tr>
		<td></td>
		<td id="pc-ccg-detail">The NEMS matches the patients home postcode, from their PDS record, to a specific CCG based the areas of responsible for the different CCGs. The NEMS then looks for generic subscription rules which contain a CCG Code that matches the CCG responsible for the area in which the patients postcode resides. A copy of the event message is sent to the mailboxes specified in those matching generic subscriptions.</td>
		<td id="gp-ccg-detail">The NEMS matches the postcode of the registered GP for the patient, within their PDS record, to a specific CCG based the areas of responsible for the different CCGs. The NEMS then looks for generic subscription rules which contain a CCG Code that matches the CCG responsible for the area in which the patients registered GPs postcode resides. A copy of the event message is sent to the mailboxes specified in those matching generic subscriptions.</td>
		<td id="gp-gp-detail">The NEMS matches the patients registered GP Code, from their PDS record, to generic subscription rules which contain the same GP Code. A copy of the event message is sent to the mailboxes specified in those matching generic subscriptions.</td>
		<td id="pc-ccg-detail">The NEMS matches the patients home postcode, from their PDS record, to a specific LA based the areas of responsible for the different LAs. The NEMS then looks for generic subscription rules which contain an LA Code that matches the LA responsible for the area in which the patients postcode resides. A copy of the event message is sent to the mailboxes specified in those matching generic subscriptions.</td>
		<td id="hss-detail">The NEMS will match all patients who live in England to generic subscription rules which specify the rule type of National. A copy of the event message is sent to the mailboxes specified in those matching generic subscriptions.</td>
	</tr>
</table>


The Subscription API does not support the configuration of generic subscriptions. Generic subscriptions are currently setup by NHS Digital to meet IG requirements, therefore if you wish to use generic subscriptions a request needs to be sent to NHS Digital.


## Subscription matching and message delivery ##

### Multiple matched subscriptions ###

A subscriber may create a number of different subscriptions, some explicit and some generic. If an event message published to the National Events Management Service (NEMS) matches the criteria of multiple subscriptions for a single receiving MESH mailbox, the NEMS will only send one copy of the event message to the receiving mailbox.

{% include important.html content="If a publisher sends multiple copies of the same event message, subscribers of this event will receive a copy of the event message for each repeated send by the publisher." %}
