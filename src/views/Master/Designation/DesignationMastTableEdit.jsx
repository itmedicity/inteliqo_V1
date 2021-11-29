import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, memo, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import DesignationTable from './DesignationTable'

const DesignationMastTableEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    const [designation, setDesignation] = useState({
        desg_name: '',
        desg_status: false
    });

    const { desg_name, desg_status } = designation;
    const updateDesignation = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDesignation({ ...designation, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {
        const getDesignation = async () => {
            const result = await axioslogin.get(`/designation/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { desg_name, desg_status } = data[0]
                const frmdata = {
                    desg_name: desg_name,
                    desg_status: desg_status === 1 ? true : false
                }
                setDesignation(frmdata)
            }
        }
        getDesignation()
    }, [id])

    const postDesignationData = {
        desg_name,
        desg_status: desg_status === true ? 1 : 0,
        desg_slno: id
    }

    const resetForm = {
        desg_name: '',
        desg_status: false
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/designation', postDesignationData)
        const { message, success } = result.data;
        if (success === 2) {
            setDesignation(resetForm);
            history.push('/Home/Designation');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
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
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Designation</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType} >
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
                                            onChange={(e) => updateDesignation(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="desg_status"
                                                    color="primary"
                                                    value={desg_status}
                                                    checked={desg_status}
                                                    className="ml-2 "
                                                    onChange={(e) => updateDesignation(e)}
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
                            <DesignationTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(DesignationMastTableEdit)
