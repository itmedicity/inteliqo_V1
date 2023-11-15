import { IconButton } from '@material-ui/core';
import React, { Fragment, useContext } from 'react'
import { useState } from 'react';
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import ShiftSelect from 'src/views/CommonCode/ShiftSelect';
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DepartmentShiftCard from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DepartmentShiftCard';
import DepartmentShiftTable from './DepartmentShiftTable';
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const DepartmentShiftMast = () => {
    const history = useHistory()
    const [arraydata, arraydataset] = useState([])
    const [count, setCount] = useState(0)
    const
        {
            selectedDept, updateSelected,
            selectDeptSection, updateDepartmentSection,
            getshifts, updateShifts, shiftnameselect

        } = useContext(PayrolMasterContext)

    const state = useSelector((state) => state.getCommonSettings, _.isEqual)

    const { notapplicable_shift, default_shift, week_off_day } = state;

    //adding shifts to table
    const getShiftData = () => {
        if (notapplicable_shift === null && default_shift === null && week_off_day === null) {
            warningNofity("Please Add Default Shift and Not Applicable in common setting")
        }
        else {
            if ((getshifts === default_shift)) {
                warningNofity("Default Already Exist!!")
            }
            else if (getshifts === notapplicable_shift) {
                warningNofity("NA Already Exist!!")
            }
            else if (getshifts === week_off_day) {
                warningNofity("Week Off Already Exist")
            }
            else if (arraydata.some(key => key.shiftcode === getshifts)) {
                warningNofity("Shift Time Already Added!!")
            }
            else {
                const newdata = {
                    id: Math.ceil(Math.random() * 1000),
                    shiftcode: getshifts,
                    shiftDescription: shiftnameselect,
                }
                const newdatas = [...arraydata, newdata]
                arraydataset(newdatas)
            }
        }
    }

    //removing shift from table
    const onClickdelete = (checkid) => {
        const newdata = [...arraydata]
        const index = arraydata.findIndex((arraid) => arraid.id === checkid)
        newdata.splice(index, 1);
        arraydataset(newdata)
    }


    //saving department shift master
    const submitFormData = async (e) => {
        e.preventDefault();
        const defautdata = {
            id: Math.ceil(Math.random() * 1000),
            shiftcode: default_shift,
            shiftDescription: 'default',
        }
        const noappdata = {
            id: Math.ceil(Math.random() * 1000),
            shiftcode: notapplicable_shift,
            shiftDescription: 'NA',
        }
        const weekoffdata = {
            id: Math.ceil(Math.random() * 1000),
            shiftcode: week_off_day,
            shiftDescription: 'WOFF',
        }
        const newdatas = [...arraydata, defautdata, noappdata, weekoffdata]

        const postData = {
            dept_id: selectedDept,
            sect_id: selectDeptSection,
            shft_code: newdatas,
            updated_user: employeeNumber()
        }

        const result = await axioslogin.post('/departmentshift', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(count + 1)
            updateSelected(0)
            updateDepartmentSection(0)
            updateShifts(0)
            arraydataset([])
        }
        else if (success === 0) {
            infoNofity("Department Already Mapped, Please Edit!! ")
            updateSelected(0)
            updateDepartmentSection(0)
            updateShifts(0)
            arraydataset([])
        }
        else {
            errorNofity(message)
        }
    }
    const RedirectToProfilePage = () => {
        history.push('/Home/Settings')
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Department Shift Master"
                redirect={RedirectToProfilePage}
                submit={submitFormData}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="col-md-12">
                            <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-12">
                            <DepartmentSectionSelect select="Department Section" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="row g-1">
                            <div className="col-md-10">
                                <ShiftSelect select="Shift" style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-2">
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={getShiftData}
                                >
                                    <MdOutlineAddCircleOutline className="text-info" size={30} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <DepartmentShiftCard DepartmentShift="Department Shifts" />
                        <div>
                            {
                                arraydata.map((val, index) => {
                                    return (
                                        <li className="list-group-item py-0" key={val.id}>
                                            <div className="d-flex justify-content-between" >
                                                <div className="col-md-1 text-start">{val.shiftcode}</div>
                                                <div className="col-md-2 text-start">{val.shiftDescription}</div>
                                                <div className="col-md-1  text-start">
                                                    <IconButton
                                                        aria-label="add"
                                                        style={{ padding: '0rem' }}
                                                        onClick={(e) => {
                                                            onClickdelete(val.id)
                                                        }}
                                                    >
                                                        <MdDeleteSweep className="text-info" size={25} />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <DepartmentShiftTable update={count} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default DepartmentShiftMast
