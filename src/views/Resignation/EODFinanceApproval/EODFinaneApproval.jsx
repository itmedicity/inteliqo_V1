import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const EODFinaneApproval = () => {

    const [tableData, setTableData] = useState([])

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

    }, [])

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
            cellRenderer: params =>

                <Tooltip title="Direct Contract Close" followCursor placement='top' arrow >
                    <IconButton onClick={() => handleClickIcon(params)}>
                        <CheckCircleOutlineIcon color='primary' />
                    </IconButton>
                </Tooltip>
        }
    ])

    const handleClickIcon = async () => {

    }

    return (
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
    )
}

export default memo(EODFinaneApproval) 