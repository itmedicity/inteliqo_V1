import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { ContractExcel } from 'src/views/Payroll/AttendanceUpdation/ExportToExcel';
import { useHistory } from 'react-router-dom';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { IconButton as OpenIcon } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { CheckIdExists, InsertAppraisal } from 'src/views/PerformanceAppraisal/AppraisalFunctions';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import { useDispatch } from 'react-redux';

const ContractRenewList = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const toSettings = useCallback(() => {
        history.push(`/Home`)
    }, [history])
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)

    const today = moment(new Date).format('YYYY-MM-DD')

    //Direct Contract close
    const DirectContractClose = useCallback((params) => {
        const { em_no, em_id } = params.data
        history.push(`/Home/Direct_Contract_Close/${em_no}/${em_id}`)
    }, [history])

    //contreact Renew Process
    const ContractRenew = async (params) => {

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
        } else if (sect_id !== 0 && hod === 0 && incharge === 1) {
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

        // const { em_no } = data.data
        // const conractrenew = {
        //     contract_renew_appr: 1,
        //     em_no: em_no
        // }
        // const result = await axioslogin.patch('/empcontract/contractrenewapprove', conractrenew)
        // const { success, message } = result.data
        // if (success === 2) {
        //     succesNofity(message)
        //     setCount(count + 1)
        // }
        // else {
        //     errorNofity("Error Occured!!Please Contact EDP")
        // }
    }

    //Contract Renewal Process
    const DirectContractRenewProcess = useCallback((params) => {
        const { em_no, em_id } = params.data
        dispatch(setPersonalData(em_id))
        history.push(`/Home/ContractRenewalProcess/${em_no}/${em_id}`)
    }, [history, dispatch])

    //column fot ag grid table
    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 200,
            cellRenderer: params => <Fragment>
                <Tooltip title="Direct contract Close" followCursor placement='top' arrow >
                    <OpenIcon onClick={() => DirectContractClose(params)}>
                        <CancelIcon color='primary' />
                    </OpenIcon>
                </Tooltip>
                <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                    <OpenIcon onClick={() => ContractRenew(params)}>
                        <LibraryAddCheckIcon color='primary' />
                    </OpenIcon>
                </Tooltip>
                <Tooltip title="Direct Contract Renew" followCursor placement='top' arrow >
                    <OpenIcon onClick={() => DirectContractRenewProcess(params)}>
                        <TaskAltIcon color='primary' />
                    </OpenIcon>
                </Tooltip>
            </Fragment>
        },
        // { headerName: 'Slno', field: 'slno', width: 100 },
        { headerName: 'Emp No ', field: 'em_no', minWidth: 100, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true },
        { headerName: 'Designation', field: 'desg_name' },
        { headerName: 'DOJ', field: 'em_doj' },
        { headerName: 'Contract Start', field: 'em_cont_start' },
        { headerName: 'Contract End', field: 'em_cont_end' },
    ])

    //get contract end employee details
    useEffect(() => {
        const getContractEnd = async () => {
            const result = await axioslogin.get('/empcat/contract/detl')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        getContractEnd()
    }, [count])

    //row highlight color based on condition
    const rowStyle = { background: '#BBDEFB' };
    const getRowStyle = params => {
        if (params.data.em_cont_end <= moment(new Date()).format('YYYY-MM-DD')) {
            return { background: '#BBDEFB' };
        } else {
            return null
        }
    };

    const toDownload = useCallback(() => {
        const fileName = "Contractend"
        const array = tableData?.map((val) => {
            return {
                "EmpID": val.em_no,
                "Name": val.em_name,
                "Department": val.dept_name,
                "DepartmentSection": val.sect_name,
                "Designation": val.desg_name,
                "DateOfJoining": val.em_doj,
                "Category": val.ecat_name
            }
        })
        ContractExcel(array, fileName)
    }, [tableData])

    return (
        <Box sx={{ display: "flex", flexGrow: 1, bgcolor: 'pink', width: "100%" }} >
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column', overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }}>
                <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Employee Contract End List
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pl: 0.5, mt: 0.5 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='xs' sx={{ color: 'green' }} onClick={toDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pl: 0.5, mt: 0.5 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='xs' color="danger" onClick={toSettings}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                        rowStyle={rowStyle} getRowStyle={getRowStyle}
                    />
                </Paper>
            </Paper>
        </Box>
    )
}

export default memo(ContractRenewList) 