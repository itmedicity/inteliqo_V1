import React, { Fragment, useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setReligion } from 'src/redux/actions/Religion.Action';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const ReligionReport = () => {
    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** To get stored religion values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setReligion());
    }, [dispatch])

    const empReligions = useSelector((state) => {
        return state.getEmployeeReligion.empRel || 0
    })

    /** Selction checkbox for religion  */
    const [columnDefs] = useState([
        {
            headerName: 'Religion',
            field: 'relg_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get checked religion slno from selection checkbox  */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        } else {
            setValue(event.api.getSelectedRows())
        }
    }

    /** Intializing and store slno for getting checked religion slno */
    const [slno, setslno] = useState([])
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.relg_slno
        })
        setslno(arr)
    }, [value])

    const serailno = useMemo(() => slno, [slno]);
    /** Selected religion slno sumbit, to get corresponding data from databse */
    const getEmployeeReligion = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromtable = async (serailno) => {
            const result = await axioslogin.post('/reports/religion/byid', serailno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (serailno !== 0) {
            getdatafromtable(serailno)
        }
        else {
            warningNofity("Please Select Any Religion!")
        }
    }, [serailno])

    /** Religion wise report ag grid table heading */
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
        { headerName: 'Gender ', field: 'gender' },
        { headerName: 'Marital Status ', field: 'marital_status' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                /**To display left side checkbox selection list */
                columnDefs={columnDefs}
                tableData={empReligions}
                onSelectionChanged={onSelectionChanged}
                /** To display religion wise report table */
                onClick={getEmployeeReligion}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
            />
        </Fragment>
    )
}

export default ReligionReport