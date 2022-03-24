import { Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const CommonSettings = () => {
    const history = useHistory()
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [value, setValue] = useState(0)
    const [FormData, setFormData] = useState({
        slno: '',
        commn_grace: '',
        commn_latein: '',
        commn_earlyout: '',
        commn_latein_grace: '',
        commn_earlyout_grace: ''
    })
    const { slno, commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace } = FormData
    //getting form data
    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value })
    }
    useEffect(() => {
        const getCommonSettings = async () => {
            const result = await axioslogin.get('/commonsettings')
            const { success, data } = result.data
            if (success === 1) {
                const { setting_slno, cmmn_grace_period, cmmn_late_in, cmmn_early_out,
                    cmmn_early_out_grace, cmmn_late_in_grace } = data[0]
                const frmData = {
                    slno: setting_slno,
                    commn_grace: cmmn_grace_period,
                    commn_latein: cmmn_late_in,
                    commn_earlyout: cmmn_early_out,
                    commn_latein_grace: cmmn_late_in_grace,
                    commn_earlyout_grace: cmmn_early_out_grace
                }
                setFormData(frmData)
                setValue(1)
            }
            else if (success === 0) {
                setValue(0)
            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getCommonSettings()
    }, [])
    //data to save
    const postData = {
        cmmn_grace_period: commn_grace,
        cmmn_late_in: commn_latein,
        cmmn_early_out: commn_earlyout,
        cmmn_late_in_grace: commn_latein_grace,
        cmmn_early_out_grace: commn_earlyout_grace,
        creat_user: em_id,
    }
    //data to edit
    const postDataEdit = {
        cmmn_grace_period: commn_grace,
        cmmn_late_in: commn_latein,
        cmmn_early_out: commn_earlyout,
        cmmn_late_in_grace: commn_latein_grace,
        cmmn_early_out_grace: commn_earlyout_grace,
        update_user: em_id,
        setting_slno: slno
    }
    //save
    const submitFormData = async (e) => {
        e.preventDefault();
        if (value === 0) {
            const result = await axioslogin.post('/commonsettings', postData)
            console.log(result)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!!! Please Contact EDP")
            }
        }
        else if (value === 1) {
            const result = await axioslogin.patch('/commonsettings', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
            }
            else if (success === 1) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!!! Please Contact EDP")
            }
        }
        else {

        }
    }
    const RedirectToprofilePage = () => {
        history.push(`/Home/Settings`)
    }
    return (
        <Fragment>
            <PageLayoutProcess
                heading="Common Settings"
                submit={submitFormData}
                redirect={RedirectToprofilePage}
            >
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row g-1">
                            <div className="col-md-2 pt-1">
                                <Typography>Common Grace Period:</Typography>
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder=""
                                    name="commn_grace"
                                    value={commn_grace}
                                    changeTextValue={(e) => updateCommonSettings(e)}
                                />
                            </div>
                            <div className="col-md-1 pt-1">
                                <Typography>In Minutes</Typography>
                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            <div className="col-md-2 pt-1">
                                <Typography>Common Late In</Typography>
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder=""
                                    name="commn_latein"
                                    value={commn_latein}
                                    changeTextValue={(e) => updateCommonSettings(e)}
                                />
                            </div>
                            <div className="col-md-1 pt-1">
                                <Typography>In Minutes</Typography>
                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            <div className="col-md-2 pt-1">
                                <Typography>Common Early Out</Typography>
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder=""
                                    name="commn_earlyout"
                                    value={commn_earlyout}
                                    changeTextValue={(e) => updateCommonSettings(e)}
                                />
                            </div>
                            <div className="col-md-1 pt-1">
                                <Typography>In Minutes</Typography>
                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            <div className="col-md-2 pt-1">
                                <Typography>Late In Grace Period</Typography>
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder=""
                                    name="commn_latein_grace"
                                    value={commn_latein_grace}
                                    changeTextValue={(e) => updateCommonSettings(e)}
                                />
                            </div>
                            <div className="col-md-1 pt-1">
                                <Typography>In Minutes</Typography>
                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            <div className="col-md-2 pt-1">
                                <Typography>Early Out Grace Period</Typography>
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder=""
                                    name="commn_earlyout_grace"
                                    value={commn_earlyout_grace}
                                    changeTextValue={(e) => updateCommonSettings(e)}
                                />
                            </div>
                            <div className="col-md-1 pt-1">
                                <Typography>In Minutes</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutProcess>
        </Fragment >
    )
}

export default CommonSettings