import { Checkbox, CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Card, Grid, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import SelectBasic from 'src/views/Component/SelectBasic';
import SelectMult from 'src/views/Component/SelectMult';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { InputUnstyled } from '@mui/base';
import Items from './Items';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const JobDescription = () => {
    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {/* Outer Main Box */}
                <Paper square elevation={2} sx={{ p: 0.5 }}   >
                    {/* Main Heading Section Box */}
                    <Paper square elevation={0} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Job Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box >
                            <IconButton variant="outlined" size='sm' >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                    {/* Depertment Selection Box */}
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <DepartmentSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}  >
                            <DepartmentSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 0, px: 0.5 }} >
                            <IconButton variant="outlined" size='sm' >
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Paper>
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
                    {/* Description */}
                    <Box sx={{ p: 1, display: "flex" }} >
                        <CssVarsProvider>
                            <Typography
                                startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                                level="body2"
                                sx={{ flex: 2 }}
                            >
                                Duties & Responsibilities
                            </Typography>
                        </CssVarsProvider>
                        <Box sx={{ flex: 0 }} >
                            <IconButton variant="outlined" size='sm' >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Dutieds And Responsibilities */}
                    <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                        <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                            <Box sx={{ flex: 1, pr: 1 }}>
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex" }}
                                    minRows={1}
                                    placeholder="Duties & Responsibilities"
                                />
                            </Box>
                            <Box sx={{ flex: 0, }} >
                                <IconButton variant="outlined" size='sm' >
                                    <AddToPhotosIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        {
                            [1, 2, 3, 5].map((val, ind) => <Items key={ind} />)
                        }
                    </Paper>
                    {/* Job Specification : Performance & Competency */}
                    <Box sx={{ p: 1, display: "flex" }} >
                        <CssVarsProvider>
                            <Typography
                                startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                                level="body2"
                                sx={{ flex: 2 }}
                            >
                                Job Specification : Performance & Competency
                            </Typography>
                        </CssVarsProvider>
                        <Box sx={{ flex: 0 }} >
                            <IconButton variant="outlined" size='sm' >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Prformance & Competency descriptive table */}
                    <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                        <Box sx={{ display: "flex", alignItems: "center" }} >
                            <Box sx={{ flex: 1 }} >
                                <SelectBasic label="Key Result Areas (KRA)" />
                            </Box>
                            <Box sx={{ flex: 1, px: 2 }} >
                                <IconButton variant="outlined" size='sm' >
                                    <AddToPhotosIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
                            <Box sx={{ flex: 3 }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder="Key Performance Indicators (KPI's) "
                                />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder="KPI Score"
                                />
                            </Box>
                            <Box sx={{ flex: 3, }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder="Competency"
                                />
                            </Box>
                            <Box sx={{ flex: 0, px: 1 }} >
                                <IconButton variant="outlined" size='sm' >
                                    <AddToPhotosIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
                            <Box sx={{ flex: 2 }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder="Sourcing"
                                />
                            </Box>
                            <Box sx={{ flex: 3, px: 0.5 }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder=""
                                />
                            </Box>
                            <Box sx={{ flex: 3, }} >
                                <TextareaAutosize
                                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                    minRows={1}
                                    placeholder=""
                                />
                            </Box>
                            <Box sx={{ flex: 0, px: 1 }} >
                                <DeleteOutlinedIcon color='error' />
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default JobDescription