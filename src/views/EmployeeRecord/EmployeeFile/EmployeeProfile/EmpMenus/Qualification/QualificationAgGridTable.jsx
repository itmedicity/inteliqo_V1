import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useState, useEffect, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { useHistory, useParams } from 'react-router-dom'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { DeleteOutlineOutlined } from '@material-ui/icons'

const QualificationAgGridTable = ({ update, setcount }) => {
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
        { headerName: 'Sl No', field: 'emqual_slno' },
        { headerName: 'Education ', field: 'edu_desc' },
        { headerName: 'Course ', field: 'cour_desc' },
        { headerName: 'Specialization ', field: 'spec_desc' },
        { headerName: 'Pass/Fail', field: 'pass_fail' },
        {
            headerName: 'Edit', cellRenderer: params =>
                <EditIcon onClick={() =>
                    getDataTable(params)
                }
                />
        },
        {
            headerName: 'Delete', cellRenderer: params =>
                <DeleteOutlineOutlined onClick={() =>
                    InactiveData(params)
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
    }, [id], update);

    //For Edit
    const getDataTable = (data) => {
        const { emqual_slno } = data
        history.push(`/Home/QualificationTableEdit/${emqual_slno}/${id}/${no}`)
    }
    const InactiveData = async (data) => {
        const result = await axioslogin.delete(`/qualify/${data.emqual_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setcount(update + 1)
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 400
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

export default QualificationAgGridTable