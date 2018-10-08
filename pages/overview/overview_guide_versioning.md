---
title: Guide Versioning
keywords: development, versioning
tags: [development]
sidebar: overview_sidebar
permalink: overview_guide_versioning.html
summary: An overview of this implementation guide is versioned.
---

## Version number standard ##

The specification version number is based on the [Semantic Versioning 2.0.0](https://semver.org/#spec-item-9) standard.

![Semantic versioning diagram](images/overview/semantic-versioning.png)

When an updated specification is released, the version number is incremented as follows:

- **Major** version will be incremented when a *breaking change* has been made to the specification
- **Minor** version will be incremented when a *non-breaking change* has been made to the specification
- **Patch** version will be incremented when a *non-breaking bug fixes* has been made to the specification


## Types of change ##

### Breaking changes ###

**Breaking changes** are those changes made to the specification which:

- require a supplier to update their implementation to interact with the APIs which they have already implemented. Additional functionality is usually not a breaking change if the old functionality can still be used.
- require a supplier to update their subscriber implementation to continue consuming the event messages which they have already implemented. Additional event messages may not be breaking if they do not affect he consumption of event messages from previous versions of the specification.


### Non-breaking changes ###

**Non-breaking changes** are: 

- changes made to the specification that do not require a supplier to update their API implementation if they wish to continue using their current functionality
- changes made to the specification that do not require a subscriber to make changes to their implementation to continue consuming event messages they currently consume 
- changes to the specification that add guidance or clarifications but do not change the requirements within the specification

### Non-breaking bug fixes ###

**Non-breaking bug fixes** are corrections to the specification such as spelling mistakes, removal of contradictory wording, minor additional clarifications.


## Pre-release (draft) labels ##

When a **pre-release label** is appended to the version number with a hyphen it indicates the specificaction is still in draft, or has been discontinued.

{% include important.html content="The pre-release label is used to indicate that a specification is in draft (or has been discontinued), it **does not** indicate that suppliers have made a pre-release version of the event publishers and consumers." %}

The pre-release labels used are as follows:

| Pre-release Label | Example            | Description |
|-------------------|--------------------|-------------|
| `experimental`    | 1.1.0-experimental | Early development/POC version of an API for early sight during discovery. |
| `alpha`           | 1.1.0-alpha        | Initial test APIs, likely to change substantially, or be discontinued as the project develops. |
| `beta`            | 1.1.0-beta         | APIs that are still under active development and subject to change, but that are likely to progress into a live API. |
| `rc`              | 1.1.0-rc           | APIs that are largely complete, unlikely to change substantially, but still need further testing before becoming live. |
| *(no label)*      | 1.1.0              | The APIs Live and this version of the specification is now fixed (immutable), further changes require a new version number. |
| `discontinued`    | 1.1.0-discontinued | APIs which have been discontinued and should not be used for new development. |

