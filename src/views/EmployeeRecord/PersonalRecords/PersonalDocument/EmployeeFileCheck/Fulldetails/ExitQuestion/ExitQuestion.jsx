import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const Question = lazy(() => import('./Question'))
const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))

const ExitQuestion = ({ Empdata, setShowGeneral, Files }) => {
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box  >
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Exit Questionnaire
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
            <Box sx={{ height: window.innerHeight - 190, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>
                    :
                    <Box >
                        {/* <CustmTypog title={itemname} /> */}

                        <Box sx={{ ml: 1, display: "flex", }}>
                            <Box sx={{ width: "50%" }}>
                                <Box sx={{ display: "flex", }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Name. </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>                    </Box>

                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Designation </Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}> : {Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>First Salery  </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>PF/ESI No  </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Date of Relieving</Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj}</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Box sx={{ display: "flex", width: '100%' }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>EMP No. </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>                    </Box>

                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Department </Typography>
                                    <Typography level="title-md" sx={{ ml: 1 }}> : {Empdata?.em_gender === 1 ? 'Male' : Empdata?.em_gender === 2 ? "Female" : "Not Updated"}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Present Salary </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>Doj </Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.group_name === '' ? 'Not Updated' : Empdata?.group_name}</Typography>
                                </Box>

                                <Box sx={{ display: "flex" }}>
                                    <Typography level="title-md" sx={{ width: '30%' }}>DOR</Typography>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_doj === '' ? 'Not Updated' : Empdata?.em_doj}</Typography>
                                </Box>

                            </Box>
                        </Box>

                        <Question />
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default memo(ExitQuestion)