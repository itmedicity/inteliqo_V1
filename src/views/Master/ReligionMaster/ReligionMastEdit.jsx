import React, { Fragment, memo, useEffect, useState } from 'react'
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import ReligionMastTable from './ReligionMastTable'
import { succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useParams, useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios';

const ReligionMastEdit = () => {

    const history = useHistory()
    const classes = useStyles();
    const { id } = useParams()//getting id to edit
    const [count, setCount] = useState(0)

    //state declaration
    const [formData, setFormData] = useState({
        relg_name: "",
        relg_status: false
    })
    const defaultState = {
        relg_name: "",
        relg_status: false
    }

    const { relg_name, relg_status } = formData

    useEffect(() => {
        const getReligionMasterData = async () => {
            const result = await axioslogin.get(`/Religion/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { relg_name, relg_status } = data[0]
                const frmData = {
                    relg_name: relg_name,
                    relg_status: relg_status === 1 ? true : false
                }
                setFormData(frmData)
            }
        }
        getReligionMasterData()
    }, [id])

    //update edit Details
    const updateReligionMastEditFormData = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    const submitEditFormData = async (e) => {
        e.preventDefault();
        const updateData = {
            relg_name: relg_name,
            relg_status: relg_status === true ? 1 : 0,
            relg_slno: id
        }

        const result = await axioslogin.patch('/Religion', updateData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setFormData(defaultState)
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
                            <form className={classes.root} onSubmit={submitEditFormData}>
                                <div className="col-md-12">
                                    <TextField
                                        label="Religion Name"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        variant="outlined"
                                        name="relg_name"
                                        value={relg_name}
                                        onChange={(e) => updateReligionMastEditFormData(e)}
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
                                                onChange={(e) => updateReligionMastEditFormData(e)}
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

export default memo(ReligionMastEdit)
