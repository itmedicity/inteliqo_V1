import React, { Fragment, useContext, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import NationSlnoSelection from 'src/views/CommonCode/NationSlnoSelection'
import { useHistory } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import StateMasterTable from './StateMasterTable'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { employeeNumber } from 'src/views/Constant/Constant'

const StateMaster = () => {
    const classes = useStyles();
    const history = useHistory();
    const [count, setCount] = useState(0);
    const { selectNation, updateNation } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        state_name: '',
        state_nat_slno: '',
        state_status: false

    });

    //destructuring
    const { state_name, state_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //insert
    const postStateData = {
        state_name,
        state_nat_slno: selectNation,
        state_status: state_status === true ? 1 : 0,
        create_user: employeeNumber()
    }

    //Form Reseting
    const resetForm = {
        state_name: '',
        state_nat_slno: '',
        state_status: false
    }
    const reset = () => {
        updateNation(0)
    }

    //Form Submitting
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/state', postStateData)
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
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
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
                                                    value={state_status}
                                                    checked={state_status}
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
                            <StateMasterTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StateMaster
