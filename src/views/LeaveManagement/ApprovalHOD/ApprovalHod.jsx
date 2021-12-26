import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, Chip, FormControlLabel, IconButton } from '@material-ui/core';
import { FiSearch } from "react-icons/fi";
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import ApprovalHODTable from './ApprovalHODTable';
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';

const ApprovalHod = () => {
    const history = useHistory()
    const { selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectleaverequest, updateleaverequest } = useContext(PayrolMasterContext)
    const [leaverequesttype, setleaverequesttype] = useState([]);

    useEffect(() => {
        const getleaverequest = async () => {
            const result = await axioslogin.get('/leaveRequestType/select')
            const { success, data } = result.data;
            if (success === 1) {
                setleaverequesttype(data)
            }
        }
        getleaverequest()
        return (
            updateleaverequest(0)
        )
    }, [updateleaverequest]);

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Approval HOD"
                redirect={RedirectToProfilePage}
                footer="LR-Leave Request //
                HLF-Half Day Leave Request //
                NOP-No Punch"
            //submit={submitFine}
            >
                <div className="row g-1">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-7 d-flex justify-space-evenly">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="all"
                                                    color="secondary"
                                                    // value={Leave_Carry_Forwad}
                                                    // checked={Leave_Carry_Forwad}
                                                    className="ml-2"
                                                    onChange={(e) => null}
                                                    checked={true}
                                                />
                                            }
                                            label="All"
                                        />
                                        {
                                            leaverequesttype && leaverequesttype.map((val) => {
                                                return <div className="" key={val.lrequest_slno} >
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name={val.lrequest_short}
                                                                color="secondary"
                                                                value={val.lrequest_slno}
                                                                // checked={Leave_Carry_Forwad}
                                                                className="ml-2"
                                                                onChange={(e) => null}
                                                            />
                                                        }
                                                        label={val.lrequest_short}
                                                    />
                                                </div>;
                                            })
                                        }
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <DeptSectionMastSelect
                                                    style={SELECT_CMP_STYLE}
                                                />
                                            </div>
                                            <div className="col-md-1 pl-2">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="all"
                                                            color="secondary"
                                                            // value={Leave_Carry_Forwad}
                                                            // checked={Leave_Carry_Forwad}
                                                            className="ml-2"
                                                            checked={true}
                                                        />
                                                    }
                                                    label="All"
                                                />
                                            </div>
                                            <div className="col-md-2 ">
                                                <IconButton type="submit" >
                                                    < FiSearch size={22} />
                                                </IconButton>
                                                {/* 
                                                // disabled={props.disable}
                                                // clickable={true} */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="col-md-12">
                            <ApprovalHODTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default ApprovalHod
