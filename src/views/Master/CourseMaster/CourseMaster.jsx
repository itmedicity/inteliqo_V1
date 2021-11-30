import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useHistory } from 'react-router'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import PageLayout from 'src/views/CommonCode/PageLayout'
import CourseMasterTable from './CourseMasterTable'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'

const CourseMaster = () => {
    const classes = useStyles();
    const history = useHistory();
    const [count, setCount] = useState(0);
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        cour_desc: '',
        edu_slno: '',
        cour_status: false,
        cour_created: ''
    })

    //Destructuring
    const { cour_desc, cour_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Insert
    const postCourseData = {
        cour_desc,
        edu_slno: selectEducation,
        cour_status: cour_status === true ? 1 : 0,
        cour_created: employeeNumber()
    }

    //Form resting
    const resetForm = {
        cour_desc: '',
        edu_slno: '',
        cour_status: false
    }
    const reset = () => {
        updateEducation(0)
    }

    //Form Submitting
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/course', postCourseData)
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
            <PageLayout heading="Course">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Course"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="cour_desc"
                                            value={cour_desc}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <EducationSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="cour_status"
                                                    color="primary"
                                                    value={cour_status}
                                                    checked={cour_status}
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
                            <CourseMasterTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default CourseMaster
