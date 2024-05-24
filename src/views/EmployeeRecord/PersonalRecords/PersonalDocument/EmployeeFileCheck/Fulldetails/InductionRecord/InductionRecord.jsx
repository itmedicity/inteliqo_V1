import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const InductionScore = lazy(() => import('./InductionScore'))
const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const InductionRecord = ({ Empdata, setShowGeneral, Files }) => {

    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])

    return (
        <Box >
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Induction Record
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
            <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>

                {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    :
                    <Box >
                        {/* <CustmTypog title={itemname} /> */}
                        <Box sx={{ ml: 1 }}>
                            <Box sx={{ display: "flex", width: '100%' }}>
                                <Typography level="title-md" sx={{ width: '30%' }}>Name of the Employee  </Typography>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>                    </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography level="title-md" sx={{ width: '30%' }}>Employee Id</Typography>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>:  {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography level="title-md" sx={{ width: '30%' }}>Designation </Typography>
                                <Typography level="title-md" sx={{ ml: 1 }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography level="title-md" sx={{ width: '30%' }}>Department</Typography>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>:  {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography level="title-md" sx={{ width: '30%' }}>Name of HOD</Typography>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>:  {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </Box>

                        </Box>

                        <InductionScore />
                    </Box>
                }
            </Box>
        </Box >
    )
}

export default memo(InductionRecord) 