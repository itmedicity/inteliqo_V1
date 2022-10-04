import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import EmpDesignationtable from './EmpDesignationtable'

const EmpDesignationtype = () => {
    const classess = useStyles();
    const history = useHistory();
    const [formData, getFormData] = useState({
        inst_emp_type: '',
        inst_emp_status: false
    });
    const [count, setCount] = useState(0);
    const { inst_emp_type, inst_emp_status } = formData;
    const updateFormDatatoState = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getFormData({ ...formData, [e.target.name]: value });
    }

    const postFormdata = {
        inst_emp_type,
        inst_emp_status: inst_emp_status === true ? 1 : 0,
        create_user: employeeNumber()
    }
    const resetForm = {
        inst_emp_type: '',
        inst_emp_status: false
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/inst', postFormdata);
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            getFormData(resetForm);
        } else if (success === 0 || success === 2) {
            infoNofity(message);
        }
        else if (success === 7) {
            errorNofity(message)
        }
        else {
            errorNofity("Error! Please Contact EDP")
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <h5>Employee Institution Type</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classess.root} onSubmit={submitFormData}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Employee Institution Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="inst_emp_type"
                                            value={inst_emp_type}
                                            onChange={(e) => updateFormDatatoState(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="inst_emp_status"
                                                    color="primary"
                                                    value={inst_emp_status}
                                                    checked={inst_emp_status}
                                                    className="ml-2 "
                                                    onChange={(e) => updateFormDatatoState(e)}
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
                            <EmpDesignationtable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmpDesignationtype
