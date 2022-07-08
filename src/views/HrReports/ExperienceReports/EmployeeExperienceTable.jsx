import React, { Fragment, useState } from 'react'
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IconButton } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useCallback } from 'react';
import '../../Home/Components/CmpStyle.scss'

const EmployeeExperienceTable = ({ tableData }) => {

    const [columnDefs] = useState([
        { headerName: "EMp No", field: 'em_no', checkboxSelection: true, rowDrag: true },
        { headerName: "Name", field: 'em_name' },
        { headerName: "Department", field: 'dept_name' },
        { headerName: "Dept Section", field: 'sect_name' },
        { headerName: "Designation ", field: 'desg_name' },
        { headerName: "Istitution", field: 'em_institution' },
        { headerName: "Exp from", field: 'em_from' },
        { headerName: "Exp to", field: 'em_to' },
        { headerName: "Year", field: 'year' },
        { headerName: "Month", field: 'month' },
        { headerName: "Day", field: 'day' },

    ])

    const rowHeight = 25;
    const headerHeight = 25;

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true

    };

    // let gridApi;
    // const onGridReady = (params) => {
    //     gridApi = params.api
    // }
    // const onExportClick = useCallback(() => {
    //     gridApi.exportDataAsCsv();
    // }, []);
    return (
        <Fragment>
            <IconButton aria-label="fingerprint" color='primary'
            // onClick={onExportClick}
            >

                <CloudDownloadIcon sx={{ color: "#37575f" }} />
            </IconButton>
            {/* <div className="ag-theme-alpine" style={{ height: 700, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={tableData}
                    defaultColDef={defaultColDef}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    rowDragManaged={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                //scrollbarWidth={0}
                //sideBar={true}
                >
                </AgGridReact>
            </div > */}
        </Fragment>
    )
}

export default EmployeeExperienceTable