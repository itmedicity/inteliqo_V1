
import React, { Fragment, memo, useRef, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const CustomAgGridRptFormatOne = ({ columnDefMain, tableDataMain, onSelectionChanged, sx }) => {
    const apiRef = useRef();
    const [gridHeight, setGridHeight] = useState(window.innerHeight - 200);

    useEffect(() => {
        const handleResize = () => {
            setGridHeight(window.innerHeight - 200);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    /** useSelector is used for get aggrid download button state */
    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })
    /** To download report as excel */
    if (exportState > 0 && tableDataMain.length > 0) {
        // apiRef.current.api.exportDataAsCsv();
        apiRef.current.api.exportDataAsCsv({
            processCellCallback: (params) => {
                if (params.column.getColId() === 'shiftCountList') {
                    return params.value
                        ?.map((item) => `${item.shft_desc}: ${item.count}`)
                        .join(', ') || '';
                }

                return params.value;
            },
        });
    }

    /** Ag grid report row and column formatting */
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter',
    }

    // let gridApi
    // const onGridReady = (params) => {
    //     gridApi = params.api
    // }

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
                        height: gridHeight,
                        width: '100%',
                        ...sx,
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
                        //onGridReady={onGridReady}
                        rowSelection="multiple"
                        onSelectionChanged={onSelectionChanged}
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

export default memo(CustomAgGridRptFormatOne)