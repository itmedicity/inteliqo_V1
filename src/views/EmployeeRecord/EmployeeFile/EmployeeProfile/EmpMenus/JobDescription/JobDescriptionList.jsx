import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense, } from 'react'
//import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
//import IconButton from '@mui/joy/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
//import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
//import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
//import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//import DesignationMast from 'src/views/CommonCode/DesignationMast';
//import { PayrolMasterContext } from 'src/Context/MasterContext';
//import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
//import TextInput from 'src/views/Component/TextInput';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPersonalData } from 'src/redux/actions/Profile.action';
//import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';

const JobSummary = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobSummaryEmp'));
const DutyRespos = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/DutiesEmp'));
// const Performance = React.lazy(() => import('./JobDescEmpComponent/Jobperformance'));
const Generic = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobGenericEmp'));
const Performance = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/Jobperformance'));
const Competency = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobCompetency'))

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescriptionList = ({ dept_id, designation, flag, sect_id, deptname, desgname }) => {

    const [jobdescview, setJobdescView] = useState(0)
    const [tableview, settableview] = useState(0)
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(setPersonalData(no))
    // }, [no, dispatch])
    const getempData = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })
    //const history = useHistory()
    // const Redirect = () => {
    //     history.push(`/Home/Profile/${id}/${no}`)
    // }
    useEffect(() => {
        const checkData1 = {
            designation: designation,
            dept_id: dept_id,
            sect_id: sect_id
        }
        const checkData2 = {
            designation: getempData.em_designation,
            dept_id: getempData.em_department,
            sect_id: getempData.em_dept_section

        }
        const checkJobDesc = async (checkData2) => {
            const result = await axioslogin.post('/jobsummary/check', checkData2)
            const { success } = result.data
            if (success === 1) {
                setJobdescView(1)
            }
            else {
                setJobdescView(0)
            }
        }
        const checkJobDescTableView = async (checkData1) => {
            const result = await axioslogin.post('/jobsummary/check', checkData1)
            const { success } = result.data
            if (success === 1) {
                settableview(1)
            }
            else {
                settableview(0)
            }
        }
        if (flag === 1) {
            checkJobDescTableView(checkData1)
        }
        else {
            checkJobDesc(checkData2)
        }
    }, [getempData.em_designation, getempData.em_department, getempData.em_dept_section, flag, dept_id, designation])

    const ViewPage = async () => {
        history.push(`/Home/JobDescription`)
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{
                width: "100%",
                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                {/* Main Heading Section Box */}

                <Paper square elevation={2} sx={{ p: 0.5, display: "flex", flexDirection: "row" }}   >
                    <Box sx={{ flex: 1, }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Job Description
                            </Typography>
                        </CssVarsProvider>
                    </Box>

                    {
                        flag === 1 ? <Box sx={{}}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={ViewPage}>
                                    <CloseIcon color='info' />
                                </IconButton>
                            </CssVarsProvider>
                        </Box> : null
                    }
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
                                selectDeptSection={getempData.em_dept_section}
                            />
                        </Suspense>

                        : flag === 1 ?
                            <Suspense fallback={<Progress />} >
                                <JobSummary
                                    selectDesignation={designation}
                                    selectedDept={dept_id}
                                    selectDesignationName={desgname}
                                    selectedDeptName={deptname}
                                    //setJobdescView={setJobdescView}
                                    selectDeptSection={sect_id}
                                />
                            </Suspense> : null
                }
                {/* Duties And Responsiblities */}
                {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <DutyRespos
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense> :
                        <Suspense fallback={<Progress />} >
                            <DutyRespos
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                }

                {/* Job Specification : Performance  */}
                {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Performance
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense> :
                        <Suspense fallback={<Progress />} >
                            <Performance
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                }

                {/* Job Specification : Competency */}
                {

                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Competency
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense>
                        : <Suspense fallback={<Progress />} >
                            <Competency
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                }

                {/* Generic */}
                {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Generic
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense>
                        : <Suspense fallback={<Progress />} >
                            <Generic
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                }

            </Box >
        </Fragment >
    )
}

export default JobDescriptionList