import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PageLayout from 'src/views/CommonCode/PageLayout'
import SpecializationTable from './SpecializationTable'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import CourseSelectionMast from 'src/views/CommonCode/CourseSelectionMast'
import { employeeNumber } from 'src/views/Constant/Constant'

const SpecializationTableEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams()
    const { selectCourse, updateCourse } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        spec_desc: '',
        cour_slno: '',
        spec_status: false
    })

    //Destucturing
    const { spec_desc, spec_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Get data by ID
    useEffect(() => {
        const getSpec = async () => {
            const result = await axioslogin.get(`/specilization/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { spec_desc, cour_slno, spec_status } = data[0]
                const frmdata = {
                    spec_desc: spec_desc,
                    cour_slno: updateCourse(cour_slno),
                    spec_status: spec_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getSpec()
    }, [id, updateCourse])

    const postSpecData = {
        spec_desc,
        cour_slno: selectCourse,
        spec_status: spec_status === true ? 1 : 0,
        edit_user: employeeNumber(),
        spec_slno: id
    }
    const resetForm = {
        spec_desc: '',
        cour_slno: '',
        spec_status: false,
    }
    const reset = () => {
        updateCourse(0)
    }

    //update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/specilization', postSpecData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            reset();
            history.push('/Home/Specialization');
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
                            <SpecializationTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default SpecializationTableEdit
