
import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Actiontypes } from 'src/redux/constants/action.type';
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setRegistrationType } from 'src/redux/actions/RegistrationType.Action';
import CustomCheckboxNew from 'src/views/Component/CustomCheckboxNew';
import { addDays } from 'date-fns';
import moment from 'moment';

const EmpRegisteration = () => {
    /** Initiliazing values for tabale data*/
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState([]);
    const [secondvalue, setSecondvalue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [slno, setslno] = useState([])

    /** To get stored  values from redux */
    const dispatch = useDispatch();

    const [rowData] = useState([
        { field: 'Registration Number', id: 1 },
        { field: 'Challan Number', id: 2 },
    ]);

    /** Left side selction checkbox for section type list */
    const [columnDefs] = useState([
        {
            headerName: 'All',
            field: 'field',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get selected challan number or registration number */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
            setsecondmenu(0)
        }
    }
    /** mapping for value to get slno related challan number and registration number */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.id
        })
        setslno(arr)
    }, [value])

    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }

    /** display registration type checkbox list when clicking seach menu */
    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                dispatch(setRegistrationType());
            } else {
                warningNofity("Please Select Any Registration Type!")
            }
        }
    }, [secondMenu, slno, dispatch])

    /** to get registration type naame and slno from redux */
    const empRegistrationType = useSelector((state) => {
        return state.getEmpRegistrationType.RegistrationTypeList || 0
    })

    /** Selction checkbox for registration type  */
    const [columnDefMenu2] = useState([
        {
            headerName: 'Registration Type',
            field: 'registration_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** to get selected registration type values  */
    const onSelectionChanged2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setSecondvalue([])
        }
        else {
            setSecondvalue(event.api.getSelectedRows())
        }
    }
    /** mapping registration type slno to regslno */
    const [regslno, setregslno] = useState([])
    useEffect(() => {
        const reg_arr = secondvalue && secondvalue.map((val, index) => {
            return val.reg_id
        })
        setregslno(reg_arr)
    }, [secondvalue])

    /** to get expiry date */
    const [expiry, setExpiry] = useState(0)
    const today = new Date();
    const tdyformat = moment(today).format('YYYY-MM-DD')
    const exp_date = addDays(today, expiry);
    const change_date = moment(exp_date).format('YYYY-MM-DD')

    /** to set postData for registration type number and expiry days to submit API */
    const postData = useMemo(() => {
        return {
            reg_id: regslno,
            em_exp_date: change_date
        }
    }, [regslno, change_date])


    const getEmpRegTypeReport = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Register Number data only */
        const getRegisterNumOnly = async () => {
            const result = await axioslogin.get('/RegistrationTypeReport/registernumonly')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data[0])
            }
            else {
                setTableData([])
            }
        }
        /** Challan Number data only */
        const getChallanOnly = async () => {
            const result = await axioslogin.get('/RegistrationTypeReport/challanonly')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data[0])
            }
            else {
                setTableData([])
            }
        }
        /** Both Challan Numnber and Register number data only */
        const getCombined = async () => {
            const result = await axioslogin.get('/RegistrationTypeReport/combined')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data[0])
            }
            else {
                setTableData([])
            }
        }
        const getRegNumData = async (regslno) => {
            const result = await axioslogin.post('/RegistrationTypeReport/reNoWise', regslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getChallanData = async (regslno) => {
            const result = await axioslogin.post('/RegistrationTypeReport/challanwiserprt', regslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getRegDateRpt = async (postData) => {
            const result = await axioslogin.post('/RegistrationTypeReport/regwithdate', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getchalladateRept = async (postData) => {
            const result = await axioslogin.post('/RegistrationTypeReport/challanwithdate', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getCombinedReg = async (regslno) => {
            const result = await axioslogin.post('/RegistrationTypeReport/regcombined', regslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        const getCombinedWithdate = async (regslno) => {
            const result = await axioslogin.post('/RegistrationTypeReport/combinedwithdate', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }

        if (slno[0] === 1 && regslno === 0 && slno.length !== 2) {
            getRegisterNumOnly()
        }
        else if (slno[0] === 2 && regslno === 0) {
            getChallanOnly()
        }
        else if (slno.length === 2 && regslno === 0) {
            getCombined()
        }
        else if (slno[0] === 1 && regslno !== 0 && change_date === tdyformat && slno.length !== 2) {
            getRegNumData(regslno)
        }
        else if (slno[0] === 2 && regslno !== 0 && change_date === tdyformat) {
            getChallanData(regslno)
        }
        else if (slno.length === 2 && regslno !== 0 && change_date === tdyformat) {
            getCombinedReg(regslno)
        }
        else if (slno[0] === 1 && regslno !== 0 && change_date !== "" && slno.length !== 2) {
            getRegDateRpt(postData)
        }
        else if (slno[0] === 2 && regslno !== 0 && change_date !== "") {
            getchalladateRept(postData)
        }
        else if (slno.length === 2 && regslno !== 0 && change_date !== "") {
            getCombinedWithdate(postData)
        }
        else {
            warningNofity("Please Select Any Registration Type Or Enter Days")
        }
    }, [slno, postData, dispatch, regslno, change_date, tdyformat])

    /** Report Table based on selected  data */
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
        { headerName: 'Registration Number ', field: 'em_reg_no' },
        { headerName: 'Reg Expiry Date ', field: 'em_exp_date' },
        { headerName: 'Challan Number ', field: 'em_chellan' },
        { headerName: 'Challan Expiry date ', field: 'em_chellan_exp_date' },
        { headerName: 'Remaining Days ', field: 'Remaining_days' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <CustomCheckboxNew
                columnDefs={columnDefs}
                tableData={rowData}
                menu1={"Registration Type"}
                menu2={"Registration Type"}
                onSelectionChanged={onSelectionChanged}
                secondMenu={secondMenu}

                /** registration type selection checkbox */
                ShowSecondMenu={ShowSecondMenu}
                columnDefMenu2={columnDefMenu2}
                tableDataMenu2={empRegistrationType}
                onSelectionChanged2={onSelectionChanged2}

                /** Table data details */
                onClick={getEmpRegTypeReport}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}

                /** Textbox values... */
                name="expiry"
                value={expiry}
                label="expiry"
                setExpiry={setExpiry}
            />
        </Fragment>
    )
}

export default EmpRegisteration

