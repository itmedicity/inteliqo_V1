import { Box, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { lazy, memo, useCallback } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))
const SelfAttestedidproof = ({ setShowGeneral, Files }) => {
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
                                Self Attested Copy Of Photo ID Proof
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
                {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    : <Box sx={{
                        display: "flex", alignItems: 'center', justifyContent: 'center',

                        overflowX: 'auto',
                        height: window.innerHeight - 140,
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        },
                    }}>
                        <Box sx={{ width: '10%' }}>No Data Found</Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default memo(SelfAttestedidproof)