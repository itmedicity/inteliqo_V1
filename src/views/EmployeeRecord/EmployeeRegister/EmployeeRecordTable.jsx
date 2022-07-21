import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { IconButton } from '@mui/material'
import { FcPlus } from 'react-icons/fc'
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import EmployeeRecordTableView from './EmployeeRecordTableView'
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
    // Employee Record List
    const getEmployeeList = async (e) => {
        e.preventDefault()
        if (selectedDept !== 0 && selectDeptSection !== 0 && selectBranchMast !== 0) {
            const result = await axioslogin.post('/empmast/getEmpDet', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
                setdata(1)
            }
        }
        else if (selectedDept === 0 && selectDeptSection === 0 && selectBranchMast !== 0) {
            const result = await axioslogin.post('/empmast/empmaster/getdeptByBranch', postDataBranch)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
                setdata(1)
            }
        }
        else if (selectedDept !== 0 && selectDeptSection === 0 && selectBranchMast !== 0) {
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
                <div className="col-md-12">
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
                    <div className="row">{
                        data === 1 ? <EmployeeRecordTableView tableData={tableData} /> : null
                    }
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeRecordTable