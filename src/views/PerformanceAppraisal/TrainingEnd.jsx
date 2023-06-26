import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import CompanyChange from './CompanyChange';
import { ToastContainer } from 'react-toastify';
import { CheckIdExists, InsertAppraisal } from './AppraisalFunctions';
import moment from 'moment';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomeToolTip from '../Component/CustomeToolTip';
import CusIconButton from '../Component/CusIconButton';
import DownloadIcon from '@mui/icons-material/Download'
import CustomAgGridRptFormatOne from '../Component/CustomAgGridRptFormatOne';
import { Actiontypes } from 'src/redux/constants/action.type'

const TrainingEnd = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    const [empno, setempno] = useState(0)
    const [flag, setFlag] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [display, setdisplay] = useState(0)
    const [name, setname] = useState('')
    const [count, setCount] = useState(0)
    const today = moment(new Date).format('YYYY-MM-DD')

    const RedirectToHome = () => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        history.push(`/Home`)
    }

    const [columnDef] = useState([
        // { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'Emp ID', field: 'em_id', filter: true, minWidth: 100 },
        { headerName: 'Emp No ', field: 'em_no', filter: true, minWidth: 200 },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
        { headerName: 'Department ', field: 'dept_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'Designation ', field: 'desg_name', minWidth: 200 },
        { headerName: 'Date of joining ', field: 'em_doj', minWidth: 200 },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 300 },
        { headerName: 'Training End Date', field: 'training_end', minWidth: 200 },
        {
            headerName: 'Action', minWidth: 200,
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Go to Company Information" followCursor placement='top' arrow >
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

    /** list training end employees, 3 month & 6 month */
    useEffect(() => {
        const trainingEndList = async () => {
            const result = await axioslogin.get('/Performance/trainingdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
                setCount(0)
            } else if (success === 0) {
                dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
                setTableData([])
            }
        }
        trainingEndList()
    }, [count, dispatch])

    //direct contract confirmation process
    const addtoProcess = useCallback((params) => {
        setFlag(1)
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const data = params.api.getSelectedRows()
        const { em_no, em_id, em_name } = data[0]
        setEmpid(em_id)
        setempno(em_no)
        setname(em_name)
    }, [dispatch])

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
    const toAppraisal = async (params) => {

        const data = params.api.getSelectedRows()
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
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
                // const a = data.map((val) => {
                //     let obj = { inCharge: 0, hod: 0 }
                //     if (val.auth_post === 2) {
                //         return { ...obj, inCharge: val.emp_id, hod: 0 }
                //     }
                //     else if (val.auth_post === 1) {
                //         return { ...obj, hod: val.emp_id, inCharge: 0 }
                //     }
                // })

                const checkid = {
                    em_id: em_id
                }

                // const submitData = a.map((val) => {
                //     return {
                //         em_id: em_id,
                //         em_no: em_no,
                //         dept_id: dept_id,
                //         sect_id: sect_id,
                //         incharge_id: val.inCharge,
                //         hod_id: val.hod,
                //         ceo_id: 1,
                //         appraisal_status: 1,
                //         last_appraisal_date: today
                //     }
                // })

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

    const onExportClick = useCallback(() => {
        if (tableData.length === 0) {
            warningNofity("There is no data")
        }
        else {
            dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 1 })
        }
    }, [tableData.length, dispatch])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno} display={display} name={name} /> : <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Paper square elevation={1} sx={{
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
                            <CustomeToolTip title="Download" placement="bottom">
                                <Box >
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                        <DownloadIcon />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                            <Box sx={{ pl: 0.5 }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={RedirectToHome}>
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            <CustomAgGridRptFormatOne
                                columnDefMain={columnDef}
                                tableDataMain={tableData}
                            // sx={{
                            //     height: 600,
                            //     width: "100%"
                            // }}
                            // rowHeight={30}
                            // headerHeight={30}
                            />

                        </Paper>
                    </Paper>
                }
            </Box>
        </Fragment>
    )
}

export default memo(TrainingEnd) 