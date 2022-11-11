import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setBranch } from 'src/redux/actions/Branch.Action'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import CustomReportMain from 'src/views/Component/CustomReportMain';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import _ from 'underscore';
import { setDept } from 'src/redux/actions/Dept.Action';

const EmployeeReportInactive = () => {

    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const [slno, setslno] = useState([]);
    const [secondvalue, setsecondValue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [thirdmenu, setThirdmenu] = useState([])
    const [thirdvalue, setThirdValue] = useState(0);
    const [deptslno, setdeptslno] = useState([]);
    const [sectslno, setsectslno] = useState([]);
    const dispatch = useDispatch();

    /** To get stored branch values from redux */
    useEffect(() => {
        dispatch(setBranch());
        // dispatch(setDepartment());
        dispatch(setDept())
        dispatch(setDeptWiseSection());
    }, [dispatch])

    /** useSelector for getting depatment, department section, branch wise list from redux */
    const state = useSelector((state) => {
        return {
            empBranch: state.getBranchList.branchList || 0,
            deptSection: state.getDeptSectList.deptSectionList || 0,
            dept: state.getdept.departmentlist || 0,
        }
    }, _.isEqual)
    /** Destructuring state into values... */
    const { empBranch, dept, deptSection } = state

    /** Selction checkbox for branch name  */
    const [columnDefs] = useState([
        {
            headerName: 'Branch',
            field: 'branch_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get checked branch slno from selection checkbox  */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
            setThirdmenu(0)
        }
        setsecondmenu(0)
    }

    /** Intializing slno for getting checked branch slno */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.branch_slno
        })
        setslno(arr)
    }, [value])

    /** To activate department  search icon */
    const ShowSecondMenu = useCallback((e) => {
        setsecondmenu(1)
    }, [])

    /** code for second menu selection, department list */
    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                return dept
            } else {
                warningNofity("Please Select Any Branch!")
            }
        }
    }, [secondMenu, slno, dept])

    /** Selection check box for department */
    const [columnDefDept] = useState([
        {
            headerName: 'Department',
            field: 'dept_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get checked department slno  from selection slno */
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

    /** to get department slno by mapping second value */
    useEffect(() => {
        const arr2 = secondvalue && secondvalue.map((val, index) => {
            return val.dept_id
        })
        setdeptslno(arr2)
    }, [secondvalue])

    /** to activate department sectionicon */
    const ShowthirdMenu = useCallback((e) => {
        setThirdmenu(1)
    }, [])

    const [data, setdata] = useState(deptslno)

    /** to get deaprtment wise department section from redux */
    useEffect(() => {
        if (thirdmenu === 1) {
            if (deptslno !== 0) {
                const filtered = deptSection.filter(val => deptslno.includes(val.dept_id))
                setdata(filtered)
            }
            else {
                warningNofity("please select any Department")
            }
        }
    }, [thirdmenu, deptslno, deptSection])

    /** Selection check box for department */
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

    /** to get department section slno by mapping thirdvalue */
    useEffect(() => {
        const arr3 = thirdvalue && thirdvalue.map((val, index) => {
            return val.sect_id
        })
        setsectslno(arr3)
    }, [thirdvalue])

    /** stored department slno, branch slno as postData for API Call */
    const postData = useMemo(() => {
        return {
            em_branch: slno,
            em_department: deptslno
        }
    }, [deptslno, slno])

    /** stored department slno, department section slno, ebranch slno as postDataemp for API Call */
    const postDataemp = useMemo(() => {
        return {
            em_branch: slno,
            em_department: deptslno,
            em_dept_section: sectslno
        }
    }, [deptslno, slno, sectslno])

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
        { headerName: 'Emp No', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Date Of Birth ', field: 'em_dob' },
        { headerName: 'Gender ', field: 'em_gender' },
        { headerName: 'Date Of Joining ', field: 'em_doj' },
        { headerName: 'Mobile No ', field: 'em_mobile' },
        { headerName: 'Mail ID', field: 'em_email' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Institution Type ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Date of Joining ', field: 'em_doj' },
        { headerName: 'Adhaar Number', field: 'em_adhar_no' },
        { headerName: 'Retirement Date ', field: 'em_retirement_date' },
        { headerName: 'Address1 ', field: 'addressPresent1' },
        { headerName: 'Address2 ', field: 'addressPresent2' },
        { headerName: 'Pin', field: 'hrm_pin2' },
    ])
    /** Selected checkbox list sumbitted,  to get corresponding data from databse */

    const getActiveEmpList = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** branch wise Inactive employees report  */
        const getBranchActiveEmp = async (slno) => {
            const result = await axioslogin.post('/ActiveEmpReport/branchInActive', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Department  wise Inactive employees report  */
        const getDeptActiveEmp = async (postData) => {
            const result = await axioslogin.post('/ActiveEmpReport/deptInactive', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Selected branch, department, dept section Inactive employees report  */
        const getACtiveEmp = async (postDataemp) => {
            const result = await axioslogin.post('/ActiveEmpReport/inactive', postDataemp)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && deptslno === 0 && sectslno === 0) {
            getBranchActiveEmp(slno)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno === 0) {
            getDeptActiveEmp(postData)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno !== 0) {
            getACtiveEmp(postDataemp)
        }
        else {
            warningNofity("Please Select Any Checkbox!!")
        }
    }, [slno, dispatch, deptslno, sectslno, postData, postDataemp])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportMain
                /** Department checkbox */
                columnDefs={columnDefs}
                tableData={empBranch}
                onSelectionChanged={onSelectionChanged}
                //menu1={"Department"}
                secondMenu={secondMenu}

                /** Inactive employees report List */
                columnDefMain={columnDefMain}
                onClick={getActiveEmpList}
                tableDataMain={TableData}
                onSelectionChanged2={onSelectionChanged2}
                menu2={"Department"}
                menu3={"Department Section"}
                ShowSecondMenu={ShowSecondMenu}

                /** Department checkbox list */
                columnDefMenu2={columnDefDept}
                tableDataMenu2={dept}
                thirdmenu={thirdmenu}
                onSelectionChanged3={onSelectionChanged3}

                /** Department sectioncheckbox list */
                columnDefMenu3={columnDefDeptSect}
                tableDataMenu3={data}
                ShowthirdMenu={ShowthirdMenu}
            />
        </Fragment>
    )
}

export default EmployeeReportInactive

