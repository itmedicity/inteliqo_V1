import { Checkbox, Button, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import ModuleGroupMastTable from './ModuleGroupMastTable'

const ModuleGroupMastEdit = () => {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [count, setCount] = useState(0)

    const [formData, setFormData] = useState({
        module_group_name: '',
        module_recruitment: false,
        module_emprecord: false,
        module_attenmangemnt: false,
        module_leavemangment: false,
        module_payroll: false,
        module_performanceApp: false,
        module_trainAndDevolp: false,
        module_resignation: false
    })

    // Destructuring FormData
    const { module_group_name, module_recruitment, module_emprecord, module_attenmangemnt, module_leavemangment,
        module_payroll, module_performanceApp, module_trainAndDevolp, module_resignation } = formData;

    // Redirect To Home
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    // Display Edit Data
    useEffect(() => {
        const getEditModuleGroupDetl = async () => {
            const result = await axioslogin.get(`/modulegroup/${id}`);
            const { success, data } = result.data;
            if (success === 1) {

                const { module_group_name, module_slno } = data[0];
                const module_status = JSON.parse(module_slno);
                const form_dis_data = {
                    module_group_name: module_group_name,
                    module_recruitment: module_status.module_recruitment === 0 ? false : true,
                    module_emprecord: module_status.module_emprecord === 0 ? false : true,
                    module_attenmangemnt: module_status.module_attenmangemnt === 0 ? false : true,
                    module_leavemangment: module_status.module_leavemangment === 0 ? false : true,
                    module_payroll: module_status.module_payroll === 0 ? false : true,
                    module_performanceApp: module_status.module_performanceApp === 0 ? false : true,
                    module_trainAndDevolp: module_status.module_trainAndDevolp === 0 ? false : true,
                    module_resignation: module_status.module_resignation === 0 ? false : true
                }
                setFormData(form_dis_data)
            } else {
                infoNofity('Somthing Went Wrong , Contact EDP')
            }

        }
        getEditModuleGroupDetl()
    }, [id])

    // Update Edited Data
    const getUpdatedFormData = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    // Save Edited Data
    const saveUpdatedFormData = async (e) => {
        e.preventDefault();
        const postEditData = {
            module_group_name,
            module_slno: {
                module_home: 1,
                module_recruitment: module_recruitment === true ? 2 : 0,
                module_emprecord: module_emprecord === true ? 3 : 0,
                module_attenmangemnt: module_attenmangemnt === true ? 4 : 0,
                module_leavemangment: module_leavemangment === true ? 5 : 0,
                module_payroll: module_payroll === true ? 6 : 0,
                module_performanceApp: module_performanceApp === true ? 7 : 0,
                module_trainAndDevolp: module_trainAndDevolp === true ? 8 : 0,
                module_resignation: module_resignation === true ? 9 : 0,
            },
            mdgrp_slno: id
        }

        const result = await axioslogin.patch('/modulegroup', postEditData)
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
            toSettings()
        } else {
            infoNofity(message)
        }
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Module Group Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={saveUpdatedFormData}  >
                                <div className="col-md-12 row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Module Group Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            value={module_group_name}
                                            name="module_group_name"
                                            onChange={(e) => getUpdatedFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_recruitment"
                                                    color="secondary"
                                                    value={module_recruitment}
                                                    checked={module_recruitment}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Recruitment"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_emprecord"
                                                    color="secondary"
                                                    value={module_emprecord}
                                                    checked={module_emprecord}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Employee Record"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_attenmangemnt"
                                                    color="secondary"
                                                    value={module_attenmangemnt}
                                                    checked={module_attenmangemnt}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Attendance Management    "
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_leavemangment"
                                                    color="secondary"
                                                    value={module_leavemangment}
                                                    checked={module_leavemangment}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Leave Management"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_payroll"
                                                    color="secondary"
                                                    value={module_payroll}
                                                    checked={module_payroll}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Payroll"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_performanceApp"
                                                    color="secondary"
                                                    value={module_performanceApp}
                                                    checked={module_performanceApp}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Performance Apprarisal"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_trainAndDevolp"
                                                    color="secondary"
                                                    value={module_trainAndDevolp}
                                                    checked={module_trainAndDevolp}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Training & Deveolopment"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="module_resignation"
                                                    color="secondary"
                                                    value={module_resignation}
                                                    checked={module_resignation}
                                                    className="ml-2"
                                                    onChange={(e) => getUpdatedFormData(e)}
                                                />
                                            }
                                            label="Resignation"
                                        />
                                    </div>
                                    <div className="row col-md-12 mt-2 ">
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
                            <ModuleGroupMastTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ModuleGroupMastEdit
