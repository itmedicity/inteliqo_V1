import { IconButton } from '@mui/material';
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import AllowanceBulkUpdation from './AllowanceBulkUpdation';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import EarnType from 'src/views/CommonCode/EarnType';
import GetWageType from 'src/views/CommonCode/GetWageType';
import SalaryBulkUpdationMainCard from '../EmployeeFile/EmpFileComponent/SalaryBulkUpdationMainCard';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const AllowanceDeducation = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [EmpAllowance, setEmployeeAllowance] = useState([])
    const {
        selectedDept,
        selectDeptSection,
        earntypeDatacontext,
        selectWageDescription
    } = useContext(PayrolMasterContext)
    const postData = {
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        em_earning_type: earntypeDatacontext,
        em_salary_desc: selectWageDescription
    }
    //getting employee Allowance Details
    const getEmployeeAllowance = async (e) => {
        e.preventDefault();
        if (selectedDept !== 0 && selectDeptSection !== 0 && earntypeDatacontext !== 0 && selectWageDescription !== 0) {
            const result = await axioslogin.post('/common/getEmpAllowance', postData)
            const { success, data } = result.data
            if (success === 1) {
                setEmployeeAllowance(data)
            }
            else {
                warningNofity("Error Occured")
            }
        }
        else {
            warningNofity("Choose All Option")
        }
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Allowance & Deduction"
                redirect={RedirectToProfilePage}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-1 mb-1">
                                    <div className="col-md-3">
                                        <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <DepartmentSectionSelect select="Department Section" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <EarnType select="Earning / Deduction" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-2">
                                        <GetWageType select="Wage Description" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-1 text-center">
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                            onClick={getEmployeeAllowance}
                                        >
                                            <MdOutlineAddCircleOutline className="text-info" size={30} />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <SalaryBulkUpdationMainCard wageName="Wages Bulk Updation" >
                                            <div>
                                                {
                                                    EmpAllowance.map((val, index) => {
                                                        return <AllowanceBulkUpdation value={val} key={index} />
                                                    })
                                                }
                                            </div>
                                        </SalaryBulkUpdationMainCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default AllowanceDeducation
