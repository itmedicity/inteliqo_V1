import { IconButton } from '@material-ui/core';
import React, { Fragment, useContext, useEffect } from 'react'
import { useState } from 'react';
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import ShiftSelect from 'src/views/CommonCode/ShiftSelect';
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DepartmentShiftCard from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/DepartmentShiftCard';
import DepartmentShiftTable from './DepartmentShiftTable';
import { useParams, useHistory } from 'react-router'

const DepartmentShiftEdit = () => {
    const { id } = useParams()
    const history = useHistory()
    const [arraydata, arraydataset] = useState([])
    const
        {
            selectedDept, updateSelected,
            selectDeptSection, updateDepartmentSection,
            getshifts, updateShifts, shiftnameselect
        } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getdepartmentShiftData = async () => {
            const result = await axioslogin.get(`/departmentshift/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dept_id, sect_id, shft_code } = data[0]
                const obj = JSON.parse(shft_code);
                updateSelected(dept_id)
                updateDepartmentSection(sect_id)
                arraydataset(obj)

            }
        }
        getdepartmentShiftData()

    }, [selectedDept, updateDepartmentSection, updateSelected, id])
    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        shft_code: arraydata,
        updated_user: employeeNumber(),
        dept_shift_Slno: id,
    }
    //adding shifts to table
    const getShiftData = () => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            shiftcode: getshifts,
            shiftDescription: shiftnameselect,
        }
        const newdatas = [...arraydata, newdata]
        arraydataset(newdatas)
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
        const result = await axioslogin.patch('/departmentshift', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            updateSelected(0)
            updateDepartmentSection(0)
            updateShifts(0)
            arraydataset([])
            history.push('/Home/DepartmentShift')

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
                        <DepartmentShiftTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default DepartmentShiftEdit
