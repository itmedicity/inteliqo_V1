import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setDistrict } from 'src/redux/actions/District.Action'
import Custom_Report_Two from 'src/views/Component/Custom_Report_Two';
import { setDistRegion } from 'src/redux/actions/DistRegion.Action';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const RegionReport = () => {
    /** Initiliazing values for tabale data*/
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const [secondvalue, setSecondvalue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [slno, setslno] = useState([])

    /** To get stored  values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDistrict());
    }, [dispatch])

    /** useSelector for getting district list and district wise region list */
    const state = useSelector((state) => {
        return { empDistrict: state.getDistrictList.DidtrictList || 0, empDistRegion: state.getDistRegion.empDistReg || 0 }

    })
    /** destructuring the state */
    const { empDistrict, empDistRegion } = state


    /** Left side selction checkbox for district list */
    const [columnDefs] = useState([
        {
            headerName: 'District',
            field: 'dist_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** Selction checkbox for district wise region  */
    const [columnDefRegionMenu] = useState([
        {
            headerName: 'Region',
            field: 'reg_name', filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** code for second menu selection, district wise region list */
    useEffect(() => {
        if (secondMenu === 1) {
            if (slno !== 0) {
                dispatch(setDistRegion(slno));
            } else {
                warningNofity("Please Select Any DIstrict!")
            }
        }
    }, [secondMenu, slno])

    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }

    /** to get checked district slno from selection checkbox  */
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

    /** Intializing slno for getting checked district slno. ie, return value object is mapped to single data  */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dist_slno
        })
        setslno(arr)
    }, [value])

    /**to get checked region slno from selection checkbox*/
    const onSelectionChangedMenu2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setSecondvalue([])
        }
        else {
            setSecondvalue(event.api.getSelectedRows())
        }
    }

    /** Intializing slno for getting checked region slno. ie, object mapped to data */
    const [regslno, setregslno] = useState([])
    useEffect(() => {
        const reg_arr = secondvalue && secondvalue.map((val, index) => {
            return val.reg_slno
        })
        setregslno(reg_arr)
    }, [secondvalue])

    /** district and region postData value for API call  */
    const postData = useMemo(() => {
        return {
            region: regslno,
            district: slno
        }
    }, [regslno, slno])


    const getEmployeeDistrict = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Selected district slno sumbit, to get corresponding data from databse */
        const getdistrictdatafromtable = async (slno) => {
            const result = await axioslogin.post('/reports/district/byid', slno)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }

        /** Selected district slno and region slno sumbit, to get corresponding data from databse */
        const getDistrictRegionData = async (postData) => {
            const result = await axioslogin.post('/reports/distreg/byregion', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && regslno === 0) {
            getdistrictdatafromtable(slno)
        }
        else if (slno !== 0 && regslno !== 0) {
            getDistrictRegionData(postData)
        } else {
            warningNofity("Please Select Any DIstrict!")
        }
    }, [slno, postData])

    /** District wise report ag grid table heading */
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
        { headerName: 'Age ', field: 'em_age_year' },
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'Blood_group ', field: 'group_name' },
        { headerName: 'Religion', field: 'relg_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Technical/Non technical ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'District ', field: 'dist_name' },
        { headerName: 'Region ', field: 'reg_name' },
    ])
    return (
        <Fragment>
            <ToastContainer />
            <Custom_Report_Two
                /** to display left side first selection checkbox list */
                columnDefs={columnDefs}
                tableData={empDistrict}
                menu1={"District"}
                menu2={"Region"}

                /** to display database values related to the api, district wise report */
                onSelectionChanged={onSelectionChanged}
                onClick={getEmployeeDistrict}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}

                /** To display left side second selection checkbox when clicking first checkboxes */
                secondMenu={secondMenu}
                ShowSecondMenu={ShowSecondMenu}
                columnDefMenu2={columnDefRegionMenu}
                tableDataMenu2={empDistRegion}
                onSelectionChangedMenu2={onSelectionChangedMenu2}
            />
        </Fragment>
    )
}

export default RegionReport