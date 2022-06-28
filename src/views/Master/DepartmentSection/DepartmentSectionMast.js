import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import DepartmentSecTable from './DepartmentSecTable'


const DepartmentSectionMast = () => {
    const history = useHistory();
    // Material Class Call
    const classes = useStyles();
    //    Department Selection Context Calling 
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);
    //  State Update
    const [deptSectionName, updateSectionName] = useState('');
    const [incharge_status, updateincharge] = useState(false);
    const [hod_status, updatehod] = useState(false);
    const [septSectionStatus, updateSectionStat] = useState(false);
    const inchargestatus = incharge_status === true ? 1 : 0;
    const hodstatus = hod_status === true ? 1 : 0;
    const sectionStatus = septSectionStatus === true ? 1 : 0;
    const [count, setCount] = useState(0);


    const [deptsubtype, setdeptsubtype] = useState({
        general: true,
        ot: false,
        icu: false,
        er: false,
    })
    const { general, ot, icu, er } = deptsubtype
    const updateSectionStatus = async (e) => {
        const ob1 = {
            general: false,
            ot: false,
            icu: false,
            er: false,
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdeptsubtype({ ...ob1, [e.target.name]: value })
    }
    //department sub sectionvalue
    //general-1,ot-2,icu-3,er-4
    const deptSectValus = {
        sect_name: deptSectionName,
        dept_id: selectedDept,
        authorization_incharge: inchargestatus,
        authorization_hod: hodstatus,
        sect_status: sectionStatus,
        create_user: employeeNumber(),
        dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0
    }
    // reset from fn
    const resetSectionDept = () => {
        updateSectionName('')
        updateincharge(false)
        updatehod(false)
        updateSectionStat(false)
        updateSelected(0)
    }
    // Submit form data
    const submitDeptSectionMast = async (e) => {
        e.preventDefault();
        await axioslogin.post('/section', deptSectValus)
            .then((res) => {
                const response = res.data;
                if (response.success === 2) {
                    infoNofity(response.message)
                } else if (response.success === 0) {
                    errorNofity(response.message);
                    resetSectionDept();
                } else if (response.success === 1) {
                    succesNofity(response.message);
                    resetSectionDept();
                    setCount(count + 1)
                }
            })
            .catch((error) => {
                errorNofity(error);
            });

    }
    // redirect fn
    const redirectToSetting = () => {
        history.push('/Home/Settings');
        updateSelected(0)
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Department Section</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitDeptSectionMast} >
                                <TextField
                                    label="Department Seciotn Name"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    value={deptSectionName}
                                    onChange={(e) => updateSectionName(e.target.value)}
                                />
                                <DepartmentSelect />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value={incharge_status}
                                            checked={incharge_status}
                                            className="ml-2"
                                            onChange={(e) => { updateincharge(e.target.checked) }}
                                        />
                                    }
                                    label="Authorization for Leave and OT (Incharge)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value={hod_status}
                                            checked={hod_status}
                                            className="ml-2"
                                            onChange={(e) => { updatehod(e.target.checked) }}
                                        />
                                    }
                                    label="Authorization for Leave and OT (HOD)"
                                />
                                {/* Departmentsubsection */}
                                <div className="row" >
                                    <div className=" col-md-12" >
                                        <div className="row" >
                                            <div className="col-md-2" >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            name="icu"
                                                            value={icu}
                                                            checked={icu}
                                                            className="ml-2"
                                                            onChange={(e) => { updateSectionStatus(e) }}
                                                        />
                                                    }
                                                    label="ICU"
                                                />
                                            </div>
                                            <div className=" col-md-2" >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            name="er"
                                                            value={er}
                                                            checked={er}
                                                            className="ml-2"
                                                            onChange={(e) => { updateSectionStatus(e) }}
                                                        />
                                                    }
                                                    label="ER"
                                                />
                                            </div>
                                            <div className=" col-md-2" >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            name="ot"
                                                            value={ot}
                                                            checked={ot}
                                                            className="ml-2"
                                                            onChange={(e) => { updateSectionStatus(e) }}
                                                        />
                                                    }
                                                    label="OT"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            name="general"
                                                            value={general}
                                                            checked={general}
                                                            className="ml-0"
                                                            onChange={(e) => { updateSectionStatus(e) }}
                                                        />
                                                    }
                                                    label="General"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value={septSectionStatus}
                                            checked={septSectionStatus}
                                            className="ml-2"
                                            onChange={(e) => { updateSectionStat(e.target.checked) }}
                                        />
                                    }
                                    label="Department Section Status"
                                />

                                <div className="row col-md-12" >
                                    <div className="col-md-6">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            type="Submit"
                                            className="mb-2">
                                            Save
                                        </Button>
                                    </div>
                                    <div className="col-md-6">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            onClick={redirectToSetting}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <DepartmentSecTable message={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DepartmentSectionMast
