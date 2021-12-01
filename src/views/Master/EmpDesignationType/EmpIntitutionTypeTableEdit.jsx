import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import EmpDesignationtable from './EmpDesignationtable'

const EmpIntitutionTypeTableEdit = () => {
    const classess = useStyles();
    const history = useHistory();
    const { id } = useParams()

    //Initializing
    const [type, setType] = useState({
        inst_emp_type: '',
        inst_emp_status: false
    });

    //Destructuring
    const { inst_emp_type, inst_emp_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value });
    }

    //Get data
    useEffect(() => {
        const getInstitutionType = async () => {
            const result = await axioslogin.get(`/inst/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { inst_emp_type, inst_emp_status } = data[0]
                const frmdata = {
                    inst_emp_type: inst_emp_type,
                    inst_emp_status: inst_emp_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getInstitutionType()
    }, [id])

    const postInstitutionData = {
        inst_emp_type,
        inst_emp_status: inst_emp_status === true ? 1 : 0,
        inst_slno: id
    }
    const resetForm = {
        inst_emp_type: '',
        inst_emp_status: false
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/inst', postInstitutionData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            history.push('/Home/EmpDesignationType');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to home
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <h5>Employee Institution Type</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classess.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Employee Institution Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="inst_emp_type"
                                            value={inst_emp_type}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="inst_emp_status"
                                                    color="primary"
                                                    value={inst_emp_status}
                                                    checked={inst_emp_status}
                                                    className="ml-2 "
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
                            <EmpDesignationtable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmpIntitutionTypeTableEdit
