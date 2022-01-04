import React, { Fragment } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { FiSearch } from "react-icons/fi";
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
import TextInput from 'src/views/Component/TextInput';
import OTApprovalInchargeTable from './OTApprovalInchargeTable'
import Tooltip from "@material-ui/core/Tooltip";

const OTApprovalIncharge = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="OT Approval Incharge"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="row g-1">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <DeptSectionMastSelect
                                            style={SELECT_CMP_STYLE}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="all"
                                                    color="secondary"
                                                    // value={Leave_Carry_Forwad}
                                                    // checked={Leave_Carry_Forwad}
                                                    checked={true}
                                                />
                                            }
                                            label="All"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-0">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Employee No"
                                        // value={fine_descp}
                                        // name="fine_descp"
                                        // changeTextValue={(e) => }
                                        />
                                    </div>
                                    <div className="col-md-1 pl-0">
                                        <Tooltip title="Search">
                                            <IconButton >
                                                < FiSearch size={22} />
                                            </IconButton>
                                            {/* disabled={props.disable}
                                                 clickable={true}  */}
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card ">
                            <div className="col-md-12">
                                <OTApprovalInchargeTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default OTApprovalIncharge
