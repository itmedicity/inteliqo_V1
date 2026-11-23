import React, { Fragment, memo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Paper } from '@mui/material'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'

const CustomAgGridMenuSelection = ({ tableData, columnDefs, onSelectionChanged, sx }) => {
    const [gridHeight, setGridHeight] = useState(window.innerHeight - 200);

    useEffect(() => {
        const handleResize = () => {
            setGridHeight(window.innerHeight - 200);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //Table
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        // resizable: true,
        // sortable: true,
        // filter: true,
        // floatingFilter: true
    }
    // --- On Grid Ready Function ---
    let gridApi
    const onGridReady = (params) => {
        gridApi = params.api
        gridApi.sizeColumnsToFit()
    }
    const style = {
        height: gridHeight,
        width: '100%',
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
                    sx={{ ...style, ...sx }}

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
                        onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CustomAgGridMenuSelection)