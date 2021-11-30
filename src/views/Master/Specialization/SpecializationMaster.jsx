import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import CourseSelectionMast from 'src/views/CommonCode/CourseSelectionMast'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import SpecializationTable from './SpecializationTable'

const SpecializationMaster = () => {
    const classes = useStyles();
    const history = useHistory();
    const [count, setCount] = useState(0);
    const { selectCourse, updateCourse } = useContext(PayrolMasterContext)

    //Initializing
    const [type, setType] = useState({
        spec_desc: '',
        cour_slno: '',
        spec_status: false,
    })

    //Destucturing
    const { spec_desc, spec_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Insert
    const postSpecData = {
        spec_desc,
        cour_slno: selectCourse,
        spec_status: spec_status === true ? 1 : 0,
    }

    //Form resting
    const resetForm = {
        spec_desc: '',
        cour_slno: '',
        spec_status: false
    }
    const reset = () => {
        updateCourse(0)
    }

    //Form Submitting
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/specilization', postSpecData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            setType(resetForm);
            reset();
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
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
            <PageLayout heading="Specialization">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Specialization"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="spec_desc"
                                            value={spec_desc}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <CourseSelectionMast />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="spec_status"
                                                    color="primary"
                                                    value={spec_status}
                                                    checked={spec_status}
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
                            <SpecializationTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default SpecializationMaster
