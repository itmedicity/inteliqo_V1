import React, { lazy, memo, useCallback } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, TableContainer } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const AssesmentSheetMark = lazy(() => import('./AssesmentSheetMark'))
const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))


const AssesmentSheet = ({ Empdata, setShowGeneral, Files }) => {

    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box>
            <Box sx={{ p: 1 }}>
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Assesment Sheet
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
            <Box sx={{
                overflowX: 'auto',
                height: window.innerHeight - 190,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    width: 0,
                },
            }}>


                {/* <CustmTypog title={'Employee details'} /> */}
                {Files.length !== 0 ?

                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    :
                    <Box>
                        {Empdata?.interview_status !== null ?
                            <TableContainer sx={{ p: 1 }}>
                                <Box sx={{ ml: 1 }}>
                                    <Box sx={{ display: "flex", width: '100%' }}>
                                        <Typography level="title-md" sx={{ width: '30%' }}>Name Of Candidate  </Typography>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>: {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}  </Typography>                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography level="title-md" sx={{ width: '30%' }}>Job Position</Typography>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> : {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography level="title-md" sx={{ width: '30%' }}>Department</Typography>
                                        <Typography level="title-md" sx={{ ml: 1 }}> : {Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name}</Typography>
                                    </Box>

                                </Box>

                                <AssesmentSheetMark Empdata={Empdata} />

                            </TableContainer>
                            :
                            <Box sx={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',

                                overflowX: 'auto',
                                height: window.innerHeight - 200,
                                scrollbarWidth: 'none',
                                '&::-webkit-scrollbar': {
                                    width: 0,
                                },
                            }}>
                                <Box sx={{ width: '10%' }}>No Data Found</Box>
                            </Box>
                        }

                    </Box>

                }
            </Box>
        </Box>
    )
}

export default memo(AssesmentSheet) 