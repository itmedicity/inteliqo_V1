import { IconButton } from '@material-ui/core';
import React, { Fragment, useContext, useEffect } from 'react'
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

const DepartmentShiftMast = () => {
    const history = useHistory()
    const [arraydata, arraydataset] = useState([])
    const [count, setCount] = useState(0)
    const [defValue, setdefValue] = useState(0)
    const [notappValue, setnotappValue] = useState(0)
    const
        {
            selectedDept, updateSelected,
            selectDeptSection, updateDepartmentSection,
            getshifts, updateShifts, shiftnameselect

        } = useContext(PayrolMasterContext)

    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        shft_code: arraydata,
        updated_user: employeeNumber()
    }
    //getting common setting data
    useEffect(() => {
        const getSettingsData = async () => {
            const result = await axioslogin.get('/commonsettings')
            const { success, data } = result.data;
            const { default_shift, notapplicable_shift } = data[0]
            if (success === 1) {
                setdefValue(default_shift)
                setnotappValue(notapplicable_shift)
            }
        }
        getSettingsData()
    })

    //adding shifts to table
    const getShiftData = () => {
        if (notappValue === null && defValue === null) {
            warningNofity("Please Add Default Shift and Not Applicable in common setting")
        }
        else {
            if (arraydata.some(key => key.shiftcode === getshifts)) {
                warningNofity("Shift Time Already Added!!")
            }
            else {
                // checking default shift and not applicable 
                // is present in arraydata, if it is
                // present add new selected shift
                if (arraydata.some(key => key.shiftcode === defValue) && arraydata.some(key => key.shiftcode === notappValue)) {
                    const newdata = {
                        id: Math.ceil(Math.random() * 1000),
                        shiftcode: getshifts,
                        shiftDescription: shiftnameselect,
                    }
                    const newdatas = [...arraydata, newdata]
                    arraydataset(newdatas)
                }
                else {
                    //adding selected shift first time with default and not applicable
                    const defautdata = {
                        id: Math.ceil(Math.random() * 1000),
                        shiftcode: defValue,
                        shiftDescription: 'default',
                    }
                    const noappdata = {
                        id: Math.ceil(Math.random() * 1000),
                        shiftcode: notappValue,
                        shiftDescription: 'NA',
                    }
                    const newdata = {
                        id: Math.ceil(Math.random() * 1000),
                        shiftcode: getshifts,
                        shiftDescription: shiftnameselect,
                    }
                    const newdatas = [...arraydata, defautdata, noappdata, newdata]
                    arraydataset(newdatas)
                }
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
            infoNofity("Shift Is Already Assigned To This Section")
            updateSelected(0)
            updateDepartmentSection(0)
            updateShifts(0)
            arraydataset([])
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
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
