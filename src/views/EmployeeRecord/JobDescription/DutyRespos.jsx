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

const DutyRespos = () => {
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default DutyRespos