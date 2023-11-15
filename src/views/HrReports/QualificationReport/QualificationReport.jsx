
import React, { Fragment, useCallback, useMemo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setEducation } from 'src/redux/actions/Education.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import CustomReportMain from 'src/views/Component/CustomReportMain';
import { setCourse } from 'src/redux/actions/Course.Action';
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setSpecialization } from 'src/redux/actions/Specilization.Action';
import { ToastContainer } from 'react-toastify';

const QualificationReport = () => {
    //initialize values
    const [value, setValue] = useState(0);
    const [TableData, setTableData] = useState([]);
    const [secondvalue, setsecondValue] = useState(0);
    const [thirdvalue, setThirdValue] = useState(0);
    const [slno, setslno] = useState([])
    const [coursslno, setCourseslno] = useState([])
    const [specSlno, setspecSlno] = useState([])
    const [secondMenu, setsecondmenu] = useState(0)
    const [thirdmenu, setThirdmenu] = useState([])



    /** to get stored education values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setEducation());
        dispatch(setCourse());
        dispatch(setSpecialization());
    }, [dispatch])

    /** useSelector for getting education , course and specilization wise list grom redux  */
    const state = useSelector((state) => {
        return {
            empEducation: state.getEmployeeEducation.EducationList || 0,
            empCourse: state.getEmployeeCourse.CourseList || 0,
            empSpecilization: state.getEmployeeSpeclization.SpecilizationList || 0
        }

    })



    /** destructuring the state */
    const { empEducation, empCourse, empSpecilization } = state
    const courseList = useMemo(() => empCourse, [empCourse])
    const specializaionList = useMemo(() => empSpecilization, [empSpecilization])

    /**Leftside Selection Checkbox for Education*/
    const [columnDefs] = useState([
        {
            headerName: 'Education ',
            field: 'edu_desc',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
            setsecondmenu(0)
            setThirdmenu(0)
        }
        else {
            setValue(event.api.getSelectedRows())
        }
        setsecondmenu(0)
        setThirdmenu(0)
    }
    /** mapping education slno into education name */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.edu_slno
        })
        setslno(arr)
    }, [value])

    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }
    /** Education end */

    /** Course menu selection*/
    const [data1, setdata1] = useState(0);

    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                const filtered = courseList?.filter(val => slno.includes(val.edu_slno))
                setdata1(filtered)
                // return setSpecialization
            }
            return setCourse
        }
    }, [secondMenu, courseList, slno])

    /** to get checked course slno  from selection slno */
    const onSelectionChanged2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setsecondValue([])
            setThirdmenu(0)
        }
        else {
            setsecondValue(event.api.getSelectedRows())
        }
    }
    /** mapping course slno into course name */
    useEffect(() => {
        const arr2 = secondvalue && secondvalue.map((val, index) => {
            return val.cour_slno
        })
        setCourseslno(arr2)
    }, [secondvalue])

    const ShowthirdMenu = useCallback((e) => {
        setThirdmenu(1)
    }, [])

    /** Selction checkbox for course  */
    const [columnDefCourse] = useState([
        {
            headerName: 'Course',
            field: 'cour_desc',
            // filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    /** Course end */

    /** Specilization start */
    /** to get stored specilization values from redux */

    const [data, setdata] = useState(0)
    useEffect(() => {
        if (thirdmenu === 1) {
            if (coursslno !== 0) {
                const filtered1 = specializaionList?.filter(val => coursslno.includes(val.cour_slno))
                setdata(filtered1)
                // return setSpecialization
            }
            else {
                warningNofity("please select any qualification")
            }
        }

    }, [thirdmenu, coursslno, specializaionList, dispatch])

    /** to get checked course slno  from selection slno */
    const onSelectionChanged3 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setThirdValue([])
        }
        else {
            setThirdValue(event.api.getSelectedRows())
        }
    }
    /** mapping splecilization slno into specilization name */
    useEffect(() => {
        const arr3 = thirdvalue && thirdvalue.map((val, index) => {
            return val.spec_slno
        })
        setspecSlno(arr3)
    }, [thirdvalue])

    /** selection checkbox for specilization */
    const [columnDefSpecialization] = useState([
        {
            headerName: 'Specialization',
            field: 'spec_desc', filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])




    const postData = useMemo(() => {
        return {
            course: coursslno,
            education: slno,
            specialization: specSlno
        }
    }, [coursslno, slno, specSlno])

    const getEmpEducation = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Selected education slno  to get corresponding data from databse */
        const geteducationDatafromTable = async (slno) => {
            const result = await axioslogin.post('/QualificationReport/education/ById', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Selected education slno and course slno sumbit, to get corresponding data from databse */
        const getEducationCourseData = async (postData) => {
            const result = await axioslogin.post('/QualificationReport/education/course', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** Selected education slno, course slno and speclization slno sumbit, to get corresponding data from databse */
        const getcoursepeclztnData = async (postData) => {
            const result = await axioslogin.post('/QualificationReport/course/specialization', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && coursslno === 0 && specSlno === 0) {
            geteducationDatafromTable(slno)
        }
        else if (slno !== 0 && coursslno !== 0 && specSlno === 0) {
            getEducationCourseData(postData)
        }

        else if (slno !== 0 && coursslno !== 0 && specSlno !== 0) {
            getcoursepeclztnData(postData)
        }
        else {
            warningNofity("please select any qualification")
        }
    }, [slno, coursslno, specSlno, postData, dispatch])
    //Report coloumn heading
    const [columnDefMain] = useState([
        {
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            filter: 'agTextColumnFilter',
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Qualifiaction ', field: 'edu_desc' },
        { headerName: 'course', field: 'cour_desc' },
        { headerName: 'specialization', field: 'spec_desc' },
        { headerName: 'Blood_group ', field: 'group_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name' }
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportMain
                /** Education checkbox */
                columnDefs={columnDefs}
                tableData={empEducation}
                onSelectionChanged={onSelectionChanged}
                menu1={"Education"}
                onClick={getEmpEducation}
                secondMenu={secondMenu}
                /** to display database values related to the api, education wise report */

                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                onSelectionChanged2={onSelectionChanged2}
                menu2={"course"}
                menu3={"specialization"}
                columnDefMenu2={columnDefCourse}
                tableDataMenu2={data1}

                /** To display left side second selection checkbox when clicking first checkboxes */
                ShowSecondMenu={ShowSecondMenu}
                thirdmenu={thirdmenu}
                columnDefMenu3={columnDefSpecialization}
                tableDataMenu3={data}
                ShowthirdMenu={ShowthirdMenu}
                onSelectionChanged3={onSelectionChanged3}
            />

        </Fragment>
    )
}

export default QualificationReport