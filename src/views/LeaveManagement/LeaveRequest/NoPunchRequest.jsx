import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import Timepicker from 'src/views/Component/Timepicker'
import ShiftHalfdayComponent from './Component/ShiftHalfdayComponent'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { format, setDate } from 'date-fns'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { useContext } from 'react'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const NoPunchRequest = ({ setnopunch }) => {
    // use conext data 
    const { employeedetails,//for employee details
        updateemployeedetails,
        getleavereqtype,//type of leave request half,leave,latecoming
        updateleavereqtype } = useContext(PayrolMasterContext)

    // destructuring employee details
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    // for shift based on the date selected
    const [shiftdata, setshiftdata] = useState([{
        shift_id: '',
        shft_desc: '',
        shft_chkin_time: '',
        shft_chkout_time: '',
        plan_slno: ''
    }])
    const { shift_id,
        shft_desc,
        shft_chkin_time,
        shft_chkout_time, plan_slno } = shiftdata[0]

    // checkbox value set for in
    const [checkin, setcheckin] = useState(false)
    // for disable in check

    const [checkindisable, setckeindisable] = useState(false)
    // for disable out check

    const [checkoutdisable, setckeoutdisable] = useState(false)
    // checkbox value set for out
    const [checkout, setcheckout] = useState(false)
    // punchin disable
    const [indisable, setindisable] = useState(true)
    // punch out disable
    const [outdisable, setoutdisable] = useState(true)

    const [punch_slno, setpunchslno] = useState(0)
    const [mispunchflag, setmispunchflag] = useState(0)
    const [starttime, setstartime] = useState('')
    const [endtime, setendtime] = useState('')
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
    })
    // destructuring start and end date
    const { startDate } = formData

    const getshiftdata = async (date, emp_id) => {
        const shiftgetdata = {
            startDate: date,
            em_id: emp_id
        }

        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', shiftgetdata)
        const { success, data } = result.data
        if (success === 1) {
            var arrayshiftdata = data.map((val) => {
                // setplanslno(val.shift_id)
                const shiftseledata = {
                    shift_id: val.shift_id,
                    shft_desc: val.shft_desc,
                    shft_chkin_time: val.shft_chkin_time,
                    shft_chkout_time: val.shft_chkout_time,
                    plan_slno: val.plan_slno
                }
                return shiftseledata
            })

            setshiftdata(arrayshiftdata)
        }
        else if (success === 2) {

            warningNofity('Dutypan is not present for the day')

        }
    }
    useEffect(() => {


        const datanopunch = {
            nopunchdate: startDate,
            checkinflag: checkin,
            checkoutflag: checkout,
            checkintime: starttime,
            checkouttime: endtime,
            plan_slno: plan_slno,
            shift_id: shift_id,
            punch_slno: punch_slno,
            mispunchflag: mispunchflag
        }
        setnopunch(datanopunch)
    }, [startDate, checkin, checkout, starttime, endtime, plan_slno, shift_id])
    const checkinset = (e) => {
        if (e.target.checked === true) {
            setcheckout(false)
            setindisable(true)
            setstartime(shft_chkin_time)
        }
        else {
            setstartime(null)
            setindisable(true)
        }
    }
    const checkoutset = (e) => {

        if (e.target.checked === true) {
            setcheckin(false)
            setoutdisable(true)
            setendtime(shft_chkout_time)
        }
        else {
            setendtime(null)
            setoutdisable(true)
        }
    }

    // on date change
    const getpuchdetl = async (e) => {

        const datagetpunch = {
            emp_id: em_id,
            duty_day: e.target.value
        }
        // details from punch master  based on the date
        const result = await axioslogin.post('common/getShiftdetails/', datagetpunch)

        const { success, data } = result.data
        if (success === 1) {
            const { punch_in, punch_out, punch_slno, mis_punch_flag } = data[0]

            setmispunchflag(mis_punch_flag)
            if (mis_punch_flag === 1) {

                warningNofity("Aready Requested for punch")
                setckeoutdisable(true)
                setckeindisable(true)
                setcheckout(false)
                setcheckin(false)
                setindisable(true)
                setoutdisable(true)
                setstartime(null)
                setendtime(null)
            } else {

                if (punch_in !== null && punch_out !== null) {

                    warningNofity("You Have Both Punches For This Day")
                    setckeoutdisable(true)
                    setckeindisable(true)
                    setcheckout(false)
                    setcheckin(false)
                    setindisable(true)
                    setoutdisable(true)
                    setstartime(null)
                    setendtime(null)
                }
                else {
                    setpunchslno(punch_slno)
                    setstartime(punch_in)
                    setendtime(punch_out)
                    setckeoutdisable(false)
                    setckeindisable(false)
                    if (punch_in === null) {
                        setckeindisable(false)
                    } else {
                        setckeindisable(true)
                    }
                    if (punch_out === null) {

                        setckeoutdisable(false)
                    } else {
                        setckeoutdisable(true)
                    }
                }
            }


        } else if (success === 2) {

            setckeoutdisable(false)
            setckeindisable(false)
            setstartime(null)
            setendtime(null)

        }
        getshiftdata(e.target.value, em_id);
    }

    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <div className="row g-1">
                            <div className="col-md-3 pt-1">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Start Date"
                                    name="startDate"
                                    value={startDate}
                                    changeTextValue={(e) => {
                                        setFormData({ startDate: e.target.value })
                                        getpuchdetl(e)

                                    }}
                                />
                            </div>
                            <div className="col-md-3 pt-1">
                                <ShiftHalfdayComponent style={SELECT_CMP_STYLE} shiftdata={shiftdata} />
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex justify-content-start">
                                    <div className="col-md-2">
                                        <FormControlLabel
                                            className=""
                                            control={
                                                <Checkbox
                                                    name="start_month"
                                                    color="secondary"
                                                    value={checkin}
                                                    disabled={checkindisable}
                                                    checked={checkin}
                                                    className="ml-2"
                                                    onChange={(e) => {
                                                        setcheckin(e.target.checked)
                                                        checkinset(e)
                                                    }}
                                                />

                                            }
                                            label="IN"
                                        />
                                    </div>
                                    <div className="col-md-10 pt-2">
                                        <Timepicker
                                            value={starttime}
                                            changetextvalue={(e) => setstartime(e)}
                                            disable={indisable}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex justify-content-start">
                                    <div className="col-md-3">
                                        <FormControlLabel
                                            className="pl-0"
                                            control={
                                                <Checkbox
                                                    name="start_month"
                                                    color="secondary"
                                                    value={checkout}
                                                    disabled={checkoutdisable}
                                                    checked={checkout}
                                                    className="ml-2"
                                                    onChange={(e) => {
                                                        setcheckout(e.target.checked)
                                                        checkoutset(e)
                                                    }}
                                                />
                                            }
                                            label="OUT"
                                        />
                                    </div>
                                    <div className="col-md-9 pt-2">
                                        <Timepicker

                                            value={endtime}
                                            changetextvalue={(e) => setendtime(e)}
                                            disable={outdisable}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default NoPunchRequest
