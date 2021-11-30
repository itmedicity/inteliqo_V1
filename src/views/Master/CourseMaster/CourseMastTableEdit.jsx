import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import CourseMasterTable from './CourseMasterTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const CourseMastTableEdit = () => {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        cour_desc: '',
        edu_slno: '',
        cour_status: false
    })

    //Destucturing
    const { cour_desc, cour_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Get data by ID
    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get(`/course/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { cour_desc, edu_slno, cour_status } = data[0]
                const frmdata = {
                    cour_desc: cour_desc,
                    edu_slno: updateEducation(edu_slno),
                    cour_status: cour_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getCourse()
    }, [id, updateEducation])

    const postCourseData = {
        cour_desc,
        edu_slno: selectEducation,
        cour_status: cour_status === true ? 1 : 0,
        cour_slno: id
    }
    const resetForm = {
        cour_desc: '',
        edu_slno: '',
        cour_status: false,
    }
    const reset = () => {
        updateEducation(0)
    }

    //update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/course', postCourseData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            reset();
            history.push('/Home/CourseMaster');
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
                            <CourseMasterTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default CourseMastTableEdit
