import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { useState, Fragment, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant';
import DesignationTypeTable from './DesignationTypeTable';

const DesignationTypeTableedit = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const { id } = useParams()
    const [desigTypdetl, getDesigtyepe] = useState({
        empstat_name: '',
        empstat_el: false,
        empstat_cl: false,
        empstat_hd: false,
        empstat_esi: false,
        empstat_pf: false,
        empstat_period: 0
    });

    // reset form
    const resetForm = {
        empstat_name: '',
        empstat_el: false,
        empstat_cl: false,
        empstat_hd: false,
        empstat_esi: false,
        empstat_pf: false,
        empstat_period: 0
    }
    // state update
    const { empstat_name, empstat_el, empstat_cl, empstat_hd, empstat_esi, empstat_pf, empstat_period } = desigTypdetl;
    const updateDesigType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getDesigtyepe({ ...desigTypdetl, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {
        const getDesignation = async () => {
            const result = await axioslogin.get(`/empstat/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { empstat_cl, empstat_el, empstat_esi, empstat_hd, empstat_name, empstat_period,
                    empstat_pf } = data[0]
                const frmdata = {
                    empstat_cl: empstat_cl === 1 ? true : false,
                    empstat_el: empstat_el === 1 ? true : false,
                    empstat_esi: empstat_esi === 1 ? true : false,
                    empstat_hd: empstat_hd === 1 ? true : false,
                    empstat_name: empstat_name,
                    empstat_period: empstat_period,
                    empstat_pf: empstat_pf === 1 ? true : false,
                }
                getDesigtyepe(frmdata)
            }
        }
        getDesignation()
    }, [id])
    const postData = {
        empstat_name,
        empstat_el: empstat_el === true ? 1 : 0,
        empstat_cl: empstat_cl === true ? 1 : 0,
        empstat_hd: empstat_hd === true ? 1 : 0,
        empstat_esi: empstat_esi === true ? 1 : 0,
        empstat_pf: empstat_pf === true ? 1 : 0,
        empstat_period: empstat_period,
        update_user: employeeNumber(),
        emstats_slno: id
    }

    const submitDesigTypeUpdate = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empstat', postData);

        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message);
            setCount(count + 1);
            getDesigtyepe(resetForm)
        } else {
            errorNofity(message);
        }
    }

    // redirected to setting 
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5 >Designation Type</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitDesigTypeUpdate} >
                                <div className="row">
                                    <div className="col-md-12 row">
                                        <div className="col-md-6">
                                            <TextField
                                                label="Designation Type"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                required
                                                name="empstat_name"
                                                value={empstat_name}
                                                onChange={(e) => updateDesigType(e)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextField
                                                label="Period in Days"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                required
                                                name="empstat_period"
                                                value={empstat_period}
                                                onChange={(e) => updateDesigType(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 row">
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="empstat_el"
                                                        color="secondary"
                                                        value={empstat_el}
                                                        checked={empstat_el}
                                                        className="ml-2 "
                                                        onChange={(e) => updateDesigType(e)}
                                                    />
                                                }
                                                label="Earn Leave"
                                            />
                                        </div>
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="empstat_cl"
                                                        color="secondary"
                                                        value={empstat_cl}
                                                        checked={empstat_cl}
                                                        className="ml-2"
                                                        onChange={(e) => updateDesigType(e)}
                                                    />
                                                }
                                                label="Casual Leave"
                                            />
                                        </div>
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="empstat_hd"
                                                        color="secondary"
                                                        value={empstat_hd}
                                                        checked={empstat_hd}
                                                        className="ml-2"
                                                        onChange={(e) => updateDesigType(e)}
                                                    />
                                                }
                                                label="Holiday"
                                            />
                                        </div>
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="empstat_esi"
                                                        color="secondary"
                                                        value={empstat_esi}
                                                        checked={empstat_esi}
                                                        className="ml-2"
                                                        onChange={(e) => updateDesigType(e)}
                                                    />
                                                }
                                                label="ESI"
                                            />
                                        </div>
                                        <div className="col-md-12 pb-0 mb-0">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="empstat_pf"
                                                        color="secondary"
                                                        value={empstat_pf}
                                                        checked={empstat_pf}
                                                        className="ml-2"
                                                        onChange={(e) => updateDesigType(e)}
                                                    />
                                                }
                                                label="PF"
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
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <DesignationTypeTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DesignationTypeTableedit
