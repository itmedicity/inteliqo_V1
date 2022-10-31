import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper, Tooltip } from '@mui/material'
import React, { Fragment, Suspense, useContext, memo } from 'react'
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
import Competency from './Competency';
import { axioslogin } from 'src/views/Axios/Axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'

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
        selectedDept, updateSelected,
        selectDesignationName, selectedDeptName,
        selectDeptSection, updateDepartmentSection,
    } = useContext(PayrolMasterContext)
    const [jobview, setjobview] = useState(0)//use sate job description view
    const [jobedit, setjobEdit] = useState(0)

    /** checkdata for checking department , dept section and designation */
    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }

    /** checking department , dept section and designation already exist in jobsummary database table */
    const addtojobSummary = async () => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                infoNofity("Job Description Already Added for This Designation and Department")
                setjobEdit(summary_slno)
            }
            else {
                setjobview(1)
                setjobEdit(0)
            }
        }
        else {

            infoNofity("Choose All Option")
        }
    }
    const history = useHistory()
    const Redirect = async () => {
        history.push(`/Home`)
    }
    const ViewPage = async () => {
        history.push(`/Home/JobDescriptionViewTable`)
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
                        <Tooltip title="Job Description View" followCursor placement='top' arrow >
                            <Box>
                                <IconButton variant="outlined" size='sm' onClick={ViewPage} sx={{ color: 'primary' }}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>
                        </Tooltip>
                        <Box sx={{ pl: 1 }}>
                            <IconButton variant="outlined" size='sm' onClick={Redirect} sx={{ color: 'red' }}>
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
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <DepartmentSectionSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}  >
                            <DesignationMast style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 0, px: 0.5 }} >
                            <IconButton variant="outlined" size='sm' onClick={addtojobSummary} sx={{ color: 'blue' }}>
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                    {/* Job Summary */}
                    <Suspense fallback={<Progress />} >
                        <JobSummary
                            jobview={jobview}
                            jobedit={jobedit}
                            selectDesignationName={selectDesignationName}
                            selectedDeptName={selectedDeptName}
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            selectDeptSection={selectDeptSection}
                        />
                    </Suspense>
                    {/* Dutieds And Responsibilities */}
                    <Suspense fallback={<Progress />} >
                        <DutyRespos
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            jobedit={jobedit}
                            selectDeptSection={selectDeptSection}
                            setjobEdit={setjobEdit}
                        />

                    </Suspense>

                    {/* Job Specification : Performance */}
                    <Suspense fallback={<Progress />} >
                        <Performance
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            jobedit={jobedit}
                            selectDeptSection={selectDeptSection}
                        />
                        {/* <Competency /> */}
                    </Suspense>


                    <Suspense fallback={<Progress />} >
                        <Competency
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            jobedit={jobedit}
                            selectDeptSection={selectDeptSection}
                        />


                        {/* <Competency /> */}
                    </Suspense>

                    {/* Generic */}
                    <Suspense fallback={<Progress />} >
                        <Generic
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            jobedit={jobedit}
                            selectDeptSection={selectDeptSection}
                        />
                    </Suspense>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(JobDescription)