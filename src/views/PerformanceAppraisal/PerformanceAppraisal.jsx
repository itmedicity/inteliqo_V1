import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/joy/IconButton';
import TextInput from 'src/views/Component/TextInput';

const PerformanceAppraisal = () => {
    const history = useHistory()
    const Redirect = async () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Perfomance Appraisal
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                            <IconButton variant="outlined" size='sm' onClick={Redirect} sx={{ color: 'red' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center" 
                                fontWeight: 500
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Name</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="empname"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center", 
                                fontWeight: 500

                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Emp. ID</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="empid"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                fontWeight: 500,
                                //justifyContent: "center" 
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Department</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="deptname"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center" ,
                                fontWeight: 500
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Designation</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="desgname"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center" 
                                fontWeight: 500
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Qualification</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="qualification"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center", 
                                fontWeight: 500

                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Previous Exp in Years</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="experience"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >

                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center" ,
                                fontWeight: 500
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> DOJ</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="desgname"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center" 
                                fontWeight: 500
                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1"> Present Salary Rs.</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="salary"
                                    disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >

                            <Box sx={{ display: "flex", width: "50%" }} >
                                <Paper square sx={{
                                    display: "flex", flex: 1, px: 0.5,
                                    //justifyContent: "center", 
                                    fontWeight: 500

                                }} variant="outlined" >
                                    <CssVarsProvider>
                                        <Typography level="body1">Date of Last Appraisal</Typography>
                                    </CssVarsProvider>
                                </Paper>
                                <Box sx={{ flex: 1, }} >
                                    <TextInput
                                        style={{ width: "100%", paddingLeft: 13 }}
                                        name="last_date"
                                        disabled={true}
                                    //value={objective}
                                    //changeTextValue={(e) => updatejob_description(e)}
                                    />
                                </Box>
                            </Box>

                        </Box>

                    </Paper>

                    <Paper square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center", pt: 1 }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Perfomance Assessment
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                        <Box border={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 'auto', fontWeight: 500 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Slno
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "25%", height: 'auto', fontWeight: 500 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Key Result Areas
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "45%", height: 'auto', fontWeight: 500 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Key Performance Indicators
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "10%", height: 'auto', fontWeight: 500 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    SCORE
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "15%", height: 'auto', fontWeight: 500 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    JUSTIFICATION OF SCORE (Mandatory)
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    {/* Total Score Details */}

                    <Paper square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center", pt: 1 }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Score Details
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center", 
                                // fontWeight: 500

                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1">Maximum Score</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1, }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="max_score"
                                //disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Paper square sx={{
                                display: "flex", flex: 1, px: 0.5,
                                //justifyContent: "center", 
                                // fontWeight: 500

                            }} variant="outlined" >
                                <CssVarsProvider>
                                    <Typography level="body1">Given Score</Typography>
                                </CssVarsProvider>
                            </Paper>
                            <Box sx={{ flex: 1 }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 13 }}
                                    name="given_score"
                                //disabled={true}
                                //value={objective}
                                //changeTextValue={(e) => updatejob_description(e)}
                                />
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <IconButton variant="outlined" size='sm' onClick={Redirect} sx={{ color: 'red' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default PerformanceAppraisal