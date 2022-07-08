import { Button, FormControlLabel, Checkbox } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DeptSecSelectAuth from 'src/views/CommonCode/DeptSecSelectAuth'
import EmpNameDepartmentSec from 'src/views/CommonCode/EmpNameDepartmentSec'
import GroupSelection from 'src/views/CommonCode/GroupSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import ModuleSelection from 'src/views/CommonCode/ModuleSelection'
import ModuleUserRightTable from './ModuleUserRightTable'

const MdleUserRightMast = () => {
    const classes = useStyles()
    const history = useHistory()
    const {
        selectEmpDeptSec,
        updateselectEmpDeptSec,
        selectModuleGroup,
        updateSelectedModuleGroup,
        selectGroupName,
        updateGroupNameList
    } = useContext(PayrolMasterContext)

    const [moduleUserStaus, setmdlstatus] = useState(false)
    const mdlstatus = moduleUserStaus === true ? 1 : 0;
    const [count, setCount] = useState(0)

    const formData = {
        emp_slno: selectEmpDeptSec,
        mdgrp_slno: selectModuleGroup,
        mdlstatus: mdlstatus,
        user_grp_slno: selectGroupName
    }

    const submitUserModuleGroup = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/moduleRights', formData);
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message);
            updateselectEmpDeptSec(0)
            updateSelectedModuleGroup(0)
            updateGroupNameList(0)
            setmdlstatus(false)
            setCount(count + 1)
        } else if (success === 0) {
            errorNofity(message);
        } else if (success === 2) {
            infoNofity(message.sqlMessage);
        } else if (success === 7) {
            infoNofity(message);
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
                    <h5>User Group Rights</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitUserModuleGroup} >
                                <div className="col-md-12 row">
                                    <DeptSecSelectAuth />
                                </div>
                                <div className="col-md-12 row">
                                    <EmpNameDepartmentSec />
                                </div>
                                <div className="col-md-12 row">
                                    <ModuleSelection />
                                </div>
                                <div className="col-md-12 row">
                                    <GroupSelection />
                                </div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="secondary"
                                            value={moduleUserStaus}
                                            checked={moduleUserStaus}
                                            className="ml-2"
                                            onChange={(e) => { setmdlstatus(e.target.checked) }}
                                        />
                                    }
                                    label="User Right Status"
                                />
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
                            </form>
                        </div>
                        <div className="col-md-8">
                            <ModuleUserRightTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MdleUserRightMast
