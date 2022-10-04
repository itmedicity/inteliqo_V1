import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useEffect, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useParams } from 'react-router-dom'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const EmployeeFirstVerification = () => {

    const [data, setdata] = useState([])
    const rowHeight = 30
    const headerHeight = 30
    const defaultColDef = {
    }
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
    }

    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
    const [columnDef] = useState([
        {
            headerName: '',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Emp Name ', field: 'em_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Department ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Date of Join ', field: 'em_doj' },
        { headerName: 'Verification Remark ', field: 'verification_Remark' },
        {
            headerName: 'Action', cellRenderer: params =>
                <CheckCircleRoundedIcon />
        },
    ])

    useEffect(() => {
        const getempverification = async () => {
            const result = await axioslogin.get('/empVerification')
            const { success, data } = result.data
            if (success === 1) {
                setdata(data)
            }
            else {
                setdata([])
            }
        }
        getempverification()
    }, [])

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: { xl: 450, lg: 400, md: 350, sm: 350, xs: 300 },
                        width: "100%"
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDef}
                        rowData={data}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        //onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                    //columnTypes={columnTypes}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default EmployeeFirstVerification