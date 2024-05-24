import React, { memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

// const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))


const Joinpdfformat4 = ({ Empdata, setShowGeneral }) => {
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
                                JOINING LETTER
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
                    <Typography>TMCH/HRD/JL/..../..../....</Typography>
                    <Typography sx={{}}>DATE :</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center', mt: 5 }}>
                    <Typography level="h4" > JOINING LETTER
                    </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >To ,</Typography>
                    <Typography level="title-md" >The H.R. Department</Typography>
                    <Typography level="title-md" >TMCH</Typography>
                    <Typography level="title-md" >Dear Sir ,</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >With due respect, I athul a m Emp.ID: 135666 would like to inform you that I am joining in Travancore </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Medical Hospital as TRAINEE in the department of INFORMATION TECHNOLOGY on  </Typography>
                </Box>

                <Box sx={{ mt: 3, }}>
                    <Typography level="title-md" >I hope you will accept my joining as TRAINEE </Typography>
                </Box>


                <Box sx={{ mt: 10 }}>
                    <Typography level="title-md" >Sincerely ,</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Name :athul a m </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Designation : TRAINEE</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography level="title-md" >Signature :        </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(Joinpdfformat4)