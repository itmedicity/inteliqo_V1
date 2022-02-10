import { FormControl, MenuItem, Select, TextareaAutosize, Typography } from '@material-ui/core'
import { addDays } from 'date-fns/esm'
import moment from 'moment'
import React, { Fragment, useContext, useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { format } from 'date-fns'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import ResignationComponent from './ResignationComponent';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'

const ResignationRequest = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [noticeperiod, setNoticePeriod] = useState(0)
    const { employeedetails, authorization } = useContext(PayrolMasterContext)
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    const { incharge_level, hod_level, ceo_level, is_incharge, is_hod } = authorization
    const [FormData, setFormData] = useState({
        resignation_type: '0',
        request_date: '',
        resignation_reason: '',
    })
    const defaultState = {
        resignation_type: '0',
        request_date: '',
        resignation_reason: '',
    }
    const { resignation_type, request_date, resignation_reason } = FormData
    //use effect for getting notice period
    useEffect(() => {
        const getNoticePeriod = async () => {
            const result = await axioslogin.get(`/designation/noticeperiod/${em_designation}`)
            const { success, data } = result.data
            if (success == 1) {
                const { desg_notice_prd } = data[0]
                setNoticePeriod(desg_notice_prd)
            }
        }
        getNoticePeriod()
    }, [])
    //getting form data
    const updateResignationRequest = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value })
    }
    const postData = {
        dept_id: em_department,
        sect_id: em_dept_section,
        em_id: em_id,
        em_no: em_no,
        designation: em_designation,
        resignation_type: resignation_type,
        request_date: moment(request_date).format('YYYY-MM-DD'),
        relieving_date: moment(addDays(new Date(request_date), noticeperiod)).format('YYYY-MM-DD'),
        resign_reason: resignation_reason,
        notice_period: noticeperiod,
        incharge_required: is_incharge === 1 ? 0 : incharge_level,
        hod_required: is_hod === 1 ? 0 : hod_level,
        ceo_required: ceo_level,
    }
    //saving employee resignation
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/Resignation', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setFormData(defaultState)
        }
        else if (success === 2) {
            warningNofity(message)
        }
        else {
            errorNofity("Error Occured!!!!! Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <AuthorizationDetails />
            <PageLayoutSave
                heading="Resignation Request"
                redirect={RedirectToProfilePage}
                submit={submitFormData}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1 mb-2">
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department"
                                    disabled="disabled"
                                    value={dept_name}
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                    value={sect_name}
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Number"
                                    disabled="disabled"
                                    value={em_no}
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
                                    Placeholder="Designation"
                                    disabled="disabled"
                                    value={desg_name}
                                />
                            </div>
                        </div>
                        <div className="card">
                            <div className="col-md-12">
                                <div className="row g-1 mb-2 mt-1">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2 pt-2">
                                        <Typography>
                                            Resignation Type
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                        >
                                            <Select
                                                name="resignation_type"
                                                value={resignation_type}
                                                onChange={(e) => updateResignationRequest(e)}
                                                fullWidth
                                                variant="outlined"
                                                className="ml-1"
                                                defaultValue={0}
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                            >
                                                <MenuItem value='0'>Resignation Type</MenuItem>
                                                <MenuItem value='1'>Resignation</MenuItem>
                                                <MenuItem value='2'>24-Hour Resignation</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        {resignation_type === '2' ? <ResignationComponent /> : null}
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">
                                        <Typography>
                                            Request Date
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="From Date"
                                            name="request_date"
                                            value={request_date}
                                            changeTextValue={(e) => updateResignationRequest(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">
                                        <Typography>
                                            Notice Period
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Notice Period"
                                            value={noticeperiod}
                                            disabled="disabled"
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">
                                        <Typography>
                                            Relieving Date
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="From Date"
                                            name="relievingDate"
                                            value={request_date !== '' ? format(addDays(new Date(request_date), noticeperiod), "yyyy-MM-dd") : ''}
                                            disabled="disabled"
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">
                                        <Typography>
                                            Reason
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Resignation Reason"
                                            style={{ width: 570 }}
                                            name="resignation_reason"
                                            value={resignation_reason}
                                            onChange={(e) => updateResignationRequest(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayoutSave>
        </Fragment >
    )
}

export default ResignationRequest

