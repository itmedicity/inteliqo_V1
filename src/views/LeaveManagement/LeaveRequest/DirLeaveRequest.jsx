import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import LeaveSingleSelection from './Component/LeaveSingleSelection';
import LeaveDateSelection from './LeaveDateSelection';
import { getMonth, eachDayOfInterval, format } from 'date-fns'
import moment from 'moment';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { axioslogin } from 'src/views/Axios/Axios';

const DirLeaveRequest = ({ emid }) => {
    const [date, setDate] = useState([]);
    const [lveData, setLveData] = useState([]);
    const [checkState, setCheckState] = useState(false)
    const [display, setDisplyleave] = useState(0)
    const [casualLeave, creditcasualLeave] = useState([]);
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })
    const { startDate, endDate } = formData
    const updateLeaveRequest = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const leaveDays = (e) => {
        const range = eachDayOfInterval(
            { start: new Date(startDate), end: new Date(e) }
        )
        const newDateFormat = range.map((val) => { return { date: moment(val).format('DD-MM-YYYY') } })
        setDate(newDateFormat)
    }
    //processing casual leave
    const displayleave = async () => {
        setDisplyleave(1)
        const result = await axioslogin.get(`/common/getcasualleave/${emid}`)
        const { success, data } = result.data
        if (success === 1) {
            const leaveMonth = getMonth(new Date(startDate))
            const casual = data.filter((val) => {
                return val.cl_lv_mnth === leaveMonth + 1
            })
            const { cl_lv_mnth, hrm_cl_slno } = casual[0]
            const postdata = {
                hrm_cl_slno: hrm_cl_slno
            }
            const result = await axioslogin.patch('/yearleaveprocess/creditcasual', postdata)
        }
    }
    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <div className="row g-1">
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Start Date"
                                    name="startDate"
                                    value={startDate}
                                    changeTextValue={(e) => updateLeaveRequest(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="End  Date"
                                    name="endDate"
                                    value={endDate}
                                    changeTextValue={(e) => {
                                        updateLeaveRequest(e)
                                        leaveDays(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-md-1 text-center">
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={displayleave}
                                >
                                    <MdOutlineAddCircleOutline className="text-info" size={30} />
                                </IconButton>
                            </div>
                            <div className="col-md-1 p-0 mt-0 text-center">
                                <FormControlLabel
                                    className="p-0 m-0"
                                    control={
                                        <Checkbox
                                            name="all"
                                            color="secondary"
                                            // value={Leave_Carry_Forwad}
                                            // checked={Leave_Carry_Forwad}
                                            className="ml-2"
                                            onChange={(e) => setCheckState(e.target.checked)}
                                            checked={checkState}
                                        />
                                    }
                                    label="SL"
                                />
                            </div>
                            {
                                checkState === true ? <LeaveSingleSelection setLveState={setLveData} /> : null
                            }
                        </div>
                    </div>
                    {
                        checkState === false && display === 1 ?
                            date && date.map((val, index) => {
                                return <LeaveDateSelection key={index} index={index}
                                    date={val.date} setLeveData={setLveData} leveData={lveData}
                                />
                            }) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default DirLeaveRequest
