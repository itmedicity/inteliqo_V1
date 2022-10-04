import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import TextInput from 'src/views/Component/TextInput';
import DueClearenceMastTable from './DueClearenceMastTable';

const DueClearenceMaster = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
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
    const postData = {
        due_desc: clrnce_desc,
        due_shortname: clrnce_shortname,
        due_status: clerence_status === true ? 1 : 0,
        create_user: em_id
    }
    const defaultState = {
        clrnce_desc: '',
        clrnce_shortname: '',
        clerence_status: false,
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/duemast', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(count + 1)
            setFormData(defaultState)
        }
        else if (success === 2) {
            warningNofity(message)
        }
        else if (success === 7) {
            errorNofity(message)
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
                heading="Due Clearence Master"
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
                        <DueClearenceMastTable update={count} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
};

export default DueClearenceMaster;
