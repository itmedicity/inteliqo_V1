import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Button, CircularProgress, Paper, TextareaAutosize } from '@mui/material';
import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompAssesment, getPerformanceAssesment } from 'src/redux/actions/Appraisal.Action'
import { setAccademicData } from 'src/redux/actions/Profile.action'
import ExistingEmpDetl from '../AppraisalComponents/ExistingEmpDetl'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CheckIdExists, CreateEmployeeRemak, UpdateEmployeeDetl, updateEmpstatus } from '../AppraisalFunctions'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios';


const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const Comp = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/CompetencyViewTable'))
const Perform = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/PerformanceViewTable'))

const SelfApproval = () => {

    const dispatch = useDispatch();
    const [display, setDisplay] = useState(0)
    const [self_comment, setSelf_comment] = useState('')
    const [flag, setFlag] = useState(0)// for diable button after click

    //to get typed comments of employee
    const getdata = async (e) => {
        setSelf_comment(e.target.value)
    }

    //login employee details
    const login = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
    })
    const { hod, incharge, em_id, em_no } = login

    useEffect(() => {
        const getdata = async () => {
            const result = await axioslogin.get(`/Performance/empstatus/detil/${em_id}`)
            const { success } = result.data
            if (success === 1) {
                setFlag(1)
            } else {
                setFlag(0)
            }
        }
        getdata()
    }, [em_id])

    //dispatch for employee accademic detls, competency, performnace
    useEffect(() => {
        dispatch(setAccademicData(em_no))
        dispatch(getPerformanceAssesment(em_id))
        dispatch(getCompAssesment(em_id))
    }, [em_no, em_id, dispatch])

    //setting display=1--> do not display last appraisal date & salary for employee
    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            setDisplay(1)
        } else {
            setDisplay(0)
        }
    }, [hod, incharge])

    const submitEmpApproval = async () => {
        if (self_comment === '') {
            infoNofity("Please Add Remarks")
        } else {
            const checkid = {
                em_id: em_id
            }
            const result = await axioslogin.get(`/Performance/check/careerEmpid/${em_id}`)
            const { success } = result.data
            if (success === 1) {
                const postData = {
                    employee_comment: self_comment,
                    employee_status: 1,
                    em_id: em_id
                }
                updateEmpstatus(postData).then((values) => {
                    const { Status } = values
                    if (Status === 1) {
                        // const result = await axioslogin.patch('/Performance/update/career/empstatus', postData)
                        // const { success, message } = result.data
                        UpdateEmployeeDetl(postData).then((values) => {
                            const { status } = values
                            if (status === 1) {
                                CheckIdExists(checkid).then((values) => {
                                    const { status, data } = values
                                    if (status === 0) {
                                        //after submitting data setting a state to disable button
                                        const { employee_status } = data[0]
                                        if (employee_status === 1) {
                                            setFlag(1)
                                            succesNofity('Appraisal Approved Successfully')
                                            setSelf_comment('')
                                        }
                                    } else {
                                        setFlag(0)
                                    }
                                })
                            }
                            else {
                                errorNofity("Error While Submitting")
                            }
                        })
                    } else {
                        errorNofity("Error While Submitting")
                    }
                })


            } else {
                const checkid = {
                    em_id: em_id
                }
                const postData = {
                    employee_comment: self_comment,
                    employee_status: 1,
                    em_id: em_id
                }
                //updating employee status on hrm_perfomance_apprsl table
                updateEmpstatus(postData).then((values) => {
                    const { Status } = values
                    if (Status === 1) {
                        //adding remark to hrm_performance_career_advancement
                        CreateEmployeeRemak(postData).then((values) => {
                            const { status, message } = values
                            if (status === 1) {
                                CheckIdExists(checkid).then((values) => {
                                    const { status, data } = values
                                    if (status === 0) {
                                        //after submitting data setting a state to disable button
                                        const { employee_status } = data[0]
                                        if (employee_status === 1) {
                                            setFlag(1)
                                            succesNofity(message)
                                            setSelf_comment('')
                                        }
                                    } else {
                                        setFlag(0)
                                    }
                                })
                            } else {
                                errorNofity(message)
                            }
                        })
                    } else {
                        errorNofity("error while submitting")
                    }
                })
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Paper square variant='outlined' sx={{
                display: "flex",
                flexDirection: 'column',
                width: '100%'
            }}>
                <ExistingEmpDetl
                    empno={em_no}
                    display={display}
                />
                <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Perfomance Assessment
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>

                <Suspense fallback={<Progress />} >
                    <Perform />
                </Suspense>

                <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Competency Assessment
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>

                <Suspense fallback={<Progress />} >
                    <Comp />
                </Suspense>

                <Paper square variant='outlined' sx={{ display: "flex" }}  >
                    <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Appraisee awareness about Appraisal
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square variant='outlined' sx={{ display: "flex", flexDirection: 'column' }}  >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Paper elevation={0} sx={{ display: "flex", pl: 5, pt: 1, justifyContent: "center" }}  >
                            <CssVarsProvider>
                                <Typography level="body1" > Remarks</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={2}
                                placeholder="Remarks"
                                name="self_comment"
                                value={self_comment}
                                onChange={(e) => getdata(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', py: 2 }}>
                        <Box sx={{ height: 35, pl: 5 }} >
                            <CssVarsProvider>
                                <Typography sx={{ display: 'flex', }} >
                                    I am aware of my ratings and comments in the appraisal
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Button variant="outlined"
                                size="small"
                                disabled={flag === 1 ? true : false}
                                onClick={submitEmpApproval}>
                                Agree
                            </Button>
                        </Box>
                    </Box>

                </Paper>
            </Paper>
        </Fragment>
    )
}

export default memo(SelfApproval) 