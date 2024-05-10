import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setBranch } from 'src/redux/actions/Branch.Action'
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import CustomReportWithDateField from 'src/views/Component/CustomReportWithDateField';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setDept } from 'src/redux/actions/Dept.Action';

const EmployeeReport = () => {

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
    const [data, setdata] = useState(deptslno)
    const [firsdate, setfirstdate] = useState(0);
    const [secondadte, setseconddate] = useState(0)
    const dispatch = useDispatch();

    /** To get stored branch values from redux */
    useEffect(() => {
        dispatch(setBranch());
        //dispatch(setDepartment());
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
    })

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

    /** to get checked department section wise Active employee  from selection slno */
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
            branch_slno: slno,
            dept_id: deptslno
        }
    }, [deptslno, slno])

    /** stored department slno, department section slno, ebranch slno as postDataemp for API Call */
    const postDataemp = useMemo(() => {
        return {
            branch_slno: slno,
            dept_id: deptslno,
            sect_id: sectslno
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
        { headerName: 'Adhaar Number', field: 'em_adhar_no' },
        { headerName: 'Account Number', field: 'em_account_no' },
        { headerName: 'Passport Number', field: 'em_passport_no' },
        { headerName: 'PAN Number', field: 'em_pan_no' },
        //{ headerName: 'ESI Number', field: 'em_esi_no' },
        { headerName: 'Retirement Date ', field: 'em_retirement_date' },
        { headerName: 'Address1 ', field: 'addressPresent1' },
        { headerName: 'Address2 ', field: 'addressPresent2' },
        { headerName: 'Pin', field: 'hrm_pin2' },
        { headerName: 'Gross Salary', field: 'gross_salary' },

    ])
    /** Selected checkbox list sumbitted,  to get corresponding data from databse */

    const onChange = (e) => {
        setfirstdate(e.target.value)
    }

    const onChange2 = (e) => {
        setseconddate(e.target.value)
    }

    const postDataDate = useMemo(() => {
        return {
            branch_slno: slno,
            dept_id: deptslno,
            sect_id: sectslno,
            date_of_join_start: firsdate,
            date_of_join_end: secondadte
        }
    }, [deptslno, slno, sectslno, firsdate, secondadte])
    const postData1 = useMemo(() => {
        return {
            branch_slno: slno,
            date_of_join_start: firsdate,
            date_of_join_end: secondadte
        }
    }, [slno, firsdate, secondadte])

    const postData2 = useMemo(() => {
        return {
            branch_slno: slno,
            dept_id: deptslno,
            date_of_join_start: firsdate,
            date_of_join_end: secondadte
        }
    }, [deptslno, slno, firsdate, secondadte])

    const getActiveEmpList = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** branch wise Active Employee report  */
        const getBranchActiveEmp = async (slno) => {
            const result = await axioslogin.post('/ActiveEmpReport/branchactiveemp', slno)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Department  wise Active Employee report  */
        const getDeptActiveEmp = async (postData) => {
            const result = await axioslogin.post('/ActiveEmpReport/deptactiveemp', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Selected branch, department, dept section Active Employee report  */
        const getACtiveEmp = async (postDataemp) => {
            const result = await axioslogin.post('/ActiveEmpReport/activeemp', postDataemp)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get active employees between date */
        const getACtiveEmpDate = async (postDataDate) => {
            const result = await axioslogin.post('/ActiveEmpReport/activeempdate', postDataDate)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getBranchActiveEmpDate = async (postData1) => {
            const result = await axioslogin.post('/ActiveEmpReport/branchactviedate', postData1)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getDeptActiveEmpDate = async (postData2) => {
            const result = await axioslogin.post('/ActiveEmpReport/deptactivedate', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && deptslno === 0 && sectslno === 0 && firsdate === 0 && secondadte === 0) {
            getBranchActiveEmp(slno)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno === 0 && firsdate === 0 && secondadte === 0) {
            getDeptActiveEmp(postData)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno !== 0 && firsdate === 0 && secondadte === 0) {
            getACtiveEmp(postDataemp)
        }
        else if (slno !== 0 && deptslno === 0 && sectslno === 0 && firsdate !== 0 && secondadte !== 0) {
            getBranchActiveEmpDate(postData1)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno === 0 && firsdate !== "" && secondadte !== "") {
            getDeptActiveEmpDate(postData2)
        }
        else if (slno !== 0 && deptslno !== 0 && sectslno !== 0 && firsdate !== "" && secondadte !== "") {
            getACtiveEmpDate(postDataDate)
        }
    }, [slno, dispatch, deptslno, sectslno, postData, postDataemp, postDataDate, firsdate, secondadte, postData1, postData2])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportWithDateField
                /** Department checkbox */
                columnDefs={columnDefs}
                tableData={empBranch}
                onSelectionChanged={onSelectionChanged}
                //menu1={"Department"}
                secondMenu={secondMenu}

                /** contract Active Employee List */
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

                onChange={onChange}
                onChange2={onChange2}
            />
        </Fragment>
    )
}

export default EmployeeReport

