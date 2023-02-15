import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.min.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css'

const CommonAgGrid = ({ columnDefs, tableData, sx, rowHeight, headerHeight, getRowStyle }) => {
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

    return (
        <Fragment>
            <Paper elevation={1}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={sx}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={tableData}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        rowStyle={rowStyle}
                        getRowStyle={getRowStyle}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CommonAgGrid)