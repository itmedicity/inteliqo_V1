import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { axioslogin } from '../Axios/Axios'
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc'

const TrainingEndTable = ({ tableData }) => {
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
            //headerName: '',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            //width: 30,
        },
        { headerName: 'ID', field: 'em_id', resizable: true },
        { headerName: 'Emp No ', field: 'em_no', resizable: true },
        { headerName: 'Name ', field: 'em_name', resizable: true },
        { headerName: 'Dept Name ', field: 'dept_name', resizable: true },
        { headerName: 'Designation ', field: 'desg_name', resizable: true },
        { headerName: 'Date of joining ', field: 'em_doj', resizable: true },
        { headerName: 'Category ', field: 'ecat_name', resizable: true },
        { headerName: 'Training End Date', field: 'training_end', resizable: true },
        {
            headerName: 'Action',
            cellRenderer: params => <EditIcon
                onClick={() => rowSelect(params)}
            />
        },
    ])

    const rowSelect = useCallback((params) => {
        /** get selected employee row data*/
        const data1 = params.api.getSelectedRows()
        /** destructuring data */
        const { em_no, em_id } = data1[0]
        const slno = em_id
        const getEmployeeRights = async (slno) => {
            /** get selected employee user rights from databse table */
            const result = await axioslogin.get(`/performanceappriasalrights/userrights/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                /** destructuring selected employee user rights */
                const { em_id, rights_needed } = data[0]
                const obj = JSON.parse(rights_needed);
                const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = obj
                const today = new Date();
                const tdyformat = moment(today).format('YYYY-MM-DD')
                /** savedata for submiting employee appraisal rights */
                const savedata = {
                    appraisal_start_date: tdyformat,
                    em_id: em_id,
                    em_no: em_no,
                    appraisal_type: "T",
                    incharge_required: incharge,
                    hod_required: hod,
                    gm_required: gm,
                    om_required: om,
                    hr_required: hr,
                    ms_required: ms,
                    cno_required: cno,
                    acno_required: acno,
                    ed_required: ed,
                    md_required: md
                }
                if (savedata.length !== 0) {
                    const result = await axioslogin.post('/performanceappriasalrights/createappraisal', savedata)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNofity("Appraisal Submitted")
                    }
                    else {
                        errorNofity("Please contact EDP")
                    }
                }
            }
            else {
                errorNofity("Please contact EDP")
            }
        }

        if (slno !== 0) {
            getEmployeeRights(slno)
        } else {
            warningNofity("please contact EDP!")
        }
    }, [])

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 670,
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDef}
                        rowData={tableData}
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

export default memo(TrainingEndTable)





