import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import BankMastTable from './BankMastTable'

const BankMaster = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const [bankData, getFormdata] = useState({
        bank_name: '',
        bank_ifsc: '',
        bank_address: '',
        bank_status: false
    });
    const resetFrom = {
        bank_name: '',
        bank_ifsc: '',
        bank_address: '',
        bank_status: false
    }
    const { bank_name, bank_ifsc, bank_address, bank_status } = bankData;
    const updateFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getFormdata({ ...bankData, [e.target.name]: value })
    }
    const postData = {
        ...bankData,
        bank_status: bank_status === true ? 1 : 0,
        create_user: employeeNumber()
    }
    const postFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/bank', postData);
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            getFormdata(resetFrom);
        } else if (success === 0) {
            infoNofity(message);
        } else {
            infoNofity(message);
        }
    }
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Bank Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={postFormData} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Bank Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_name"
                                            value={bank_name}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Bank IFSC Code"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_ifsc"
                                            value={bank_ifsc}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Address"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_address"
                                            value={bank_address}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="bank_status"
                                                    color="primary"
                                                    value={bank_status}
                                                    checked={bank_status}
                                                    className="ml-2"
                                                    onChange={(e) => updateFormData(e)}
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
                            <BankMastTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BankMaster
