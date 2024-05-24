import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import TextInput from 'src/views/Component/TextInput';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import { useHistory } from 'react-router';
import { Checkbox, FormControlLabel, FormControl, MenuItem, Select } from '@material-ui/core'
import moment from 'moment';
import { errorNofity, getTotalShiftHours, succesNofity } from 'src/views/CommonCode/Commonfunc';
import ShiftMasterTable from './ShiftMasterTable';
import Timepicker from 'src/views/Component/Timepicker';
import MinutePicker from 'src/views/Component/MinutePicker';
import { subHours } from 'date-fns';
import { addHours } from 'date-fns/esm';

const ShiftMasterEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    //use State for Setting Initial State
    const [formData, setFormData] = useState({
        shift_name: "",
        shift_code: "",
        crossday: '0',
        dutyday: '1',
        earlyincalculation: '1',
        earlyoutcalculation: '1',
        shift_status: true,
        nightoff: false
    })
    const { shift_name, shift_code, crossday, dutyday, earlyincalculation, earlyoutcalculation, nightoff, shift_status } = formData
    //default State
    const defaultState = {
        shift_name: "",
        shift_code: "",
        crossday: '0',
        dutyday: '1',
        earlyincalculation: '1',
        earlyoutcalculation: '1',
        shift_status: true,
        nightoff: false
    }
    //use State For Check In
    const [checkIn, setCheckIn] = useState(new Date());
    const SetcheckInTime = useCallback((val) => {
        setCheckIn(val)
        const result = subHours(new Date(val), 8)
        setcheckInStart(result)
        const result2 = addHours(new Date(val), 4)
        setcheckInEnd(result2)
    }, [])
    //use State For Check Out
    const [checkOut, setCheckOut] = useState(new Date());
    const SetcheckOutTime = useCallback((val) => {
        setCheckOut(val)
        const result = subHours(new Date(val), 2)
        setcheckOutStart(result)
        const result2 = addHours(new Date(val), 8)
        setcheckOutEnd(result2)
    }, [])
    //use State For Check In Start
    const [checkInStart, setcheckInStart] = useState(new Date());
    // const SetcheckInTimeStart = (val) => {
    //     setcheckInStart(val)
    // }
    // //use State For Check In End
    const [checkInEnd, setcheckInEnd] = useState(new Date());
    // const SetcheckInTimeEnd = (val) => {
    //     setcheckInEnd(val)
    // }
    //use State For Check Out Start
    const [checkOutStart, setcheckOutStart] = useState(new Date());
    // const SetcheckoutTimeStart = (val) => {
    //     setcheckOutStart(val)
    // }
    //use State For Check Out End
    const [checkOutEnd, setcheckOutEnd] = useState(new Date());
    // const SetcheckoutTimeEnd = (val) => {
    //     setcheckOutEnd(val)
    // }
    //use State For Break Start
    const [BreakStart, setBreakStart] = useState(new Date());
    const SetBreakTimestart = useCallback((val) => {
        setBreakStart(val)
    }, [])
    //use State For Break End
    const [Breakend, setBreakEnd] = useState(new Date());
    const SetBreakTimeend = useCallback((val) => {
        setBreakEnd(val)
    }, [])
    //use State For Early In
    const [EarlyIn, setEarlyIn] = useState(new Date());
    const setEarlyInTime = useCallback((val) => {
        setEarlyIn(val)
    }, [])
    //use State For Early Out
    const [EarlyOut, setEarlyOut] = useState(new Date());
    const setEarlyOutTime = useCallback((val) => {
        setEarlyOut(val)
    }, [])
    //use State For Allowed Late in
    const [LateIn, setLateIn] = useState(new Date());
    const setlateInTime = useCallback((val) => {
        setLateIn(val)
    }, [])
    //use State For Allowed LateOut
    const [LateOut, setLateOut] = useState(new Date());
    const setlateOutTime = useCallback((val) => {
        setLateOut(val)
    }, [])
    //use State ForFirst Half Check In
    const [firsthalfcheckin, setfirsthalfcheckin] = useState(new Date());
    const SetfirsthalfcheckinTime = useCallback((val) => {
        setfirsthalfcheckin(val)
    }, [])
    //use State ForFirst Half Check Out
    const [firsthalfcheckout, setfirsthalfcheckout] = useState(new Date());
    const SetfirsthalfcheckOutTime = useCallback((val) => {
        setfirsthalfcheckout(val)
    }, [])
    //use State For second Half Check In
    const [Secondhalfcheckin, setSecondhalfcheckin] = useState(new Date());
    const SetSecondhalfcheckInTime = useCallback((val) => {
        setSecondhalfcheckin(val)
    }, [])
    //use State For second Half Check Out
    const [Secondhalfcheckout, SetSecondhalfcheckout] = useState(new Date());
    const SetSecondhalfcheckOutTime = useCallback((val) => {
        SetSecondhalfcheckout(val)
    }, [])
    //FUNCTION TO GET TO TOMORROW DATE
    const nextdate = new Date(new Date(checkOut).setDate(new Date().getDate() + 1));
    const checkoutstartcrossday = new Date(new Date(checkOutStart).setDate(new Date().getDate() + 1));
    const checkoutendcrossday = new Date(new Date(checkOutEnd).setDate(new Date().getDate() + 1));
    useEffect(() => {
        const getShiftMasterDetails = async () => {
            const result = await axioslogin.get(`/shift/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const {
                    shft_desc,
                    shft_code,
                    shft_chkin_time,
                    shft_chkout_time,
                    shft_cross_day,
                    shft_chkin_start,
                    shft_chkin_end,
                    shft_chkout_start,
                    shft_chkout_end,
                    shft_duty_day,
                    shft_brk_start,
                    shft_brk_end,
                    shft_early_in_criteria,
                    shft_early_in_mints,
                    shft_late_out_criteria,
                    shft_late_out_mints,
                    shft_latein_allow_time,
                    shft_earlyout_allow_time,
                    first_half_in,
                    first_half_out,
                    second_half_in,
                    second_half_out,
                    night_off_flag,
                    shft_status
                } = data[0]

                const frmData = {
                    shift_name: shft_desc,
                    shift_code: shft_code,
                    crossday: shft_cross_day,
                    dutyday: shft_duty_day,
                    earlyincalculation: shft_early_in_criteria,
                    earlyoutcalculation: shft_late_out_criteria,
                    nightoff: night_off_flag === 1 ? true : false,
                    shift_status: shft_status === 1 ? true : false
                }
                setCheckIn(new Date(shft_chkin_time))
                setCheckOut(new Date(shft_chkout_time))
                setcheckInStart(new Date(shft_chkin_start))
                setcheckInEnd(new Date(shft_chkin_end))
                setcheckOutStart(new Date(shft_chkout_start))
                setcheckOutEnd(new Date(shft_chkout_end))
                setBreakStart(new Date(shft_brk_start))
                setBreakEnd(new Date(shft_brk_end))
                setEarlyIn(new Date(shft_early_in_mints))
                setEarlyOut(new Date(shft_late_out_mints))
                setLateIn(new Date(shft_latein_allow_time))
                setLateOut(new Date(shft_earlyout_allow_time))
                setfirsthalfcheckin(new Date(first_half_in))
                setfirsthalfcheckout(new Date(first_half_out))
                setSecondhalfcheckin(new Date(second_half_in))
                SetSecondhalfcheckout(new Date(second_half_out))
                setFormData(frmData)
            }
        }
        getShiftMasterDetails()
    }, [id])
    const updateShiftmasterData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    //caslculating the shift duration in minutes
    const x = moment(checkIn).format("YYYY-MM-DD HH:mm:ss")
    const xx = moment(x)
    const y = moment(checkOut).format("YYYY-MM-DD HH:mm:ss")
    const yy = moment(y)
    const shiftduration = getTotalShiftHours(xx, yy)
    //shiftduration in minutes if crossday is 1
    const n = moment(checkIn).format("YYYY-MM-DD HH:mm:ss")
    const nn = moment(n)
    const m = moment(nextdate).format("YYYY-MM-DD HH:mm:ss")
    const mm = moment(m)
    const shiftdurationforcrossday = getTotalShiftHours(nn, mm)

    //converting check in an check in tikme to minutes
    const z = moment(new Date()).format("YYYY-MM-DD 00:00:00")
    const zz = moment(z)
    const checkinminutes = getTotalShiftHours(zz, xx)
    // console.log(checkinminutes)
    //calculating checkmout in minutes
    const checkoutinminutes = getTotalShiftHours(zz, yy)
    //check out in minutes in if cross day is 1
    const checkoutminutescrossday = getTotalShiftHours(zz, mm)
    //saving Data
    const postData = {
        shft_slno: id,
        shft_desc: shift_name,
        shft_code: shift_code,
        shft_chkin_time: moment(checkIn).format("YYYY-MM-DD HH:mm:ss"),
        shft_cross_day: crossday,
        shft_chkout_time: crossday === '1' ? moment(nextdate).format("YYYY-MM-DD HH:mm:ss") : moment(checkOut).format("YYYY-MM-DD HH:mm:ss"),
        shft_chkin_start: moment(checkInStart).format("YYYY-MM-DD HH:mm:ss"),
        shft_chkin_end: moment(checkInEnd).format("YYYY-MM-DD HH:mm:ss"),
        shft_chkout_start: crossday === '1' ? moment(checkoutstartcrossday).format("YYYY-MM-DD HH:mm:ss") : moment(checkOutStart).format("YYYY-MM-DD HH:mm:ss"),
        shft_chkout_end: crossday === '1' ? moment(checkoutendcrossday).format("YYYY-MM-DD HH:mm:ss") : moment(checkOutEnd).format("YYYY-MM-DD HH:mm:ss"),
        shft_duty_day: dutyday,
        shft_brk_start: moment(BreakStart).format("YYYY-MM-DD HH:mm:ss"),
        shft_brk_end: moment(Breakend).format("YYYY-MM-DD HH:mm:ss"),
        shft_early_in_criteria: earlyincalculation,
        shft_early_in_mints: moment(EarlyIn).format("YYYY-MM-DD HH:mm:ss"),
        shft_late_out_criteria: earlyoutcalculation,
        shft_late_out_mints: moment(EarlyOut).format("YYYY-MM-DD HH:mm:ss"),
        shft_latein_allow_time: moment(LateIn).format("YYYY-MM-DD HH:mm:ss"),
        shft_earlyout_allow_time: moment(LateOut).format("YYYY-MM-DD HH:mm:ss"),
        first_half_in: moment(firsthalfcheckin).format("YYYY-MM-DD HH:mm:ss"),
        first_half_out: moment(firsthalfcheckout).format("YYYY-MM-DD HH:mm:ss"),
        second_half_in: moment(Secondhalfcheckin).format("YYYY-MM-DD HH:mm:ss"),
        second_half_out: moment(Secondhalfcheckout).format("YYYY-MM-DD HH:mm:ss"),
        shift_duration_in_min: crossday === '1' ? shiftdurationforcrossday : shiftduration,
        shift_start_in_min: checkinminutes,
        shift_end_in_min: crossday === '1' ? checkoutminutescrossday : checkoutinminutes,
        night_off_flag: nightoff === false ? 0 : 1,
        shft_status: shift_status === true ? 1 : 0,
    }
    // console.log('checkIn')


    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/shift', postData)
        const { success, message } = result.data
        if (success === 2) {
            setFormData(defaultState)
            setCheckIn(new Date())
            setCheckOut(new Date())
            setcheckInStart(new Date())
            setcheckInEnd(new Date())
            setcheckOutStart(new Date())
            setcheckOutEnd(new Date())
            setBreakStart(new Date())
            setBreakEnd(new Date())
            setEarlyIn(new Date())
            setEarlyOut(new Date())
            setLateIn(new Date())
            setLateOut(new Date())
            setfirsthalfcheckin(new Date())
            setfirsthalfcheckout(new Date())
            setSecondhalfcheckin(new Date())
            SetSecondhalfcheckout(new Date())
            history.push('/Home/ShiftMaster')
            succesNofity(message)
        }
        else {
            errorNofity('Errror Occured!!!!Please Contact EDP')
        }
    }
    const toSettings = () => {
        history.push('/Home/Settings')
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Shift Master"
                redirect={toSettings}
                submit={submitFormData}
            >
                <div className="row g-1">
                    <div className="col-md-12" >
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="row g-1">
                                        <div className="col-md-9">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm mb-2"
                                                Placeholder="Shift Name"
                                                changeTextValue={(e) => updateShiftmasterData(e)}
                                                name="shift_name"
                                                value={shift_name}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm mb-2"
                                                Placeholder="Shift Code"
                                                changeTextValue={(e) => updateShiftmasterData(e)}
                                                name="shift_code"
                                                value={shift_code}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-1">
                                        <div className="col-md-3" >
                                            <label className="form-label">
                                                Check In
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={checkIn}
                                                changetextvalue={(e) => SetcheckInTime(e)}
                                            />
                                        </div>
                                        <div className="col-md-3" >
                                            <label className="form-label">
                                                Check Out
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={checkOut}
                                                changetextvalue={(e) => SetcheckOutTime(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Check In Start
                                            </label>
                                        </div>
                                        <div className="col-md-3" >
                                            <Timepicker
                                                value={checkInStart}
                                                changetextvalue={(e) => null}
                                            />
                                        </div>
                                        <div className="col-md-3" >
                                            <label className="form-label">
                                                Check In End
                                            </label>
                                        </div>
                                        <div className="col-md-3" >
                                            <Timepicker
                                                value={checkInEnd}
                                                changetextvalue={(e) => null}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-1">
                                        <div className="col-md-3" >
                                            <label className="form-label">
                                                Check Out Start
                                            </label>
                                        </div>
                                        <div className="col-md-3" >
                                            <Timepicker
                                                value={checkOutStart}
                                                changetextvalue={(e) => null}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Check Out End
                                            </label>
                                        </div>
                                        <div className="col-md-3" >
                                            <Timepicker
                                                value={checkOutEnd}
                                                changetextvalue={(e) => null}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Cross Day
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-0"
                                            >
                                                <Select
                                                    name="crossday"
                                                    value={crossday}
                                                    onChange={(e) => updateShiftmasterData(e)}
                                                    fullWidth
                                                    variant="outlined"
                                                    className="ml-1"
                                                    defaultValue={0}
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                >
                                                    <MenuItem value='0'>0</MenuItem>
                                                    <MenuItem value='1'>1</MenuItem>
                                                    <MenuItem value='2'>2</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Duty Day
                                            </label>
                                        </div>
                                        <div className="col-md-3" >
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-0"
                                            >
                                                <Select
                                                    name="dutyday"
                                                    value={dutyday}
                                                    onChange={(e) => updateShiftmasterData(e)}
                                                    fullWidth
                                                    variant="outlined"
                                                    className="ml-1"
                                                    defaultValue={0}
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                >
                                                    <MenuItem value='1'>1</MenuItem>
                                                    <MenuItem value='2'>2</MenuItem>
                                                    <MenuItem value='3'>3</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Break Start
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={BreakStart}
                                                changetextvalue={(e) => SetBreakTimestart(e)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">
                                                Break End
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={Breakend}
                                                changetextvalue={(e) => SetBreakTimeend(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Early In Calculation
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-0"
                                            >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="earlyincalculation"
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={(e) => updateShiftmasterData(e)}
                                                    value={earlyincalculation}
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                >

                                                    <MenuItem value='1' >
                                                        Calculate As Normal Work Day
                                                    </MenuItem>
                                                    <MenuItem value='2' >
                                                        Calculate As Over Time
                                                    </MenuItem>
                                                    <MenuItem value='3' >
                                                        Calculate As Weekend Over Time
                                                    </MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-3">
                                            <MinutePicker
                                                value={EarlyIn}
                                                changeMinuteValue={(e) => setEarlyInTime(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">
                                                Early Out Calculation
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-0"
                                            >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="earlyoutcalculation"
                                                    fullWidth
                                                    variant="outlined"
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                    onChange={(e) => updateShiftmasterData(e)}
                                                    value={earlyoutcalculation}
                                                >

                                                    <MenuItem value='1' >
                                                        Calculate As Normal Work Day
                                                    </MenuItem>
                                                    <MenuItem value='2' >
                                                        Calculate As Over Time
                                                    </MenuItem>
                                                    <MenuItem value='3' >
                                                        Calculate As Weekend Over Time
                                                    </MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-3">
                                            <MinutePicker
                                                value={EarlyOut}
                                                changeMinuteValue={(e) => setEarlyOutTime(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Allowed Late In
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <MinutePicker
                                                value={LateIn}
                                                changeMinuteValue={(e) => setlateInTime(e)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Allowed Late Out
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <MinutePicker
                                                value={LateOut}
                                                changeMinuteValue={(e) => setlateOutTime(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                First Half Check In Time
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={firsthalfcheckin}
                                                changetextvalue={(e) => SetfirsthalfcheckinTime(e)} />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                First Half Check Out Time
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={firsthalfcheckout}
                                                changetextvalue={(e) => SetfirsthalfcheckOutTime(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Second Half Check In Time
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={Secondhalfcheckin}
                                                changetextvalue={(e) => SetSecondhalfcheckInTime(e)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Second Half Check Out Time
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <Timepicker
                                                value={Secondhalfcheckout}
                                                changetextvalue={(e) => SetSecondhalfcheckOutTime(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1 d-flex justify-content-start">
                                        <div className="col-md-1 pb-2">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="nightoff"
                                                        color="secondary"
                                                        value={nightoff}
                                                        checked={nightoff}
                                                        className="ml-2"
                                                        onChange={(e) => updateShiftmasterData(e)}
                                                    />
                                                }
                                                label="Night Off"
                                            />
                                        </div>
                                        <div className="col-md-5 ">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="shift_status"
                                                        color="secondary"
                                                        value={shift_status}
                                                        checked={shift_status}
                                                        className="ml-2"
                                                        onChange={(e) => updateShiftmasterData(e)}
                                                    />
                                                }
                                                label="Shift Status"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-1 pt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <ShiftMasterTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave >
        </Fragment >

    )
}

export default memo(ShiftMasterEdit) 
