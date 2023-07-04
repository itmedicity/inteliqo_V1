
import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import CompanyChange from './CompanyChange';
import { useSelector } from 'react-redux';
import { CheckIdExists, InsertAppraisal } from './AppraisalFunctions';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommonAgGrid from '../Component/CommonAgGrid';
import DownloadIcon from '@mui/icons-material/Download';
import { ProbationExcel } from '../Payroll/AttendanceUpdation/ExportToExcel';

const ProbationEnd = () => {

    const history = useHistory()
    const [tableData, setTableData] = useState([]);
    const [empno, setempno] = useState(0)
    const [flag, setFlag] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [display, setdisplay] = useState(0)
    const [name, setname] = useState('')
    const [count, setCount] = useState(0)
    const today = moment(new Date).format('YYYY-MM-DD')

    /** back to home page */
    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    /** list of probation end employees */
    useEffect(() => {
        const aprobationEndList = async () => {
            const result = await axioslogin.get('/Performance/list')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else if (success === 0) {
                setTableData([])
            }
        }
        aprobationEndList()
    }, [count])

    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    useEffect(() => {
        if (empCate.some(key => key.des_type === 1)) {
            setdisplay(2)
        }
    }, [empCate])

    const [columnDef] = useState([
        // { headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 50, filter: true },
        { headerName: 'Emp ID# ', field: 'em_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 100 },
        { headerName: 'Department ', field: 'dept_name', filter: true, minWidth: 100 },
        { headerName: 'Department Section ', field: 'sect_name', filter: true, minWidth: 100 },
        { headerName: 'Designation ', field: 'desg_name', minWidth: 100 },
        { headerName: 'Date of joining ', field: 'em_doj', minWidth: 100 },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Probation End ', field: 'em_prob_end_date', minWidth: 100 },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Contract Confirmation" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <NextPlanIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => toAppraisal(params)}>
                            <CheckCircleIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])
    //redirect to company information page
    const addtoProcess = useCallback((params) => {
        setFlag(1)//to open company information page
        const data = params.api.getSelectedRows()
        const { em_no, em_id, em_name } = data[0]
        setEmpid(em_id)
        setempno(em_no)
        setname(em_name)
    }, [])

    //appraisal process
    const toAppraisal = async (params) => {

        const data = params.api.getSelectedRows()
        const { sect_id, hod, incharge, em_no, em_id, dept_id, } = data[0]

        const getAuthorizationDetails = async (postData) => {
            const result = await axioslogin.post('/authorization/details', postData)
            const { data, success, message } = result.data
            if (success === 1 && data.length !== 0) {
                const object1 = data.filter(obj => obj.auth_post === 1 ? obj.emp_id : null);
                const object2 = data.filter(obj => obj.auth_post === 2 ? obj.emp_id : null);
                const submitData = {
                    em_id: em_id,
                    em_no: em_no,
                    dept_id: dept_id,
                    sect_id: sect_id,
                    appraisal_status: 1,
                    incharge_id: object2.length !== 0 ? object2[0].emp_id : 0,
                    incharge_status: object2.length === 0 ? 1 : 0,
                    hod_id: object1.length !== 0 ? object1[0].emp_id : 0,
                    hod_status: object1.length === 0 ? 1 : 0,
                    ceo_flag: 1,
                    ceo_status: 0,
                    last_appraisal_date: today
                }

                const checkid = {
                    em_id: em_id
                }
                CheckIdExists(checkid).then((values) => {
                    const { status } = values
                    if (status === 1) {
                        InsertAppraisal(submitData).then((values) => {
                            const { status, message } = values
                            if (status === 1) {
                                succesNofity(message)
                                setCount(count + 1)

                            } else {
                                warningNofity(message)
                            }
                        })
                    } else {
                        infoNofity("Already submitted to appraisal")
                    }
                })
            } else if (success === 1 && data.length === 0) {
                warningNofity("No Authorization for this Department!")
            } else {
                warningNofity(message)
            }
        }

        const inchargeData = async (checkid, postData) => {
            const result = await axioslogin.post('/authorization/details', postData)
            const { data, success, message } = result.data
            if (success === 1 && data.length !== 0) {
                const object1 = data.filter(obj => obj.auth_post === 1 ? obj.emp_id : null);
                const submitData = {
                    em_id: em_id,
                    em_no: em_no,
                    dept_id: dept_id,
                    sect_id: sect_id,
                    appraisal_status: 1,
                    incharge_id: 0,
                    incharge_status: 1,
                    hod_id: object1.length !== 0 ? object1[0].emp_id : 0,
                    hod_status: object1.length === 0 ? 1 : 0,
                    ceo_flag: 1,
                    ceo_status: 0,
                    last_appraisal_date: today
                }
                CheckIdExists(checkid).then((values) => {
                    const { status } = values
                    if (status === 1) {
                        InsertAppraisal(submitData).then((values) => {
                            const { status, message } = values
                            if (status === 1) {
                                succesNofity(message)
                                setCount(count + 1)

                            } else {
                                warningNofity(message)
                            }
                        })
                    } else {
                        infoNofity("Already submitted to appraisal")
                    }
                })
            } else if (success === 1 && data.length === 0) {
                warningNofity("No Authorization for this Department!")
            } else {
                warningNofity(message)
            }
        }


        if (sect_id !== 0 && hod === 0 && incharge === 0) {
            const postData = {
                dept_section: sect_id
            }
            getAuthorizationDetails(postData)
        }
        else if (sect_id !== 0 && hod === 0 && incharge === 1) {
            const postData = {
                dept_section: sect_id
            }
            const checkid = {
                em_id: em_id
            }

            inchargeData(checkid, postData)
        } else {
            const checkid = {
                em_id: em_id
            }
            CheckIdExists(checkid).then((values) => {
                const { status } = values
                if (status === 1) {
                    const submitData = {
                        em_id: em_id,
                        em_no: em_no,
                        dept_id: dept_id,
                        sect_id: sect_id,
                        incharge_id: 0,
                        incharge_status: 1,
                        hod_id: 0,
                        hod_status: 1,
                        ceo_flag: 1,
                        ceo_status: 0,
                        appraisal_status: 1,
                        last_appraisal_date: today
                    }
                    InsertAppraisal(submitData).then((values) => {
                        const { status, message } = values
                        if (status === 1) {
                            succesNofity(message)
                            setCount(count + 1)
                        } else {
                            warningNofity(message)
                        }
                    })
                } else {
                    infoNofity("Already submitted to appraisal")
                }
            })

        }
    }

    const toDownload = async () => {
        const fileName = "ProbationEnd"
        const array = tableData.map((val) => {
            return {
                "EmpID": val.em_no,
                "Name": val.em_name,
                "Department": val.dept_name,
                "DepartmentSection": val.sect_name,
                "Designation": val.desg_name,
                "DateOfJoining": val.em_doj,
                "Category": val.ecat_name,
                "ProbationendDate": val.em_prob_end_date
            }
        })
        ProbationExcel(array, fileName)
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno} display={display} name={name} /> : <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Paper square elevation={1} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                            <Box sx={{ flex: 1, }} >
                                <CssVarsProvider>
                                    <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Probation End List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 0.5 }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' sx={{ color: 'green' }} onClick={toDownload}>
                                        <DownloadIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 0.5 }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={RedirectToHome}>
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                    </Paper>
                }
            </Box>
        </Fragment >
    )
}

export default memo(ProbationEnd)