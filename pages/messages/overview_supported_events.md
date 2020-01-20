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
| Release Candidate | The event has been through a development and testing phase, followed by a stability period in live use. The event message should not change unless as a result of a live issue. |
| Released | Event is being widely used and is unlikely to change, unless a changes is required as a result of a live issue. |


### Event Messages

The following are event messages currently supported by the NEMS:

| Event | Event Code | Publication API | Subscription API | Date Available | Event Maturity |
|---|---|:---:|:---:|---|---|
| [PDS Birth Notification](pds_birth_notification.html) | pds-birth-notification-1 | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Change of Address](pds_change_of_address.html) | pds-change-of-address-1 | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Change of GP](pds_change_of_gp.html) | pds-change-of-gp-1 | &#10060; | &#9989; | March 2019 | Release Candidate |
| [PDS Death Notification](pds_death_notification.html) | pds-death-notification-1 | &#10060; | &#9989; | March 2019 | Release Candidate |
| [Professional Contacts](professional_contacts_1.html) | professional-contacts-1 | &#9989; | &#9989; | February 2020 | Beta |
| [Vaccinations](vaccinations_1.html) | vaccinations-1 | &#9989; | &#9989; | February 2020 | Beta |

### DCH Event Messages

The following event message are supported by the NEMS but have been defined by Digital Child Health.

**Note:** The requirements and guidance for these event is hosted on an external page, but all the generic requirements and guidance outlined within this specification still apply to these events.

| Event | Event Code | Publication API | Subscription API | Date Available | Event Maturity |
|---|---|:---:|:---:|---|---|
| [Blood Spot Test Outcome](https://nhsconnect.github.io/Digital-Child-Health-CareConnect/explore_blood_spot_test_outcome.html) | blood-spot-test-outcome-1 | &#9989; | &#9989; | October 2019 | Release Candidate |
| [Newborn Hearing](https://nhsconnect.github.io/Digital-Child-Health-CareConnect/explore_newborn_hearing.html) | newborn-hearing-1 | &#9989; | &#9989; | October 2019 | Release Candidate |
| [NIPE Outcome](https://nhsconnect.github.io/Digital-Child-Health-CareConnect/explore_nipe_outcome.html) | nipe-outcome-1 | &#9989; | &#9989; | October 2019 | Release Candidate |
