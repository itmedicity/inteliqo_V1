import { Checkbox, Button, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import EducationMastTable from './EducationMastTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'

const EducationMaster = () => {
    const classes = useStyles();
    const history = useHistory()
    const [count, setCount] = useState(0);

    //Initializing
    const [type, setType] = useState({
        edu_desc: '',
        edu_status: false,
        edu_create: ''
    });

    //destructuring
    const { edu_desc, edu_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //insert
    const postEduData = {
        edu_desc,
        edu_status: edu_status === true ? 1 : 0,
        edu_create: employeeNumber()
    }

    //Form Reseting
    const resetForm = {
        edu_desc: '',
        edu_status: false
    }

    //Form Submitting
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/edu', postEduData)
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

    //Back to home page
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <PageLayout heading="Education Master" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Education "
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="edu_desc"
                                            value={edu_desc}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="edu_status"
                                                    color="primary"
                                                    value={edu_status}
                                                    checked={edu_status}
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
                            <EducationMastTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default EducationMaster
