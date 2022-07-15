import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { employeeNumber } from 'src/views/Constant/Constant';
import EmployeeTypeTable from 'src/views/Master/EmployeeType/EmployeeTypeTable';

const EmployeeTypeMast = () => {

    const classes = useStyles();
    const history = useHistory();
    const [count, updcount] = useState(0);
    // define the form state
    const [empTypedetl, setEmpType] = useState({
        empType: '',
        elApplicable: false
    });
    // reset form
    const resetForm = {
        empType: '',

        elApplicable: false
    }
    // update form state
    const updateStateFormInput = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setEmpType({ ...empTypedetl, [e.target.name]: value })
    }
    var { empType, elApplicable } = empTypedetl;
    elApplicable = elApplicable === true ? 1 : 0;
    // form state
    const empUpdatedData = {
        emptype_name: empType,
        el_aplicable: elApplicable,
        create_user: employeeNumber()
    }
    // Submit Api Call
    const onSubmitEmployeetype = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/emptype', empUpdatedData);
        const { success, message } = result.data;
        if (success === 2 || success === 0 || success === 7) {
            infoNofity(message);
        } else {
            succesNofity(message);
            updcount(count + 1);
            setEmpType(resetForm);
        }
    }
    // redirect to setting
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5 >Employee Type</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={onSubmitEmployeetype} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Employee Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="empType"
                                            value={empType}
                                            onChange={(e) => updateStateFormInput(e)}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="elApplicable"
                                                    color="secondary"
                                                    value={elApplicable}
                                                    checked={elApplicable === 1 ? true : false}
                                                    className="ml-2"
                                                    onChange={(e) => updateStateFormInput(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                    <div className="row col-md-12">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="ml-2"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                className="ml-2"
                                                onClick={toSettings}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <EmployeeTypeTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmployeeTypeMast
