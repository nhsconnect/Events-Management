---
title: Supported Event Messages
keywords: events
tags: [overview]
sidebar: overview_sidebar
permalink: overview_supported_events.html
summary: "List of events supported by the NEMS"
toc: false
---

The following event messages are supported by the NEMS for either publication and/or subscription by providers as indicated:

| &#9989; Supported | &#10060; Not Supported |

Requirements and population guidance within the event message specific pages should be followed in addition to the [Generic Event Message Requirements](explore_genreic_event_requirements.html) within this specification.

#### Event Maturity

The maturity of the event messages are indicated within the tables below. These event maturity labels are intended to indicate the expected stability of the event messages as follows:

| Event Maturity | Description |
| --- | --- |
| Alpha | Early proposal for an event message, high risk of change. |
| Beta | The event design has been agreed and is intended to become the release candidate but has not been proved through development and testing, therefore there is a risk that changes may be required. |
| Release Candidate | The event has been through a development and testing phase, followed by a successful DVP in live use. The event message should not change unless as a result of a live issue. |
| Released | Event is being widely used and is unlikely to change, unless a change is required as a result of a live issue. |


### Event Messages

The following are event messages currently supported by the NEMS:

| Event | Publish Interaction Event Code | Publication API | Subscription API | Date Available | Event Maturity |
|---|---|:---:|:---:|---|---|
| [Blood Spot Test Outcome](blood_spot_test_outcome_1.html) | Bloodspottestoutcome | &#9989; | &#9989; | October 2019 | Release Candidate |
| [Newborn Hearing](newborn_hearing_1.html) | Newbornhearing | &#9989; | &#9989; | October 2019 | Release Candidate |
| [NIPE Outcome](nipe_outcome_1.html) | Nipeoutcome | &#9989; | &#9989; | October 2019 | Release Candidate |
| [PDS Birth Notification](pds_birth_notification.html) | N/A | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Change of Address](pds_change_of_address.html) | N/A | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Change of GP](pds_change_of_gp.html) | N/A | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Death Notification](pds_death_notification.html) | N/A | &#10060; | &#9989; | March 2019 | Release Candidate |
| [Professional Contacts](professional_contacts_1.html) | Professionalcontacts | &#9989; | &#9989; | February 2020 | Beta |
| [Vaccinations](vaccinations_1.html) | Vaccinations | &#9989; | &#9989; | February 2020 | Beta |
| [FailSafe Message](failsafe_message.html) | FailSafe Message | &#10060; | &#9989; | April 2020 | Beta |