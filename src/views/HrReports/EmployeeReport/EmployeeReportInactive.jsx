import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core'
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
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import EmployeeInactiveTable from './EmployeeInactiveTable'

const EmployeeReportInactive = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [formData, setFormData] = useState({
        all: true,
        resigned: false,
        contractclose: false
    })
    const { all, resigned, contractclose } = formData
    const updateFormData = async (e) => {
        const d1 = {
            all: false,
            resigned: false,
            contractclose: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...d1, [e.target.name]: value })
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
    }
    const [data, setData] = useState(0)
    const [tableData, setTableData] = useState([]);
    const getInActiveEmployees = async () => {
        if (all === true) {
            const result = await axioslogin.post('/common/getInActiveEmp', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }
        else if (resigned === true) {
            const result = await axioslogin.post('/common/getResignedEmp', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }
        else if (contractclose === true) {
            const result = await axioslogin.post('/common/getContractCloseEmp', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }

    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="In Active Employee List"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <FormControlLabel
                                className="pb-0 mb-0"
                                control={
                                    <Checkbox
                                        name="all"
                                        color="secondary"
                                        value={all}
                                        checked={all}
                                        className="ml-2"
                                        onChange={(e) => updateFormData(e)}
                                    />
                                }
                                label="All"
                            />
                        </div>
                        <div className="col-md-2">
                            <FormControlLabel
                                className="pb-0 mb-0"
                                control={
                                    <Checkbox
                                        name="resigned"
                                        color="secondary"
                                        value={resigned}
                                        checked={resigned}
                                        className="ml-2"
                                        onChange={(e) => updateFormData(e)}
                                    />
                                }
                                label="Resigned"
                            />
                        </div>
                        <div className="col-md-2">
                            <FormControlLabel
                                className="pb-0 mb-0"
                                control={
                                    <Checkbox
                                        name="contractclose"
                                        color="secondary"
                                        value={contractclose}
                                        checked={contractclose}
                                        className="ml-2"
                                        onChange={(e) => updateFormData(e)}
                                    />
                                }
                                label="Contract Closed"
                            />
                        </div>
                    </div>
                    {
                        all === true || resigned === true || contractclose === true ? <div className="row g-1">
                            <div className="col-md-3">
                                <BrnachMastSelection style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-4" >
                                <DepartmentSelect style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-4">
                                <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-1">
                                <div>
                                    <IconButton
                                        aria-label="add"
                                        style={{ padding: '0rem' }}
                                        onClick={getInActiveEmployees}
                                    >
                                        <FcPlus className="text-info" size={30} />
                                    </IconButton>
                                </div>
                            </div>
                        </div> : null
                    }
                    <div className="col-md-12">
                        {
                            data === 1 && all === true ? <EmployeeInactiveTable
                                tableData={tableData}
                            /> : null
                        }
                        {
                            data === 1 && resigned === true ? <EmployeeInactiveTable
                                tableData={tableData}
                            /> : null
                        }
                        {
                            data === 1 && contractclose === true ? <EmployeeInactiveTable
                                tableData={tableData}
                            /> : null
                        }
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeReportInactive