import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import moment from 'moment';
import { CheckIdExists, InsertAppraisal } from './AppraisalFunctions';
import { infoNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomeToolTip from '../Component/CustomeToolTip';
import CusIconButton from '../Component/CusIconButton';
import DownloadIcon from '@mui/icons-material/Download'
import CustomAgGridRptFormatOne from '../Component/CustomAgGridRptFormatOne';
import { Actiontypes } from 'src/redux/constants/action.type'
import { useDispatch } from 'react-redux';

const AnnualAppraisalList = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    const today = moment(new Date).format('YYYY-MM-DD')
    const [count, setCount] = useState(0)

    const RedirectToHome = () => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        history.push(`/Home`)
    }

    /** columns for table */
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', minWidth: 50 },
        //{ headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 100, filter: true },
        { headerName: 'Emp No ', field: 'em_no', wrapText: true, minWidth: 50, filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 100 },
        { headerName: 'Department ', field: 'dept_name', filter: true, minWidth: 150 },
        { headerName: 'Department Section ', field: 'sect_name', wrapText: true, minWidth: 150, filter: true },
        { headerName: 'Designation ', field: 'desg_name', filter: true, minWidth: 100 },
        { headerName: 'Date of joining ', field: 'em_doj', filter: true, minWidth: 100 },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 200, filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    {/* <Tooltip title="Direct Contract Confirmation" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <NextPlanIcon color='primary' />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => toAppraisal(params)}>
                            <CheckCircleIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    /** annual appraisal employee list */
    useEffect(() => {
        const annualList = async () => {
            const result = await axioslogin.get('/Performance/annualdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
                setCount(0)
            } else {
                dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
                setTableData([])
            }
        }
        annualList()
    }, [count, dispatch])

    const toAppraisal = useCallback((params) => {

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
        //if it is employee
        if (sect_id !== 0 && hod === 0 && incharge === 0) {
            const postData = {
                dept_section: sect_id
            }
            getAuthorizationDetails(postData)
        }
        //if it is employee is incharge
        else if (sect_id !== 0 && hod === 0 && incharge === 1) {
            const postData = {
                dept_section: sect_id
            }
            const checkid = {
                em_id: em_id
            }

            inchargeData(checkid, postData)
            //hod
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
    }, [count, today, dispatch])

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
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={1} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Employee Annual End List
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
            </Box>
        </Fragment>
    )
}

export default AnnualAppraisalList
