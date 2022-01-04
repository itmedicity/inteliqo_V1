import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import ApprovalInchargeTable from './ApprovalInchargeTable'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
import Tooltip from "@material-ui/core/Tooltip";
import TextInput from 'src/views/Component/TextInput';
import { ImSearch } from "react-icons/im";

const ApprovalIncharge = () => {
    const history = useHistory()
    const { updateleaverequest } = useContext(PayrolMasterContext)
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
                heading="Leave Approval Incharge"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
            >
                <div className="row g-2">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5 col-sm-12 col-xs-12">
                                        <div className="d-flex justify-content-around">
                                            <div className="pt-0">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="all"
                                                            color="secondary"
                                                            // value={Leave_Carry_Forwad}
                                                            // checked={Leave_Carry_Forwad}
                                                            //onChange={(e) => null}
                                                            checked={true}
                                                        />
                                                    }
                                                    label="All"
                                                />
                                            </div>
                                            {
                                                leaverequesttype && leaverequesttype.map((val) => {
                                                    return <div className="pt-0" key={val.lrequest_slno} >
                                                        <FormControlLabel
                                                            control={
                                                                <Tooltip title={val.lrequest_type}>
                                                                    <Checkbox
                                                                        name={val.lrequest_short}
                                                                        color="secondary"
                                                                        value={val.lrequest_slno}
                                                                    // checked={Leave_Carry_Forwad}
                                                                    //onChange={(e) => null}
                                                                    />
                                                                </Tooltip>
                                                            }
                                                            label={val.lrequest_short}
                                                        />
                                                    </div>;
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-7 col-sm-12 col-xs-12">
                                        <div className="d-flex justify-content-around">
                                            <div className="col-md-4  col-sm-12">
                                                <DeptSectionMastSelect
                                                    style={SELECT_CMP_STYLE}
                                                />
                                            </div>
                                            <div className="col-md-1  col-sm-12">
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
                                            <div className="col-md-4 col-sm-12">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Employee No"
                                                // value={fine_descp}
                                                // name="fine_descp"
                                                // changeTextValue={(e) => }
                                                />
                                            </div>
                                            <div className="col-md-1  col-sm-12">
                                                <Tooltip title="Search">
                                                    <IconButton >
                                                        < ImSearch size={22} />
                                                    </IconButton>

                                                    {/* // disabled={props.disable}
                                                // clickable={true} */}
                                                </Tooltip>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="col-md-12">
                            <ApprovalInchargeTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default ApprovalIncharge
