import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { useHistory, useParams } from 'react-router'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import RegistrationMastTable from './RegistrationMastTable'

const RegistrationTableEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    //Initializing
    const [type, setType] = useState({
        registration_name: '',
        registration_status: false
    })

    //Destructuring
    const { registration_name, registration_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Getdata
    useEffect(() => {
        const getRegistration = async () => {
            const result = await axioslogin.get(`/regtype/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { registration_name, registration_status } = data[0]
                const frmdata = {
                    registration_name: registration_name,
                    registration_status: registration_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getRegistration()
    }, [id])

    const postRegistation = {
        registration_name,
        registration_status: registration_status === true ? 1 : 0,
        reg_id: id
    }

    const resetForm = {
        registration_name: '',
        registration_status: false
    }
    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/regtype', postRegistation)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            history.push('/Home/RegistrationType');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to home
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
                            <RegistrationMastTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default memo(RegistrationTableEdit)
