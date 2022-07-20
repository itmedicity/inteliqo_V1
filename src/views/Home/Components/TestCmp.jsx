import * as React from 'react';
import Box from '@mui/joy/Box';
import { CssVarsProvider } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import { CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/joy/Typography';

const TestCmp = ({ widgetName, count, status }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Paper elevation={3} sx={{
                width: "100%",
                p: 0.5,
                display: "flex",
                direction: "row",
                // backgroundColor: "lightgreen"
            }} >
                <Box sx={{
                    display: "flex",
                    borderRadius: 10,
                    boxShadow: 8
                }} >
                    <CssVarsProvider>
                        <IconButton
                            variant="outlined"
                            size='lg'
                            color="success"
                        >
                            {status === false ? <CircularProgress /> : count}
                        </IconButton>
                    </CssVarsProvider>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "lightgreen",
                    justifyContent: "space-around"
                }}>
                    <Box sx={{ px: 0.5 }} >
                        <CssVarsProvider>
                            {/* <Typography fontWeight="md" textColor="success" mb={0.5}>
                            Yosemite Parksdasdasdasdas
                        </Typography> */}
                            <Typography
                                level="body2"
                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                color="success"
                            >
                                {widgetName}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default TestCmp