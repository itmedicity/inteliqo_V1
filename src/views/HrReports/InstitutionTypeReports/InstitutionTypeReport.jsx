import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
    }, [dispatch])

    const InstitutionType = useSelector((state) => {
        return state.getInstitutionType.InstitutionList || 0
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
    /** to get selected checkbox as array */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        } else {
            setValue(event.api.getSelectedRows())
        }
    }

    /** Intializing slno for getting checked institution slno */
    const [slno, setslno] = useState([])
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.inst_slno
        })
        setslno(arr)
    }, [value])

    const serailno = useMemo(() => slno, [slno]);

    /** Selected institution type slno sumbit to get corresponding data from databse */
    const getEmployeeInstitutiontype = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromtable = async (serailno) => {
            const result = await axioslogin.post('/reports/instiution', serailno)
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
            warningNofity("Please Select Any Institution Type!")
        }
    }, [serailno])

    /** Institution Type wise report ag grid table column heading */
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