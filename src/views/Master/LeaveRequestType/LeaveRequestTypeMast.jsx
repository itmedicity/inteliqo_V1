import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { employeeNumber } from 'src/views/Constant/Constant'
import LeaveRequestTypeTable from './LeaveRequestTypeTable'

const LeaveRequestTypeMast = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();

    //Intializing
    const [type, setType] = useState({
        lrequest_type: '',
        lrequest_short: '',
        lrequest_status: false
    });

    //Destructuring
    const { lrequest_type, lrequest_short, lrequest_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    const postLeaveRequestData = {
        lrequest_type,
        lrequest_short,
        lrequest_status: lrequest_status === true ? 1 : 0,
        create_user: employeeNumber()
    }
    const resetForm = {
        lrequest_type: '',
        lrequest_short: '',
        lrequest_status: false
    }

    //Insert
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/leaveRequestType', postLeaveRequestData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            setType(resetForm);
        } else if (success === 0) {
            infoNofity(message);
        } else {
            infoNofity(message)
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <PageLayout heading="Leave Request Type">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Leave Request Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="lrequest_type"
                                            value={lrequest_type}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Short Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="lrequest_short"
                                            value={lrequest_short}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>


                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lrequest_status"
                                                    color="primary"
                                                    value={lrequest_status}
                                                    checked={lrequest_status}
                                                    className="ml-2"
                                                    onChange={(e) => updateType(e)}
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
                            <LeaveRequestTypeTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default LeaveRequestTypeMast
