import React, { memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';


const PdfFormat1 = ({ Empdata, itemname, setformid }) => {

    const toRedirectToHome = useCallback(() => {
        setformid(0)
    }, [setformid])
    return (
        <Box>
            <Box >
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                {itemname}
                            </Typography>
                        </Box>
                        <Box >
                            <IconButton
                                variant="outlined"
                                size='xs'
                                color="danger"
                                onClick={toRedirectToHome}
                                sx={{ color: '#ef5350', }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ p: 5, height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                    <Typography>TMCH/HRD/OL/MM/YY/REF: NO</Typography>
                    <Typography sx={{}}>DATE :</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center', mt: 5 }}>
                    <Typography level="h4" > APPOINTMENT LETTER</Typography>

                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >To ,</Typography>
                    <Typography level="title-md" >Ms</Typography>
                    <Typography level="title-md" >{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >We are pleased to engage you as {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name} in this establishment on the following terms and condition for a fixed of One year ,
                        commencing from {Empdata?.em_doj === '' ? "Not Updated" : Empdata?.em_doj}</Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >1. Your place of engagment is presently at {Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name} of Travancore Medical College Hospital ,Kerala.However you
                        are liable to be transferred to any other units of the establishment/associates.

                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >2. You will be entitled for an all inclusive remuneration of {Empdata?.recomend_salary === 0 ? "Not Updated" : Empdata?.recomend_salary}/- (Rupees only) per month subject to statutory deductions if any.The
                        Managment is free to alter or refx the remuneration subject to the performance appraisals. </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >3. There will be an initial appraisal period of six months from the date of your engagement . During the appraisal period if your
                        performance is not statisfactory or not up to the standard and expectation of the Management , this contract will be terminated without
                        any prior notice or compensation .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >4. You will be bound by the shift timings, attendance, holidays and leave rules made applicable to the fxed term employees of this
                        Institution from time to time .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >5. There will be periodic performance evaluation and if your performance is not found to be satisfactory, You will be given report based
                        on your shortfall/defciencies and if there is no improvement in your performance,the Managment reserves the right to discontinue your
                        employment at any time. </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >6. You are liable to wear uniforms if any prescribed by the Managment.The Managment will have the discretion to prescribe norms for
                        the issue of uniforms, including charging of the cost, either in part or in full, of the uniforms provided to you .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >7. Accommodation, if provided by the Institute, will be charged as per the prevalling norms/contract </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >8. You may be transferred to any department of the Institute within the hospital premises or outside, as per the requirements of the
                        Insitute .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >9. You must notify the departmental head within one hour of the start of your duty time if you are unable to report for work .If you are
                        absent without intimating your departmental head for more than eight days on any account, your employment in the Institute will be
                        deemed as terminated .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >10. You shall report for work at your place of work in time according to your shift schedule or schedule of working hours. Late coming for
                        work beyond the time of commencement of the shift or working hours without permission from the Management or Departmental head
                        will be treated as misconduct on your part. You shall be liable to appropriate actions against you for such late-coming . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >11. You will be eligible for leaves as applicable to the fxed term employees subject to administrative exigencies . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >12. Absence from work without getting the leave sanctioned or without obtaining permission for such absence from the leave
                        sanctioning authority or Managment will amount to unauthorized absence from work , for which you will be liable to appropriate action, in
                        addition to loss of wages for the period of such absence . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >13. If You along with other employed persons acting in concert absent yourself without due notice and without reasonable cause, the
                        Management will be at liberty to deduct 8 days wages for such concerted absence  </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >14. In case of extreme emergency the telephonic leave may be treated as elligible leave provided a proper leave application is submitted
                        and sanctioned within 24 hours. Leave sanctioning authorities have the right to refuse, revoke leave request or sanctioned leave at any
                        time due to exigencies of wor</Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >15. If you absent yourself from work without obtaining the leave sanctioned or without taking permission for such absence from work for
                        a continuos period of 8 days and more during the period of your service or overstay for 8 days or more beyond the period of leave already
                        sanctioned without obtaining sanction for extension of leave or without obtaining the permission of the leave sanctioning authority, you
                        shall be deemed to have voluntarity abandoned the service under the Management and your name will be struck off from the rolls of the
                        establishment without any further notice .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >16. During the course of appointment , you shall not enter into the service of any other organization, institution,body,or person or engage
                        yourself in any self-employment, whether for remuneration or not .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >17. You are not permitted to accept any incentives from suppliers or any other associates of the Institute . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >18. Any confdential information related to the job or the Institute, which you may come across during your service,must be kept in strict
                        confdence even after the cessation of your employment with the Institute .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >19. You shall,during the period of your appointment as above in this Hospital, handle all equipments,tools and/or instruments of the
                        hospital with utmost care and attention and shall not cause any loss or damage to the Hospital or its properties.The Managment of the
                        Hospital has got the right to recover such losses or damage from the monthly wages/remuneration payable to you from the Hospital . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >20. During the period of appointment , you shall strictly comply with and carry out all reasonable and lawful orders or instructions issuded
                        by the managment or your superiors from time to time, either generally or specifcally, to you and you shall discharge all the functions,
                        duties and responsibilities assigned to you from time to time sincerly,honestly and faithfully to the utmost satisfaction of the Managment
                        and your superiors .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >21. Any misrepresentation or wrong information given in your application can result in terminating your service from the Institute without
                        any notice or compensation . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >22. You shall strictly abide by the Service & Conduct rule, regulation and procedures in force in the Institute, which may be amended, or
                        added upon from time to time as per the requirements of the Institute . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >23. You will be bound by all the duty shifts assigned by the department </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >24. You are required to unergo BLS training within six months of joining to ensure your continuity in service . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >25. Violation of any above clause shall be deemed to be misconduct and the Management shall have the right to discontinue your service
                        without any prior notice/intimation  </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >26. If you leave the services of the Managment during the period of this contract without giving one month notice in writing or payment in
                        lieu of notice to the Management your entire service will stand forfeited and you will have no claim or right to receive any Service/
                        Experience Certifcate from the Managment till such time you comply with requirement of payment of the amount in lieu of notice
                        without prejudice to the Management rights to recover the payment in lieu of notice from you . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >27. By signing this contract you declare that you do not have any criminal proceedings pending against you and you have not been
                        convicted by a court of law .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >28. It is clarifed that you will not be entitled for any rights, benefts or privileges of the permanent employees of this Institution or for any
                        kind of claim for regularization by virtue of this fxed term engagement  </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >29. The Institution reserves the right to alter/modify the above terms at any time . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >30. Your term of appoinment is proposed on the basis of the expected man power requirement of this Institution .But if it is found that
                        your service is surplus this contract will be terminated and you will be relieved immediately.It is clarifed that seniority will not be criteria
                        for such termination . </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 2 }}>
                    <Typography level="title-md" >31. The period of this order and engagement will automatically expire on {Empdata?.em_contract_end_date === '' ? "Not Updated" : Empdata?.em_contract_end_date} You will not be entitled for any further notice or
                        compensation on the expiry of the above period .
                    </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >This letter supersedes all prior oral or written understanding, if any, given to you.If you accept the terms and condition above mentioned ,
                        please sign the declaration in the duplicate and return to us. The original shall be retained by you .
                    </Typography>
                </Box>
                <Box sx={{ mt: 10 }}>
                    <Typography level="title-md" >G Ganesh Potti </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >General Manager HR </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Signature :</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Date :         </Typography>
                </Box>
            </Box>
            {/* </Box>

            </Modal > */}
        </Box >
    )
}

export default memo(PdfFormat1)