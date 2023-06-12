import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useEffect, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom'
import { errorNofity, infoNofity, } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
//import { DeleteOutlineOutlined } from '@material-ui/icons'

const ExperienceAgGridtable = ({ update, setcount, getTableData }) => {

    const [data, setData] = useState([])
    const { id } = useParams()

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
        { headerName: 'Emp No', field: 'em_no', wrapText: true, minWidth: 90 },
        { headerName: 'Institution ', field: 'em_institution', wrapText: true, minWidth: 400 },
        { headerName: 'Designation ', field: 'desg_name', wrapText: true, minWidth: 200 },
        { headerName: 'Start Date ', field: 'em_from', wrapText: true, minWidth: 150 },
        { headerName: 'End Date', field: 'em_to', minWidth: 150 },
        { headerName: 'Total Year', field: 'year', minWidth: 150 },
        { headerName: 'Total Month ', field: 'month', minWidth: 150 },
        { headerName: 'Total Days', field: 'day', minWidth: 150 },
        { headerName: 'Gross salary', field: 'em_salary', minWidth: 150 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <EditIcon onClick={() =>
                    getTableData(params)
                }
                />
        },
    ])

    useEffect(() => {
        //getdata from data base
        const getTableData = async () => {
            const results = await axioslogin.get(`/experience/select/${id}`)
            const { success, data } = results.data
            if (success === 1) {
                setData(data)

            }
            else if (success === 0) {
                infoNofity("No Experience Is added to This Employee")
            }
            else {
                errorNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()

    }, [id, update])

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

export default memo(ExperienceAgGridtable)