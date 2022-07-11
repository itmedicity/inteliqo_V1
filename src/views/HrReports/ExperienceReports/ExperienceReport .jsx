import React, { Fragment } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setDepartment } from 'src/redux/actions/Department.action'


const ExperienceReport = () => {

    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** To get stored department values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [])

    const empDepartment = useSelector((state) => {
        return state.getDepartmentList.empDepartmentList
    })

    /** Selction checkbox for department name  */
    const [columnDefs] = useState([
        {
            headerName: 'Department',
            field: 'dept_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    /** to get checked department slno from selection checkbox  */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        setValue(event.api.getSelectedRows())
    }

    /** Intializing slno for getting checked department slno */
    const [slno, setslno] = useState([])
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dept_id
        })
        setslno(arr)
    }, [value])


    /** Selected religion slno sumbit to get corresponding data from databse */
    const getEmployeeDepartment = async (e) => {
        e.preventDefault();
        if (slno !== []) {
            const result = await axioslogin.post('/reports/expemployee', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
    }

    /** Department wise report ag grid table heading */
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
        { headerName: 'Religion', field: 'relg_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                columnDefs={columnDefs}
                tableData={empDepartment}
                onSelectionChanged={onSelectionChanged}
                onClick={getEmployeeDepartment}

                columnDefMain={columnDefMain}
                tableDataMain={TableData}
            />
        </Fragment>
    )
}

export default ExperienceReport