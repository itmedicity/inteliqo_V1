import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import EarnTypeTable from './EarnTypeTable'

const EarntypeMast = () => {

    // usesate for count in crement 

    const [count, setcount] = useState((0))

    // use Sate defintion
    const [dataeartype, stdataearntype] = useState({

        earn_type: "",
        deduction_status: false,
        earntype_status: false
    })

    // Destructuring data
    const { earn_type, deduction_status, earntype_status } = dataeartype

    // close button click
    const history = useHistory();
    const toSettings = () => {
        history.push('/Home/Settings')
    }

    // onchange feild
    const updateEarnType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        stdataearntype({ ...dataeartype, [e.target.name]: value })

    }


    const erntypepostdata = {
        earn_type: earn_type,
        deduction_status: deduction_status === true ? 1 : 0,
        earntype_status: earntype_status === true ? 1 : 0,

    }
    // reset data
    const reset = {
        earn_type: "",
        deduction_status: false,
        earntype_status: false,

    }

    // submit data
    const submitempdata = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/Earntype', erntypepostdata)

        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            stdataearntype(reset);
            setcount(count + 1)

        } else if (success === 0 || success === 2) {
            infoNofity(message);
        }


    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Branch Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitempdata}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Earn Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="earn_type"
                                            value={earn_type}
                                            onChange={(e) => updateEarnType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="deduction_status"
                                                            color="secondary"
                                                            value={deduction_status}
                                                            checked={deduction_status}
                                                            className="ml-2"
                                                            onChange={(e) => updateEarnType(e)}
                                                        />
                                                    }
                                                    label="Deduction"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="earntype_status"
                                                            color="secondary"
                                                            value={earntype_status}
                                                            checked={earntype_status}
                                                            className="ml-2"
                                                            onChange={(e) => updateEarnType(e)}
                                                        />
                                                    }
                                                    label="Status"
                                                />
                                            </div>
                                        </div>
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
                            <EarnTypeTable />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default EarntypeMast
