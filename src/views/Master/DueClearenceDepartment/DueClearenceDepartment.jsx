import { IconButton } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import DeptSecSelectAuth from 'src/views/CommonCode/DeptSecSelectAuth';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DueClearenceCard from './DueClearenceCard';
import DueClearenceDepartmentTable from './DueClearenceDepartmentTable';

const DueClearenceDepartment = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [arraydata, arraydataset] = useState([])
    const { selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectDeptSec, updateDeptSec, deptname, employeedetails
    } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const getDepartmentdata = () => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            deptcode: selectDeptSec,
            deptdesc: deptname
        }
        const newdatas = [...arraydata, newdata]
        arraydataset(newdatas)
    }
    //removing table data
    const onClickdelete = (checkid) => {
        const newdata = [...arraydata]
        const index = arraydata.findIndex((arraid) => arraid.id === checkid)
        newdata.splice(index, 1);
        arraydataset(newdata)
    }
    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        due_dept_code: arraydata,
        updated_user: em_id
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/Duedepartment', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(count + 1)
            updateSelected(0)
            updateDepartmentSection(0)
            updateDeptSec(0)
            arraydataset([])
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDP")
        }
    }
    const RedirectToProfilePage = () => {
        history.push('/Home/Settings')
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Due Clearence Department"
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
                            <div className="col-md-11">
                                <DeptSecSelectAuth select="Clearence Department" style={SELECT_CMP_STYLE} />
                            </div>
                            <div className="col-md-1">
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={getDepartmentdata}
                                >
                                    <MdOutlineAddCircleOutline className="text-info" size={30} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <DueClearenceCard />
                        <div>
                            {
                                arraydata.map((val, index) => {
                                    return (
                                        <li className="list-group-item py-0" key={val.id}>
                                            <div className="d-flex justify-content-between" >
                                                <div className="col-md-1 text-start">{val.deptcode}</div>
                                                <div className="col-md-4 text-start">{val.deptdesc}</div>
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
                        <DueClearenceDepartmentTable update={count} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
};

export default DueClearenceDepartment;
