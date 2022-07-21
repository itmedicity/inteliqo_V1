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

const Generic = () => {
    return (
        <Fragment>
            {/* Generic */}

            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Specification : Generic
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' >
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 2,
                        px: 0.5,
                        justifyContent: "center",
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Experience
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 3, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13, }}
                            Placeholder="Experience In Handling Recruitment Activities"
                        />
                    </Box>
                    <Box sx={{ flex: 1, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13, }}
                            Placeholder="Min Exp In Year"
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        px: 0.5,
                        justifyContent: "center",
                        alignItems: "center"
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography
                                level="body1"
                            >
                                Qualification
                            </Typography>
                        </CssVarsProvider>
                    </Paper>
                    {/* Experience Entry Section */}
                    <Box sx={{ display: 'flex', flex: 2, flexDirection: "column" }} >
                        {/* Exp - Header Add + */}
                        <Paper square sx={{
                            display: "flex",
                            flex: 3,
                            px: 0.5,
                            justifyContent: "center",
                            alignItems: "center"
                        }} variant="outlined" >
                            <Box sx={{ flex: 3, }} >
                                <Box sx={{ flex: 2 }} >
                                    <SelectBasic label="Course" />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 3, }} >
                                <Box sx={{ flex: 2 }} >
                                    <SelectBasic label="Specialization" />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0 }} >
                                <IconButton variant="outlined" size='sm' >
                                    <AddToPhotosIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                        {/* Exp - Header Add + */}
                        <Paper square sx={{
                            display: "flex",
                            flex: 3,
                            p: 0.3,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }} variant="outlined" >
                            {
                                [1, 2, 3, 4].map((idx) => <ExperienceItem key={idx} />)
                            }
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, mt: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 2 }} >
                        <TextareaAutosize
                            style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                            minRows={2}
                            placeholder="Special Comments"
                        />
                    </Box>
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} variant="outlined" >

                        <Box sx={{ display: "flex", flexDirection: "row-reverse", flex: 1, px: 1, alignItems: "center" }} >
                            <CssVarsProvider>
                                <Typography
                                    level="body1"
                                >
                                    Age
                                </Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ px: 1 }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 3, }}
                                    Placeholder="From"
                                    type="number"
                                />
                            </Box>
                            <Box sx={{ px: 1 }}  >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 3, }}
                                    Placeholder="To"
                                    type="number"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Checkbox
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                        uncheckedIcon={<FemaleOutlinedIcon />}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Checkbox
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                        uncheckedIcon={<MaleOutlinedIcon />}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default Generic