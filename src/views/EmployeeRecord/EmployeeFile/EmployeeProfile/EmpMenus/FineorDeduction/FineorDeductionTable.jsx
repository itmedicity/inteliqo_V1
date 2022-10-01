import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useEffect, useMemo, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const FineorDeductionTable = ({ update, collected, getDataTable }) => {
    //const history = useHistory();
    const [data, setTableData] = useState();
    const { id } = useParams()
    const postdata = useMemo(() => {
        return {
            id: id,
            collected: collected
        }
    }, [id, collected])

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
        { headerName: 'SlNo', field: 'fine_slno' },
        { headerName: 'Fine Type', field: 'fine_desc' },
        { headerName: 'Description', field: 'fine_descp' },
        { headerName: 'Amount', field: 'fine_amount' },
        { headerName: 'Remark', field: 'fine_remark' },
        { headerName: 'Status', field: 'fine_status' },
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
        const getFineDeduction = async () => {
            const result = await axioslogin.post('/empfinededuction/dispaly', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No Fine/Deduction is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getFineDeduction();
    }, [id, update, collected, postdata]);

    //For Edit
    // const getDataTable = (data) => {
    //     const { fine_slno } = data
    //     history.push(`/Home/FineAndDeductionTableEdit/${fine_slno}/${id}/${no}`)
    // }

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

export default memo(FineorDeductionTable) 