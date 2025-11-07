import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, CircularProgress, Paper, Tooltip } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { pdfdownlod } from './AppraisalPDF';
import { CheckIdExists, getexistDetails } from '../AppraisalFunctions';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
// import { urlExist } from 'src/views/Constant/Constant';
// import { PUBLIC_NAS_FOLDER, } from 'src/views/Constant/Static';
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};
const Comp = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/CompetencyViewTable'))
const Perform = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/PerformanceViewTable'))
const GradeTable = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/PerformanceGradeScale'))


const AppraisalView = ({ empno, empid, setAppraisalview, loginData }) => {

    const [formdata, setformdata] = useState({
        name: '',
        department_name: '',
        designation_name: '',
        salary: '',
        date_of_joining: '',
        emp_id: '',
        experience: '',
        appraisal_date: '',
        section_name: ''
    })
    const [Performance, setPerfromance] = useState([])
    const [given_score, setGiven_score] = useState(0)
    const [grade, setGrade] = useState('')
    const [description, setDescription] = useState('')
    const [perfscore, setPerfScore] = useState(0)
    const [max_score, setMax_score] = useState(0)
    const [compData, setCompdata] = useState([])
    const [traininData, setTrainingData] = useState([])
    const [src, setSrc] = useState(ProfilePicDefault)
    const [hodid, sethodId] = useState(0)
    const [inchargeid, setinchargeId] = useState(0)
    const [ceoId, setceoId] = useState(0)
    const [inchargesig, setinchargesig] = useState(ProfilePicDefault)
    const [hodsig, sethodsig] = useState(ProfilePicDefault)
    const [ceosig, setceosig] = useState(ProfilePicDefault)
    const [hrsig, sethrSig] = useState(ProfilePicDefault)
    const [ceo_date, setCeo_date] = useState('')
    const [hod_date, sethod_date] = useState('')
    const [incharge_date, setincharge_date] = useState('')
    const [hrdate, sethr_date] = useState('')
    const [incharge_name, setinchargname] = useState('')
    const [hod_name, sethodname] = useState('')
    const [ceo_name, setCeoname] = useState('')
    const [designation, setDesignation] = useState({})

    const emp_no = useMemo(() => empno, [empno])
    const emp_id = useMemo(() => empid, [empid])

    const RedirectToHome = () => {
        setAppraisalview(0)
        //history.push(`/Home`)
    }
    //to get employee accademic detls
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp?.empAcademicData?.academicData;
    })
    //to get last qualification of employee
    const lastdata = state.slice(-1)

    const checkid = useMemo(() => {
        return {
            em_id: emp_id
        }
    }, [emp_id])

    useEffect(() => {
        CheckIdExists(checkid).then((values) => {
            const { status, data } = values
            if (status === 0) {
                const { hod_id, incharge_id, ceo_id, ceo_appraisal_time,
                    hod_apprasial_date, incharge_appraisal_date, create_date,
                    ceo_name, hod_name, incahrge_name, ceo_desg, hod_desg,
                    incharge_desg
                } = data[0]
                const desg = {
                    ceo_desg: ceo_desg,
                    hod_desg: hod_desg,
                    incharge_desg: incharge_desg
                }
                setDesignation(desg)

                //const day1 = format(new Date(ceo_appraisal_time), 'EEEE')
                //const value = new Date(ceo_appraisal_time)
                setCeo_date(ceo_appraisal_time)
                setincharge_date(incharge_appraisal_date)
                sethod_date(hod_apprasial_date)
                sethr_date(create_date)
                setinchargeId(incharge_id)
                sethodId(hod_id)
                setceoId(ceo_id)
                setinchargname(incahrge_name)
                sethodname(hod_name)
                setCeoname(ceo_name)
            } else {
                setinchargeId(0)
                sethodId(0)
                setceoId(0)
            }
        })
    }, [checkid])


    useEffect(() => {
        getexistDetails(emp_no).then((values) => {
            const { status, data } = values
            if (status === 1) {
                const { em_id, em_name, dept_name, sect_name, desg_name,
                    em_doj, em_amount, exp_year, last_appraisal_date } = data[0]
                const formdata = {
                    emp_id: em_id === null ? "NIL" : em_id,
                    name: em_name === null ? 'NIL' : em_name,
                    department_name: dept_name === null ? 'NIL' : dept_name,
                    section_name: sect_name === null ? 'NIL' : sect_name,
                    designation_name: desg_name === null ? 'NIL' : desg_name,
                    date_of_joining: em_doj === null ? 'NIL' : em_doj,
                    salary: em_amount === null ? 'NIL' : em_amount,
                    experience: exp_year === null ? 'NIL' : exp_year,
                    appraisal_date: last_appraisal_date === null ? 'NIL' : last_appraisal_date
                }
                setformdata(formdata)

            } else {
                warningNofity('There is no data')
            }
        })
        const getData = async () => {
            const result = await axioslogin.get(`/Performance/Perfdata/${emp_id}`)
            const { data, success } = result.data
            if (success === 0) {
                setPerfromance([])
            } else {
                setPerfromance(data)
            }
        }
        getData(emp_id)
        const ScoreDetls = async () => {
            const result = await axioslogin.get(`/Performance/Score/details/${emp_id}`)
            const { data, success } = result.data
            if (success === 1) {
                const { given_score, performance_score, performance_grade, performance_category, max_score } = data[0]
                setMax_score(max_score === null ? 0 : max_score)
                setGiven_score(given_score === null ? 0 : given_score)
                setPerfScore(performance_score === null ? 0 : performance_score)
                setGrade(performance_grade === null ? 'NIL' : performance_grade)
                setDescription(performance_category === null ? 'NIL' : performance_category)
            } else {
                setMax_score(0)
                setGiven_score(0)
                setPerfScore(0)
                setGrade('NIL')
                setDescription('NIL')
            }
        }
        ScoreDetls(emp_id)
        const getCompData = async () => {
            const result = await axioslogin.get(`/Performance/getAll/compt/${emp_id}`)
            const { data, success } = result.data
            if (success === 0) {
                setCompdata([])
            } else {
                setCompdata(data)
            }
        }
        getCompData()

        const getTrainingData = async () => {
            const result = await axioslogin.get(`/Performance/trainingneed/${emp_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setTrainingData(data)
            } else {
                setTrainingData([])
            }
        }
        getTrainingData()
    }, [emp_no, emp_id])


    // useEffect(() => {
    //     const hr_id = loginData.em_id
    //     const getEmployeeSig = async () => {
    //         if (emp_id > 0) {
    //             const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + emp_id}/signature/signature.jpg`);
    //             urlExist(profilePic, (status) => {
    //                 if (status === true) {
    //                     const picUrl = JSON.parse(profilePic)
    //                     setSrc(picUrl)
    //                 } else {
    //                     setSrc(ProfilePicDefault)
    //                 }
    //             })
    //         }
    //     }
    //     getEmployeeSig()
    //     const getInchargeSig = async () => {
    //         if (inchargeid > 0) {
    //             const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + inchargeid}/signature/signature.jpg`);
    //             urlExist(profilePic, (status) => {
    //                 if (status === true) {
    //                     const picUrl = JSON.parse(profilePic)
    //                     setinchargesig(picUrl)
    //                 }
    //                 else {
    //                     setinchargesig(ProfilePicDefault)
    //                 }
    //             })
    //         }
    //     }
    //     getInchargeSig()

    //     const gethodSig = async () => {
    //         if (hodid > 0) {
    //             const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + hodid}/signature/signature.jpg`);
    //             urlExist(profilePic, (status) => {
    //                 if (status === true) {
    //                     const picUrl = JSON.parse(profilePic)
    //                     sethodsig(picUrl)
    //                 } else {
    //                     sethodsig(ProfilePicDefault)
    //                 }
    //             })
    //         }
    //     }
    //     gethodSig()

    //     const getHrdSig = async () => {
    //         if (hr_id > 0) {
    //             const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + hr_id}/signature/signature.jpg`);
    //             urlExist(profilePic, (status) => {
    //                 if (status === true) {
    //                     const picUrl = JSON.parse(profilePic)
    //                     sethrSig(picUrl)
    //                 } else {
    //                     sethrSig(ProfilePicDefault)
    //                 }
    //             })
    //         }
    //     }
    //     getHrdSig()

    //     const getCeoSignaure = async () => {
    //         if (ceoId !== 0) {
    //             const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ceoId}/signature/signature.jpg`);
    //             urlExist(profilePic, (status) => {
    //                 if (status === true) {
    //                     const picUrl = JSON.parse(profilePic)
    //                     setceosig(picUrl)
    //                 } else {
    //                     setceosig(ProfilePicDefault)
    //                 }
    //             })
    //         }
    //     }
    //     getCeoSignaure()
    // }, [emp_id, inchargeid, hodid, ceoId, loginData.em_id])

    const download = async () => {
        pdfdownlod(formdata, Performance, given_score,
            max_score, perfscore,
            grade, description, compData, traininData, lastdata,
            src, inchargesig, hodsig, ceosig, ceo_date,
            hod_date, incharge_date, hrdate,
            ceo_name, hod_name, incharge_name, hrsig, loginData, designation)
    }

    return (
        <Fragment>

            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Employee Appraisal View
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Tooltip title="Download as PDF" followCursor placement='top' arrow >
                            <Box>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' sx={{ color: 'blue' }}
                                        onClick={download}
                                    >
                                        <DownloadForOfflineIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip >
                        <Box sx={{ pl: 1 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={RedirectToHome}>
                                    <CloseIcon color="danger" />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                </Paper>

                <Paper square sx={{ px: 3, display: "flex", flexDirection: "column" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Name</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.name}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Emp. ID</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderTop={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.emp_id}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box borderLeft={1} borderRight={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, fontWeight: 500, justifyContent: "left", backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Department</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.department_name}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderLeft={1} sx={{ display: "flex", flex: 1, px: 0.5, fontWeight: 500, justifyContent: "left", backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Department Section</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.section_name}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box borderLeft={1} borderRight={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Designation</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.designation_name}</Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Qualification</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                            {
                                lastdata && lastdata.map((id, index) => {
                                    return <Box key={index}>
                                        <CssVarsProvider >
                                            <Typography textColor="text.secondary">
                                                {id.cour_desc}-{id.spec_desc}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                })
                            }
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Previous Exp in Years</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                            <CssVarsProvider>
                                <Typography level="body1">{formdata.experience}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderLeft={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, backgroundColor: '#eeeeee' }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Date of Joining</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                            <CssVarsProvider>
                                <Typography level="body1">{formdata.date_of_joining} </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box borderLeft={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Present Salary Rs.</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderLeft={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {formdata.salary}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderLeft={1} borderBottom={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1">Date of Last Appraisal</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderLeft={1} borderBottom={1} borderRight={1} sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1">{formdata.appraisal_date}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>

                <Paper square elevation={0} sx={{ px: 3, display: "flex", flexDirection: "column" }} >
                    <Box sx={{ display: "flex", width: "100%", pt: 2 }} >
                        <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" sx={{ textDecoration: 'underline' }}>RATING SCALE:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1" > (5) Exceptionally Meets the Indicator, (4) Satisfactorily Meets the Indicastor, (3) Partially Meets the Indicator, (2) Require Assistance to Meet the Indicator, (1) Fails to Meet the Indicator.</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
                <Paper square sx={{
                    px: 2, display: "flex", flexDirection: "column", pt: 2,
                    //backgroundColor: "lightcoral" 
                }}
                >
                    <Box borderLeft={1} borderRight={1} borderTop={1} sx={{ display: "flex", backgroundColor: '#eeeeee', ml: 1, mr: 1, justifyContent: 'center' }} >
                        <CssVarsProvider>
                            <Typography level="body1" >Performance Assessment</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Suspense fallback={<Progress />} >
                        <Perform />
                    </Suspense>
                </Paper>


                <Paper square sx={{ display: "flex", flexDirection: "column", pt: 2, }} >
                    <Box borderLeft={1} borderRight={1} borderTop={1} sx={{ display: "flex", backgroundColor: '#eeeeee', ml: 3, mr: 3, justifyContent: 'center' }} >
                        <CssVarsProvider>
                            <Typography level="body1" >Performance Grade Scale</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Suspense fallback={<Progress />} >
                        <GradeTable />
                    </Suspense>

                </Paper>





                <Paper square sx={{ display: "flex", flexDirection: "column", pt: 2, px: 5 }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Max score</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 3, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> :{max_score}</Typography>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Score</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 3, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> :{given_score}</Typography>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Performance Score</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 3, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> :{perfscore}</Typography>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Performance Grade</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 3, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> :{grade}</Typography>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1"> Category</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 3, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> :{description}</Typography>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ px: 3, display: "flex", flexDirection: "column" }} >
                    <Box sx={{ display: "flex", width: "100%", pt: 2 }} >
                        <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" sx={{ textDecoration: 'underline' }}>RATING SCALE:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1" > (4) Very Competent to Perform independently and drive others to perform, (3) Competenet & can perform independently, (2) Require Assistance to perform independently, (1) Not competent enough to perform task.</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ px: 3, display: "flex", flexDirection: "column", pt: 1 }} >
                    <Box borderLeft={1} borderRight={1} borderTop={1} sx={{ display: "flex", backgroundColor: '#eeeeee', ml: 1, mr: 1, justifyContent: 'center' }} >
                        <CssVarsProvider>
                            <Typography level="body1" >Competency Assessment</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Suspense fallback={<Progress />} >
                        <Comp />
                    </Suspense>
                </Paper>

                <Paper square elevation={0} sx={{ px: 3, display: "flex", flexDirection: "column" }} >
                    <Box sx={{ display: "flex", width: "100%", pt: 2 }} >
                        <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" sx={{ textDecoration: 'underline' }}>Training Requirement:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1" > Staffs with 1 & 2 comptence levels should be considered for training</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>


                <Paper square elevation={0} sx={{ px: 3, display: "flex", flexDirection: "column", pt: 1 }} >

                    <Box borderLeft={1} borderRight={1} borderTop={1} sx={{ display: "flex", backgroundColor: '#eeeeee', ml: 1, mr: 1, justifyContent: 'center' }} >
                        <CssVarsProvider>
                            <Typography level="body1" >Competency Assessment</Typography>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", px: 1, width: '100%', }}>
                        <Box border={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flex: 1 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Areas
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flex: 1 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Expected Competency
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>


                    {
                        traininData && traininData.map((val, index) => {
                            return <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}
                                key={index}>
                                <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ display: "flex", height: 'auto', flex: 1, pl: 1 }} >
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary">
                                            {val.kra_desc}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", height: 'auto', flex: 1, pl: 1 }} >
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary">
                                            {val.competency_desc}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        })
                    }

                </Paper>



            </Box>






            {/* <Paper square elevation={0} sx={{ p: 0.5, }}> */}








            {/* </Paper> */}
        </Fragment >
    )
}

export default AppraisalView