import { IconButton } from '@material-ui/core'
import React, { Fragment, useContext, useState, useEffect } from 'react'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import EmployeeInactiveTable from './EmployeeInactiveTable'
import { useHistory } from 'react-router-dom';


const EmployeeInactiveHR = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const {
        selectedDept,
        selectDeptSection,
        selectBranchMast,
    } = useContext(PayrolMasterContext)
    useEffect(() => {
        const getempdetl = async () => {
            if (selectBranchMast !== 0 && selectedDept !== 0 && selectDeptSection !== 0) {
                const postData = {
                    em_department: selectedDept,
                    em_dept_section: selectDeptSection,
                    em_branch: selectBranchMast
                }
                const result = await axioslogin.post("/plan/create", postData);
                const { success, data } = result.data
                if (success === 1) {
                    setempData(data)

                }
                else {
                    warningNofity("There is No employees In This Department And Department Section")

                }
            }
        }
        getempdetl()
    }, [count, selectedDept, selectDeptSection, selectBranchMast])

    const [state, setState] = useState(0)
    const [empData, setempData] = useState([])
    const getemployeedetails = async () => {
        if (selectedDept === 0 && selectDeptSection === 0) {
            warningNofity("Please Select All Option")
        }
        else {
            setState(1)
        }
    }
    const RedirectToProfilePage = async () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee InActive"
                redirect={RedirectToProfilePage}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <BrnachMastSelection style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <DepartmentSelect style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-1 text-center">
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                            onClick={getemployeedetails}
                                        >
                                            <MdOutlineAddCircleOutline className="text-info" size={30} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {state === 1 || count > 0 ? < EmployeeInactiveTable empData={empData} selectedDept={selectedDept}
                                    selectDeptSection={selectDeptSection}
                                    count={count}
                                    setCount={setCount} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>

        </Fragment>
    )
}

export default EmployeeInactiveHR