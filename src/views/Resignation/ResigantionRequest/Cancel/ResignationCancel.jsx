import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, lazy, memo, Suspense, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { Box } from '@mui/joy'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { screenInnerHeight } from 'src/views/Constant/Constant'

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
                return <Box
                    sx={{ display: 'flex', alignItems: 'center', }}
                >
                    <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ padding: 0 }} >
                        <Tooltip title="Click Here to Cancel Approved Resignation Request"  >
                            <CancelOutlinedIcon color='error' />
                        </Tooltip>
                    </IconButton>
                </Box>
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
                {/* <Paper sx={{ width: '100%', display: 'flex', flex: 1, backgroundColor: 'green' }}> */}
                <Paper variant='outlined' sx={{ display: 'flex', m: 1, flex: 1, flexDirection: "column", }} >
                    <CommonAgGrid
                        columnDefs={column}
                        tableData={tableData}
                        sx={{
                            height: screenInnerHeight - 130,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    // rowStyle={rowStyle}
                    // getRowStyle={getRowStyle}
                    />
                </Paper>
                {/* </Paper> */}
            </CustomLayout>
        </Fragment>
    )
}

export default memo(ResignationCancel) 