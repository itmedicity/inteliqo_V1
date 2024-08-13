import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, Suspense, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import ApprovalDeptSectSelection from 'src/views/MuiComponents/ApprovalDeptSectSelection'
import _ from 'underscore'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { lazy } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { screenInnerHeight } from 'src/views/Constant/Constant'

const ApprovalModel = lazy(() => import('./InchargeApprovalModal'))

const Hodapproval = () => {

    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [DeptSect, updateDeptSect] = useState([])//logined incharge dept section list
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})

    //login hod id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    useEffect(() => {

        const getInchargePending = async (postData) => {
            const result = await axioslogin.post('/Resignation/resignlistHOD', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        if (DeptSect.length !== 0) {
            const deptid = DeptSect && DeptSect.map((val) => {
                return val.dept_section
            })
            const postData = {
                dept_id: deptid
            }

            getInchargePending(postData)
        }
        if (deptSect !== 0) {
            const postData = {
                dept_id: deptSect
            }

            getInchargePending(postData)
        }
    }, [DeptSect, count, deptSect])


    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'status', filter: true },
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

    const handleClickIcon = useCallback((params) => {
        setOpen(true)
        setDetails(params.data);
    }, [])

    return (
        <Fragment>
            <Suspense>
                <ApprovalModel open={open} setOpen={setOpen} data={details} loginEmp={em_id} setCount={setCount} slno={2} />
            </Suspense>
            <CustomLayout title="Resignation Approval HOD" displayClose={true} >
                <ToastContainer />
                <Paper sx={{ width: '100%' }}>
                    <Paper variant='outlined' sx={{ display: 'flex', flex: 1, m: 1, p: 1, alignItems: 'center', }} >
                        <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8, }} >
                            <ApprovalDeptSectSelection em_id={em_id} value={deptSect} setValue={setDeptSect} updateDeptSect={updateDeptSect} />
                        </Box>
                        <Box sx={{ display: 'flex', flex: 3, pt: 0.4, pr: 0.8, }} >
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                        <CommonAgGrid
                            columnDefs={column}
                            tableData={tableData}
                            sx={{
                                height: screenInnerHeight - 210,
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

export default memo(Hodapproval) 