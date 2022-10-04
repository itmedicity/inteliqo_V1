import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import GradeMasterTable from './GradeMasterTable'

const GradeMaster = () => {
    // use State  
    const [gradedata, getformdata] = useState({
        gradename: '',
        grade_status: false
    });

    // set count for table element refresh
    const [count, setcount] = useState(0)

    // upfate function for  element on change 
    const updategradedata = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getformdata({ ...gradedata, [e.target.name]: value })
    }

    // destructuring data
    const { gradename, grade_status } = gradedata

    // use history 
    const history = useHistory()

    // clse button click
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    // data to be posted
    const postData = {
        grade_desc: gradename,
        grade_status: grade_status === true ? 1 : 0,
        create_user: employeeNumber()
    }

    // default state
    const reset = {
        gradename: '',
        grade_status: false

    }

    // submitt form data 
    const postFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/grade', postData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            getformdata(reset);
            setcount(count + 1)
        } else if (success === 0 || success === 2 || success === 7) {
            infoNofity(message);
        }
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Grade Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={postFormData}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Grade"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="gradename"
                                            value={gradename}
                                            onChange={(e) => updategradedata(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name='grade_status'
                                                    color="secondary"
                                                    checked={grade_status}
                                                    className="ml-2"
                                                    onChange={(e) => updategradedata(e)}
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
                            <GradeMasterTable update={count} />

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GradeMaster
