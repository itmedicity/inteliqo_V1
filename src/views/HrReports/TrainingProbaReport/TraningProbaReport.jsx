import React, { Fragment, useCallback } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import CustomReport from 'src/views/Component/CustomReport'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { setTraningProba } from 'src/redux/actions/Trainingproba.Action';
import { Actiontypes } from 'src/redux/constants/action.type';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

const TraningProbaReport = () => {
    /** to get stored Employee status  values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTraningProba());
    }, [dispatch])

    /** to get employee employee status from redux */
    const empTrainingprobation = useSelector((state) => {
        return state.getEmployeeTrainingProbation.TraningprobaList || 0
    })

    //initialize values
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);

    /** Selction checkbox for employee status  */
    const [columnDefs] = useState([
        {
            headerName: 'Training/probation',
            field: 'empstat_name', filter: true,
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

    /** training and probation wise report ag grid table heading */
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
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },

    ])
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

    const [slno, setslno] = useState([])

    /** mapping Employee status slno into Employee status name */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.emstats_slno
        })
        setslno(arr)
    }, [value])

    const serialslno = useMemo(() => slno, [slno]);

    /**selected Employee status slno submit to get corresponding details from database */
    const getTraniningProbation = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromTable = async (serialslno) => {
            const result = await axioslogin.post('/TraingProbaReport/catedetl', serialslno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (serialslno !== 0) {
            getdatafromTable(serialslno)
        }
        else {
            warningNofity(" please select any Training / probation ")
        }
    }, [serialslno, dispatch])



    return (
        <Fragment>
            <ToastContainer />
            <CustomReport
                /**to display leftside checkbox selection */
                onSelectionChanged={onSelectionChanged}
                onClick={getTraniningProbation}
                tableData={empTrainingprobation}
                columnDefs={columnDefs}

                /** to display right side table */
                columnDefMain={columnDefMain}
                tableDataMain={TableData}
                sortingOrder={sortingOrder}



            />
        </Fragment>
    )
}

export default TraningProbaReport