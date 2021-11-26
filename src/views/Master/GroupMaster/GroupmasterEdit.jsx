import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import GroupmasterTable from './GroupmasterTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const GroupmasterEdit = () => {
    const classess = useStyles()
    const history = useHistory()
    const [count, setCount] = useState(0)
    const { id } = useParams()

    const [formData, setFormData] = useState({
        user_group_name: '',
        user_group_status: false
    })

    const { user_group_name, user_group_status } = formData;

    const getUserGroupFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    useEffect(() => {
        // Get Data From DB
        const getUserGroupDetlById = async () => {
            const result = await axioslogin.get(`/usergroup/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                var { user_group_name, user_group_status } = data
                user_group_status = user_group_status === 1 ? true : false;
                const getData = {
                    user_group_name,
                    user_group_status
                }
                setFormData(getData)
            }
        }
        getUserGroupDetlById()

    }, [id])


    const updatedPostData = {
        user_group_name,
        user_group_status: user_group_status === true ? 1 : 0,
        user_grp_slno: id
    }

    //Update To DB
    const submitEditedFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch(`/usergroup`, updatedPostData)
        const { message, success } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
            toSettings()
        } else {
            infoNofity(message)
        }
    }

    // Redirect to the Setting Page 
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Module User Assign</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classess.root} onSubmit={submitEditedFormData} >
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

export default GroupmasterEdit
