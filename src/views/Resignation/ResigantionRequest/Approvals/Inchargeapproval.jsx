import { IconButton, Paper, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
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
import InchargeApprovalModal from './InchargeApprovalModal'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Inchargeapproval = () => {

    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [DeptSect, updateDeptSect] = useState([])//logined incharge dept section list
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    useEffect(() => {

        const getInchargePending = async (postData) => {
            const result = await axioslogin.post('/Resignation/resignlist', postData)
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
                if (params.data.inch_app_status === "1" || params.data.inch_app_status === "2") {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <ThumbUpAltIcon color='error' sx={{ padding: 0 }} disabled />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <ThumbUpAltIcon color='error' sx={{ padding: 0 }} />
                        </Tooltip>
                    </IconButton>
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
                <InchargeApprovalModal open={open} setOpen={setOpen} data={details} loginEmp={em_id} setCount={setCount} slno={1} />
            </Suspense>
            <CustomLayout title="Resignation Approval Incharge" displayClose={true} >
                <ToastContainer />
                <Paper sx={{ width: '100%' }}>
                    <Paper square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center', }} >
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

export default memo(Inchargeapproval) 