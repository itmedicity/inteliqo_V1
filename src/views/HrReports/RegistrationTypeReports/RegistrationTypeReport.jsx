import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setDept } from 'src/redux/actions/Dept.Action';
import CustomReportTwo from 'src/views/Component/CustomReportTwo';

const RegistrationTypeReport = () => {
    /** Initiliazing values for tabale data*/
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const [secondvalue, setSecondvalue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [slno, setslno] = useState([])

    /** To get stored  values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDept());
        dispatch(setDeptWiseSection());
    }, [dispatch])

    /** useSelector for getting department list and department wise section list */
    const state = useSelector((state) => {
        return { dept: state.getdept.departmentlist || 0, deptSection: state.getDeptSectList.deptSectionList || 0 }

    })
    /** destructuring the state */
    const { dept, deptSection } = state

    /** Left side selction checkbox for department list */
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

    /** Selction checkbox for district wise region  */
    const [columnDefRegionMenu] = useState([
        {
            headerName: 'Department Section',
            field: 'sect_name', filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    const [data, setdata] = useState(slno)

    /** code for second menu selection, department wise section list */
    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                const filtered = deptSection.filter(val => slno.includes(val.dept_id))
                setdata(filtered)
            } else {
                warningNofity("Please Select Any Department!")
            }
        }
    }, [secondMenu, slno, deptSection])

    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }

    /** to get checked department slno from selection checkbox  */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })

        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
            setSecondvalue(0)
        }
        setsecondmenu(0)
    }

    /** Intializing slno for getting checked department slno. ie, return value object is mapped to single data  */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dept_id
        })
        setslno(arr)
    }, [value])

    /**to get checked dept section slno from selection checkbox*/
    const onSelectionChangedMenu2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setSecondvalue([])
        }
        else {
            setSecondvalue(event.api.getSelectedRows())
        }
    }

    /** Intializing slno for getting checked dept section slno. ie, object mapped to data */
    const [sectslno, setdeptslno] = useState([])

    useEffect(() => {
        const reg_arr = secondvalue && secondvalue.map((val, index) => {
            return val.sect_id
        })
        setdeptslno(reg_arr)
    }, [secondvalue])

    /** department and dept section postData value for API call  */
    const postData = useMemo(() => {
        return {
            dept_id: slno,
            sect_id: sectslno
        }
    }, [slno, sectslno])

    const getRegistrationType = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Selected department slno sumbit, to get corresponding data from databse */
        const getEmployeeDepartment = async (slno) => {
            const result = await axioslogin.post('/RegistrationTypeReport/deptregistration', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }

        /** Selected department slno and dept section slno sumbit, to get corresponding data from databse */
        const getEmpDeptSect = async (postData) => {
            const result = await axioslogin.post('/RegistrationTypeReport/registerationtype', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && sectslno === 0) {
            getEmployeeDepartment(slno)
        }
        else if (slno !== 0 && sectslno !== 0) {
            getEmpDeptSect(postData)
        } else {
            warningNofity("Please Select Any Department!")
        }
    }, [slno, postData, dispatch, sectslno])

    /** department wise report ag grid table heading */
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
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Registration Type ', field: 'registration_name' },
        { headerName: 'Expiry Date ', field: 'em_exp_date' },
        { headerName: 'Remaining Days ', field: 'Remaining_days' },

    ])
    return (
        <Fragment>
            <ToastContainer />
            <CustomReportTwo
                /** to display left side first selection checkbox list */
                columnDefs={columnDefs}
                tableData={dept}
                menu1={"Department"}
                menu2={"Department Section"}

                /** to display database values related to the api, dept wise report */
                onSelectionChanged={onSelectionChanged}
                onClick={getRegistrationType}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}

                /** To display left side second selection checkbox when clicking first checkboxes */
                secondMenu={secondMenu}
                ShowSecondMenu={ShowSecondMenu}
                columnDefMenu2={columnDefRegionMenu}
                tableDataMenu2={data}
                onSelectionChangedMenu2={onSelectionChangedMenu2}
            />
        </Fragment>
    )
}

export default RegistrationTypeReport 