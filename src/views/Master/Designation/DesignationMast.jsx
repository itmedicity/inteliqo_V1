import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import DesignationTable from './DesignationTable'

const DesignationMast = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const [designation, setDesignation] = useState({
        desg_name: '',
        desg_status: false
    });
    const { desg_name, desg_status } = designation;
    // update state to feild
    const updateDesignationfld = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDesignation({ ...designation, [e.target.name]: value })
    }

    const postDesigData = {
        desg_name,
        desg_status: desg_status === true ? 1 : 0,
        create_user: employeeNumber()
    }
    // reset forn
    const resetForm = {
        desg_name: '',
        desg_status: false
    }
    // submit fnc
    const submitDesignation = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/designation', postDesigData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            setDesignation(resetForm);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
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
                    <h5>Designation</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitDesignation} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Designation Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="desg_name"
                                            value={desg_name}
                                            onChange={(e) => updateDesignationfld(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="desg_status"
                                                    color="secondary"
                                                    value={desg_status}
                                                    checked={desg_status}
                                                    className="ml-2 "
                                                    onChange={(e) => updateDesignationfld(e)}
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
                            <DesignationTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DesignationMast
