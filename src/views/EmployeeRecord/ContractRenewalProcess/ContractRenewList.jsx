import { Box, Button, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
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
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer } from 'react-toastify';
import Tooltip from '@mui/joy/Tooltip';
import { screenInnerHeight } from 'src/views/Constant/Constant';

const ContractRenewList = () => {

    const history = useHistory()
    //const dispatch = useDispatch();
    const [Empno, setEmpNo] = useState(0)
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)

    const toSettings = useCallback(() => {
        history.push(`/Home`)
    }, [history])

    //contreact Renew Process
    const toAppraisalProcess = async (params) => {

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
                    last_appraisal_date: moment(new Date).format('YYYY-MM-DD')
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
                    last_appraisal_date: moment(new Date).format('YYYY-MM-DD')
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
                        last_appraisal_date: moment(new Date).format('YYYY-MM-DD')
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



    //column fot ag grid table
    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                // <Fragment>
                //     <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                //         <OpenIcon onClick={() => toAppraisalProcess(params)}>
                //             <LibraryAddCheckIcon color='primary' />
                //         </OpenIcon>
                //     </Tooltip>
                //     <Tooltip title="Contract Close" followCursor placement='top' arrow >
                //         <OpenIcon sx={{ pb: 1, boxShadow: 0 }} size='sm' color='primary' onClick={() => DirectContractClose(params)}>
                //             <CancelIcon />
                //         </OpenIcon>
                //     </Tooltip>
                // </Fragment>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', alignItems: 'center', }} >
                    <Box sx={{ display: 'flex', }} >
                        <Tooltip title="Appraisal Process" followCursor placement='top' arrow variant='outlined' color='danger'   >
                            <IconButton size='sm' color='danger' onClick={() => toAppraisalProcess(params)}
                                sx={{
                                    "--IconButton-size": "28px"
                                }}
                            >
                                <LibraryAddCheckIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Tooltip title="Contract Close" followCursor placement='top' arrow variant='outlined' color='primary' >
                            <IconButton size='sm' onClick={() => DirectContractClose(params)}
                                sx={{
                                    "--IconButton-size": "28px"
                                }}
                            >
                                <CancelIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
        },
        { headerName: 'Emp No ', field: 'em_no', minWidth: 150, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 150 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 200 },
        { headerName: 'Designation', field: 'desg_name', minWidth: 150 },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 150 },
        { headerName: 'Contract Start', field: 'em_cont_start', minWidth: 150 },
        { headerName: 'Contract End', field: 'em_cont_end', minWidth: 150 },
    ])

    //Direct Contract close
    const DirectContractClose = useCallback((params) => {
        const { em_no, em_id } = params.data
        history.push(`/Home/Direct_Contract_Close/${em_no}/${em_id}`)
    }, [history])

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

    const getEmployeeList = useCallback(async () => {
        const result = await axioslogin.get(`/empearndeduction/getAll/${Empno}`)
        const { data, success } = result.data;
        if (success === 1) {
            const { contract_status } = data[0]
            if (contract_status === 1) {
                setTableData(data);
            } else {
                infoNofity("Employee is not under Contract")
            }

        } else {
            infoNofity("No employee exist with this employee number!!")
            setTableData([]);
        }
    }, [Empno])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ px: 0.5, height: screenInnerHeight * 89 / 100 }}>
                    <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Contract Renewal List
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
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, px: 0.3, }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Employee Number"
                                    name="Empno"
                                    value={Empno}
                                    onchange={(e) => setEmpNo(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{}}>
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={getEmployeeList}
                                    fullWidth
                                    startDecorator={<SearchIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Search
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3, }}>
                        </Box>
                    </Box>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: screenInnerHeight * 73 / 100,
                                width: "100%"
                            }}
                            rowHeight={32}
                            headerHeight={32}
                            rowStyle={rowStyle}
                            getRowStyle={getRowStyle}
                        />
                    </Paper>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(ContractRenewList) 