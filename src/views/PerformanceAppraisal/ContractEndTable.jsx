import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useState, useCallback, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditIcon from '@mui/icons-material/Edit';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc'
import { axioslogin } from '../Axios/Axios'
import moment from 'moment';

const ContractEndTable = ({ tableData }) => {
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
        { headerName: 'ID', field: 'em_id' },
        { headerName: 'Emp No ', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Action', cellRenderer: params => <EditIcon onClick={() => rowSelect(params)} /> },

    ])

    const rowSelect = useCallback((params) => {
        const data1 = params.api.getSelectedRows();
        const { em_no, em_id, sect_id, incharge, hod } = data1[0]
        // const getIDOnly = async () => {
        //     /** fetching level3 hierarchy dept section for checking 
        //      * selected employee dept section is present or not */
        //     const result = await axioslogin.get(`/Performance/idonly`)
        //     const { data } = result.data;
        //     var arr = data.map(data => (data.level2_sect_id));
        //     /** fetching level2 hierarchy dept section for checking 
        //      * selected employee dept section is present or not */
        //     const level2ID = await axioslogin.get(`/HierarchyLevel/data`)
        //     const { datas } = level2ID.data;
        //     var l2ID = datas.map(datas => (datas.sect_id))
        //     /** comparing selected employee dept section with level3 hierarchy dept section */
        //     if (arr.indexOf(sect_id) !== -1) {
        //         console.log("level3");
        //         const result = await axioslogin.get(`/Performance/level2hier/${sect_id}`)
        //         const { data } = result.data;
        //         const { authorization_hod, authorization_incharge, highlevel_slno } = data[0]
        //         const today = new Date();
        //         const tdyformat = moment(today).format('YYYY-MM-DD')
        //         if (highlevel_slno === 1) {
        //             const savedata = {
        //                 appraisal_start_date: tdyformat,
        //                 em_id: em_id,
        //                 em_no: em_no,
        //                 appraisal_type: "C",
        //                 incharge_required: authorization_incharge,
        //                 hod_required: authorization_hod,
        //                 ed_required: 1,
        //                 md_required: 0,
        //                 trustiee_required: 0,
        //                 ceo_required: 0
        //             }
        //             const result = await axioslogin.post('/Performance/create', savedata)
        //             const { success } = result.data
        //             if (success === 1) {
        //                 succesNofity("Appraisal Submitted")
        //             }
        //             else {
        //                 errorNofity("Please contact EDP")
        //             }
        //         }
        //         else if (highlevel_slno === 2) {
        //             const savedata = {
        //                 appraisal_start_date: tdyformat,
        //                 em_id: em_id,
        //                 em_no: em_no,
        //                 appraisal_type: "C",
        //                 incharge_required: authorization_incharge,
        //                 hod_required: authorization_hod,
        //                 ed_required: 0,
        //                 md_required: 1,
        //                 trustiee_required: 0,
        //                 ceo_required: 0
        //             }
        //             const result = await axioslogin.post('/Performance/create', savedata)
        //             const { success } = result.data
        //             if (success === 1) {
        //                 succesNofity("Appraisal Submitted")
        //             }
        //             else {
        //                 errorNofity("Please contact EDP")
        //             }
        //         }
        //         else {
        //             const savedata = {
        //                 appraisal_start_date: tdyformat,
        //                 em_id: em_id,
        //                 em_no: em_no,
        //                 appraisal_type: "C",
        //                 incharge_required: authorization_incharge,
        //                 hod_required: authorization_hod,
        //                 ed_required: 0,
        //                 md_required: 0,
        //                 trustiee_required: 1,
        //                 ceo_required: 0
        //             }
        //             const result = await axioslogin.post('/Performance/create', savedata)
        //             const { success } = result.data
        //             if (success === 1) {
        //                 succesNofity("Appraisal Submitted")
        //             }
        //             else {
        //                 errorNofity("Please contact EDP")
        //             }
        //         }

        //     }
        //     else {
        //         /** comparing selected employee dept section with level2 hierarchy dept section */
        //         if (l2ID.indexOf(sect_id) !== -1) {
        //             console.log("level2");
        //             const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
        //             const { data } = result.data;
        //             const { authorization_hod, authorization_incharge, highlevel_slno, } = data[0]
        //             const today = new Date();
        //             const tdyformat = moment(today).format('YYYY-MM-DD')
        //             if (highlevel_slno === 1) {
        //                 const savedata = {
        //                     appraisal_start_date: tdyformat,
        //                     em_id: em_id,
        //                     em_no: em_no,
        //                     appraisal_type: "C",
        //                     incharge_required: authorization_incharge,
        //                     hod_required: authorization_hod,
        //                     ed_required: 1,
        //                     md_required: 0,
        //                     trustiee_required: 0,
        //                     ceo_required: 0
        //                 }
        //                 const result = await axioslogin.post('/Performance/create', savedata)
        //                 const { success } = result.data
        //                 if (success === 1) {
        //                     succesNofity("Appraisal Submitted")
        //                 }
        //                 else {
        //                     errorNofity("Please contact EDP")
        //                 }
        //             }
        //             else if (highlevel_slno === 2) {
        //                 const savedata = {
        //                     appraisal_start_date: tdyformat,
        //                     em_id: em_id,
        //                     em_no: em_no,
        //                     appraisal_type: "C",
        //                     incharge_required: authorization_incharge,
        //                     hod_required: authorization_hod,
        //                     ed_required: 0,
        //                     md_required: 1,
        //                     trustiee_required: 0,
        //                     ceo_required: 0
        //                 }
        //                 const result = await axioslogin.post('/Performance/create', savedata)
        //                 const { success } = result.data
        //                 if (success === 1) {
        //                     succesNofity("Appraisal Submitted")
        //                 }
        //                 else {
        //                     errorNofity("Please contact EDP")
        //                 }
        //             }
        //             else {
        //                 const savedata = {
        //                     appraisal_start_date: tdyformat,
        //                     em_id: em_id,
        //                     em_no: em_no,
        //                     appraisal_type: "C",
        //                     incharge_required: authorization_incharge,
        //                     hod_required: authorization_hod,
        //                     ed_required: 0,
        //                     md_required: 0,
        //                     trustiee_required: 1,
        //                     ceo_required: 0
        //                 }
        //                 const result = await axioslogin.post('/Performance/create', savedata)
        //                 const { success } = result.data
        //                 if (success === 1) {
        //                     succesNofity("Appraisal Submitted")
        //                 }
        //                 else {
        //                     errorNofity("Please contact EDP")
        //                 }
        //             }

        //         }
        //         else {
        //             warningNofity("No Rights to the Departments!!")
        //         }

        //     }
        // }
        /** if appraisal employee is HOD or Incharge */
        // const submitHODAppraisal = async () => {
        //     /** fetching employee department section hirarchy details */
        //     const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
        //     const { data } = result.data;
        //     const { highlevel_slno } = data[0]
        //     const today = new Date();
        //     const tdyformat = moment(today).format('YYYY-MM-DD')
        //     if (highlevel_slno === 1) {
        //         const savedata = {
        //             appraisal_start_date: tdyformat,
        //             em_id: em_id,
        //             em_no: em_no,
        //             appraisal_type: "C",
        //             incharge_required: 0,
        //             hod_required: 0,
        //             ed_required: 1,
        //             md_required: 0,
        //             trustiee_required: 0,
        //             ceo_required: 0
        //         }
        //         const result = await axioslogin.post('/Performance/create', savedata)
        //         const { success } = result.data
        //         if (success === 1) {
        //             succesNofity("Appraisal Submitted")
        //         }
        //         else {
        //             errorNofity("Please contact EDP")
        //         }
        //     }
        //     else if (highlevel_slno === 2) {
        //         const savedata = {
        //             appraisal_start_date: tdyformat,
        //             em_id: em_id,
        //             em_no: em_no,
        //             appraisal_type: "C",
        //             incharge_required: 0,
        //             hod_required: 0,
        //             ed_required: 0,
        //             md_required: 1,
        //             trustiee_required: 0,
        //             ceo_required: 0
        //         }
        //         const result = await axioslogin.post('/Performance/create', savedata)
        //         const { success } = result.data
        //         if (success === 1) {
        //             succesNofity("Appraisal Submitted")
        //         }
        //         else {
        //             errorNofity("Please contact EDP")
        //         }
        //     }
        //     else {
        //         const savedata = {
        //             appraisal_start_date: tdyformat,
        //             em_id: em_id,
        //             em_no: em_no,
        //             appraisal_type: "C",
        //             incharge_required: 0,
        //             hod_required: 0,
        //             ed_required: 0,
        //             md_required: 0,
        //             trustiee_required: 1,
        //             ceo_required: 0
        //         }
        //         const result = await axioslogin.post('/Performance/create', savedata)
        //         const { success } = result.data
        //         if (success === 1) {
        //             succesNofity("Appraisal Submitted")
        //         }
        //         else {
        //             errorNofity("Please contact EDP")
        //         }
        //     }
        // }

        if (sect_id !== 0 && incharge !== 1 && hod !== 1) {
            //getIDOnly()
        }
        else {
            //submitHODAppraisal()
        }
    }, [])

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 670
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

export default memo(ContractEndTable)