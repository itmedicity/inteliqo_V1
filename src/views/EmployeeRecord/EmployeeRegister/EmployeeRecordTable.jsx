import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import { FcPlus } from 'react-icons/fc'
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import EmployeeRecordTableView from './EmployeeRecordTableView'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
const EmployeeRecordTable = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [data, setdata] = useState(0)
    const dispatch = useDispatch()
    const employeeRecordList = useSelector((state) => {
        return state.getEmployeeRecordList.empRecordData;
    })
    useEffect(() => {
        // set the table data from reducx store to material table data
        if (Object.keys(employeeRecordList).length > 0) {
            setTableData(employeeRecordList)
        }
    }, [employeeRecordList])

    const {
        selectedDept,
        selectDeptSection,
        selectBranchMast,
    } = useContext(PayrolMasterContext)
    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        branch_slno: selectBranchMast
    }
    const postDataBranch = {
        branch_slno: selectBranchMast
    }
    const postDataDept = {
        branch_slno: selectBranchMast,
        dept_id: selectedDept,
    }

    const [columnDef] = useState([
        { headerName: 'Emp No', field: 'em_no', minWidth: 90, filter: true },
        //{ headerName: 'Emp Id ', field: 'em_id', minWidth: 90, filter: true },
        { headerName: 'Name', field: 'emp_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Branch', field: 'branch_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 90 },
        {
            headerName: 'Action', minWidth: 100, wrapText: true,
            cellRenderer: params =>
                <Tooltip title="Edit Employee" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 2, boxShadow: 0 }} size='sm' color='primary' onClick={() => ToProfile(params)}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                </Tooltip>
        },
    ])

    const ToProfile = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id } = data[0]
        history.push(`/Home/EmployeeRecordEdit/${em_no}/${em_id}`)
    }

    // Employee Record List
    const getEmployeeList = async (e) => {
        e.preventDefault()
        if (selectedDept !== 0 && selectDeptSection !== 0) {
            const result = await axioslogin.post('/empmast/getEmpDet', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
                setdata(1)
            }
        }
        else if (selectedDept === 0 && selectDeptSection === 0) {
            const result = await axioslogin.post('/empmast/empmaster/getdeptByBranch', postDataBranch)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
                setdata(1)
            }
        }
        else if (selectedDept !== 0 && selectDeptSection === 0) {
            const result = await axioslogin.post('/empmast/empmaster/getdeptByDept', postDataDept)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
                setdata(1)
            }
        }
        else {
            warningNofity("Choose All Option")
        }
    }
    const backtoEmployeeRegister = () => {
        history.push('/Home/EmployeeRecord')
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Record Edit"
                redirect={backtoEmployeeRegister}
            >
                <Paper square variant="outlined" elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, }}>
                        {/* First Row start */}
                        <Box sx={{ display: "flex", flexDirection: "row", }}>
                            <Box sx={{ display: "flex", flex: 2, p: 2 }} >
                                <DepartmentSelect style={SELECT_CMP_STYLE} />
                            </Box>
                            <Box sx={{ display: "flex", flex: 2, p: 2 }}>
                                <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                            </Box>
                            <Box sx={{ display: "flex", flex: 2, p: 2 }}>
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={getEmployeeList}
                                >
                                    <FcPlus className="text-info" size={30} />
                                </IconButton>
                            </Box>


                        </Box>
                        {/* First Row end */}
                    </Box>
                </Paper>


                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid columnDefs={columnDef} tableData={tableData} sx={{
                        height: 400,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
                </Paper>


                {/* <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-3">
                            <BrnachMastSelection style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={getEmployeeList}
                            >
                                <FcPlus className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="row">
                        {
                            data === 1 ? <EmployeeRecordTableView tableData={tableData} /> : null
                        }
                    </div>
                </div> */}
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeRecordTable