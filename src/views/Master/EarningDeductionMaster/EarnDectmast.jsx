import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EarnType from 'src/views/CommonCode/EarnType'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import EarnDectTable from './EarnDectTable'
import { employeeNumber } from 'src/views/Constant/Constant'



const EarnDectmast = () => {
    // use context
    const { earntypeDatacontext, setEarnTypecontext } = useContext(PayrolMasterContext)

    // set count for table element refresh

    const [count, setcount] = useState(0)

    // use state
    const [earndecData, setearnDeduct] = useState({
        ern_deducttype: " ",
        incl_esi: false,
        inc_lwf: false,
        inclu_pf: false,
        inclu_protx: false,
        earndec_status: false


    });


    // destructuring data
    const { ern_deducttype, incl_esi, inc_lwf, inclu_pf, inclu_protx, earndec_status } = earndecData

    // to setings
    const history = useHistory()
    const toSettings = () => {
        history.push('/Home/Settings');
        setEarnTypecontext(0)
    }

    // on change function 
    const updateFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setearnDeduct({ ...earndecData, [e.target.name]: value })
    }

    //default state
    const deful = {
        ern_deducttype: " ",
        incl_esi: false,
        inc_lwf: false,
        inclu_pf: false,
        inclu_protx: false,
        earndec_status: false

    }


    // on submit
    const eandeduct = {
        earnded_name: ern_deducttype,
        include_esi: incl_esi === true ? 1 : 0,
        include_lwf: inc_lwf === true ? 1 : 0,
        include_pf: inclu_pf === true ? 1 : 0,
        include_protax: inclu_protx === true ? 1 : 0,
        erning_type_id: earntypeDatacontext,
        earnded_status: earndec_status === true ? 1 : 0,
        create_user: employeeNumber()

    }

    const submitearndeduct = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/earn', eandeduct)
        const { success, message } = result.data;
        if (success === 0 && success === 2) {
            infoNofity(message);
        } else if (success === 1) {
            succesNofity(message);
            setearnDeduct(deful)
            setEarnTypecontext(0)
            setcount(count + 1);
        } else {
            errorNofity(message);
        }
    }


    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Earnings/Deduction</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitearndeduct}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Earn/Deduction"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="ern_deducttype"
                                            value={ern_deducttype}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <EarnType />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="incl_esi"
                                                            color="secondary"
                                                            value={incl_esi}
                                                            checked={incl_esi}
                                                            className="ml-2"
                                                            onChange={(e) => updateFormData(e)}
                                                        />
                                                    }
                                                    label="Include Esi"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="inc_lwf"
                                                            color="secondary"
                                                            value={inc_lwf}
                                                            checked={inc_lwf}
                                                            className="ml-2"
                                                            onChange={(e) => updateFormData(e)}
                                                        />
                                                    }
                                                    label="Include Lwf"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="inclu_pf"
                                                            color="secondary"
                                                            value={inclu_pf}
                                                            checked={inclu_pf}
                                                            className="ml-2"
                                                            onChange={(e) => updateFormData(e)}
                                                        />
                                                    }
                                                    label="Include Pf"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="inclu_protx"
                                                            color="secondary"
                                                            value={inclu_protx}
                                                            checked={inclu_protx}
                                                            className="ml-2"
                                                            onChange={(e) => updateFormData(e)}
                                                        />
                                                    }
                                                    label="Include Pro tax"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="earndec_status"
                                                    color="secondary"
                                                    value={earndec_status}
                                                    checked={earndec_status}
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
                            <EarnDectTable upadte={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EarnDectmast
