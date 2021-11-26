import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';

const DepartmentSecEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    // Department Select Context
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);

    // get and set state 
    const [setSecedetl, updatesetSecedetl] = useState({
        sect_name: '',
        status: false
    });

    var { sect_name, status } = setSecedetl;
    const { id } = useParams();
    useEffect(() => {
        const getSectionDetl = async () => {
            const result = await axioslogin.get(`/section/${id}`);
            const { success, data } = result.data;
            if (success === 2 || success === 0) {
                infoNofity('Somthing went wrong')
                return;
            }
            var { sect_name, dept_id, status } = data[0];
            status = status === 1 ? true : false;
            const editsecData = {
                sect_name,
                status,
                dept_id: updateSelected(dept_id)
            }
            updatesetSecedetl(editsecData);
        }
        getSectionDetl();
    }, [id, updateSelected])

    // update edit detils
    const getUpdatedsedInput = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        updatesetSecedetl({ ...setSecedetl, [e.target.name]: value })
    }

    const saveUpdateddeptSec = async (e) => {
        e.preventDefault();
        var { sect_name, status } = setSecedetl;
        status = status === true ? 1 : 0;
        const updateData = {
            sect_name,
            sect_status: status,
            dept_id: selectedDept,
            sect_id: id
        }

        await axioslogin.patch('/section', updateData);
    }

    // redirect to the department section page
    const redTosection = () => {
        history.push('/Home/DeptSection');
        updateSelected(0)
    }

    return (
        <Fragment>
            <SessionCheck />
            <div className="col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-header card-header bg-dark pb-0 border border-dark text-white">
                        <h5>Department Section</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <form className={classes.root} onSubmit={saveUpdateddeptSec}  >
                                    <TextField
                                        label="Department Seciotn Name"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        variant="outlined"
                                        required
                                        name="sect_name"
                                        value={sect_name}
                                        onChange={(e) => getUpdatedsedInput(e)}
                                    />
                                    <DepartmentSelect />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="status"
                                                color="primary"
                                                value={status}
                                                checked={status}
                                                className="ml-2"
                                                onChange={(e) => { getUpdatedsedInput(e) }}
                                            />
                                        }
                                        label="Department Section Status"
                                    />

                                    <div className="row col-md-12" >
                                        <div className="col-md-6">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="mb-2">
                                                Save
                                            </Button>
                                        </div>
                                        <div className="col-md-6">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                onClick={redTosection}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(DepartmentSecEdit)
