import React, { Fragment, memo, useCallback, useMemo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import CustomTrainingReport from 'src/views/Component/CustomTrainingReport';
import { DepartmentNamesAll, DepartmentSecNamesAll, DepartmentalTopicsAll } from 'src/redux/actions/Training.Action';
import moment from 'moment';

const DepartmentalTrainingReport = () => {

    const [value, setValue] = useState(0);
    const [TableData, setTableData] = useState([]);
    const [secondvalue, setsecondValue] = useState(0);
    const [thirdvalue, setThirdValue] = useState(0);
    const [dept, SetDept] = useState([])
    const [dept_sec, setDeptSec] = useState([])
    const [topic, setTopic] = useState([])
    const [secondMenu, setsecondmenu] = useState(0)
    const [thirdmenu, setThirdmenu] = useState([])
    const [firsdate, setfirstdate] = useState(0);
    const [secondadte, setseconddate] = useState(0)
    const [showData, SetShowData] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(DepartmentNamesAll());
        dispatch(DepartmentSecNamesAll());
        dispatch(DepartmentalTopicsAll())
    }, [dispatch])

    const state = useSelector((state) => {
        return {
            department: state.gettrainingData?.DepartmentNames?.DepartmentNamesList || 0,
            depart_sec: state.gettrainingData?.DepartmentSecNames?.DepartmentSecNamesList || 0,
            training_topic: state.gettrainingData?.DepartmentalTrainingTopics?.DepartmentalTrainingTopicsList || 0
        }
    })

    const { department, depart_sec, training_topic } = state

    //date 
    const onChange = (e) => {
        setfirstdate(e.target.value)
    }

    const onChange2 = (e) => {
        setseconddate(e.target.value)
    }

    const [columnDefs] = useState([
        {
            headerName: 'Department ',
            field: 'dept_name',
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

    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dept_id
        })
        SetDept(arr)
    }, [value])

    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }
    const [data1, setdata1] = useState(0);

    useEffect(() => {
        if (secondMenu === 1) {
            if (dept !== 0) {
                const filtered = depart_sec?.filter(val => dept.includes(val.dept_id))
                setdata1(filtered)
            }
        }
    }, [secondMenu, depart_sec, dept])


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
    useEffect(() => {
        const arr2 = secondvalue && secondvalue.map((val, index) => {
            return val.sect_id
        })
        setDeptSec(arr2)
    }, [secondvalue])

    const ShowthirdMenu = useCallback((e) => {
        setThirdmenu(1)
    }, [])

    const [columnDefDeptSec] = useState([
        {
            headerName: 'Department Section',
            field: 'sect_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const [data, setdata] = useState(0)
    useEffect(() => {
        if (thirdmenu === 1) {
            if (dept_sec !== 0) {
                const filtered1 = training_topic?.filter(val => dept.includes(val.training_dept))
                setdata(filtered1)
            }
            else {
                warningNofity("please select any Section")
            }
        }

    }, [thirdmenu, dept_sec, training_topic, dept, dispatch])


    const onSelectionChanged3 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setThirdValue([])
        }
        else {
            setThirdValue(event.api.getSelectedRows())
        }
    }
    useEffect(() => {
        const arr3 = thirdvalue && thirdvalue.map((val, index) => {
            return val.topic_slno
        })
        setTopic(arr3)
    }, [thirdvalue])

    const [columnDefDeptTopic] = useState([
        {
            headerName: 'Training Topics',
            field: 'training_topic_name',
            filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const postData = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: dept_sec,
            topic_slno: topic,
            firsdate: firsdate,
            secondadte: secondadte
        }
    }, [dept, dept_sec, secondadte, firsdate, topic])

    const getEmpEducation = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const geteducationDatafromTable = async (slno) => {
            const result = await axioslogin.post('/TrainingMonthlyReport/dept/ById', dept)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getEducationCourseData = async (postData) => {
            const result = await axioslogin.post('/TrainingMonthlyReport/getDeptSec', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getcoursepeclztnData = async (postData) => {
            const result = await axioslogin.post('/TrainingMonthlyReport/getDeptTopics', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (dept !== 0 && dept_sec === 0 && topic === 0) {
            geteducationDatafromTable(dept)
        }
        else if (dept !== 0 && dept_sec !== 0 && topic === 0) {
            getEducationCourseData(postData)
        }

        else if (dept !== 0 && dept_sec !== 0 && topic !== 0) {
            getcoursepeclztnData(postData)
        }
        else {
            warningNofity("please select any department")
        }
    }, [dept, dept_sec, topic, postData, dispatch])

    useEffect(() => {
        const displayData = TableData?.map((val) => {
            const object = {
                em_id: val.em_id,
                em_name: val.em_name,
                posttest_status: val.posttest_status === 1 ? "YES" : "NO",
                pretest_status: val.pretest_status === 1 ? "YES" : "NO",
                question_count: val.question_count,
                schedule_date: val.schedule_date,
                datefmt: moment(val.schedule_date).format("YYYY-MM-DD"),
                slno: val.slno,
                topic: val.topic,
                topic_slno: val.topic_slno,
                training_status: val.training_status === 1 ? "YES" : "NO",
                training_topic_name: val.training_topic_name,
                schedule_topics: val.schedule_topics,
                schedule_remark: val.schedule_remark,
                schedule_trainers: val.schedule_trainers,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                schedule_year: val.schedule_year,
                preemark: val.preemark,
                postmark: val.postmark,
                online_mode: val.online_mode,
                offline_mode: val.offline_mode,
                // online_mode: val.online_mode === 1 ? "YES" : "NO",
                // offline_mode: val.offline_mode === 1 ? "YES" : "NO",
                retest_status: val.retest_status === 1 ? "YES" : "NO",
                retest_mark: val.retest_mark === null ? "Nill" : val.retest_mark,
                eligible: val.retest_mark >= 2 || val.posttest_mark >= 2 ? "Eligible" : "Not Eligible",
                trainingmode: val.online_mode === 1 ? "Online" : "Offline"

            }
            return object;
        })
        SetShowData(displayData)
    }, [SetShowData, TableData])


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
        { headerName: 'Slno', field: 'slno' },
        { headerName: 'Emp No ', field: 'em_id' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'schedule_date ', field: 'datefmt' },
        // { headerName: 'Training Status ', field: 'training_status' },
        { headerName: 'Question Count', field: 'question_count' },
        { headerName: 'Pree-Test Status ', field: 'pretest_status' },
        { headerName: 'Pree-Test Mark ', field: 'preemark' },
        { headerName: 'Post-Test Status', field: 'posttest_status' },
        { headerName: 'Post-Test Mark', field: 'postmark' },
        { headerName: 'Training Mode', field: 'trainingmode' },
        // { headerName: 'Online Mode ', field: 'online_mode' },
        // { headerName: 'Offline Mode ', field: 'offline_mode' },
        { headerName: 'Retest Status ', field: 'retest_status' },
        { headerName: 'Retest Mark ', field: 'retest_mark' },
        { headerName: 'Eligible/Not', field: 'eligible' },

    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomTrainingReport
                columnDefs={columnDefs}
                tableData={department}
                onSelectionChanged={onSelectionChanged}
                menu1={"Department"}
                onClick={getEmpEducation}
                secondMenu={secondMenu}

                columnDefMain={columnDefMain}
                tableDataMain={showData}
                onSelectionChanged2={onSelectionChanged2}
                menu2={"Department Section"}
                menu3={"Training Topics"}
                columnDefMenu2={columnDefDeptSec}
                tableDataMenu2={data1}

                ShowSecondMenu={ShowSecondMenu}
                thirdmenu={thirdmenu}
                columnDefMenu3={columnDefDeptTopic}
                tableDataMenu3={data}
                ShowthirdMenu={ShowthirdMenu}
                onSelectionChanged3={onSelectionChanged3}

                onChange={onChange}
                onChange2={onChange2}
            />
        </Fragment>
    )
}

export default memo(DepartmentalTrainingReport) 
