import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

const Terms = () => {
    return (
        <>
            <Row className='content-title pt-75'>
                <Col className='text-center privacy d-flex align-items-center ml-2' sm='12'>
                    <div className='text-center'>
                        <Link className='brand-logo' to='/register' onClick={e => e.preventDefault()}>
                            <img src={require('../../assets/images/drone-images/logo.png').default} />
                        </Link>
                    </div>
                </Col>
                <Col sm='12' className="px-3">
                    <h1 className='text-white text-center my-2'>Terms of Services</h1>
                    <Card className='text-justify bg-light-secondary privacy shadow-none py-1'>
                        <CardBody className="spacing-paragraph"><p>Effective September 1, 2022</p>
                            <p className='font-weight'>DISCLAIMER: PRIOR RESULTS OR PAST PERFORMANCE DO NOT GUARANTEE A SIMILAR OUTCOME.</p>
                            <p className='font-weight'>ANY TESTIMONIALS, COMMENTS, REVIEWS, INFROMATION OR STATEMENTS DESCRIBING PAST RESULTS ARE NOT INDICATION OF FUTURE RESULTS, AND ANY INFORMATION OBTAINED OR COMMUNICATED TO YOU THROUGH OUR SERVICES ARE NOT PROVIDED WITH A GUARANTEE OF SUCCESS. EVERY SPORTING EVENT OR CONTEST IS DIFFERENT, AND REGARDLESS OF WHAT IS COMMUNICATED ON THIS SITE, EACH SPORTING EVENT OR SITUATION MUST BE EVALUATED ON ITS OWN FACTS AND CIRCUMSTANCES THAT BY THEIR VERY NATURE ARE SUBJECT TO CHANGE. NO REPRESENTATION IS MADE THAT THE QUALITY OF THE INFORMATION PROVIDED BY OR AVAILABLE ON THIS SITE, THROUGH OUR MOBILE APPLICATION, OR THROUGH ANY OF OUR SERVICES, IS OBJECTIVELY GREATER THAN THE QUALITY OF SUCH INFORMATION PROVIDED BY ANY OTHER SITE, MOBILE APPLICATION, SERVICE, SERVICE PROVIDER, OR INDIVIDUAL. THE INFORMATION PROVIDED COMMUNICATED, OR AVAILABLE THROUGH OUR SERVICES IS FOR ENTERTAINMENT PURPOSES ONLY AND THE CONSEQUENCES OF YOUR DECISION TO TAKE ANY ACTION OR INACTION THAT RELIES ON SUCH INFORMATION IS ENTIRELY AT YOUR OWN RISK.</p>
                            <p className='font-weight'>OUR SERVICES ARE FOR ENTERTAINMENT PURPOSES ONLY.</p>
                            <p >SUPPLEMENTAL TERMS AND CONDITIONS OR DOCUMENTS THAT MAY BE posted on our Website or available through our Mobile Application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Service, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Service to stay informed of updates. You will be subject to and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Service by your continued use of the Site after the date such revised Terms of Service are posted.</p>
                            <p className='font-weight'>A. About Us:</p>
                            <p>Welcome to GameofGames.com (the “Website” or “Site”) and our GameofGames (the “Mobile Application”, “Mobile App”, or “App”) is owned and operated by Game of Games (the “Company”, “us”, “we”, or “our”).  The Site is a platform that provides data points and other analytics for related to sports, sports events, and sports contests. We do this through the services offered on the Website, Mobile Application and by the products and services otherwise offered by us (together with the Website, Mobile Application, Content (defined below), and all of the products and services offered by us, our “Services”). By accessing or using our Services, you the end user of our Services (“User”, “you”, or “your”), expressly agree to be bound to and to abide by these Terms of Service (“Terms”), our Privacy Policy, and any other policy we may develop from time to time (collectively, “Policies”), which create legal and enforceable agreements whether or not you register for a user account (a “Profile”) with us, or whether or not you obtain, transmit, post, send, receive, link, email, upload, download, submit or otherwise communicate (“Post”): text, ratings, images, video, audio, graphics, links, electronic messages, or any other input and data (collectively, “Content”) using our Services to us or other Users. If you do not agree to be bound to or to abide by these Terms of Service and our other Policies, do not browse our Website or use our Services.</p>
                            <p className='font-weight'>BY ACCESSING OUR SERVICES, YOU (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT) REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT) AND ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO BE BOUND BY ALL OF THE PROVISIONS, CONDITIONS AND NOTICES CONTAINED IN THESE TERMS JUST AS IF YOU HAD SIGNED THESE TERMS.</p>
                            <p>THESE TERMS CONTAIN A DISPUTE RESOLUTION AND ARBITRATION PROVISION, INCLUDING CLASS ACTION WAIVER THAT AFFECTS YOUR RIGHTS UNDER THESE TERMS AND WITH RESPECT TO DISPUTES YOU MAY HAVE WITH US.</p>
                            <p className='font-weight'>B. Terms of Service:</p>
                            <p><span className='font-weight'>1. Service Conditions.</span> You cannot use the Services unless you are at least 18 years of age. By using or accessing the Services, you represent and warrant to us that: (a) you are at least 18 years of age; (b) you have the right, authority and capacity to agree to, and abide by these Terms; and (c) you shall not use the Services or any rights granted hereunder for any unlawful purpose or any purpose which violates these Terms.</p>
                            <p><span className='font-weight'>2. Duration of License to Access Services.</span> These Terms provide you with a personal, revocable, non-exclusive, non-assignable, non-transferable, limited and temporary license to access and use the Services. We shall be entitled to terminate, restrict, or suspend this license granted to you with immediate effect and without notice, including but not limited to by deleting your Profile or otherwise restricting your ability to access or use the Services, for any reason or no reason, as determined by us.</p>
                            <p><span className='font-weight'>3. Profiles.</span> To Use certain aspects of our Services, you must create a Profile. If you choose to create a Profile with us, then you agree to provide true, accurate, current and complete information as prompted by our registration form, and to maintain and promptly update the information you provide to us in order to keep such information true, accurate, current and complete. It is your obligation to maintain and control passwords to your Profile. YOU AGREE THAT YOU ARE SOLELY AND FULLY RESPONSIBLE FOR ANY ACTIVITIES OR ACTIONS TAKEN UNDER YOUR PROFILE, WHETHER OR NOT YOU HAVE AUTHORIZED SUCH ACTIVITIES OR ACTIONS. You agree to immediately notify us of any unauthorized uses of your username and password and/or any other breaches of security. There is no assumption by us of your responsibility to notify your local law enforcement agency of any identity theft. You agree we will not be liable for any loss or damages caused by your failure to comply with your security obligations.</p>

                            <p>We may offer different subscription plans, offers, and discounts from time to time. We do not allow for price adjustments for previously purchased subscription terms. Please see the subscription section on the Site or Mobile App for up-to-date subscription information.</p>
                            <p><span className='font-weight'>5. Payment; No Refunds.</span></p>
                            <p>(a) <span className='font-weight'>Payment.</span> The policies and fees that are disclosed to you when you use a feature of our Services for which we charge a fee are a part of these Terms. Further, you authorize us to charge your chosen payment method (credit card, debit card, et cetera) in connection with all fees incurred by you in the Services, as determined by us through our Payment Processor, In connection with any fees paid by you, you agree: (a) to only provide valid and current payment information; (b) that we may use the tools, software or services of our Payment Processor to process fees and transactions on our behalf; We are not responsible or liable for any activities or conduct of our Payment Processor, and you agree to hold us harmless, indemnify, defend, and expressly release us, from any and all liability relating to the conduct of our Payment Processor. All fees shall be paid in US Dollars.</p>
                            <p>(b) <span className='font-weight'>No Refunds.</span> You understand that we do not offer any type of refund, partial refund, credit, or price adjustments.</p>

                            <p><span className='font-weight'>6. Content.</span> (a) All Posts and Content on our Services or obtained from a Linked Site are provided to you ‘AS IS’, ‘AS AVAILABLE’ and ‘WITH ALL FAULTS’. Game of Games provides our Services for informational purposes only and any statements made by us are opinions only. We expressly disclaim all liability related to the accuracy or reliability of any opinion, advice, or Content on our Services or reliance on any opinion, advice, or Content on our Services. OUR SERVICES ARE NOT TO BE CONSTRUED AS LEGAL, EMPLOYMENT, ACCOUNTING, FINANCIAL, TAX, OR ANY OTHER TYPE OF PROFESSIONAL ADVICE. <span className='font-weight'>OUR SERVICES ARE FOR ENTERTAINMENT PURPOSES ONLY.</span> We are not attorneys, paralegals, accountants, or tax specialists, or any other sort of licensed professional. As such, we expressly disclaim all liability related to the accuracy or reliability of any opinion, guidance, or Content Transmitted by us or available through our Services or reliance on any of the aforementioned. We will do our best to provide top-quality Services to you. However, the Content published through the Services may also include inaccuracies or typographical errors. We do not warrant or represent that the Content available through our Services is complete or up to date.</p>
                            <p>(b) Linked Sites.</p>
                            <p>(i) Our Services may link to other sites by allowing you to leave our Services to access third-party material or by bringing third-party material into our Services via ‘inverse’ hyperlinks and framing technology (a “Linked Site”). The appearance, availability, or your use of URLs or hyperlinks to Linked Sites referenced or included anywhere on the Services or any other form of link or re-direction of your connection to, with or through the Services, does not constitute an endorsement by, nor does it incur any obligation, responsibility or liability on the part of Game of Games or its Affiliates. We have no discretion to alter, update, or control the Content on a Linked Site. We do not verify, endorse, or have any responsibility for, any such Linked Sites, their business practices (including their privacy policies), or any goods or services associated with or obtained in connection with any Linked Site, whether the or not our logo(s) or sponsorship identification is on the Linked Site as part of a co-branding or promotional arrangement. If any Linked Site obtains or collects personal information from you, in no event shall we assume or have any responsibility or liability. Please read our Privacy Policy which describes how we collect and use your personal information.</p>
                            <p>(ii) Third-party Products and Services. When you use our Services to purchase products or services from a Linked Site, you are purchasing that product or service directly from the third-party Linked Site. Your order is placed with, filled by, and shipped by that third-party Linked Site. We have no involvement in any shipment, fulfillment, returns, or refunds associated with any products or services that you purchase from a Liked Site or third-party. You understand that you must contact the third-party Linked Site directly for inquiries related to your purchase, including but not limited to: returns, shipping, customer service, refunds, or general information. By using our Services, you expressly represent and warrant that you will abide by and will not violate any policies, rules, terms, or conditions of that third-party Linked Site.</p>
                            <p>(iii) Ads. Our Services may display third-party advertisements, promotional material, and Linked Sites. We may be compensated for clicks or purchases in connection with these third-party advertisements, promotional material, and Linked Sites. Please see our Privacy Policy for more information.</p>
                            <p className='font-weight'>7. Intellectual Property.</p>
                            <p>(a) Trademarks. Game of Games, and GameofGames.com and all other graphics, logos, page headers, button icons, scripts, service names and other Content that we use, manage or control are trademarks, registered trademarks or trade dress of ours or our subsidiaries, officers, employees, independent contractors, suppliers, representatives, advertisers, licensors, licensees, successors, assigns, agents, partners, or other affiliate (collectively “Affiliates”) in the United States or other countries or both. No one may use these trademarks or trade dress in connection with any product or service that is not our product or service without our express written permission. All other trademarks that appear on our Services are the property of their respective owners, who may or may not be affiliated with, connected to or sponsored by us or any of our Affiliates.</p>
                            <p>(b) Copyright. Except in the case of Content under license to us, we claim a copyright, and all copyright protection afforded, under international, United States and the State of Maryland laws to all text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, software (ours or our software suppliers), and all other Content on our Services. The compilation of all Content on our Services is our exclusive property, and it is similarly protected. We also claim a copyright, and all copyright protection afforded, under international, United States and the laws of the State of Maryland to all material described in the trademarks section above. Your access to all information and Content located on our Services is strictly permitted through the license granted to you under these Terms. Except for the license granted in these Terms, all rights, title and interest in Content, in all languages, formats and media throughout the world, including all copyrights, are and will continue to be the exclusive property of ours and other parties. Except as permitted by these Terms, you are prohibited from modifying, copying, distributing, displaying, publishing, selling, licensing, creating derivative works, or using any Content available on or through our Services without our prior written permission, or in the case of Content owned by a third-party, without first receiving permission from the owner of that Content. You may not alter or remove any trademark, copyright or other notice from copies of the Content.</p>
                            <p><span className='font-weight'>8. Mobile Devices.</span> If you are accessing the Services via a mobile device or tablet which is owned or controlled by you (a “Device”) then, subject to your compliance with these Terms and our Policies, the license granted hereunder allows you to access our Services using your Device. You understand and agree that use of the Services via your Device may result in data or other charges from your mobile communication service provider, and you expressly release, indemnify, hold harmless, and defend us from any and all liability relating to any such charges and/or your Device.</p>
                            <p><span className='font-weight'>9. Use Restrictions</span>. You may not use or plan, encourage or help others to use our Services for any purpose or in any manner that is prohibited by these Terms or by applicable law. In using our Services, you agree at all times that you shall not: (a) infringe on the copyrights or other intellectual property rights of Game of Games or a third-party (b) copy, distribute, or modify any part of our Services without our prior written authorization; (c) transmit any Content which contains software viruses, or other harmful computer code, files or programs; (d) manipulate or exclude identifiers in order to disguise the origin of any Content; (e) disrupt the networks connected to our Services, including but not limited to by: attempting to probe, scan or test the vulnerability of our Services, attempting to breach security or authentication measures without proper authorization, or attempting to interfere with our Services or a third party, by means such as overloading, ‘flooding’, ‘mailbombing’ or ‘crashing.’; (f) circumvent, disable or otherwise interfere with security-related features of our Services or features that prevent or restrict use or copying of any Content or that enforce limitations on use of our Services; (g) collect Content, personally identifying information, and/or other information from our Services, or otherwise access our Services, by using any automated means, including but not limited to, ‘robot’, ‘spiders’, ‘scrapers’ and ‘offline readers’, without our prior written approval which we may withhold in our discretion; (h) modify, translate, reverse engineer, decompile, disassemble, create derivative works based on, sublicense, sell, or distribute the Services; (i) rent or lease any rights in the Services in any form to any third-party or make the Services available or accessible to third parties; (j) use any communications systems provided by our Services to send unsolicited or unauthorized commercial communications, including but not limited to by email, SMS, MMS, or any other means; (k) remove, alter or obscure any proprietary notice or identification, including copyright, trademark, patent or other notices displayed on our Services; (l) mislead or attempt to mislead or defraud or attempt to defraud or conceal any information relating to Content or other information that you provide to us; (m) link, deep link, ‘frame’ or ‘mirror’ any part of the Services without our prior consent; or (n) use our Services to violate any applicable laws, rules or regulations, or for any unlawful, harmful, or inappropriate purpose, or in any manner that breaches these Terms or is otherwise objectionable, as determined by us in our sole discretion.</p>
                            <p><span className='font-weight'>10. Termination, Restriction and Suspension.</span></p>
                            <p>(a) Termination By You. You may cancel your Profile at any time for any reason or no reason by using your Profile dashboard. Upon cancellation of your Profile, access to certain features of the Services may be restricted. Termination of your Profile will be effective within a commercially reasonable time after we receive notification of your desire to cancel and any outstanding fees owned by you are paid to us, as determined by us.</p>
                            <p>(b) By us. We retain the right to terminate, restrict, or suspend these Terms, your Profile, and/or your license to access or use our Services at any time in our absolute and sole discretion, without prior notice, for any reason or no reason, as determined by us.</p>
                            <p>(c) After Termination. Upon termination of these Terms, your Profile, and/or your license to access or use our Services for any reason, you agree that we may take any measures we deem necessary to prevent you from accessing our Services, including by blocking your IP address. You agree that after termination of your access to our Services, we are not obliged to retain any Content or Personal Data (as defined in our Privacy Policy) which was collected by us, but we may elect to do so in our sole discretion, for a duration determined by us unless you make a written request for us to remove such information from our system.</p>
                            <p className='font-weight'>11. DISCLAIMERS.</p>
                            <p>(a) OUR SERVICES AND CONTENT ARE PROVIDED ‘AS IS’, ‘AS AVAILABLE’ AND ‘WITH ALL FAULTS’ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. YOU ASSUME THE RISK OF ANY AND ALL DAMAGE OR LOSS FROM USE OF, OR INABILITY TO USE, OUR SERVICES, INCLUDING BUT NOT LIMITED TO PHYSICAL INJURY OR DEATH AS WELL AS DAMAGES TO PERSONAL PROPERTY. WITHOUT LIMITING THE FOREGOING, WITH RESPECT TO THE WEBSITE, AND/OR THE SERVICES GAME OF GAMES EXPLICITLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, ACCURACY, SECURITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT, QUIET TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. GAME OF GAMES MAKES NO WARRANTY THAT THE WEBSITE, SERVICES, AND/OR CONTENT WILL MEET YOUR NEEDS, EXPECTATIONS, BE TO YOUR SATISFACTION, OR BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE, BUG-FREE, OR MALWARE-FREE BASIS. GAME OF GAMES MAKES NO WARRANTY REGARDING THE QUALITY OF OUR SERVICES OR CONTENT, OR THE ACCURACY, TIMELINESS, TRUTHFULNESS, COMPLETENESS OR RELIABILITY OF ANY CONTENT OBTAINED THROUGH THE WEBSITE OR SERVICES.</p>
                            <p>(b) NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM GAME OF GAMES OR THROUGH THE WEBSITE SERVICES OR CONTENT, WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.</p>
                            <p><span className='font-weight'>12. Release and Waiver of Claims.</span> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT, YOUR PERSONAL REPRESENTATIVES AND YOUR HEIRS, HEREBY VOLUNTARILY AGREE TO RELEASE, WAIVE, AND DISCHARGE ALL CLAIMS, ACTIONS, DEMANDS, SUITS, OR PROCEEDINGS (“CLAIMS”) AGAINST US AND OUR AFFILIATES, INCLUDING ANY AND ALL LIABILITY FOR DAMAGES (ACTUAL AND OR CONSEQUENTIAL), COSTS AND EXPENSES (INCLUDING LITIGATION COSTS AND ATTORNEYS’ FEES) OF EVERY KIND AND NATURE ARISING FROM OR IN ANY WAY RELATED TO: (A) THE SERVICES OR THESE TERMS, (B) YOUR DEVICE, (C) ANY INACCURACY, UNTIMELINESS, OR INCOMPLETENESS OF ANY AND ALL INFORMATION AND/OR CONTENT OBTAINED OR ACCESSED BY OR THROUGH THE SERVICES. FURTHER, IF YOU ARE A RESIDENT OF THE STATE OF CALIFORNIA, YOU WAIVE YOUR RIGHTS UNDER CALIFORNIA CIVIL CODE SECTION 1542, WHICH STATES, “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.” YOU UNDERSTAND THAT ANY FACT RELATING TO ANY MATTER COVERED BY THESE TERMS MAY, AT SOME TIME IN THE FUTURE, BE FOUND TO BE TRUE, AND YOU ACCEPT AND ASSUME THE RISK OF SUCH POSSIBLE DIFFERENCES IN FACT. IN ADDITION, YOU EXPRESSLY WAIVE AND RELINQUISH ANY AND ALL RIGHTS WHICH YOU MAY HAVE HAD UNDER ANY OTHER STATE OR FEDERAL STATUTE OR COMMON LAW PRINCIPLE OF SIMILAR EFFECT, TO THE FULLEST EXTENT PERMITTED BY LAW.</p>
                            <p><span className='font-weight'>13. Assumption of the Risk</span> YOU KNOWINGLY AND FREELY ASSUME ALL RISK WHEN USING THE SERVICES. THEREFORE, YOU, ON BEHALF OF YOURSELF OR THE ENTITY YOU REPRESENT, YOUR PERSONAL REPRESENTATIVES AND YOUR HEIRS, HEREBY VOLUNTARILY AGREE TO RELEASE, WAIVE, DISCHARGE, HOLD HARMLESS, DEFEND AND INDEMNIFY GAME OF GAMES AND ITS AFFILIATES FROM ANY AND ALL CLAIMS FOR BODILY INJURY, PROPERTY DAMAGE, WRONGFUL DEATH, EMOTIONAL DISTRESS, OR OTHER DAMAGES OR HARM, WHETHER TO YOU OR TO THIRD PARTIES, WHICH MAY RESULT FROM ANY ASPECT OF OUR SERVICES. </p>
                            <p><span className='font-weight'>14. Limitation of Liability.</span> TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR PERSONAL INJURY RELATED TO OR RESULTING FROM ANY ASPECT OF THE SERVICES, OR ANY INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, OR ANY OTHER DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO (A) THESE TERMS, (B) ANY ASPECT OF OUR SERVICES, HOWEVER CAUSED, REGARDLESS OF THE THEORY OF LIABILITY (BREACH OF CONTRACT, A BREACH OF WARRANTY, NEGLIGENCE, PRODUCTS LIABILITY, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU</p>
                            <p>IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE LESSER OF (A) ONE HUNDRED TWENTY-FIVE DOLLARS ($125) OR (B) THE FEES PAID BY YOU TO US IN CONNECTION WITH THE SERVICES OUT OF WHICH THE CLAIMS AROSE. THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.</p>
                            <p><span className='font-weight'>15. Dispute Resolution.</span>(a) In the event that any dispute arises with respect to our Services, Terms, or any of our Policies, upon our election in our sole discretion, such dispute shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association, in Charles County, Maryland, and at our option, such arbitration shall be before a single neutral arbitrator selected in our sole and absolute discretion. In the event we elect not to require that a dispute arising with respect to our Services, Terms, or any of our Policies be submitted to binding arbitration as described above, any such dispute shall nevertheless be litigated in the State courts located in Charles County, Maryland or in the U.S. District Court for the District of Maryland, as the case may be. You shall be liable for and shall reimburse us for our expenses and fees, including attorneys’ fees, in the event any arbitration or litigation arises out of, under, or relating to these Terms or any of our Policies, or your use of our Services. By using our Services, you irrevocably agree and consent to be bound to personal jurisdiction of and venue selection in the state courts located in Charles County, Maryland or in the U.S. District Court for the District of Maryland as the case may be, whether either arbitration or litigation arises between us and you. YOU AGREE THAT ANY CAUSE OF ACTION THAT YOU MAY HAVE ARISING OUT OF OR RELATED TO THE SERVICES MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.</p>
                            <p>(b) YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST US ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS USER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING. UNLESS WE AGREE OTHERWISE, THE DECISION-MAKER MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE DECISION-MAKER MAY AWARD RELIEF ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIMS. ANY RELIEF AWARDED CANNOT AFFECT OTHER USERS.</p>
                            <p>(c) You agree that irreparable harm to us would occur in the event that any of the provisions of these Terms, including but not limited to the provisions of Sections 6, 7, and 9 were not performed fully by you or were otherwise breached by you, and that money damages are an inadequate remedy for breach of the Terms because of the difficulty of ascertaining and quantifying the amount of damage that will be suffered by us in the event that these Terms are not performed in accordance with its provisions or is otherwise breached. It is accordingly hereby acknowledged that, notwithstanding any provision of this Section 15, we shall be entitled to petition the courts mentioned in Section 15(a) for an injunction or injunctions to restrain, enjoin and prevent a failure to perform these Terms by you, without posting a bond or other security, and to enforce specifically such provisions of these Terms.</p>
                            <p>(d) Dispute Resolution Severability. If a court decides that any term or provision is invalid or unenforceable, relating to our ability to submit any above-mentioned dispute to arbitration or to the above class action waiver according to this Section 19, the parties agree to litigate any such dispute according to Section 15(a) above and to replace any other such terms or provisions of Section 15(a) or Section 15(b) with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Section 15 shall be enforceable as so modified. In any event, the remainder of these Terms will continue to apply.</p>
                            <p><span className='font-weight'>16. Indemnification.</span> You agree to indemnify, defend, and hold harmless us and our Affiliates from and against any and all Claims, losses, expenses, damages and costs (including, but not limited to, direct, incidental, consequential, exemplary and indirect damages), and reasonable attorneys’ fees, resulting from or arising out of, under, or relating to: your use, misuse, or inability to use our Services; any infringement of a third-party’s rights; your Device; a breach of a representation or warranty; alterations of, loss of, or unauthorized access to any information sent or received or not sent or received by you or us; any defamatory, offensive, fraudulent, or illegal use of our Services by you; any violation of a law or regulation by you relating to the Services; any accidental or improper disclosure of information; and any violation by you of these Terms or any of our other Policies.</p>
                            <p><span className='font-weight'>17. Survival.</span> Notwithstanding anything herein to the contrary, the provisions of Sections 4 through 7 and 10 through 26 of these Terms, as well as any provision of these Terms which in accordance with its terms is intended to survive the termination of these Terms, your Profile, or your license to use or access the Services shall survive any such termination.</p>
                            <p><span className='font-weight'>18. Notification.</span> By using the Services, you agree that we may provide you with any notices or other communications about the Services electronically: (a) via email (in each case to the address that you provide), SMS message, or telephone call (in each case to the phone number that you provide), or (b) by posting to the Website. For notices made by email, the date of receipt will be deemed the date on which such notice is transmitted. We will use best efforts to honor a User’s request to opt out of promotional messages, but under no circumstances will we be liable for Posting any Content to Users.</p>
                            <p><span className='font-weight'>19. Severability; No Waiver.</span> The representations and warranties and/or covenants set forth herein are each to be construed as a separate agreement, independent of any other provisions of these Terms. Further, the invalidity or unenforceability of any provision, word, phrase, clause, sentence, paragraph or section of these Terms shall in no way affect the validity or enforceability of any other provision, word, phrase, clause, sentence, paragraph or section of these Terms, and any such invalid or unenforceable provision that is overbroad shall be deemed narrowed to the broadest term permitted by applicable law and shall be enforced as narrowed. If one or more of the provisions in these Terms deemed invalid or unenforceable, then the remaining provisions will continue in full force and effect. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
                            <p><span className='font-weight'>20. Privacy Policy.</span> By using our Services, you agree to the provisions of our Privacy Policy, which is hereby incorporated by reference. You further agree that we may disclose Personal Data (as defined in our Privacy Policy) according to our Privacy Policy, as determined by us. Please see our Privacy Policy for more information.</p>
                            <p><span className='font-weight'>21. Assignment.</span> These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by us as determined by us.</p>
                            <p><span className='font-weight'>22. Our Relationship with You.</span> With respect to you, we are an independent contractor only. Nothing in these Terms shall be deemed or is intended to deem the relationship between you and the Company as anything more than a consumer relationship. The Company and Users do not have an employer-employee, partner, joint venturer, joint associates for profit, or agency relationship.  Users are not our employees, independent contractors, partners, joint ventures, or any agent of the Company of any sort whatsoever.</p>
                            <p><span className='font-weight'>23. Third Parties.</span> From time to time, we may engage third parties or Affiliates to assist us in providing certain aspects of the Services, including but not limited to marketing functions. You agree that we may engage such third parties in providing Services to you, as determined by us.</p>
                            <p><span className='font-weight'>24. Entire Agreement; Modification.</span> These Terms together with our Polices any other document referenced herein constitutes the entire understanding between us and you with respect to the subject matter hereof. You agree that we may amend, modify, or alter these Terms and/or our Polices at any time in our sole discretion. We will notify you about changes to these Terms by placing the updated Terms on the Website. You agree that your use of the Services after such notification will constitute acceptance by you of such changes to the Terms.</p>
                            <p><span className='font-weight'>25. Headings; Interpretation.</span> Section headings in these Terms are for convenience only and shall not govern the meaning or interpretation of any provision of these Terms. Further, whenever the context requires, all words, including but not limited to defined capitalized terms, will include the masculine, feminine, and neuter, and each word will include the singular form, plural form, and other conjugations of that word.</p>
                            <p><span className='font-weight'>26. Governing Law; English Language.</span> You agree that: (a) the Services shall be deemed solely based in Charles County, Maryland (where we have our headquarters), and (b) the Services shall be deemed passive which does not give rise to personal jurisdiction over us, either specific or general, in jurisdictions other than Charles County, Maryland. These Terms, our Privacy Policy, and other Policies are governed by the laws of the State of Maryland and of the United States of America, and without regard to conflicts of law principles. In the event of a conflict between these Terms and a foreign language version of the Terms, the English language version of these Terms shall govern. All disputes, claims and causes of action (and related proceedings) will be communicated in English.</p>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Terms