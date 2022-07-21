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

const Performance = () => {
    return (
        <Fragment>

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
                {/* Kra Item List Map */}
                {[1, 2, 3].map((ind) => <KraItem key={ind} />)}
            </Paper>
        </Fragment>
    )
}

export default Performance