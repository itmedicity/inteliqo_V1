import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useCallback, useEffect, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { useHistory, useParams } from 'react-router-dom'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const Earndeductiontable = ({ update }) => {


    const history = useHistory();
    const [data, setTableData] = useState();
    const { id, no } = useParams()


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
        { headerName: 'SlNo', field: 'ernded_slno' },
        { headerName: 'Wage Description ', field: 'earnded_name' },
        { headerName: 'Wage Type ', field: 'earning_type_name' },
        { headerName: 'Amount', field: 'em_amount' },
        {
            headerName: 'Edit', cellRenderer: params =>
                <EditIcon onClick={() =>
                    getDataTable(params)
                }
                />
        },

    ])

    //Get Data
    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get(`/empearndeduction/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            }
            else if (success === 0) {
                infoNofity("No Allowance is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getCourse();
    }, [id, update]);

    //For Edit
    const getDataTable = (data) => {
        const { ernded_slno } = data
        history.push(`/Home/EmpAllowanceTableEdit/${ernded_slno}/${id}/${no}`)
    }


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

export default memo(Earndeductiontable)