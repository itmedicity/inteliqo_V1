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
const Input = styled('input')({
    display: 'none',
});
const LeaveRequest = () => {
    const history = useHistory()
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    const [value, setValue] = useState(0)
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Request"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
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
                                <TestSelectComponent style={SELECT_CMP_STYLE} select="Leave Request Type" onChange={setValue} />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="From Date"
                                // disabled="disabled"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="No of Leave Taken"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emergency Contact Number During Leave"
                                />
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
                            <div className="col-md-9">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Reason For Leave"
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
                            value === '1' ? <DirLeaveRequest emid={em_id} /> :
                                value === '2' ? <HalfDayLeaveRequest /> :
                                    value === '3' ? <NoPunchRequest /> :
                                        value === '4' ? <LateComming /> :
                                            value === '5' ? <EarlyGoing /> : null
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
