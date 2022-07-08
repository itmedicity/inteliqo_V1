import React, { Fragment, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const CustomAgGridRptFormatOne = ({ columnDefMain, tableDataMain }) => {


    const apiRef = useRef();

    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })

    if (exportState > 0) {
        apiRef.current.api.exportDataAsCsv();
    }

    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        // resizable: true,
        sortable: true,
        filter: true,
        // floatingFilter: true
        filter: 'agTextColumnFilter',
    }

    let gridApi
    const onGridReady = (params) => {
        gridApi = params.api
        // gridApi.sizeColumnsToFit()
    }
    //--- For Get the Selected Row Values
    const onSelectionChanged = (event) => {
        console.log(event.api.getSelectedRows())
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
    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-material ListItemScrol"
                    sx={{
                        height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        ref={apiRef}
                        columnDefs={columnDefMain}
                        rowData={tableDataMain}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        // onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                        suppressColumnVirtualisation={true}
                        suppressRowVirtualisation={true}
                        // autoGroupColumnDef={autoGroupColumnDef}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        enableRangeSelection={true}
                    // pagination={true}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default CustomAgGridRptFormatOne