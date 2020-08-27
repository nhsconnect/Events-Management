---
title: Onboarding & Assurance
keywords: development
tags: [development]
sidebar: overview_sidebar
permalink: assurance_overview.html
summary: An overview of the onboarding and assurance to connect to the NEMS
---

## Onboarding

Onboarding for the NEMS starts with a provider contacting <a href="mailto:interop.mgmt@nhs.net?subject=Events%20Management%20Service">NHS Digital's Live services</a>.

The provider will be asked about their use cases and the purpose for the information sharing, to make sure it aligns with the direction and information governance requirements of the NEMS.

Once the use case has been assessed by live service the provider will be given an Onboarding Guide (<a href="https://github.com/nhsconnect/Events-Management/raw/master/downloads/NEMS%20Onboarding%20Guide.docx" >Download Guide</a>), which outlines the onboarding and assurance steps as shown on this page but in more detail.


## Assurance

As part of the on-boarding process Live Services will give the provider a document call the SCAL, which is used to record the conformance of the system to the requirements. Live Services will also put the provider in contact with solution assurance to start the assurance process.

The following is a high level overview of the steps a provider will usually take when going through the assurance process:

**1.** After Live Services have put the provider in contact with solution assurance, they will be sent test scripts to follow for the assurance process.


**2.** The first step of assurance is to perform TKW testing in the OpenTest environment to prove that the system make valid requests to the NEMS before the provider is given access to the INT testing environments. To use the OpenTest environment there are a couple of pre-requisits:

- The provider will need an OpenTest VPN account, which is required to access the test environment. The VPN account can be obtained through the <a href="mailto:platforms.supportdesk@nhs.net?subject=OpenTest%20VPN%20Account">Platforms Support Desk</a>
- Once a provider has the VPN account they will need to contact the <a href="mailto:MAIT@nhs.net?subject=OpenTest%20NEMS%20Test%20Portal">MAIT team</a> who will enable the test function and give access to the test portal.


**3.** Once the provider has completed testing against TKW, they must send their evidence showing that their system makes valid requests to <a href="itkconformance@nhs.net?subject=OpenTest%20NEMS%20Test%20Evidence">Solution Assurance</a>.

Once solution assurance have reviewed the test evidence they will give the provider details required to connect to the Spine INT environment. This will usually include details on how to request access to the INT environment and request configuration of the endpoint to allow access to the NEMS within INT.


**4.** The next step is for the provider to complete the testing in the INT environment, filling in the SCAL and test scripts provided as part of on-boarding.

Once the SCAL and all the associated test evidence has been completed it must be submitted to Soltution Assurance for review and approval. Once Solutions Assurance are satisfied that the provider has proven conformance to the requirements they will issue the provider with a Technical Conformance Certificate (TCC).


**5.** Once the TCC is issued, the provider will work with Live Services to manage the go live process. This will include signing of the connection agreements and configuration of the connection to the live environment. 
