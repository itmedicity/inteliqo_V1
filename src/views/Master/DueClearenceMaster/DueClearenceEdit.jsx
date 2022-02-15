import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import TextInput from 'src/views/Component/TextInput';
import DueClearenceMastTable from './DueClearenceMastTable';

const DueClearenceEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [formData, setFormData] = useState({
        clrnce_desc: '',
        clrnce_shortname: '',
        clerence_status: false,
    })
    const { clrnce_desc, clrnce_shortname, clerence_status } = formData
    const updateDueClearenceMaster = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    useEffect(() => {
        const dueClearenceData = async () => {
            const result = await axioslogin.get(`/duemast/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { due_shortname, due_desc, due_status } = data[0]
                const frmData = {
                    clrnce_desc: due_desc,
                    clrnce_shortname: due_shortname,
                    clerence_status: due_status === 1 ? true : false
                }
                setFormData(frmData)
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        dueClearenceData()
    }, [id])
    const postData = {
        due_desc: clrnce_desc,
        due_shortname: clrnce_shortname,
        due_status: clerence_status === true ? 1 : 0,
        edit_user: em_id,
        duemast_slno: id
    }
    const defaultState = {
        clrnce_desc: '',
        clrnce_shortname: '',
        clerence_status: false,
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/duemast', postData)
        const { success, message } = result.data
        if (success === 2) {
            setFormData(defaultState)
            history.push('/Home/DueClearenceMaster');
            succesNofity(message)
        }
        else if (success === 1) {
            warningNofity(message)
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Due Clearence Master Edit"
                submit={submitFormData}
                redirect={toSettings}
            >
                <div className="row">
                    <div className="col-md-4">
                        <div className="row g-1">
                            <div className="col-md-12">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Clearence Desc"
                                    changeTextValue={(e) => updateDueClearenceMaster(e)}
                                    name="clrnce_desc"
                                    value={clrnce_desc}

                                />
                            </div>
                            <div className="col-md-12">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Short Name"
                                    changeTextValue={(e) => updateDueClearenceMaster(e)}
                                    name="clrnce_shortname"
                                    value={clrnce_shortname}
                                />
                            </div>
                            <div className="col-md-12 pt-0">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="clerence_status"
                                            color="primary"
                                            value={clerence_status}
                                            checked={clerence_status}
                                            className="ml-2 "
                                            onChange={(e) => updateDueClearenceMaster(e)}
                                        />
                                    }
                                    label="Status"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <DueClearenceMastTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
};

export default DueClearenceEdit;
