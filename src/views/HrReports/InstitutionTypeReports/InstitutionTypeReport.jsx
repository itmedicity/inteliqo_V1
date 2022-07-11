import React, { Fragment } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setInstitution } from 'src/redux/actions/InstitutionType.Action'
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const InstitutionTypeReport = () => {
    /** To get stored institution type values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInstitution());
    }, [])

    const InstitutionType = useSelector((state) => {
        return state.getInstitutionType.InstitutionList
    })

    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** Selction checkbox for institution type  */
    const [columnDefs] = useState([
        {
            headerName: 'Institution Type',
            field: 'inst_emp_type',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        setValue(event.api.getSelectedRows())
    }

    /** Intializing slno for getting checked institution slno */
    const [slno, setslno] = useState([])
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.inst_slno
        })
        setslno(arr)
    }, [value])

    /** Selected institution type slno sumbit to get corresponding data from databse */
    const getEmployeeInstitutiontype = async (e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (slno !== 0) {
            const result = await axioslogin.post('/reports/instiution', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }

        }
        else {
            warningNofity("Please Select Any Institution Type!")
        }
    }

    /** Institution Type wise report ag grid table column heading */
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
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                /** To display left side institution type selection checkboxlist */
                columnDefs={columnDefs}
                onSelectionChanged={onSelectionChanged}
                tableData={InstitutionType}

                /** To display selected Institution type database list */
                onClick={getEmployeeInstitutiontype}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
            />
        </Fragment>
    )
}

export default InstitutionTypeReport