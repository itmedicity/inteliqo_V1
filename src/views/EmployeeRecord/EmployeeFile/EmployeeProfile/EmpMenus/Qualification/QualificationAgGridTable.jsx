import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useState, useEffect, memo, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const QualificationAgGridTable = ({ update, getDataTable }) => {
    //const history = useHistory();
    const [data, setTableData] = useState();
    const { id, } = useParams()

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
            headerName: 'Sl No',
            field: 'slno', wrapText: true, minWidth: 100
        },
        { headerName: 'Education ', field: 'edu_desc', wrapText: true, minWidth: 200 },
        { headerName: 'Course ', field: 'cour_desc', wrapText: true, minWidth: 450 },
        { headerName: 'Specialization ', field: 'spec_desc', wrapText: true, minWidth: 450 },
        { headerName: 'Pass/Fail', field: 'pass', wrapText: true, minWidth: 200 },
        {
            headerName: 'Edit', minWidth: 200, cellRenderer: params =>
                <EditIcon onClick={() =>
                    getDataTable(params)
                }
                />
        },
    ])

    //Get Data
    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get(`/qualify/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No Qualification is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualification();
    }, [id, update]);

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: { xl: 450, lg: 400, md: 350, sm: 350, xs: 300 },
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
                        // onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                    //columnTypes={columnTypes}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(QualificationAgGridTable)