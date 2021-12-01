import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useHistory, useParams } from 'react-router'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { ToastContainer } from 'react-toastify'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import EducationMastTable from './EducationMastTable'
import { employeeNumber } from 'src/views/Constant/Constant'

const EducationTableEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    //Initializing
    const [type, setType] = useState({
        edu_desc: '',
        edu_status: false,
        edu_edit: ''
    });

    //Destructuring
    const { edu_desc, edu_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {

        const getEdu = async () => {
            const result = await axioslogin.get(`/edu/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { edu_desc, edu_status } = data[0]
                const frmdata = {
                    edu_desc: edu_desc,
                    edu_status: edu_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getEdu()
    }, [id])

    //Post Data
    const postEdu = {
        edu_desc,
        edu_status: edu_status === true ? 1 : 0,
        edu_slno: id,
        edu_edit: employeeNumber()
    }

    const resetForm = {
        edu_desc: '',
        edu_status: false
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();


        const result = await axioslogin.patch('/edu', postEdu)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            history.push('/Home/EducationMaster');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to homes
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
                            <EducationMastTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default EducationTableEdit
