import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import QualificationTable from './QualificationTable'

const QualificationMast = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const [qualification, setQualification] = useState({
        qual_name: '',
        qual_status: false
    });

    const updateQaulstatus = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

    const { qual_name, qual_status } = qualification;
    const postData = {
        qual_name,
        qual_status: qual_status === true ? 1 : 0,
        create_user: employeeNumber()
    }

    // reset form
    const resetForm = {
        qual_name,
        qual_status: false
    }

    const submitQualification = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/qal', postData);
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            setQualification(resetForm);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            errorNofity(message);
        }
    }

    // reset to deault
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <h5>Qualification</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitQualification} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Qualification "
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="qual_name"
                                            value={qual_name}
                                            onChange={(e) => updateQaulstatus(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="qual_status"
                                                    color="primary"
                                                    value={qual_status}
                                                    checked={qual_status}
                                                    className="ml-2 "
                                                    onChange={(e) => updateQaulstatus(e)}
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
                            <QualificationTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QualificationMast
