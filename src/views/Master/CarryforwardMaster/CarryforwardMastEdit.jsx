import React, { Fragment, useContext, useState, useEffect, } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import EmployeType from 'src/views/CommonCode/EmployeType'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import CarryforwardTable from './CarryforwardTable'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
const CarryforwardMastEdit = () => {
    const history = useHistory();
    const { id } = useParams()
    const { getDeptSection, updateDeptSection,
        selectEmployeeType, updateEmployeetype } = useContext(PayrolMasterContext)
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [carry, setCarry] = useState({
        dept_sec: '',
        emp_type: '',
        carry_hl: false,
        carry_cl: false,
        carry_el: false,
        carry_sl: false
    })

    const { carry_hl, carry_cl, carry_el, carry_sl } = carry

    const updateCarryForward = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCarry({ ...carry, [e.target.name]: value })
    }
    //Get data by ID
    useEffect(() => {
        const getBranch = async () => {
            const result = await axioslogin.get(`/carryforward/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dept_sec, emp_type, carry_hl, carry_cl, carry_el, carry_sl } = data[0]
                const frmdata = {
                    dept_sec: updateDeptSection(dept_sec),
                    emp_type: updateEmployeetype(emp_type),
                    carry_hl: carry_hl === 1 ? true : false,
                    carry_cl: carry_cl === 1 ? true : false,
                    carry_el: carry_el === 1 ? true : false,
                    carry_sl: carry_sl === 1 ? true : false
                }
                setCarry(frmdata)
            }
        }
        getBranch()
    }, [id])

    const patchdata = {
        dept_sec: getDeptSection,
        emp_type: selectEmployeeType,
        carry_hl: carry_hl === true ? 1 : 0,
        carry_cl: carry_cl === true ? 1 : 0,
        carry_el: carry_el === true ? 1 : 0,
        carry_sl: carry_sl === true ? 1 : 0,
        edit_user: em_id,
        carry_slno: id
    }

    const resetfrm = {
        dept_sec: '',
        emp_type: '',
        carry_hl: false,
        carry_cl: false,
        carry_el: false,
        carry_sl: false
    }
    const reset = () => {
        updateDeptSection(0)
        updateEmployeetype(0)
    }

    const submitUpdation = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/carryforward', patchdata)
        const { message, success } = result.data;
        if (success === 2) {
            setCarry(resetfrm);
            reset();
            history.push('/Home/CarryForwardSetting');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    const RedirectToProfilePage = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="Carry Forward Leave Settings"
                redirect={RedirectToProfilePage}
                submit={submitUpdation}
            >
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="col-md-12 ">
                                <DeptSectionMastSelect style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-12 pt-2">
                                <EmployeType style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="carry_hl"
                                                    color="primary"
                                                    value={carry_hl}
                                                    checked={carry_hl}
                                                    className="ml-2"
                                                    onChange={(e) => updateCarryForward(e)}
                                                />
                                            }
                                            label="National Holiday"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="carry_cl"
                                                    color="primary"
                                                    value={carry_cl}
                                                    checked={carry_cl}
                                                    className="ml-2"
                                                    onChange={(e) => updateCarryForward(e)}
                                                />
                                            }
                                            label="Casual Leave"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="carry_el"
                                                    color="primary"
                                                    value={carry_el}
                                                    checked={carry_el}
                                                    className="ml-2"
                                                    onChange={(e) => updateCarryForward(e)}
                                                />
                                            }
                                            label="Earn Leave"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="carry_sl"
                                                    color="primary"
                                                    value={carry_sl}
                                                    checked={carry_sl}
                                                    className="ml-2"
                                                    onChange={(e) => updateCarryForward(e)}
                                                />
                                            }
                                            label="Sick Leave"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <CarryforwardTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSaveClose>
        </Fragment >
    )
}

export default CarryforwardMastEdit