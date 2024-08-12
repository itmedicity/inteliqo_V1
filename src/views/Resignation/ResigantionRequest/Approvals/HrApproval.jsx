import { Box, Checkbox, FormControlLabel, IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, lazy, memo, Suspense, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const ApprovalModel = lazy(() => import('./InchargeApprovalModal'))
const ContractModal = lazy(() => import('./ContractClosedModal'))

const HrApproval = () => {
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [conttrcatclose, setContractclose] = useState(false)
    const [tableData, setTableData] = useState([]);
    const [duplicate, setDuplicate] = useState([])
    const [contractdata, setContractData] = useState([])
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})
    const [count, setCount] = useState(0)
    const [contractOpen, setContractOpen] = useState(false)
    const [contEachdata, setContEachData] = useState({})
    const [contCount, setContCount] = useState(0)

    //login hod id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    useEffect(() => {
        const getInchargePending = async () => {
            const result = await axioslogin.get("/Resignation/get/hrlist")
            const { success, data } = result.data
            if (success === 1) {
                setDuplicate(data)
            } else {
                setDuplicate([])
            }
            setCount(0)
        }
        getInchargePending()
    }, [count])

    useEffect(() => {
        if (Object.keys(duplicate).length > 0 && deptSect === 0) {
            setTableData(duplicate)
        } else if (Object.keys(duplicate).length > 0 && deptSect !== 0) {
            const arr = duplicate?.filter((val) => val.dept_id === deptSect)
            setTableData(arr)
        } else {
            setTableData([])
        }
    }, [duplicate, deptSect])

    useEffect(() => {
        if (conttrcatclose === true) {
            const getContractCloseresign = async () => {
                const result = await axioslogin.get("/Resignation/get/contractClosed")
                const { success, data } = result.data
                if (success === 1) {
                    setContractData(data)
                } else {
                    setContractData([])
                }
            }
            getContractCloseresign()
        }
        setContCount(0)

    }, [conttrcatclose, contCount])

    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 250 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hod_app_status === "1" || params.data.hod_app_status === "2") {
                    return <Box sx={{ display: 'flex', alignItems: 'center', }}><IconButton
                        sx={{ padding: 0, cursor: 'none' }}
                        disabled
                    >
                        <Tooltip title="Approved Request">
                            <ThumbUpAltIcon color='disabled' sx={{ padding: 0, }} />
                        </Tooltip>
                    </IconButton>
                    </Box>
                } else {
                    return <Box sx={{ display: 'flex', alignItems: 'center', }}><IconButton onClick={() => handleClickIcon(params)}
                        sx={{ padding: 0 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <ThumbUpAltIcon color='success' sx={{ padding: 0 }} />
                        </Tooltip>
                    </IconButton>
                    </Box>
                }
            }
        },
    ])

    const [columnDef] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Contract Close Date', field: 'em_cont_close_date', wrapText: true, minWidth: 250 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hod_app_status === "1" || params.data.hod_app_status === "2") {
                    return <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <IconButton
                            sx={{ padding: 0, cursor: 'none' }}
                            disabled
                        >
                            <Tooltip title="Approved Request">
                                <ThumbUpAltIcon color='disabled' sx={{ padding: 0, }} />
                            </Tooltip>
                        </IconButton>
                    </Box>
                } else {
                    return <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <IconButton onClick={() => ContactClick(params)}
                            sx={{ padding: 0 }} >
                            <Tooltip title="Click Here to Approve / Reject">
                                <ThumbUpAltIcon color='success' sx={{ padding: 0 }} />
                            </Tooltip>
                        </IconButton>
                    </Box>
                }
            }
        },
    ])

    const handleClickIcon = async (params) => {
        setOpen(true)
        setDetails(params.data);
    }
    const ContactClick = async (params) => {
        setContractOpen(true)
        setContEachData(params.data);
    }

    return (
        <Fragment>
            <Suspense>
                <ContractModal open={contractOpen} setOpen={setContractOpen} data={contEachdata} loginEmp={em_id} setCount={setContCount} />
                <ApprovalModel open={open} setOpen={setOpen} data={details} loginEmp={em_id} setCount={setCount} slno={4} />
            </Suspense>
            <CustomLayout title="Resignation Approval HR" displayClose={true} >
                <ToastContainer />
                <Paper sx={{ width: '100%' }}>
                    <Paper square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center', }} >
                        <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8, }} >
                            <DeptSelectByRedux setValue={setDeptSect} value={deptSect} />
                        </Box>
                        <Box sx={{ display: 'flex', flex: 3, pt: 0.4, pr: 0.8, }} >
                            <FormControlLabel
                                control={<Checkbox />}
                                label=" Contract Close"
                                checked={conttrcatclose}
                                name="conttrcatclose"
                                onChange={(e) => setContractclose(e.target.checked)}
                            />
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                        <CommonAgGrid
                            columnDefs={conttrcatclose === true ? columnDef : column}
                            tableData={conttrcatclose === true ? contractdata : tableData}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        // rowStyle={rowStyle}
                        // getRowStyle={getRowStyle}
                        />
                    </Paper>
                </Paper>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(HrApproval)