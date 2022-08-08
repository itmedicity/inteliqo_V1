import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Actiontypes } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import Custom_Report_Two from 'src/views/Component/Custom_Report_Two';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { setSubSection } from 'src/redux/actions/DeptSubSection.Action';

const DeptSubSectionReport = () => {
    /** Initiliazing values for tabale data*/
    const [TableData, setTableData] = useState([]);
    const [value, setValue] = useState(0);
    const [secondvalue, setSecondvalue] = useState(0)
    const [secondMenu, setsecondmenu] = useState(0)
    const [slno, setslno] = useState([])

    /** To get stored  values from redux */
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([
        { field: 'General', dept_sub_sect: 1 },
        { field: 'OT', dept_sub_sect: 2 },
        { field: 'ICU', dept_sub_sect: 3 },
        { field: 'ER', dept_sub_sect: 4 },
    ]);

    /** Intializing slno for getting checked section type slno. ie, return value object is mapped to single data  */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.dept_sub_sect
        })
        setslno(arr)
    }, [value])

    /** Left side selction checkbox for section type list */
    const [columnDefs] = useState([
        {
            headerName: 'Section Type',
            field: 'field',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    /** Selction checkbox for section type wise section  */
    const [columnDefSectionMenu] = useState([
        {
            headerName: 'section',
            field: 'sect_name', filter: true,
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
                dispatch(setSubSection(slno));
            } else {
                warningNofity("Please Select Any section type!")

            }
        }
    }, [secondMenu, slno])

    // get section list from redux
    const empSubSect = useSelector((state) => {
        return state.getEmployeeSubSect.SectionList || 0
    })
    const ShowSecondMenu = async (e) => {
        setsecondmenu(1)
    }

    /** to get checked section type slno from selection checkbox  */
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

    /**to get checked section slno from selection checkbox*/
    const onSelectionChangedMenu2 = (event) => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setSecondvalue([])
        }
        else {
            setSecondvalue(event.api.getSelectedRows())
        }
    }

    /** Intializing slno for getting checked section slno. ie, object mapped to data */
    const [Secslno, setSecslno] = useState([])
    useEffect(() => {
        const arr2 = secondvalue && secondvalue.map((val, index) => {
            return val.sect_id
        })
        setSecslno(arr2)
    }, [secondvalue])

    const datainsert = useMemo(() => {
        return {
            section: Secslno,
            sectionType: slno
        }
    }, [Secslno, slno])
    /** Selected district slno and region slno sumbit, to get corresponding data from databse */
    const getEmployeeSectionType = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getSectionTypeData = async (datainsert) => {
            const result = await axioslogin.post('/DeptSectionReport/Sectiontype', datainsert)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (slno !== 0 && Secslno !== 0) {
            getSectionTypeData(datainsert)
        }
        else if (slno !== 0 && Secslno === 0) {
            warningNofity("Please Select Any department section!")
        }
        else {
            warningNofity("Please Select Any Section Type!")
        }
    }, [datainsert, dispatch])

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
        { headerName: 'Mobile ', field: 'em_mobile' },
        { headerName: 'DOJ', field: 'em_doj' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Branch ', field: 'branch_name' },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <Custom_Report_Two
                /** to display left side first selection checkbox list */
                columnDefs={columnDefs}
                tableData={rowData}
                menu1={"Section"}
                menu2={"Section"}

                /** to display database values related to the api, section wise report */
                onSelectionChanged={onSelectionChanged}
                onClick={getEmployeeSectionType}
                columnDefMain={columnDefMain}
                tableDataMain={TableData}

                /** To display left side second selection checkbox when clicking first checkboxes */
                secondMenu={secondMenu}
                ShowSecondMenu={ShowSecondMenu}
                columnDefMenu2={columnDefSectionMenu}
                tableDataMenu2={empSubSect}
                onSelectionChangedMenu2={onSelectionChangedMenu2}
            />
        </Fragment>
    )
}

export default DeptSubSectionReport

