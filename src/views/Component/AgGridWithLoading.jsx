import React, { Fragment, memo, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'
import { Backdrop, CircularProgress, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import CustomLoadingOverlay from './CustomLoadingOverlay'
import CustomLoadingCellRenderer from './CustomLoadingCellRenderer'

const AgGridWithLoading = ({
    columnDefMain,
    tableDataMain,
    // loadingCellRenderer,
    // loadingCellRendererParams,
    // loadingOverlayComponent,
    // loadingOverlayComponentParams
}) => {
    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */
    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })
    /** To download report as excel */
    if (exportState > 0 && tableDataMain.length > 0) {
        apiRef.current.api.exportDataAsCsv();
    }

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

    // const loadingOverlayComponent = useMemo(() => {
    //     return CustomLoadingOverlay;
    // }, []);


    // const loadingOverlayComponentParams = useMemo(() => {
    //     return {
    //         loadingMessage: 'One moment please...',
    //     };
    // }, []);

    const loadingCellRenderer = useMemo(() => {
        //return <CustomLoadingCellRenderer />;
        return CustomLoadingCellRenderer;
    }, []);
    const loadingCellRendererParams = useMemo(() => {
        return {
            loadingMessage: 'One moment please...',
        };
    }, []);


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
                    {/* {tableDataMain ? <AgGridReact
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
                        rowStyle={rowStyle}
                        suppressColumnVirtualisation={true}
                        suppressRowVirtualisation={true}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        enableRangeSelection={true}

                        loadingCellRenderer={loadingCellRenderer}
                        loadingCellRendererParams={loadingCellRendererParams}

                    // loadingOverlayComponent={loadingOverlayComponent}
                    // loadingOverlayComponentParams={loadingOverlayComponentParams}
                    ></AgGridReact> : <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>} */}

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
                        rowStyle={rowStyle}
                        suppressColumnVirtualisation={true}
                        suppressRowVirtualisation={true}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        enableRangeSelection={true}

                        loadingCellRenderer={loadingCellRenderer}
                        loadingCellRendererParams={loadingCellRendererParams}
                    ></AgGridReact>

                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(AgGridWithLoading)