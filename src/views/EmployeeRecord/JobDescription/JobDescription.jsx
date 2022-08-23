import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense, useContext } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import DesignationMast from 'src/views/CommonCode/DesignationMast';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    const { selectDesignation, updateDesignation,
        selectedDept, updateSelected, selectDesignationName, selectedDeptName
    } = useContext(PayrolMasterContext)
    const [jobview, setjobview] = useState(0)
    const addtojobSummary = async () => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            setjobview(1)
        }
        else {

            infoNofity("Choose All Option")
        }
    }
    const history = useHistory()
    const Redirect = async () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <ToastContainer />
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
                            <IconButton variant="outlined" size='sm' onClick={Redirect}>
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
                            <DesignationMast style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 0, px: 0.5 }} >
                            <IconButton variant="outlined" size='sm' onClick={addtojobSummary}>
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                    {/* Job Summary */}
                    <Suspense fallback={<Progress />} >
                        <JobSummary
                            jobview={jobview}
                            selectDesignationName={selectDesignationName}
                            selectedDeptName={selectedDeptName}
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                        />
                    </Suspense>
                    {/* Dutieds And Responsibilities */}
                    <Suspense fallback={<Progress />} >
                        <DutyRespos
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                        />

                    </Suspense>

                    {/* Job Specification : Performance & Competency */}
                    <Suspense fallback={<Progress />} >
                        <Performance
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                        />
                    </Suspense>

                    {/* Generic */}
                    <Suspense fallback={<Progress />} >
                        <Generic
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                        />
                    </Suspense>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default JobDescription