import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useHistory, useParams } from 'react-router'
import DoctorMastTable from './DoctorMastTable'
import { ToastContainer } from 'react-toastify'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const DoctorMastEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    //Initializing
    const [type, setType] = useState({
        doctype_desc: '',
        doctype_status: false
    });

    //Destructuring
    const { doctype_desc, doctype_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {
        const getDoctorType = async () => {
            const result = await axioslogin.get(`/doctype/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { doctype_desc, doctype_status } = data[0]
                const frmdata = {
                    doctype_desc: doctype_desc,
                    doctype_status: doctype_status === '1' ? true : false
                }
                setType(frmdata)
            }
        }
        getDoctorType()
    }, [id])

    const postDoctorData = {
        doctype_desc,
        doctype_status: doctype_status === true ? 1 : 0,
        doctype_slno: id
    }
    const resetForm = {
        doctype_desc: '',
        doctype_status: false
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/doctype', postDoctorData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            history.push('/Home/DoctorType');
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
                <div className="card-header  bg-dark pb-0 border border-dark text-white ">
                    <h4>Doctor Type</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Doctor Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="doctype_desc"
                                            value={doctype_desc}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="doctype_status"
                                                    color="primary"
                                                    value={doctype_status}
                                                    checked={doctype_status}
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
                                                type="submit"
                                                className="ml-12"
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
                                                className="ml-12"
                                                onClick={toSettings}
                                            >  Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <DoctorMastTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default DoctorMastEdit
