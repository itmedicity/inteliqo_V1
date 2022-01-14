import React, { Fragment, useContext, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import LeaveCalender from './LeaveCalender'
import DirLeaveRequest from './DirLeaveRequest'
import HalfDayLeaveRequest from './HalfDayLeaveRequest'
import NoPunchRequest from './NoPunchRequest'
import LateComming from './LateComming'
import EarlyGoing from './EarlyGoing'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LeaveRequestTypeComponent from './Component/LeaveRequestTypeComponent'
import LeaveRequestType from 'src/views/CommonCode/LeaveRequestType'
const Input = styled('input')({
    display: 'none',
});
const LeaveRequest = () => {
    const history = useHistory()
    const [lveData, setLveData] = useState([]);
    const { employeedetails, updateemployeedetails,
        getleavereqtype, updateleavereqtype } = useContext(PayrolMasterContext)
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [leaveDetails, setLeaveDetails] = useState({
        fromDate: '',
        noofleavetaken: '',
        resonforleave: '',
        emergencynumber: '',
    })

    const { fromDate, noofleavetaken, resonforleave, emergencynumber } = leaveDetails
    const updateLeaveDetails = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLeaveDetails({ ...leaveDetails, [e.target.name]: value })
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Request"
                redirect={RedirectToProfilePage}
            //submit={submitLeave}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1 mb-2">
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department"
                                    disabled="disabled"
                                    value={dept_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                    value={sect_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee Name"
                                    disabled="disabled"
                                    value={em_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Number"
                                    disabled="disabled"
                                    value={em_no}
                                />
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
                            <div className="col-md-3">
                                <LeaveRequestType style={SELECT_CMP_STYLE} select="Leave Request Type" />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="From Date"
                                    name="fromDate"
                                    value={fromDate}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="No of Leave Taken"
                                    name="noofleavetaken"
                                    value={noofleavetaken}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emergency Contact Number During Leave"
                                    name="emergencynumber"
                                    value={emergencynumber}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
                            <div className="col-md-9">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Reason For Leave"
                                    name="resonforleave"
                                    value={resonforleave}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3 text-center">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                        <Button variant="contained" component="span" size="small">
                                            Upload
                                        </Button>
                                    </label>
                                </Stack>
                            </div>
                        </div>
                    </div>
                    {/* Leave Request Card */}
                    <div className="col-md-12 mb-2">
                        {
                            getleavereqtype === 1 ? <DirLeaveRequest emid={em_id} leaveDetails={leaveDetails} leaveretypeid={getleavereqtype}
                                setLeveData={setLveData} leveData={lveData} /> :
                                getleavereqtype === '2' ? <HalfDayLeaveRequest /> :
                                    getleavereqtype === '3' ? <NoPunchRequest /> :
                                        getleavereqtype === '4' ? <LateComming /> :
                                            getleavereqtype === '5' ? <EarlyGoing /> : null
                        }
                    </div>
                    {/* Diplay the Allowed Leave Calender */}
                    <div className="col-md-12">
                        <LeaveCalender />
                    </div>
                </form>
            </PageLayoutSave>
        </Fragment>
    )
}

export default LeaveRequest
