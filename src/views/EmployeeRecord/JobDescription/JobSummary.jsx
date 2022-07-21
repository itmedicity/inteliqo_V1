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
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import KraItem from './KraItem';
import ExperienceItem from './ExperienceItem';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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