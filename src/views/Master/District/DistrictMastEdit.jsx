import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import StateSelect from 'src/views/CommonCode/StateSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DistrictMastTable from './DistrictMastTable'

function DistrictMastEdit() {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()
    const { selectState, updateState } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        dist_name: '',
        dist_state_slno: '',
        dist_status: false
    })

    //Destucturing
    const { dist_name, dist_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Get data by ID
    useEffect(() => {
        const getDistrict = async () => {
            const result = await axioslogin.get(`/district/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dist_name, dist_state_slno, dist_status } = data[0]
                const frmdata = {
                    dist_name: dist_name,
                    dist_state_slno: updateState(dist_state_slno),
                    dist_status: dist_status === 1 ? true : false
                }
                setType(frmdata)
            }
        }
        getDistrict()
    }, [id, updateState])

    const postDistData = {
        dist_name,
        dist_state_slno: selectState,
        dist_status: dist_status === true ? 1 : 0,
        dist_slno: id
    }
    const resetForm = {
        dist_name: '',
        dist_state_slno: '',
        dist_status: false
    }
    const reset = () => {
        updateState(0)
    }

    //Update
    const submitType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/district', postDistData)
        const { message, success } = result.data;
        if (success === 2) {
            setType(resetForm);
            reset();
            history.push('/Home/District');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white ">
                    <h5>District</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="District Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="dist_name"
                                            value={dist_name}
                                            onChange={(e) => updateType(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <StateSelect />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="dist_status"
                                                    color="primary"
                                                    className="ml-2"
                                                    value={dist_status}
                                                    checked={dist_status}
                                                    onChange={(e) => updateType(e)}
                                                />
                                            } label="Status"
                                        />
                                    </div>
                                    <div className="row col-md-12">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="submit"
                                                className="ml-12"
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
                                                className="ml-12"
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
                            <DistrictMastTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default memo(DistrictMastEdit)
