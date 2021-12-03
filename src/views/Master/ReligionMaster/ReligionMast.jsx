import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, memo, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity } from 'src/views/CommonCode/Commonfunc'
import ReligionMastTable from './ReligionMastTable'
import { employeeNumber } from 'src/views/Constant/Constant'

const ReligionMast = () => {
    const classes = useStyles()
    const history = useHistory()
    const [count, setCount] = useState(0)

    //setting initial State
    const [formData, setformData] = useState({
        relg_name: "",
        relg_status: false
    })

    //destructuring
    const { relg_name, relg_status } = formData
    const updateReligionMastFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
    }

    //getting data
    const postData = {
        relg_name: relg_name,
        relg_status: relg_status === false ? 0 : 1,
        create_user: employeeNumber()
    }

    //default state
    const defaultState = {
        relg_name: "",
        relg_status: false
    }

    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/Religion', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setformData(defaultState)
            setCount(count + 1)
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings')
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Religion Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitFormData}>
                                <div className="col-md-12">
                                    <TextField
                                        label="Religion Name"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        variant="outlined"
                                        name="relg_name"
                                        value={relg_name}
                                        onChange={(e) => updateReligionMastFormData(e)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <FormControlLabel
                                        className="pb-0 mb-0"
                                        control={
                                            <Checkbox
                                                name="relg_status"
                                                color="primary"
                                                value={relg_status}
                                                checked={relg_status}
                                                className="ml-1"
                                                onChange={(e) => updateReligionMastFormData(e)}
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
                                    <div className="col-md-6 col-sm-12 col-xs-1">
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
                            </form>
                        </div>
                        <div className="col-md-8">
                            <ReligionMastTable update={count} />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default memo(ReligionMast)
