import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import GroupmasterTable from './GroupmasterTable'

const Groupmaster = () => {
    const history = useHistory()
    const classess = useStyles()
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        user_group_name: '',
        user_group_status: false
    })

    const { user_group_name, user_group_status } = formData;

    const getUserGroupFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    // Redirect to the Setting Page 
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    const postData = {
        user_group_name: user_group_name,
        user_group_status: user_group_status === true ? 1 : 0,
    }

    const resetForm = {
        user_group_name: '',
        user_group_status: false
    }

    const submitUserGroupMaster = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/usergroup', postData)
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message)
            setFormData(resetForm)
            setCount(count + 1)
        } else if (success === 0) {
            errorNofity(message);
        } else if (success === 2) {
            infoNofity(message.sqlMessage);
        }
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Group Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classess.root} onSubmit={submitUserGroupMaster} >
                                <div className="col-md-12 row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="User Group Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            value={user_group_name}
                                            name="user_group_name"
                                            onChange={(e) => getUserGroupFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="user_group_status"
                                                    color="secondary"
                                                    value={user_group_status}
                                                    checked={user_group_status}
                                                    className="ml-2"
                                                    onChange={(e) => getUserGroupFormData(e)}
                                                />
                                            }
                                            label="User Group Status"
                                        />
                                    </div>
                                    <div className="row col-md-12 mt-1 ">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="ml-1"
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
                            <GroupmasterTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Groupmaster
