import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { useHistory } from 'react-router'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import RegistrationMastTable from './RegistrationMastTable'
import { employeeNumber } from 'src/views/Constant/Constant'

const RegistrationMaster = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();

    //Intializing
    const [type, setType] = useState({
        registration_name: '',
        registration_status: false,
        create_user: ''
    });

    //Destructuring
    const { registration_name, registration_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    const postRegistationData = {
        registration_name,
        registration_status: registration_status === true ? 1 : 0,
        create_user: employeeNumber()
    }
    const resetForm = {
        registration_name: '',
        registration_status: false
    }

    //Insert
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/regtype', postRegistationData)
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
            <PageLayout heading="Registation Type">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Registration Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="registration_name"
                                            value={registration_name}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="registration_status"
                                                    color="primary"
                                                    value={registration_status}
                                                    checked={registration_status}
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
                            <RegistrationMastTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default RegistrationMaster
