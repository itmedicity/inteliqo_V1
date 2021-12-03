import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import DepartmentSecTable from './DepartmentSecTable'

const DepartmentSectionMast = () => {
    const history = useHistory();
    // Material Class Call
    const classes = useStyles();
    //    Department Selection Context Calling 
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);
    //  State Update
    const [deptSectionName, updateSectionName] = useState('');
    const [septSectionStatus, updateSectionStat] = useState(false);
    const sectionStatus = septSectionStatus === true ? 1 : 0;
    const [count, setCount] = useState(0);

    const deptSectValus = {
        sect_name: deptSectionName,
        dept_id: selectedDept,
        sect_status: sectionStatus,
        create_user: employeeNumber()
    }
    // reset from fn
    const resetSectionDept = () => {
        updateSectionName('')
        updateSectionStat(false)
        updateSelected(0)
    }
    // Submit form data
    const submitDeptSectionMast = async (e) => {
        e.preventDefault();

        await axioslogin.post('/section', deptSectValus)
            .then((res) => {
                const response = res.data;
                if (response.success === 2) {
                    infoNofity(response.message)
                } else if (response.success === 0) {
                    errorNofity(response.message);
                    resetSectionDept();
                } else if (response.success === 1) {
                    succesNofity(response.message);
                    resetSectionDept();
                    setCount(count + 1)
                }
            })
            .catch((error) => {
                errorNofity(error);
            });

    }
    // redirect fn
    const redirectToSetting = () => {
        history.push('/Home/Settings');
        updateSelected(0)
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Department Section</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitDeptSectionMast} >
                                <TextField
                                    label="Department Seciotn Name"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    value={deptSectionName}
                                    onChange={(e) => updateSectionName(e.target.value)}
                                />
                                <DepartmentSelect />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value={septSectionStatus}
                                            checked={septSectionStatus}
                                            className="ml-2"
                                            onChange={(e) => { updateSectionStat(e.target.checked) }}
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
                                            onClick={redirectToSetting}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <DepartmentSecTable message={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DepartmentSectionMast
