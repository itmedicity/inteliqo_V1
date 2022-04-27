
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import moment from 'moment';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const NightOffRequest = () => {
    const history = useHistory()
    const { employeedetails,
        //for employee details 
    } = useContext(PayrolMasterContext)
    const [dates, setdates] = useState({
        fromDate: new Date(),
        todate: new Date(),
        fordate: new Date()
    })
    const { fromDate, todate, fordate } = dates

    const [value, setvalue] = useState(0)

    // destructuring employee details
    const { dept_name, em_id, em_name, em_no, sect_name } = employeedetails
    // redirect to home page 
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const updateLeaveDetails = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdates({ ...dates, [e.target.name]: value })
    }
    const updatepunch = async () => {
        const empdata = {
            fromDate: fromDate,
            todate: todate,
            em_id: em_id
        }
        const result = await axioslogin.post('/attandancemarking/getnightoffdata', empdata)
        const { success } = result.data
        if (success === 1) {
            const findata = result.data.message
            if (findata.length > 3) {
                setvalue(1)
            }
            else {
                warningNofity('Not Applicable for Leave')
            }
        } else if (success === 0) {
            warningNofity('Not Applicable for Leave')
        }
    }
    const submitNightoff = async () => {
        const submitdata = {
            fordate: moment(fordate).format('yyyy-MM-DD'),
            lvreq_type: 'NF',
            leave_type: 12,
            emp_id: em_id
        }
        const result = await axioslogin.patch('/attandancemarking/updatenightoff', submitdata)
        const { success } = result.data
        if (success === 1) {
            setvalue(0)
            setdates({
                fromDate: new Date(),
                todate: new Date(),
                fordate: new Date()
            })
            warningNofity("Updated Successfully")
        }
    }
    return (
        <Fragment>
            <AuthorizationDetails />
            <PageLayoutSave
                heading="Night Off Request"
                redirect={RedirectToProfilePage}
                submit={submitNightoff}
            >
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
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Duty Day From"
                                name="fromDate"
                                value={fromDate}
                                changeTextValue={(e) => updateLeaveDetails(e)}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Duty Day To"
                                name="todate"
                                min={fromDate}
                                value={todate}
                                changeTextValue={(e) => {
                                    updateLeaveDetails(e)
                                    updatepunch()
                                }}
                            />
                        </div>
                        {value === 1 ?
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Request For Night Off To"
                                    name="fordate"
                                    min={todate}
                                    value={fordate}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div> : null
                        }
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default NightOffRequest