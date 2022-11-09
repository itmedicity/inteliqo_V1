import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setEmployeeName } from 'src/redux/actions/EmpName.Action'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import CustomReportMain from 'src/views/Component/CustomReportMain';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setDept } from 'src/redux/actions/Dept.Action';

const ExperienceReport = () => {

    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const [slno, setslno] = useState([]);
    const [secondvalue, setsecondValue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [thirdmenu, setThirdmenu] = useState([])
    const [thirdvalue, setThirdValue] = useState(0);
    const [sectslno, setdeptslno] = useState([]);
    const [empslno, setempslno] = useState([]);
    const [data2, setdata2] = useState(sectslno)
    const dispatch = useDispatch();

    /** To get stored department values from redux */
    useEffect(() => {
        dispatch(setDept())
        dispatch(setDeptWiseSection());
        dispatch(setEmployeeName());
    }, [dispatch])

    /** useSelector for getting depatment, department section, employee name wise list from redux */
    const state = useSelector((state) => {
        return {
            dept: state.getdept.departmentlist || 0,
            deptSection: state.getDeptSectList.deptSectionList || 0,
            empName: state.getEmpNameList.empNameList || 0
        }
    })
    /** Destructuring state into values... */
    const { dept, deptSection, empName } = state

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
    /** Selection check box for department section */
    const [columnDefDeptSect] = useState([
        {
            headerName: 'Department Section',
            field: 'sect_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    /** Selection check box for employee name */
    const [columnDefEmployee] = useState([
        {
            headerName: 'Employee Name',
            field: 'em_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    /** to get checked department slno from selection checkbox  */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
            setsecondmenu(0)
            setThirdmenu(0)
            setThirdValue(0)
            setsecondValue(0)
        }
        setsecondmenu(0)
    }

    /** Intializing slno for getting checked department slno */

    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dept_id
        })
        setslno(arr)
    }, [value])

    /** To activate department section search icon */
    const ShowSecondMenu = useCallback((e) => {
        setsecondmenu(1)
    }, [])

    const [data, setdata] = useState(slno)
    /** code for second menu selection, department section list */
    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                const filtered = deptSection.filter(val => slno.includes(val.dept_id))
                setdata(filtered)
            } else {
                warningNofity("Please Select Any DIstrict!")
            }
        }
    }, [secondMenu, slno, deptSection])

    /** to get checked department section slno  from selection slno */
    const onSelectionChanged2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setsecondValue([])
            setThirdmenu(0)
        }
        else {
            setsecondValue(event.api.getSelectedRows())
            setThirdValue(0)
        }
        setThirdmenu(0)
    }

    /** to get department section slno by mapping second value */
    useEffect(() => {
        const arr2 = secondvalue && secondvalue.map((val, index) => {
            return val.sect_id
        })
        setdeptslno(arr2)
    }, [secondvalue])

    /** to activate employee name search icon */
    const ShowthirdMenu = useCallback((e) => {
        setThirdmenu(1)
    }, [])

    /** to get checked department section wise employee  from selection slno */
    const onSelectionChanged3 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setThirdValue([])
        }
        else {
            setThirdValue(event.api.getSelectedRows())
        }
    }

    /** to get deaprtment section wise employee name from redux */
    useEffect(() => {
        if (thirdmenu === 1) {
            if (sectslno !== 0) {
                const filter = empName.filter(val => sectslno.includes(val.em_dept_section))
                setdata2(filter)
            }
            else {
                warningNofity("please select any Department section")
            }
        }

    }, [thirdmenu, sectslno, empName, slno])

    /** to get employee id by mapping thirdvalue */
    useEffect(() => {
        const arr3 = thirdvalue && thirdvalue.map((val, index) => {
            return val.em_id
        })
        setempslno(arr3)
    }, [thirdvalue])

    /** stored department slno, department section slno as postData for API Call */

    const postData = useMemo(() => {
        return {
            dept_id: slno,
            sect_id: sectslno
        }
    }, [sectslno, slno])

    /** stored department slno, department section slno, employee id as postDataemp for API Call */

    const postDataemp = useMemo(() => {
        return {
            dept_id: slno,
            sect_id: sectslno,
            em_id: empslno
        }
    }, [sectslno, slno, empslno])

    /** report ag grid table heading */
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
        { headerName: 'Institution ', field: 'em_institution' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Exp From ', field: 'em_from' },
        { headerName: 'Exp To ', field: 'em_to' },
        { headerName: 'Year ', field: 'year' },
        { headerName: 'Month ', field: 'month' },
        { headerName: 'Days ', field: 'day' },

    ])

    /** Selected checkbox list sumbitted,  to get corresponding data from databse */
    const getEmployeeExperience = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Department wise employee experience */
        const getEmployeeDepartment = async (slno) => {
            const result = await axioslogin.post('/experienceReport/expemployee', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Department section wise employee experience list */
        const getEmpDeptSect = async (postData) => {
            const result = await axioslogin.post('/experienceReport/deptsect', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Selected employee experience list */
        const getEmployee = async (postDataemp) => {
            const result = await axioslogin.post('/experienceReport/sectempname', postDataemp)

            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && sectslno === 0 && empslno === 0) {
            getEmployeeDepartment(slno)
        }
        else if (slno !== 0 && sectslno !== 0 && empslno === 0) {
            getEmpDeptSect(postData)
        }
        else if (slno !== 0 && sectslno !== 0 && empslno !== 0) {
            getEmployee(postDataemp)
        }
        else {
            warningNofity("Please Select Any Checkbox!!")
        }
    }, [slno, dispatch, sectslno, empslno, postData, postDataemp])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportMain
                /** Department checkbox */
                columnDefs={columnDefs}
                tableData={dept}
                onSelectionChanged={onSelectionChanged}
                menu1={"Department"}
                secondMenu={secondMenu}
                /** Department wise table data */
                columnDefMain={columnDefMain}
                onClick={getEmployeeExperience}
                tableDataMain={TableData}
                onSelectionChanged2={onSelectionChanged2}
                menu2={"Department Section"}
                menu3={"Employee Name"}
                ShowSecondMenu={ShowSecondMenu}
                /** Department section checkbox list */
                columnDefMenu2={columnDefDeptSect}
                tableDataMenu2={data}
                thirdmenu={thirdmenu}
                onSelectionChanged3={onSelectionChanged3}
                /** Department section wise employee checkbox list */
                columnDefMenu3={columnDefEmployee}
                tableDataMenu3={data2}
                ShowthirdMenu={ShowthirdMenu}
            />
        </Fragment>
    )
}

export default ExperienceReport