import { IconButton } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import EmployeeReportTable from './EmployeeReportTable'

const EmployeeReport = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Reports`)
    }
    const [data, setData] = useState(0)
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        date_of_join_start: '',
        date_of_join_end: ''
    })
    const { date_of_join_start, date_of_join_end } = formData
    const updateDateOfJoin = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const {
        selectBranchMast,
        selectedDept,
        selectDeptSection
    } = useContext(PayrolMasterContext)
    const postData = {
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        date_of_join_start: date_of_join_start,
        date_of_join_end: date_of_join_end
    }
    const getActiveEmployees = async () => {
        // setData(1)
        const getActiveEmployee = async () => {
            const result = await axioslogin.post('/common/getActiveEmp', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setData(1)
            }
        }
        getActiveEmployee()
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Active Employees"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <BrnachMastSelection style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2" >
                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_start"
                                value={date_of_join_start}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            />
                        </div>
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_end"
                                value={date_of_join_end}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            />
                        </div>
                        <div className="col-md-1">
                            <div>
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={getActiveEmployees}
                                >
                                    <FcPlus className="text-info" size={30} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {
                            data === 1 ? <EmployeeReportTable
                                tableData={tableData}
                            /> : null
                        }
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeReport