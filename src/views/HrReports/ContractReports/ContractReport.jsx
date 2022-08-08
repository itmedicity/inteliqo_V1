import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from 'src/redux/constants/action.type';
import CustomReportWithOneTextBox from 'src/views/Component/CustomReportWithOneTextBox';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';
import { addDays } from 'date-fns';
import { ToastContainer } from 'react-toastify';

const ContractReport = () => {

    const dispatch = useDispatch();
    const [column, setColumn] = useState([]);
    const [value, setValue] = useState(0);
    const [TableData, setTableData] = useState([]);
    const [slno, setslno] = useState([])
    /** Contract names */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/ContractReport/contractlist')
            const { success, data } = result.data;
            if (success === 1) {
                setColumn(data)
            }
            else {
                setColumn([])
            }
        }
        fetchData();
    }, []);
    /** Checkbox for contract names */
    const [columnDefs] = useState([
        {
            headerName: 'CONTRACT',
            field: 'ecat_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])
    /** to get selected checkbox values */
    const onSelectionChanged = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setValue([])
        }
        else {
            setValue(event.api.getSelectedRows())
        }
    }
    /** mapping selected checkbox values into slno  */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.category_slno
        })
        setslno(arr)
    }, [value])

    const category_slno = useMemo(() => slno, [slno]);

    const [expiry, setExpiry] = useState(0)

    const today = new Date();
    const tdyformat = moment(today).format('YYYY-MM-DD')
    /** converting expiry days into date */
    const exp_date = addDays(today, expiry);
    const change_date = moment(exp_date).format('YYYY-MM-DD')

    /** postData for submit values to databse */
    const postData = useMemo(() => {
        return {
            category_slno: category_slno,
            em_cont_end: change_date
        }
    }, [category_slno, change_date])

    /** contract wise report column heading */
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
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Contract Start Date ', field: 'em_cont_start' },
        { headerName: 'Contract End Date ', field: 'em_cont_end' },
        { headerName: 'Remaining Day ', field: 'Remaining_days' },
    ])

    const getContractRprt = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })

        /**contract employee status wise report */
        const getdatafromtable = async (category_slno) => {

            const result = await axioslogin.post('/ContractReport/contractreport', category_slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                data.fail();
            }
        }
        /**contract employee status with date wise report */
        const getContractDate = async (postData) => {
            const result = await axioslogin.post('/ContractReport/contractDateRprt', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (category_slno !== 0 && change_date === tdyformat) {
            getdatafromtable(category_slno)
        }
        else if (category_slno !== 0 && change_date !== tdyformat) {
            getContractDate(postData)
        }
        else {
            warningNofity("Please Select Any Contract!")
        }

    }, [category_slno, dispatch, postData, change_date, tdyformat])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportWithOneTextBox
                /**left side menu checkbox */
                columnDefs={columnDefs}
                tableData={column}
                onSelectionChanged={onSelectionChanged}
                /** table data details */
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                onClick={getContractRprt}
                /** textbox details */
                setExpiry={setExpiry}
            />
        </Fragment>
    )
}

export default ContractReport