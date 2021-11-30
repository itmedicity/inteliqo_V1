import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import NationSlnoSelection from 'src/views/CommonCode/NationSlnoSelection'
import StateMasterTable from './StateMasterTable'
import { PayrolMasterContext } from 'src/Context/MasterContext'

const StateMastEdit = () => {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()
    const { selectNation, updateNation } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        state_name: '',
        state_nat_slno: '',
        state_status: false
    });

    //Destructuring
    const { state_name, state_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Getdata
    useEffect(() => {
        const getState = async () => {
            const result = await axioslogin.get(`/state/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { state_name, state_nat_slno, state_status } = data[0]
                const frmdata = {
                    state_name: state_name,
                    state_nat_slno: updateNation(state_nat_slno),
                    state_status: state_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getState()
    }, [id, updateNation])

    const postStateData = {
        state_name,
        state_nat_slno: selectNation,
        state_status: state_status === true ? 1 : 0,
        state_slno: id
    }
    const resetForm = {
        state_name: '',
        state_nat_slno: '',
        state_status: false
    }
    const reset = () => {
        updateNation(0)
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/state', postStateData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            reset();
            history.push('/Home/State');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage)
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
                <div className="card-header  bg-dark pb-0 border border-dark text-white ">
                    <h5>State</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="State Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="state_name"
                                            value={state_name}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <NationSlnoSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="state_status"
                                                    color="primary"
                                                    className="ml-2"
                                                    value={state_status}
                                                    checked={state_status}
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
                                                type="submit"
                                                className="ml-12"
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
                                                className="ml-12"
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
                            <StateMasterTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StateMastEdit
