import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { employeeNumber } from 'src/views/Constant/Constant';
import DepartmentSecTable from './DepartmentSecTable';

const DepartmentSecEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    // Department Select Context
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);

    // get and set state 
    const [setSecedetl, updatesetSecedetl] = useState({
        sect_name: '',
        authorization_incharge: false,
        authorization_hod: false,
        status: false
    });

    var { sect_name, authorization_incharge, authorization_hod, status } = setSecedetl;
    const { id } = useParams();
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
    useEffect(() => {
        const getSectionDetl = async () => {
            const result = await axioslogin.get(`/section/${id}`);
            const { success, data } = result.data;
            if (success === 2 || success === 0) {
                infoNofity('Somthing went wrong')
                return;
            }
            var { sect_name, dept_id, authorization_incharge, authorization_hod, status, dept_sub_sect } = data[0];
            authorization_incharge = authorization_incharge === 1 ? true : false;
            authorization_hod = authorization_hod === 1 ? true : false;
            status = status === 1 ? true : false;

            const editsecData = {
                sect_name,
                authorization_incharge,
                authorization_hod,
                status,
                dept_id: updateSelected(dept_id)
            }
            const checkboxdata = {
                general: dept_sub_sect === 1 ? true : false,
                ot: dept_sub_sect === 2 ? true : false,
                icu: dept_sub_sect === 3 ? true : false,
                er: dept_sub_sect === 4 ? true : false
            }
            updatesetSecedetl(editsecData);
            setdeptsubtype(checkboxdata)
        }
        getSectionDetl();
    }, [id, updateSelected])

    // update edit detils
    const getUpdatedsedInput = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        updatesetSecedetl({ ...setSecedetl, [e.target.name]: value })
    }

    const saveUpdateddeptSec = async (e) => {
        e.preventDefault();
        var { sect_name, authorization_incharge, authorization_hod, status } = setSecedetl;
        authorization_incharge = authorization_incharge === true ? 1 : 0;
        authorization_hod = authorization_hod === true ? 1 : 0;
        status = status === true ? 1 : 0;
        const updateData = {
            sect_name,
            authorization_incharge,
            authorization_hod,
            sect_status: status,
            dept_id: selectedDept,
            edit_user: employeeNumber(),
            sect_id: id,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0
        }
        await axioslogin.patch('/section', updateData)
            .then((response) => {
                const { success, message } = response.data;
                if (success === 0) {
                    errorNofity(message)
                } else if (success === 1) {
                    infoNofity(message)
                } else if (success === 3) {
                    infoNofity(message)
                } else if (success === 2) {
                    succesNofity(message, redTosection())
                }
            })
            .catch((response) => {
                const { message } = response.data;
                errorNofity(message);
            })
    }

    // redirect to the department section page
    const redTosection = () => {
        updateSelected(0)
        history.push('/Home/DeptSection');

    }

    return (
        <Fragment>
            <SessionCheck />
            <div className="card">
                <div className="card-header card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Department Section</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={saveUpdateddeptSec}  >
                                <TextField
                                    label="Department Seciotn Name"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="sect_name"
                                    value={sect_name}
                                    onChange={(e) => getUpdatedsedInput(e)}
                                />
                                <DepartmentSelect />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="authorization_incharge"
                                            color="primary"
                                            value={authorization_incharge}
                                            checked={authorization_incharge}
                                            className="ml-2"
                                            onChange={(e) => { getUpdatedsedInput(e) }}
                                        />
                                    }
                                    label="Authorization for Leave and OT (Incharge)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="authorization_hod"
                                            color="primary"
                                            value={authorization_hod}
                                            checked={authorization_hod}
                                            className="ml-2"
                                            onChange={(e) => { getUpdatedsedInput(e) }}
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
                                            name="status"
                                            color="primary"
                                            value={status}
                                            checked={status}
                                            className="ml-2"
                                            onChange={(e) => { getUpdatedsedInput(e) }}
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
                                            onClick={redTosection}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <DepartmentSecTable />
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default memo(DepartmentSecEdit)
