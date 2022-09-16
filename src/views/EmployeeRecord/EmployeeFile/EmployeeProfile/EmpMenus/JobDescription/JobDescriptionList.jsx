import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense, useContext } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DesignationMast from 'src/views/CommonCode/DesignationMast';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from 'src/views/Component/TextInput';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';

const JobSummary = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobSummaryEmp'));
const DutyRespos = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/DutiesEmp'));
// const Performance = React.lazy(() => import('./JobDescEmpComponent/Jobperformance'));
const Generic = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobGenericEmp'));

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescriptionList = () => {

    const [jobdescview, setJobdescView] = useState(0)
    const { id, no } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPersonalData(no))
    }, [no])
    const getempData = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })
    const history = useHistory()
    const Redirect = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    useEffect(() => {
        const checkJobDesc = async () => {
            const checkData = {
                designation: getempData.em_designation,
                dept_id: getempData.em_department
            }
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                setJobdescView(1)
            }
            else {
                setJobdescView(0)
            }

        }
        checkJobDesc(0)
    }, [getempData.em_designation, getempData.em_department])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                {/* Main Heading Section Box */}

                <Paper square elevation={3} sx={{
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
                </Paper>
                <Paper square elevation={3} sx={{
                    p: 0.5,
                    mt: 0.5,
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    // backgroundColor: "lightcyan"
                }} >
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            name="department"
                            disabled={true}
                            value={getempData.dept_name}
                        />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}  >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            name="designation"
                            disabled={true}
                            value={getempData.desg_name}
                        />
                    </Box>
                </Paper>
                {/* Job Summary */}
                {
                    jobdescview > 0 ?
                        <Suspense fallback={<Progress />} >
                            <JobSummary
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                                selectDesignationName={getempData.desg_name}
                                selectedDeptName={getempData.dept_name}
                                setJobdescView={setJobdescView}
                            />
                        </Suspense>

                        : null
                }
                {/* Duties And Responsiblities */}
                {/* {
                    jobdescview > 0 ?
                        <Suspense fallback={<Progress />} >
                            <DutyRespos
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />

                        </Suspense>
                        : null

                } */}

                {/* Generic */}
                {
                    jobdescview > 0 ?
                        <Suspense fallback={<Progress />} >
                            <Generic
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                        : null
                }

            </Box >
        </Fragment >
    )
}

export default JobDescriptionList