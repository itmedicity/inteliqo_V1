import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import QualificationTable from './QualificationTable'

const QualificationMastTableEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    //Initializing
    const [qualification, setQualification] = useState({
        qual_name: '',
        qual_status: false
    });

    //Destructuring
    const { qual_name, qual_status } = qualification;
    const updateQualification = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

    //Getdata
    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get(`/qal/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { qual_name, qual_status } = data[0]
                const frmdata = {
                    qual_name: qual_name,
                    qual_status: qual_status === 1 ? true : false
                }
                setQualification(frmdata)
            }
        }
        getQualification()
    }, [id])

    const postData = {
        qual_name,
        qual_status: qual_status === true ? 1 : 0,
        qual_slno: id
    }

    // reset form
    const resetForm = {
        qual_name: '',
        qual_status: false
    }

    //Update 
    const submitQualification = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/qal', postData);
        const { success, message } = result.data;
        if (success === 2) {
            setQualification(resetForm);
            history.push('/Home/Qualification');
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
                                            onChange={(e) => updateQualification(e)}
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
                                                    onChange={(e) => updateQualification(e)}
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
                            <QualificationTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(QualificationMastTableEdit)
