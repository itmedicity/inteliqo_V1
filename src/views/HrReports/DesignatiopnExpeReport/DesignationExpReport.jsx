import React, { Fragment, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { setDesignation } from 'src/redux/actions/Designation.Action';
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import CustomReportExp from 'src/views/Component/CustomReportExp';

const DesignationExpReport = () => {
    /** initilize values */
    const [slno, setslno] = useState(0)
    const [LessSlno, setLessSlno] = useState(0)
    const [GreaterSlno, setGreaterSlno] = useState(0)
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const serialslno = useMemo(() => slno, [slno]);
    /** dropdown for experience */
    const [getvalue, Setgetvalue] = useState(0)
    const [exp, setExp] = useState(0)

    /** to get stored designation values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDesignation());
    }, [dispatch])

    /** to get employee designation from redux */
    const empDesignation = useSelector((state) => {
        return state.getEmployeeDesignation.designationList || 0
    })

    /** Selction checkbox for designation  */
    const [columnDefs] = useState([
        {
            headerName: 'Designation',
            field: 'desg_name', filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get employee name in ascending order */
    const sortingOrder = useMemo(() => {
        return ['asc'];
    }, []);

    /** to get checked values */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
        }
    }

    /** mapping designation slno into designatiom name */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.desg_slno
        })
        setslno(arr)
    }, [value])

    /** to get first textfield values */
    const [message, setmessage] = useState(0)
    const handleChange = (e) => {
        setLessSlno(e.target.value)
    }

    /** to get second textfield values */
    const [message2, setmessage2] = useState([])
    const handleChange2 = (e) => {
        setGreaterSlno(e.target.value)

    }

    const postData = useMemo(() => {
        return {
            desg_slno: serialslno,
            em_total_year: LessSlno
        }
    }, [serialslno, LessSlno])

    const postData2 = useMemo(() => {
        return {
            desg_slno: serialslno,
            em_total_year: GreaterSlno
        }
    }, [serialslno, GreaterSlno])

    /**selected designation slno submit to get corresponding details from database */
    const getEmpDesignation = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromTable = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/getdesigDetlexp', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get data of less experience */
        const getInputData = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/getexpless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get data of greater experience */
        const getInputData2 = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/designexpgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get nontmch experience */
        const getCheckedvalueNon = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/getnontmch', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get tmch experience */
        const getcheckedTmc = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/gettmch', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get current experience */
        const getCurrentexp = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/getCurrent', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get current and previous experience */
        const getcurrentprvExp = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/getcrrntprvs', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get current and tmch experience */
        const getcurrentTMCHExp = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/getcurrenttmch', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get total experience */
        const getTotalexp = async (serialslno) => {
            const result = await axioslogin.post('/DesignationExpReport/gettotalexp', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get non tmch experience is less than  */
        const getCheckedvalueNonLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/getnonTmchless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        // /** to get non tmch experience is  greaterthan */
        const getCheckedvalueNonGreter = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/getnontmchgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get  tmch experience is  lessthan */
        const getTmcexpLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/gettmchless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get  tmch experience is  greaterthan */
        const getTmcexpGreter = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/gettmchgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get lessthan current experience */
        const getCurrentexpLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/currentexpless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get greater current experience */
        const getCurrentexpGreater = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/currentexpgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get lessthan current and previous exp */
        const getcurrentprvExpLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/getcrrntprvsless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get  less current and previous experience */
        const getcurrentprvExpgreter = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/currentpvrsgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get less current and tmch experience */
        const getcurrentTMCHExpLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/currentTmchless', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get greater current and tmch experience */
        const getcurrentTMCHExpGreater = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/currenttmchgreter', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        /** to get total experience */
        const getTotalexpLess = async (postData) => {
            const result = await axioslogin.post('/DesignationExpReport/totalexpLess', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getTotalexpGreter = async (postData2) => {
            const result = await axioslogin.post('/DesignationExpReport/gettotalexpgreater', postData2)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (serialslno !== 0 && LessSlno === 0 && GreaterSlno === 0
            && exp === 0) {
            getdatafromTable(serialslno)
        }
        else if (serialslno !== 0 && LessSlno !== 0 && GreaterSlno === 0
            && exp === 0) {
            getInputData(postData)
        }
        else if (serialslno !== 0 && LessSlno === 0 && GreaterSlno !== 0
            && exp === 0) {
            getInputData2(postData2)
        }
        else if (serialslno !== 0 && exp === 2 && LessSlno === 0 && GreaterSlno === 0) {
            getCheckedvalueNon(serialslno)
        }
        else if (serialslno !== 0 && exp === 1 && LessSlno === 0 && GreaterSlno === 0) {
            getcheckedTmc(serialslno)
        }
        else if (serialslno !== 0 && exp === 3 && LessSlno === 0 && GreaterSlno === 0) {
            getCurrentexp(serialslno)
        }
        else if (serialslno !== 0 && exp === 4 && LessSlno === 0 && GreaterSlno === 0) {
            getcurrentprvExp(serialslno)
        }
        else if (serialslno !== 0 && exp === 5 && LessSlno === 0 && GreaterSlno === 0) {
            getcurrentTMCHExp(serialslno)
        }
        else if (serialslno !== 0 && exp === 6 && LessSlno === 0 && GreaterSlno === 0) {
            getTotalexp(serialslno)
        }
        else if (serialslno !== 0 && exp === 2 && LessSlno !== 0 && GreaterSlno === 0) {
            getCheckedvalueNonLess(postData)
        }
        else if (serialslno !== 0 && exp === 2 && LessSlno === 0 && GreaterSlno !== 0) {
            getCheckedvalueNonGreter(postData2)
        }
        else if (serialslno !== 0 && exp === 1 && LessSlno !== 0 && GreaterSlno === 0) {
            getTmcexpLess(postData)
        }
        else if (serialslno !== 0 && exp === 1 && LessSlno === 0 && GreaterSlno !== 0) {
            getTmcexpGreter(postData2)
        }
        else if (serialslno !== 0 && exp === 3 && LessSlno !== 0 && GreaterSlno === 0) {
            getCurrentexpLess(postData)
        }
        else if (serialslno !== 0 && exp === 3 && LessSlno === 0 && GreaterSlno !== 0) {
            getCurrentexpGreater(postData2)
        }
        else if (serialslno !== 0 && exp === 4 && LessSlno !== 0 && GreaterSlno === 0) {
            getcurrentprvExpLess(postData)
        }
        else if (serialslno !== 0 && exp === 4 && LessSlno === 0 && GreaterSlno !== 0) {
            getcurrentprvExpgreter(postData2)
        }
        else if (serialslno !== 0 && exp === 5 && LessSlno !== 0 && GreaterSlno === 0) {
            getcurrentTMCHExpLess(postData)
        }
        else if (serialslno !== 0 && exp === 5 && LessSlno === 0 && GreaterSlno !== 0) {
            getcurrentTMCHExpGreater(postData2)
        }
        else if (serialslno !== 0 && exp === 6 && LessSlno !== 0 && GreaterSlno === 0) {
            getTotalexpLess(postData)
        }
        else if (serialslno !== 0 && exp === 6 && LessSlno === 0 && GreaterSlno !== 0) {
            getTotalexpGreter(postData2)
        }
        else if (serialslno !== 0 && LessSlno !== 0 && GreaterSlno !== 0) {
            warningNofity("please type any one less year/greater year")
            // setGreaterSlno(0);
            // setLessSlno(1)
        }
        // else if (serialslno !== 0 && LessSlno === '' && GreaterSlno === '') {
        //     warningNofity("please type any one less year/greater year")
        //     setGreaterSlno(0);
        //     setLessSlno(1)
        // }
        else {
            warningNofity(" please select any Designation")
        }
    }, [serialslno, postData, postData2, exp, LessSlno, GreaterSlno, dispatch])

    /** designation wise report ag grid table heading */
    const [columnDefMain] = useState([
        {
            sortable: true,
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name', sortingOrder: ['asc'] },
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'From_date', field: 'em_from' },
        { headerName: 'to_date', field: 'em_to' },
        { headerName: 'yr_of_exp', field: 'em_total_year' },
        { headerName: 'cur_exp_yr', field: 'exp_year' },
        { headerName: 'cur_exp_month', field: 'exp_month' },
        { headerName: 'cur_exp_day', field: 'exp_day' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Category ', field: 'ecat_name' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportExp
                /**to display leftside checkbox selection */
                onSelectionChanged={onSelectionChanged}
                onClick={getEmpDesignation}
                tableData={empDesignation}
                columnDefs={columnDefs}

                /** to display right side table */
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                sortingOrder={sortingOrder}
                onChange={handleChange}
                onChange2={handleChange2}

                /** to get a selection menu */
                getvalue={exp}
                Setgetvalue={setExp}
                value={exp}
                updatefn={setExp}
            />
        </Fragment>
    )
}
export default DesignationExpReport
