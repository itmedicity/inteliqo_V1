import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import React, { useCallback } from 'react';
import { Fragment, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
const Viewpage = ({ setflag, src }) => {

    const toRedirectToHome = useCallback((e, item) => {
        setflag(1)
    }, [setflag])

    return (
        <Fragment>
            <Paper
                sx={{
                    width: { md: "100%", sm: "100%", xl: "100%", lg: "100%", xs: "100%", }, height: window.innerHeight - 120
                }}
            >   <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Check List Files
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color="danger"
                                        onClick={toRedirectToHome}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{
                    p: 1,
                    overflowX: 'auto',
                    // height: window.innerHeight - 200,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {src.endsWith('.pdf') ? (
                        <Card>
                            <embed
                                src={src}
                                type="application/pdf"
                                height={window.innerHeight - 200}
                                width="100%"
                            />
                        </Card>

                    ) : (
                        <Card>
                            <img
                                alt=''
                                src={src}
                                height={window.innerHeight - 200}
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </Card>

                    )}
                </Box>

            </Paper>

        </Fragment>
    );
};

export default memo(Viewpage);
