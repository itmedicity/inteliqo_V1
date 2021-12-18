import React, { Fragment, useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory'
import EmployeeInstitutiontype from 'src/views/CommonCode/EmployeeInstitutiontype'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import EmpCompanyTable from './EmployeeFileTable/EmpCompanyTable'

const EmployeeCompany = () => {
    const history = useHistory()
    const { id, no } = useParams();
    const { selectBranchMast, updateBranchSelected,
        selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectInstiType, updateInstituteSeleted,
        getemployeecategory, udateemployeecategory
    } = useContext(PayrolMasterContext)
    const [count, setcount] = useState(0)
    const [company, setcompany] = useState(0)

    //Get data
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_dept_section, em_institution_type, em_category } = data[0]
                updateBranchSelected(em_branch)
                updateSelected(em_department)
                updateDepartmentSection(em_dept_section)
                updateInstituteSeleted(em_institution_type)
                udateemployeecategory(em_category)
                setcompany(em_category)
            }
        }
        getCompany()
    }, [id, updateBranchSelected, updateSelected, selectedDept, updateDepartmentSection, updateInstituteSeleted, udateemployeecategory])

    //post Data
    const updateData = {
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        em_institution_type: selectInstiType,
        com_category: company,
        com_category_new: getemployeecategory,
        em_category: getemployeecategory,
        create_user: employeeNumber(),
        edit_user: employeeNumber(),
        em_id: no,
        em_no: id,
    }
    const reset = () => {
        updateBranchSelected(0)
        updateSelected(0)
        updateDepartmentSection(0)
        updateInstituteSeleted(0)
        udateemployeecategory(0)
    }

    //update Data
    const submitCompany = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/empmast/company', updateData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setcount(count + 1)
            reset()
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Redirect
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Company Information"
                redirect={RedirectToProfilePage}
                submit={submitCompany}
            >
                <div className="row g-2">
                    <div className="col-md-4">
                        <div className="row g-2">
                            <div className="col-md-12">
                                <BrnachMastSelection
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <DepartmentSelect
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <DepartmentSectionSelect
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <EmployeeInstitutiontype
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <EmployeeCategory
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <EmpCompanyTable update={count} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default EmployeeCompany
