import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const JobSummary = React.lazy(() => import('./JobSummary'));
const DutyRespos = React.lazy(() => import('./DutyRespos'));
const Performance = React.lazy(() => import('./Performance'));
const Generic = React.lazy(() => import('./Generic'));

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescription = () => {

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {/* Outer Main Box */}
                <Paper square elevation={2} sx={{ p: 0.5, }}   >

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

                    {/* Job Summary */}
                    <Suspense fallback={<Progress />} >
                        <JobSummary />
                    </Suspense>

                    {/* Dutieds And Responsibilities */}
                    <Suspense fallback={<Progress />} >
                        <DutyRespos />
                    </Suspense>

                    {/* Job Specification : Performance & Competency */}
                    <Suspense fallback={<Progress />} >
                        <Performance />
                    </Suspense>

                    {/* Generic */}
                    <Suspense fallback={<Progress />} >
                        <Generic />
                    </Suspense>


                    <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: 1, alignItems: "center" }} >
                        <Paper square sx={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }} elevation={0} >

                            <Box sx={{ display: "flex", flex: 3, px: 1, alignItems: "center" }} >
                                <Box sx={{ px: 0.3 }} >
                                    <IconButton variant="outlined" size='sm'>
                                        <AddToPhotosIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ px: 0.3 }}>
                                    <IconButton variant="outlined" size='sm'>
                                        <ViewCompactAltOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ px: 0.3 }}>
                                    <IconButton variant="outlined" size='sm'>
                                        <CancelOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                </Paper>
            </Box>
        </Fragment >
    )
}

export default JobDescription