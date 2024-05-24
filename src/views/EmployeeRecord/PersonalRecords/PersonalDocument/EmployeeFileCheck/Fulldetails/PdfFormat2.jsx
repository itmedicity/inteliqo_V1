import React, { memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';

// const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))

const PdfFormat2 = ({ Empdata, setShowGeneral }) => {
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box>
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                APPOINTMENT LETTER
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
                    <Typography level="title-md" >7. Accommodation, if provided by the Institute, will be charged as per the prevalling norms/contract </Typography>
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
        </Box>
    )
}

export default memo(PdfFormat2)