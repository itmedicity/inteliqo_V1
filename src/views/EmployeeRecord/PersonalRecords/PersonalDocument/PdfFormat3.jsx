import React, { memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';


const PdfFormat3 = ({ Empdata, itemname, setformid }) => {
    const toRedirectToHome = useCallback(() => {
        setformid(0)
    }, [setformid])
    return (
        <Box>
            <Box >
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

export default memo(PdfFormat3) 