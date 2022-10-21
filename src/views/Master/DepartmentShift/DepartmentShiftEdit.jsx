import { IconButton } from '@material-ui/core';
import React, { Fragment, useContext, useEffect } from 'react'
import { useState } from 'react';
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import ShiftSelect from 'src/views/CommonCode/ShiftSelect';
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DepartmentShiftCard from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DepartmentShiftCard';
import DepartmentShiftTable from './DepartmentShiftTable';
import { useParams, useHistory } from 'react-router'
import { useCallback } from 'react';
import { ToastContainer } from 'react-bootstrap';

const DepartmentShiftEdit = () => {
    const { id } = useParams()
    const history = useHistory()
    const [arraydata, arraydataset] = useState([])
    const [defValue, setdefValue] = useState(0)
    const [notappValue, setnotappValue] = useState(0)
    const
        {
            selectedDept, updateSelected,
            selectDeptSection, updateDepartmentSection,
            getshifts, updateShifts, shiftnameselect
        } = useContext(PayrolMasterContext)


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
        return () => {
            setdefValue([])
            setnotappValue([])
        }
    }, [])

    //get selected shift details from database
    useEffect(() => {
        const getdepartmentShiftData = async () => {
            const result = await axioslogin.get(`/departmentshift/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dept_id, sect_id, shft_code } = data[0]
                const obj = JSON.parse(shft_code);
                updateSelected(dept_id)
                updateDepartmentSection(sect_id)
                arraydataset(obj.filter(val => val.shiftcode !== 1000 && val.shiftcode !== 0))
            }
            else {
                updateSelected(0)
                updateDepartmentSection(0)
                arraydataset([])
            }
        }
        getdepartmentShiftData()

    }, [selectedDept, updateDepartmentSection, updateSelected, id])

    //adding shifts to table
    const getShiftData = () => {
        if (notappValue === null && defValue === null) {
            warningNofity("Please Add Default Shift and Not Applicable in common setting")
        }
        else {
            if ((getshifts === defValue)) {
                warningNofity("Default Already Exist!!")
            }
            else if (getshifts === notappValue) {
                warningNofity("NA Already Exist!!")
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
    const submitFormData = useCallback((e) => {
        e.preventDefault();
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
        const newdatas = [...arraydata, defautdata, noappdata]
        const postData = {
            dept_id: selectedDept,
            sect_id: selectDeptSection,
            shft_code: newdatas,
            updated_user: employeeNumber(),
            dept_shift_Slno: id,
        }
        const UpdateSubmit = async (postData) => {
            const result = await axioslogin.patch('/departmentshift', postData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                updateSelected(0)
                updateDepartmentSection(0)
                updateShifts(0)
                arraydataset([])
                setnotappValue(0)
                setdefValue(0)
                history.push('/Home/DepartmentShift')
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        if (arraydata !== 0) {
            UpdateSubmit(postData)
        }
    }, [arraydata])

    const RedirectToProfilePage = () => {
        history.push('/Home/Settings')
    }
    return (
        <Fragment>
            <ToastContainer />
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
                        <DepartmentShiftTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default DepartmentShiftEdit
