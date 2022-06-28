import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import LeaveSingleSelection from './Component/LeaveSingleSelection';
import LeaveDateSelection from './LeaveDateSelection';
import { getMonth, eachDayOfInterval, format } from 'date-fns'
import moment from 'moment';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const DirLeaveRequest = ({
    emid,//employee id
    leaveDetails,  // for main page details of leave 
    leaveretypeid,// type of request half,leave,latecoming
    leveData,//for getting the leave data based o
    setLeveData,//for getting the leave data based o
    setleavestartend,//to get start and end dates
    setleavedata,//setleavedata for leavedata to main page
    setleavedaystype,
    leavdaystype,//no of days leave
    setsingleselect//check wheather single leave selection
}) => {
    const [date, setDate] = useState([]);// leave dates based on the interval dates
    const [checkState, setCheckState] = useState(false)
    const [casualLevestore, setCasualLevestore] = useState([])//array of object for leave data casual leave
    // const [holidayLevestore, setholidayLevestore] = useState([])//array of object for leave data casual leave
    // const [festivalholidayLevestore, setfestivalholidayLevestore] = useState([])//array of object for leave data casual leave
    const [display, setDisplyleave] = useState(0)
    const [durationleave, setdurationleave] = useState(0)
    // use state for start and end date
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })
    // destructuring start and end date
    const { startDate, endDate } = formData
    // on change  start and end date
    const updateLeaveRequest = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
        setleavestartend({ ...formData, [e.target.name]: value })
    }
    // calculateing leave days
    const leaveDays = (e) => {
        if (new Date(startDate) <= new Date(endDate)) {
            const range = eachDayOfInterval(
                { start: new Date(startDate), end: new Date(endDate) }
            )
            setleavedaystype(Object.keys(range).length)
            const newDateFormat = range.map((val) => { return { date: moment(val).format('yyyy-MM-DD') } })
            setDate(newDateFormat)
        }
        else {
            warningNofity('End Date Must Be Grreater than Start Date')
        }
    }
    //processing  leave first credit the leave of the current month
    const displayleave = async () => {
        setDisplyleave(1)//for view the leave list
        setCasualLevestore([])
        const result = await axioslogin.get(`/common/getcasualleave/${emid}`)
        const { success, data } = result.data
        if (success === 1) {
            const leaveMonth = getMonth(new Date(startDate))
            const casual = data.filter((val) => {
                return val.cl_lv_mnth === leaveMonth + 1
            })
            if (casual.length !== 0) {
                const { hrm_cl_slno } = casual[0]
                const postdata = {
                    hrm_cl_slno: hrm_cl_slno
                }
                await axioslogin.patch('/yearleaveprocess/creditcasual', postdata)

            }
        }
    }
    const setCheckStatemain = (e) => {
        if (e.target.checked === true) {
            setsingleselect(1)
        }
        else {
            setsingleselect(0)
        }
    }

    useEffect(() => {
        setleavedata(casualLevestore)
    }, [casualLevestore])
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

                                    }}
                                />
                            </div>
                            <div className="col-md-1 text-center">
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={(e) => {
                                        displayleave(e)
                                        leaveDays(e)
                                    }}
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
                                            onChange={(e) => {
                                                setCheckState(e.target.checked)

                                                setCheckStatemain(e)

                                            }}
                                            checked={checkState}
                                        />
                                    }
                                    label="SL"
                                />
                            </div>
                            {
                                checkState === true ? <LeaveSingleSelection
                                    em_id={emid}
                                    setLeveData={setLeveData}
                                    leavdaystype={leavdaystype}
                                    formData={formData}
                                    setCasualLevee={setCasualLevestore}//array of object for leave data set function
                                /> : null
                            }
                        </div>
                    </div>
                    {
                        checkState === false && display === 1 ?
                            date && date.map((val, index) => {
                                return <LeaveDateSelection
                                    emid={emid}
                                    casualLevee={casualLevestore}//array of object for leave data
                                    setCasualLevee={setCasualLevestore}//array of object for leave data set function
                                    // setholidayLevestore={setholidayLevestore}
                                    // setfestivalholidayLevestore={setfestivalholidayLevestore}//holiday leave set data
                                    key={index}//key of array
                                    index={index}//index
                                    date={val.date}//date
                                    setLeveData={setLeveData}
                                    leveData={leveData}
                                    leaveDetails={leaveDetails}// for main page details of leave 
                                    leaveretypeid={leaveretypeid}// type of request half,leave,latecoming
                                    durationleave={durationleave}
                                />
                            }) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default DirLeaveRequest
