import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import UniVersityTable from './UniVersityTable'

const UniversityMastEdit = () => {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()

    //Initialization
    const [formData, setFormData] = useState({
        unver_name: '',
        unver_status: false,
        unver_alias: ''
    });

    //Destructuring
    const { unver_name, unver_status, unver_alias } = formData;
    const getUniversityFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }
    //getdata
    useEffect(() => {
        const getUniversity = async () => {
            const result = await axioslogin.get(`/university/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { unver_name, unver_status, unver_alias } = data[0]
                const frmdata = {
                    unver_name: unver_name,
                    unver_alias: unver_alias,
                    unver_status: unver_status === 1 ? true : false
                }
                setFormData(frmdata)
            }
        }
        getUniversity()
    }, [id])

    const postUniversity = {
        unver_name,
        unver_status: unver_status === true ? 1 : 0,
        unver_alias,
        unver_slno: id
    }
    const resetForm = {
        unver_name: '',
        unver_status: false,
        unver_alias: ''
    }

    //update
    const submitFormUpdate = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/university', postUniversity)
        const { message, success } = result.data;
        if (success === 2) {
            setFormData(resetForm);
            history.push('/Home/University');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to Home
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <PageLayout heading="University">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitFormUpdate}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="University Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="unver_name"
                                            value={unver_name}
                                            onChange={(e) => getUniversityFormData(e)}
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
                                            name="unver_alias"
                                            value={unver_alias}
                                            onChange={(e) => getUniversityFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="unver_status"
                                                    color="primary"
                                                    value={unver_status}
                                                    checked={unver_status}
                                                    className="ml-2"
                                                    onChange={(e) => getUniversityFormData(e)}
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
                            <UniVersityTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default UniversityMastEdit
