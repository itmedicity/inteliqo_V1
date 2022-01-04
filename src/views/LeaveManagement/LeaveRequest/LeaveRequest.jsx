import React, { Fragment, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import LeaveCalender from './LeaveCalender'
import DirLeaveRequest from './DirLeaveRequest'
import HalfDayLeaveRequest from './HalfDayLeaveRequest'
import NoPunchRequest from './NoPunchRequest'
import LateComming from './LateComming'
import EarlyGoing from './EarlyGoing'

const LeaveRequest = () => {
    const history = useHistory()
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
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee Name"
                                    disabled="disabled"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Number"
                                    disabled="disabled"
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
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="To Date"
                                // disabled="disabled"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Rejoin Date"
                                // disabled="disabled"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Leave Request Card */}
                    <div className="col-md-12 mb-2">
                        {
                            value === '1' ? <DirLeaveRequest /> :
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
