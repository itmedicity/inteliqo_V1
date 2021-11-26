import { Checkbox, FormControlLabel, Button } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EmployeeSelect from 'src/views/CommonCode/EmployeeSelect'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import ModuleSelection from 'src/views/CommonCode/ModuleSelection'
import ModuleUserRightTable from './ModuleUserRightTable'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import GroupSelection from 'src/views/CommonCode/GroupSelection'

const ModuleUserRightEdit = () => {
    const classes = useStyles()
    const history = useHistory()
    const {
        selectedEmployee,
        updateSelectedEmployee,
        selectModuleGroup,
        updateSelectedModuleGroup,
        selectGroupName,
        updateGroupNameList
    } = useContext(PayrolMasterContext);

    const [moduleUserStatus, setmoduleUserStatus] = useState(false)
    // Redirect to the Setting Page 
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    const { id } = useParams();

    useEffect(() => {
        const getModuleEditUserDetl = async () => {
            const result = await axioslogin.get(`/moduleRights/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { emp_slno, mdgrp_slno, status, user_grp_slno } = data[0]
                const mdlStatsus = status === 1 ? true : false;
                setmoduleUserStatus(mdlStatsus)
                updateSelectedEmployee(emp_slno)
                updateSelectedModuleGroup(mdgrp_slno)
                updateGroupNameList(user_grp_slno)
            }
        }
        getModuleEditUserDetl()
        return (
            <>
                updateSelectedEmployee(0)
                updateSelectedModuleGroup(0)
                updateGroupNameList(0)
            </>
        )
    }, [id, updateSelectedEmployee, updateSelectedModuleGroup, updateGroupNameList])

    const postEditedData = {
        emp_slno: selectedEmployee,
        mdgrp_slno: selectModuleGroup,
        mdlstatus: moduleUserStatus === true ? 1 : 0,
        mdrte_slno: id,
        user_grp_slno: selectGroupName
    }

    const submitModuleRightEdit = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/moduleRights', postEditedData)
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message)
            // setCount(count + 1)
            toSettings()
        } else {
            infoNofity(message)
        }
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
                            <form className={classes.root} onSubmit={submitModuleRightEdit} >
                                <div className="col-md-12 row">
                                    <EmployeeSelect />
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
                                            value={moduleUserStatus}
                                            checked={moduleUserStatus}
                                            className="ml-2"
                                        // onChange={(e) => { setmdlstatus(e.target.checked) }}
                                        />
                                    }
                                    label="Employee Group Status"
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
                            <ModuleUserRightTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(ModuleUserRightEdit)
