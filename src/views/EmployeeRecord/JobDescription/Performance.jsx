import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SelectBasic from 'src/views/Component/SelectBasic';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import KraItem from './KraItem';

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