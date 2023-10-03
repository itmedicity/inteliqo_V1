import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ApprovalModal from './ApprovalModal'
import BeenhereIcon from '@mui/icons-material/Beenhere';

const EODFinaneApproval = () => {

    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})
    const [count, setCount] = useState(0)

    useEffect(() => {
        const getEmployee = async () => {
            const result = await axioslogin.get("/Resignation/fullsetteleEmplo/all")
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        getEmployee()

    }, [count])

    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'appstatus', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.status === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <Tooltip title="View" followCursor placement='top' arrow >
                        <IconButton onClick={() => handleClickIcon(params)}>
                            <CheckCircleOutlineIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                }
            }
        },
    ])

    const handleClickIcon = async (params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setDetails(data);
    }

    return (
        <Fragment>
            <Suspense>
                <ApprovalModal open={open} setOpen={setOpen} data={details} setCount={setCount} />
            </Suspense>
            <CustomLayout title="EOD Finance Approval" displayClose={true} >
                <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >
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
            </CustomLayout>
        </Fragment>
    )
}

export default memo(EODFinaneApproval) 