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

const KraItem = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
            <Box sx={{ flex: 0, pr: 0.2 }} >
                <IconButton variant="outlined" size='sm' >
                    <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                </IconButton>
            </Box>
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
            <Box sx={{ flex: 0, px: 0.5 }} >
                <DeleteOutlinedIcon color='error' />
            </Box>

        </Box>
    )
}

export default KraItem