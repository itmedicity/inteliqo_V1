import { Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DistrictSelection from 'src/views/CommonCode/DistrictSelection';
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import RegionMastTable from './RegionMastTable';


const RegionMastTableEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams()
    const { selectDistrict, updateDisSelected } = useContext(PayrolMasterContext);

    //Initializing
    const [disData, getDisdata] = useState({
        reg_name: '',
        reg_pincode: '',
        reg_status: false,
        reg_dist_slno: ''
    });

    //Destucturing
    const { reg_name, reg_pincode, reg_status } = disData;
    const updateFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getDisdata({ ...disData, [e.target.name]: value })
    }

    //Get data by ID
    useEffect(() => {
        const getRegion = async () => {
            const result = await axioslogin.get(`/region/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { reg_name, reg_pincode, reg_status, reg_dist_slno } = data[0]
                const frmdata = {
                    reg_name: reg_name,
                    reg_pincode: reg_pincode,
                    reg_dist_slno: updateDisSelected(reg_dist_slno),
                    reg_status: reg_status === 1 ? true : false
                }
                getDisdata(frmdata)
            }
        }
        getRegion()
    }, [id, updateDisSelected])

    const postRegionData = {
        reg_name,
        reg_dist_slno: selectDistrict,
        reg_pincode,
        reg_status: reg_status === true ? 1 : 0,
        reg_slno: id
    }
    const resetForm = {
        reg_name: '',
        reg_dist_slno: '',
        reg_pincode,
        reg_status: false,
    }
    const reset = () => {
        updateDisSelected(0)
    }

    //update

    const SubmitRegion = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/region', postRegionData)
        const { message, success } = result.data;
        if (success === 2) {
            getDisdata(resetForm);
            reset();
            history.push('/Home/Region');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }


    //Back to Home
    const toSettings = () => {
        history.push('/Home/Settings');
        updateDisSelected(0);
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
                            <form className={classes.root} onSubmit={SubmitRegion} >
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
                            <RegionMastTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RegionMastTableEdit
