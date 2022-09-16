import { CssVarsProvider } from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { memo } from 'react';

const DutiesAndresp = ({ val }) => {
    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", py: 0.1, }} >
                <Box sx={{ display: "flex", flex: 1, pr: 1, flexDirection: "row" }}>
                    <Paper
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
                    </Paper>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(DutiesAndresp) 