import React, { Fragment, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

const CategoryReports = () => {

    /** to get stored category values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCategory());
    }, [dispatch])

    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    //initialize values
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** to get employee name in ascending */
    const sortingOrder = useMemo(() => {
        return ['asc'];
    }, []);

    /** Selction checkbox for category  */
    const [columnDefs] = useState([
        {
            headerName: 'Category',
            field: 'ecat_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** category wise report ag grid table heading */
    const [columnDefMain] = useState([
        {
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name', sortingOrder: ['asc'] },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Gender', field: 'Gender' },
        { headerName: 'Blood_group ', field: 'group_name' },
        { headerName: 'Dept_Name ', field: 'dept_name' },
        { headerName: 'Dept_Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Emp_Type ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
    ])
    /** to checked values */
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
    /** mapping category slno into category name */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.category_slno
        })
        setslno(arr)
    }, [value])

    const serialslno = useMemo(() => slno, [slno]);

    /**selected category slno submit to get corresponding details */
    const getEmployeeCategory = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromTable = async (serialslno) => {
            const result = await axioslogin.post('/CategoryReport/getcategory', serialslno)
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
            warningNofity(" please select any category")
        }
    }, [serialslno, dispatch])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                /**to display leftside checkbox selection */
                columnDefs={columnDefs}
                tableData={empCate}
                onSelectionChanged={onSelectionChanged}
                onClick={getEmployeeCategory}

                /** to display right side table */
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                sortingOrder={sortingOrder}
            />

        </Fragment>
    )
}

export default CategoryReports



