import React, { Fragment, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'


const BloodReports = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBloodgrp());
    }, [])

    const empBloodgrp = useSelector((state) => {
        return state.getEmployeeBloodgrp.empBlood
    })

    //initialize values
    const [bloodgrp, setbloodgrp] = useState(0);
    const [TableData, setTableData] = useState([]);
    const [data, setData] = useState(0);
    const [value, setValue] = useState(0);



    //Leftside Selection Checkbox
    const [columnDefs] = useState([
        {
            headerName: 'Blood Group',
            field: 'group_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,

        },

    ])
    //Report coloumn heading
    const [columnDefMain] = useState([
        {
            headerName: '#',
            //field: 'slno',
            // filter: true,
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            // filter: 'agTextColumnFilter',
            // filter: 'agNumberColumnFilter',
            // checkboxSelection: true,
            // headerCheckboxSelectionFilteredOnly: true,
            // headerCheckboxSelection: true,
            // resizable: false,
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Blood_group ', field: 'group_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name' },
    ])

    const onSelectionChanged = (event) => {
        //console.log(event.api.getSelectedRows())
        //return event.api.getSelectedRows()
        setValue(event.api.getSelectedRows())
    }
    const [slno, setslno] = useState([])

    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.group_slno
        })
        setslno(arr)
    }, [value])

    //console.log(slno);
    //selected bloodgroup employees to the table
    const getEmployeeBloodgrp = async () => {
        console.log(slno !== []);
        if (slno.length > 0) {
            const result = await axioslogin.post('/reports/bloodgroup/byid', slno)
            const { success, data } = result.data;
            console.log(data);
            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }
    }

    return (
        <Fragment>
            <CustomReport
                tableData={empBloodgrp}
                columnDefs={columnDefs}
                onSelectionChanged={onSelectionChanged}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                onClick={getEmployeeBloodgrp}
            />
        </Fragment>
    )
}

export default BloodReports