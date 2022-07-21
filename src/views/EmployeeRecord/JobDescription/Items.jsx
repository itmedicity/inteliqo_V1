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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Items = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.3, }} >
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
                    <CssVarsProvider>
                        <Checkbox
                            color="primary"
                            size="lg"
                            variant="outlined"
                        />
                    </CssVarsProvider>
                </Paper>
                <Paper square sx={{ display: "flex", px: 0.5, justifyContent: "center", alignItems: "center", width: "100%" }} variant="outlined" >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            asdasdasdasddddd asdasdasdas asdasdasd asdasdasdasd asdasd sdasdasdasdasd
                            asdasdasdasddddd asdasdasdas asdasdasd asdasdasdasd asdasd sdasdasdasdasd
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, }} >
                <IconButton variant="outlined" size='sm' >
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Items