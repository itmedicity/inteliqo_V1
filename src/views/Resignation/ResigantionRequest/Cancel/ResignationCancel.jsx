import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, lazy, memo, Suspense, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from 'react-redux'
import _ from 'underscore'

const ResigModal = lazy(() => import('./ResignModal'))

const ResignationCancel = () => {

    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})


    //login hod id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)
    useEffect(() => {
        const getResignCancel = async () => {
            const result = await axioslogin.get('/Resignation/resign/resigncancel')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        getResignCancel()
    }, [count])

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
                if (params.data.ceo_appr_status === "1" || params.data.ceo_appr_status === "2") {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }
        },
    ])

    const handleClickIcon = async (params) => {
        setOpen(true)
        setDetails(params.data);
    }


    return (
        <Fragment>
            <Suspense>
                <ResigModal open={open} setOpen={setOpen} data={details} loginEmp={em_id} setCount={setCount} />
            </Suspense>
            <CustomLayout title="Resignation Cancel" displayClose={true} >
                <ToastContainer />
                <Paper sx={{ width: '100%' }}>
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

export default memo(ResignationCancel) 