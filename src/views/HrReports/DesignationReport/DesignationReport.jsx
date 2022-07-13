import React, { Fragment, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { setDesignation } from 'src/redux/actions/Designation.Action';
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';


const DesignationReport = () => {

    /** to get stored designation values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDesignation());
    }, [dispatch])

    /** to get employee designation from redux */
    const empDesignation = useSelector((state) => {
        return state.getEmployeeDesignation.designationList || 0
    })

    //initialize values
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** Selction checkbox for designation  */
    const [columnDefs] = useState([
        {
            headerName: 'Designation',
            field: 'desg_name', filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,

        },

    ])

    /** to get employee name in ascending order */
    const sortingOrder = useMemo(() => {
        return ['asc'];
    }, []);

    /** designation wise report ag grid table heading */
    const [columnDefMain] = useState([
        {
            sortable: true,
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name', sortingOrder: ['asc'] },
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Designation ', field: 'desg_name' },
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
    /** to get checked values */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
        }
    }

    const [slno, setslno] = useState([])

    /** mapping designation slno into desognatiom name */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.desg_slno
        })
        setslno(arr)
    }, [value])

    const serialslno = useMemo(() => slno, [slno]);

    /**selected designation slno submit to get corresponding details from database */
    const getEmpDesignation = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromTable = async (serialslno) => {
            const result = await axioslogin.post('/reports/designation/ById', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (serialslno !== 0) {
            getdatafromTable(serialslno)
        }
        else {
            warningNofity(" please select any designation")
        }
    }, [serialslno, dispatch])




    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                /**to display leftside checkbox selection */
                onSelectionChanged={onSelectionChanged}
                onClick={getEmpDesignation}
                tableData={empDesignation}
                columnDefs={columnDefs}

                /** to display right side table */
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                sortingOrder={sortingOrder}



            />
        </Fragment>
    )
}

export default DesignationReport