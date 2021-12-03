import { Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import React, { Fragment, useContext } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DistrictSelection from 'src/views/CommonCode/DistrictSelection';
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant';
import RegionMastTable from './RegionMastTable';

const RegionMast = () => {
    const classes = useStyles();
    const history = useHistory();
    const [count, setCount] = useState(0);
    const { selectDistrict, updateDisSelected } = useContext(PayrolMasterContext);

    //Initializing
    const [disData, getDisdata] = useState({
        reg_name: '',
        reg_pincode: '',
        reg_dist_slno: '',
        reg_status: false
    });

    //Destructuring
    const { reg_name, reg_pincode, reg_status } = disData;
    const updateFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getDisdata({ ...disData, [e.target.name]: value })
    }

    //Insert
    const postFormData = {
        reg_name,
        reg_pincode,
        reg_status: reg_status === true ? 1 : 0,
        create_user: employeeNumber(),
        reg_dist_slno: selectDistrict
    }

    //Form resting
    const resetForm = {
        reg_name: '',
        reg_pincode: '',
        reg_dist_slno: '',
        reg_status: false
    }
    const reset = () => {
        updateDisSelected(0)
    }

    //Form Submitting
    const SubmitRegionForm = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/region', postFormData);
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            getDisdata(resetForm);
            reset();
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
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Region Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={SubmitRegionForm} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Region Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="reg_name"
                                            value={reg_name}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <DistrictSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Pincode"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="reg_pincode"
                                            value={reg_pincode}
                                            onChange={(e) => updateFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="reg_status"
                                                        color="primary"
                                                        value={reg_status}
                                                        checked={reg_status}
                                                        className="ml-2 "
                                                        onChange={(e) => updateFormData(e)}
                                                    />
                                                }
                                                label="Status"
                                            />
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
                            <RegionMastTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RegionMast
