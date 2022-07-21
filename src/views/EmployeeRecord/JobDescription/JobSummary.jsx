import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, } from '@mui/material'
import React, { Fragment } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import SelectBasic from 'src/views/Component/SelectBasic';
import SelectMult from 'src/views/Component/SelectMult';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';

const JobSummary = () => {
    return (
        <Fragment>
            {/* Job Summary Description */}

            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Summary
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' >
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Job Summary Box */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        px: 0.5,
                        justifyContent: "center"
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Objectives
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput style={{ width: "100%", paddingLeft: 13 }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Scope
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput style={{ width: "100%", paddingLeft: 13 }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Designation
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput style={{ width: "100%", paddingLeft: 13 }} Placeholder="Auto Select Designation From Top Menu" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Department
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput style={{ width: "100%", paddingLeft: 13 }} Placeholder="Auto Select Department From Top Menu" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Location /Work Place
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <SelectBasic label="Select Location / Work Place" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Working Hours
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <SelectMult label="Select Location / Work Place" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 2, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Reporting
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <SelectBasic label="Department Section" />
                    </Box>
                    <Box sx={{ flex: 2 }} >
                        <SelectBasic label="Designation" />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Equipment To Be Used
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput style={{ width: "100%", paddingLeft: 13 }} Placeholder="Description" />
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default JobSummary