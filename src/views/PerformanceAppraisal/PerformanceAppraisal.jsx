import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAccademicData } from 'src/redux/actions/Profile.action';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useHistory } from 'react-router-dom';

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const EmpDetails = React.lazy(() => import('./AppraisalComponents/ExistingEmpDetl'));
const Competency = React.lazy(() => import('./AppraisalComponents/CompetencyAssessment'))
const PerformanceAssessment = React.lazy(() => import('./AppraisalComponents/PerformanceAssessment'))
const Career = React.lazy(() => import('./AppraisalComponents/CareerAdvancement'))

const PerformanceAppraisal = ({ empno, empid, display, show, setFlag, setShow }) => {

    const dispatch = useDispatch();
    const history = useHistory()
    //redux data for showing accedemic details
    useEffect(() => {
        dispatch(setAccademicData(empno))
    }, [empno, dispatch])

    //redirecting to approval hod list
    const redirect = async () => {
        setFlag(0)
        history.push(`/Home/AppraisalApprovalHOD`)
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >

                <Paper variant='outlined' sx={{ px: 3, py: 1 }}>
                    <Paper square variant='outlined' elevation={0} sx={{
                        display: "flex",
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Perfomance Appraisal
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 0 }} >
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={redirect}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Suspense fallback={<Progress />} >
                            <EmpDetails
                                empno={empno}
                                display={display}
                            />
                        </Suspense>

                        {/* Performance AssessmentDetails */}
                        <PerformanceAssessment
                            empid={empid}
                        />

                        {/* Competency Assessment */}
                        <Competency
                            empid={empid}
                        />
                        {/* career advancement */}
                        {
                            display === 1 ? null : <Career
                                empid={empid}
                                show={show}
                            />
                        }

                    </Paper>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(PerformanceAppraisal)