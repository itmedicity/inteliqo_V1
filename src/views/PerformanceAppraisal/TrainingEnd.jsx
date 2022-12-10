import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { errorNofity, infoNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from '../Component/CommonAgGrid';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CommonCheckBox from '../Component/CommonCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CompanyChange from './CompanyChange';
import { setDept } from 'src/redux/actions/Dept.Action';
import { ToastContainer } from 'react-toastify';
import { CheckIdExists, InsertAppraisal, UpdateAppraisal } from './AppraisalFunctions';
import Moment from 'react-moment';

const TrainingEnd = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    const [appraisal, setappraisal] = useState(false)
    const [empno, setempno] = useState(0)
    const [flag, setFlag] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [display, setdisplay] = useState(0)
    const [name, setname] = useState('')

    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        dispatch(setDept())
    }, [dispatch])

    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id', filter: true, filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', filter: true },
        { headerName: 'Designation ', field: 'desg_name', },
        { headerName: 'Date of joining ', field: 'em_doj', },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Training End Date', field: 'training_end', },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Contract Confirmation" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <TaskAltRoundedIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => toAppraisal(params)}>
                            <AssignmentTurnedInIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setappraisal(true)
        }
        else {
            setappraisal(false)
        }
    })
    /** list training end employees, 3 month & 6 month */
    useEffect(() => {
        const trainingEndList = async () => {
            const result = await axioslogin.get('/Performance/trainingdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        trainingEndList()
    }, [])

    //direct contract confirmation process
    const addtoProcess = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { em_no, em_id, em_name } = data[0]
        setEmpid(em_id)
        setempno(em_no)
        setname(em_name)
    }, [])

    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    useEffect(() => {
        if (empCate.some(key => key.des_type === 2)) {
            setdisplay(1)
        }
    }, [empCate])

    //appraisal

    const [inCharge, setIncharge] = useState(0)
    const [hod, setHod] = useState(0)
    const [empFlag, setEmpFlag] = useState(0)
    const [empdetl, setEmpdetl] = useState([])


    const toAppraisal = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setEmpdetl(data)
        const { sect_id, hod, incharge, em_no, em_id, dept_id, } = data[0]

        const getAuthorizationDetails = async (postData) => {
            const result = await axioslogin.post('/authorization/details', postData)
            const { data, success, message } = result.data
            if (success === 1 && data.length !== 0) {
                console.log(data);

                // const a = data.map((val) => {
                //     let obj = { inCharge: 0, hod: 0 }
                //     if (val.auth_post === 2) {
                //         //let obj = { ...obj, inCharge: val.emp_id, hod: 0 }
                //         return { ...obj, inCharge: val.emp_id, hod: 0 }
                //     } else if (val.auth_post === 1) {
                //         //let obj = { ...obj, inCharge: 0, hod: val.emp_id }
                //         return { ...obj, inCharge: 0, hod: val.emp_id }
                //     }
                // })
                // console.log(a);

                // const a = data.map((val) => {
                //     let obj = { inCharge: 0 }
                //     let obj1 = { hod: 0 }
                //     if (val.auth_post === 2) {
                //         return { ...obj, inCharge: val.emp_id }
                //     }
                //     else if (val.auth_post === 1) {
                //         //let obj = { ...obj, inCharge: 0, hod: val.emp_id }
                //         return { ...obj1, hod: val.emp_id }
                //     }
                // })
                // console.log(a);

                // const f = a.filter((val) => {
                //     console.log(val);
                //     return { ...val, val }
                // })
                // console.log(f);

                const a = data.map((val) => {
                    let obj = { inCharge: 0, hod: 0 }
                    if (val.auth_post === 2) {
                        return { ...obj, inCharge: val.emp_id, hod: 0 }
                    }
                    else if (val.auth_post === 1) {
                        //let obj = { ...obj, inCharge: 0, hod: val.emp_id }
                        return { ...obj, hod: val.emp_id, inCharge: 0 }
                    }
                })

                a.map((val) => {
                    const { hod, inCharge } = val
                    const checkid = {
                        sect_id: sect_id
                    }

                    const submitData = {
                        em_id: em_id,
                        em_no: em_no,
                        dept_id: dept_id,
                        sect_id: sect_id,
                        incharge_id: inCharge,
                        hod_id: hod,
                        ceo_id: 0
                    }

                    CheckIdExists(checkid).then((values) => {
                        const { status } = values
                        if (status === 1) {
                            console.log("not exist");
                            InsertAppraisal(submitData).then((values) => {
                                const { status, message } = values
                                if (status === 1) {
                                    succesNofity(message)
                                } else {
                                    warningNofity(message)
                                }
                            })
                        } else {
                            infoNofity("Already submitted to appraisal")
                        }
                    })
                })

                // data.find((val) => {
                //     if (val.auth_post === 2) {
                //         const { emp_id } = val
                //         setIncharge(emp_id)
                //     }
                //     else if (val.auth_post === 1) {
                //         const { emp_id } = val
                //         setHod(emp_id)
                //     }
                // })

            } else if (success === 1 && data.length === 0) {
                warningNofity("No Authorization for this Department!")
            } else {
                warningNofity(message)
            }
        }
        if (sect_id !== 0 && hod === 0 && incharge === 0) {
            setEmpFlag(1)
            const postData = {
                dept_section: sect_id
            }
            getAuthorizationDetails(postData)
        }
        else {

        }
    }, [])

    // useEffect(() => {
    //     if (empFlag === 1) {
    //         console.log(inCharge, hod);
    //         const { em_no, em_id, dept_id, sect_id } = empdetl[0]
    //         const submitData = {
    //             em_id: em_id,
    //             em_no: em_no,
    //             dept_id: dept_id,
    //             sect_id: sect_id,
    //             incharge_id: inCharge,
    //             hod_id: hod,
    //             ceo_id: 0
    //         }
    //         console.log(submitData);

    //         const checkid = {
    //             sect_id: sect_id
    //         }

    //         CheckIdExists(checkid).then((values) => {
    //             const { status } = values
    //             if (status === 1) {
    //                 console.log("not exist");
    //                 InsertAppraisal(submitData).then((values) => {
    //                     const { status, message } = values
    //                     if (status === 1) {
    //                         succesNofity(message)
    //                     } else {
    //                         warningNofity(message)
    //                     }
    //                 })
    //             } else {
    //                 infoNofity("Already submitted to appraisal")
    //             }
    //         })
    //     }
    // }, [inCharge, hod])



    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno} display={display} name={name} /> : <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Paper square elevation={3} sx={{
                            display: "flex",
                            p: 1,
                            alignItems: "center",
                        }}  >
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Training End List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' color="danger" onClick={RedirectToHome}>
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            alignItems: "center",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        }} >
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }}>
                                <Box sx={{ display: "flex", p: 2 }}>
                                    <CommonCheckBox
                                        name="appraisal"
                                        value={appraisal}
                                        checked={appraisal}
                                        onChange={(e) => getValue2(e)}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", p: 1, pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography>
                                            Appraisal Pending
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", }}>
                                <Box sx={{ display: "flex", p: 1, }}>
                                    <CssVarsProvider>
                                        <IconButton variant="outlined" size='sm' color="primary" onClick={RedirectToHome}>
                                            <AddTaskIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", p: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography>
                                            Submit All
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            {
                                appraisal === true ? null : <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={tableData}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            }
                        </Paper>
                    </Paper>
                }
            </Box>
        </Fragment>
    )
}

export default TrainingEnd