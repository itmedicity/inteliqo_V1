import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useEffect, useRef, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useParams } from 'react-router-dom'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
const EmployeeFileAgGrid = (getDataTable, data) => {

    console.log(data);
    // const rowHeight = 30
    // const headerHeight = 30
    // const defaultColDef = {
    // }
    // const onGridReady = (params) => {
    //     params.api.sizeColumnsToFit()
    // }

    // const rowStyle = {
    //     fontFamily: [
    //         '-apple-system',
    //         'BlinkMacSystemFont',
    //         '"Segoe UI"',
    //         'Roboto',
    //         '"Helvetica Neue"',
    //         'Arial',
    //         'sans-serif',
    //         '"Apple Color Emoji"',
    //         '"Segoe UI Emoji"',
    //         '"Segoe UI Symbol"',
    //     ].join(','),
    // }


    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */
    // const exportState = useSelector((state) => {
    //     return state.changeStateAggrid.aggridstate
    // })
    // /** To download report as excel */
    // if (exportState > 0 && tableDataMain.length > 0) {
    //     apiRef.current.api.exportDataAsCsv();
    // }

    /** Ag grid report row and column formatting */
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter',
    }

    let gridApi
    const onGridReady = (params) => {
        gridApi = params.api
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
        { headerName: 'Emp No', field: 'em_no' },
        { headerName: 'Emp Id ', field: 'em_id' },
        { headerName: 'Name', field: 'emp_name' },
        { headerName: 'Gender', field: 'gender' },
        { headerName: 'Age', field: 'em_age_year' },
        { headerName: 'DOJ', field: 'em_doj' },
        { headerName: 'Mobile', field: 'em_mobile' },
        { headerName: 'Branch', field: 'branch_name' },
        { headerName: 'Department', field: 'dept_name' },
        { headerName: 'Department Section', field: 'sect_name' },
        { headerName: 'Designation', field: 'desg_name' },
        { headerName: 'Status', field: 'emp_status' },
        {
            headerName: 'Action', cellRenderer: params =>
                <EditIcon onClick={() =>
                    getDataTable(params)
                }
                />
        },
    ])

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
                        //     columnDefs={columnDef}
                        //     rowData={null}
                        //     defaultColDef={defaultColDef}
                        //     rowHeight={rowHeight}
                        //     headerHeight={headerHeight}
                        //     rowDragManaged={true}
                        //     animateRows={true}
                        //     onGridReady={onGridReady}
                        //     rowSelection="multiple"
                        //     //onSelectionChanged={onSelectionChanged}
                        //     rowStyle={rowStyle}
                        // //columnTypes={columnTypes}

                        ref={apiRef}
                        columnDefs={columnDef}
                        //rowData={tableDataMain}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        rowStyle={rowStyle}
                        suppressColumnVirtualisation={true}
                        suppressRowVirtualisation={true}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        enableRangeSelection={true}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default EmployeeFileAgGrid