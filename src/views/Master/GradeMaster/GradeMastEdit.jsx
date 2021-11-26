import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import GradeMasterTable from './GradeMasterTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const GradeMastEdit = () => {


    const history = useHistory()
    const { id } = useParams()
    // useState Define
    // set count for table element refresh

    const [count, setcount] = useState(0)
    // use State  
    const [gradedata, getformdata] = useState({
        gradename: '',
        grade_status: false
    });

    // clse button click
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    // upfate function for  element on change 

    const updategradedata = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getformdata({ ...gradedata, [e.target.name]: value })
    }

    // destructuring data
    const { gradename, grade_status } = gradedata

    // for setttable data
    useEffect(() => {
        const getiddetl = async () => {
            const result = await axioslogin.get(`/grade/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { grade_desc, grade_status } = data[0]
                const frmdata = {
                    gradename: grade_desc,
                    grade_status: grade_status === 1 ? true : false
                }
                getformdata(frmdata)
            }

        }
        getiddetl();
    }, [id])

    // default state
    const defstate = {
        gradename: '',
        grade_status: false
    }

    // import data
    const postData = {
        grade_desc: gradename,
        grade_status: grade_status === true ? 1 : 0,
        grade_slno: id,
    }

    const postFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/grade', postData)
        const { message, success } = result.data;
        if (success === 2) {
            succesNofity(message);
            getformdata(defstate);
            setcount(count + 1)
        } else if (success === 0 || success === 1) {
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
                                                    value={grade_status}
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

export default GradeMastEdit
