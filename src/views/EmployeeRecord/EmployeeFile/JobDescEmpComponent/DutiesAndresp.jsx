import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';


const DutiesAndresp = ({ val }) => {
    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", py: 0.1, }} >
                <Box sx={{ display: "flex", flex: 1, pr: 1, flexDirection: "row" }}>

                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <CssVarsProvider>
                                    <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                            {val.duties_and_resp}
                        </Box>
                    </Box>


                    {/* <Paper
                        square
                        variant="outlined"
                        sx={{
                            display: "flex",
                            px: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: "inherit",
                            minHeight: 32
                        }}
                    >
                        <Box sx={{ flex: 0, pr: 0.2 }} >
                            <IconButton variant="outlined" size='sm'  >
                                <AdjustIcon color='primary' size="inherit" />
                            </IconButton>
                        </Box>
                    </Paper>
                    <Paper square sx={{ display: "flex", px: 0.5, justifyContent: "left", alignItems: "center", width: "100%" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1" className="text-capitalize">
                                {val.duties_and_resp}
                            </Typography>
                        </CssVarsProvider>
                    </Paper> */}
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(DutiesAndresp) 