import React, { Fragment, memo, useEffect, useContext, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory, useParams } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect'
import TextInput from 'src/views/Component/TextInput'
import OTWageMastTable from './OTWageMastTable'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios'
import { PayrolMasterContext } from 'src/Context/MasterContext'

const OTWageTableEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [count, setcount] = useState(0)
    const { selectEmpName, updateSelectEmpName, selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection } = useContext(PayrolMasterContext)
    const [data, setData] = useState({
        emp__ot: '',
        ot_amount: ''
    })

    //Destructuring
    const { ot_amount } = data;
    const updateOtAmount = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setData({ ...data, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/OtWage/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_id, em_department, em_dept_section, ot_amount } = data[0]
                const frmdata = {
                    emp__ot: em_id,
                    ot_amount: ot_amount
                }
                updateSelected(em_department)
                updateDepartmentSection(em_dept_section)
                updateSelectEmpName(em_id)
                setData(frmdata)
            }
        }
        getCompany()
    }, [id, updateSelected, selectedDept, updateDepartmentSection, selectDeptSection, updateSelectEmpName, selectEmpName])

    const patchData = {
        emp__ot: '1',
        ot_amount: ot_amount,
        em_id: selectEmpName
    }
    const resetfrm = {
        emp__ot: '',
        ot_amount: ''
    }
    const submitOtWage = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/OtWage/edit', patchData)
        const { message, success } = result.data;
        if (success === 2) {
            setData(resetfrm)
            setcount(count + 1)
            succesNofity(message);
            history.push('/Home/OTWageMaster');
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }


    const toSettings = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Over Time Wage"
                redirect={toSettings}
                submit={submitOtWage}
            >
                <div className="col-md-12">
                    <div className="row g-2">
                        <div className="col-md-4">
                            <div className="col-md-12">
                                <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-12">
                                <DepartmentSectionSelect select="Department Section" style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-12">
                                <EmployeeNameSelect select="Department Section" style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-6">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Over Time Amount"
                                    value={ot_amount}
                                    name="ot_amount"
                                    changeTextValue={(e) => updateOtAmount(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <OTWageMastTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default memo(OTWageTableEdit)
