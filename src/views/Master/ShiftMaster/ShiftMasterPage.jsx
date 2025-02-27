import React, { useCallback, useState } from 'react'
import Timepicker from 'src/views/Component/Timepicker';
import MinutePicker from 'src/views/Component/MinutePicker';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { getTotalShiftHours, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, addHours, differenceInMinutes, subHours } from 'date-fns';
import MasterLayout from '../MasterComponents/MasterLayout'
import { ToastContainer } from 'react-toastify';
import { Box, Button, Grid, Option, Select, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { memo } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react';

const ShiftMasterPage = () => {

    const [count, setCount] = useState(0)


    //use State For Check In
    const [checkIn, setCheckIn] = useState(new Date());
    //use State For Check Out
    const [checkOut, setCheckOut] = useState(new Date());
    //use State For Check In Start
    const [checkInStart, setcheckInStart] = useState(new Date());
    //use State For Check In End
    const [checkInEnd, setcheckInEnd] = useState(new Date());
    //use State For Check Out Start
    const [checkOutStart, setcheckOutStart] = useState(new Date());
    //use State For Check Out End
    const [checkOutEnd, setcheckOutEnd] = useState(new Date());
    //use State For Break Start
    const [BreakStart, setBreakStart] = useState(new Date());
    //use State For Break End
    const [Breakend, setBreakEnd] = useState(new Date());
    //use State For Early In
    const [EarlyIn, setEarlyIn] = useState(new Date());
    //use State For Early Out
    const [EarlyOut, setEarlyOut] = useState(new Date());
    //use State For Allowed Late in
    const [LateIn, setLateIn] = useState(new Date());
    //use State For Allowed LateOut
    const [LateOut, setLateOut] = useState(new Date());
    //use State ForFirst Half Check In
    const [firsthalfcheckin, setfirsthalfcheckin] = useState(new Date());
    //use State ForFirst Half Check Out
    const [firsthalfcheckout, setfirsthalfcheckout] = useState(new Date());
    //use State For second Half Check In
    const [Secondhalfcheckin, setSecondhalfcheckin] = useState(new Date());
    //use State For second Half Check Out
    const [Secondhalfcheckout, SetSecondhalfcheckout] = useState(new Date());
    const [crossday, setCrossday] = useState(0)
    const [dutyday, setDutyday] = useState(0)
    const [earlyincalculation, setearlyincalculation] = useState(1)
    const [earlyoutcalculation, setearlyoutcalculation] = useState(1)







    const SetcheckInTime = (val) => {
        console.log(val);
        setCheckIn(val)
        const result = subHours(new Date(val), 8)
        setcheckInStart(result)
        const result2 = addHours(new Date(val), 4)
        setcheckInEnd(result2)
    }
    const SetcheckOutTime = (val) => {
        setCheckOut(val)
        const result = subHours(new Date(val), 2)
        setcheckOutStart(result)
        const result2 = addHours(new Date(val), 8)
        setcheckOutEnd(result2)
    }
    // const SetcheckInTimeStart = (val) => {
    //     setcheckInStart(val)
    // }
    // const SetcheckInTimeEnd = (val) => {
    //     setcheckInEnd(val)
    // }
    // const SetcheckoutTimeStart = (val) => {
    //     setcheckOutStart(val)
    // }
    // const SetcheckoutTimeEnd = (val) => {
    //     setcheckOutEnd(val)
    // }
    const SetBreakTimestart = (val) => {
        setBreakStart(val)
    }
    const SetBreakTimeend = (val) => {
        setBreakEnd(val)
    }
    const setEarlyInTime = (val) => {
        setEarlyIn(val)
    }

    const setEarlyOutTime = (val) => {
        setEarlyOut(val)
    }
    const setlateInTime = (val) => {
        setLateIn(val)
    }

    const setlateOutTime = (val) => {
        setLateOut(val)
    }
    const SetfirsthalfcheckinTime = (val) => {
        setfirsthalfcheckin(val)
    }
    const SetfirsthalfcheckOutTime = (val) => {
        setfirsthalfcheckout(val)
    }
    const SetSecondhalfcheckInTime = (val) => {
        setSecondhalfcheckin(val)
    }
    const SetSecondhalfcheckOutTime = (val) => {
        SetSecondhalfcheckout(val)
    }
    //FUNCTION TO GET TO TOMORROW DATE
    const nextdate = addDays(new Date(checkOut), crossday);
    const checkoutstartcrossday = addDays(new Date(checkOutStart), crossday);
    const checkoutendcrossday = addDays(new Date(checkOutEnd), crossday);

    console.log(nextdate);

    //use State for Setting Initial State
    const [formData, setFormData] = useState({
        shift_name: "",
        shift_code: "",
        shift_status: true,
        nightoff: false,
        twenty_four: false
    })
    const { shift_name, shift_code, shift_status, nightoff, twenty_four } = formData

    const defaultState = {
        shift_name: "",
        shift_code: "",
        crossday: '0',
        dutyday: '1',
        earlyincalculation: '1',
        earlyoutcalculation: '1',
        shift_status: true,
        nightoff: false,
        twenty_four: false
    }

    //getting form Data
    const updateShiftmasterData = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    //caslculating the shift duration in minutes
    const x = moment(checkIn).format("YYYY-MM-DD HH:mm:ss")
    const xx = moment(x)
    const y = moment(checkOut).format("YYYY-MM-DD HH:mm:ss")
    const yy = moment(y)
    const shiftduration = getTotalShiftHours(xx, yy)

    console.log(shiftduration);
    console.log(differenceInMinutes(new Date(checkOut), new Date(checkIn)));

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
    //calculating checkmout in minutes
    const checkoutinminutes = getTotalShiftHours(zz, yy)
    //check out in minutes in if cross day is 1
    const checkoutminutescrossday = getTotalShiftHours(zz, mm)
    //saving Data
    const postData = useMemo(() => {
        return {
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
            shift_duration_in_min: crossday === '1' ? shiftdurationforcrossday : differenceInMinutes(new Date(checkOut), new Date(checkIn)),
            shift_start_in_min: checkinminutes,
            shift_end_in_min: crossday === '1' ? checkoutminutescrossday : checkoutinminutes,
            night_off_flag: nightoff === false ? 0 : 1,
            shft_status: shift_status === false ? 0 : 1,
            twenty_four: twenty_four === false ? 0 : 1
        }
    }, [BreakStart, Breakend, EarlyIn, EarlyOut, LateIn, LateOut, Secondhalfcheckin, Secondhalfcheckout,
        checkIn, checkInEnd, checkInStart, checkOut, checkOutEnd, checkOutStart, checkinminutes, checkoutendcrossday,
        checkoutinminutes, checkoutminutescrossday, checkoutstartcrossday, crossday, dutyday, earlyincalculation, earlyoutcalculation,
        firsthalfcheckin, firsthalfcheckout, nextdate, nightoff, shift_code, shift_name, shift_status, shiftduration,
        shiftdurationforcrossday, twenty_four
    ])
    //saving shift master
    const submitFormData = useCallback(async (e) => {
        e.preventDefault()



        console.log(postData);



        // const result = await axioslogin.post('/shift', postData)
        // const { success, message } = result.data
        // if (success === 1) {
        //     succesNofity(message)
        //     setFormData(defaultState)
        //     setCount(count + 1)
        //     setCheckIn(new Date())
        //     setCheckOut(new Date())
        //     setcheckInStart(new Date())
        //     setcheckInEnd(new Date())
        //     setcheckOutStart(new Date())
        //     setcheckOutEnd(new Date())
        //     setBreakStart(new Date())
        //     setBreakEnd(new Date())
        //     setEarlyIn(new Date())
        //     setEarlyOut(new Date())
        //     setLateIn(new Date())
        //     setLateOut(new Date())
        //     setfirsthalfcheckin(new Date())
        //     setfirsthalfcheckout(new Date())
        //     setSecondhalfcheckin(new Date())
        //     SetSecondhalfcheckout(new Date())
        // }
        // else {
        //     warningNofity(message)
        // }
    }, [postData])

    return (
        <>
            <MasterLayout title="Shift Master" displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }} >
                    <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid sx={{ flex: 1 }}>
                            <Paper square elevation={0} sx={{ p: 1, }}   >
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                    <Box sx={{ width: "70%", mt: 1 }}>
                                        <InputComponent
                                            placeholder={'Shift Name'}
                                            type="text"
                                            size="sm"
                                            name="shift_name"
                                            value={shift_name}
                                            onchange={(e) => updateShiftmasterData(e)}
                                        />
                                    </Box>
                                    <Box sx={{ width: "30%", mt: 1, ml: 0.5 }}>
                                        <InputComponent
                                            placeholder={'Shift Code'}
                                            type="text"
                                            size="sm"
                                            name="shift_code"
                                            value={shift_code}
                                            onchange={(e) => updateShiftmasterData(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">Check In</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkIn}
                                                    changetextvalue={(e) => setCheckIn(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">  Check Out</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkOut}
                                                    changetextvalue={(e) => setCheckOut(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Check In Start</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkInStart}
                                                    changetextvalue={(e) => setcheckInStart(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">  Check In End</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkInEnd}
                                                    changetextvalue={(e) => setcheckInEnd(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Check Out Start</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkOutStart}
                                                    changetextvalue={(e) => setcheckOutStart(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Check Out End</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={checkOutEnd}
                                                    changetextvalue={(e) => setcheckOutEnd(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">Cross Day</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Select
                                                    value={crossday}
                                                    onChange={(event, newValue) => {
                                                        setCrossday(newValue);
                                                    }}
                                                    size='sm'
                                                    variant='outlined'
                                                >
                                                    <Option value={0}>0</Option>
                                                    <Option value={1}>1</Option>
                                                    <Option value={2}>2</Option>
                                                </Select>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Duty Day</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Select
                                                    value={dutyday}
                                                    onChange={(event, newValue) => setDutyday(event, newValue)}
                                                    size='sm'
                                                    variant='outlined'
                                                >
                                                    <Option value={0}>1</Option>
                                                    <Option value={1}>2</Option>
                                                    <Option value={2}>3</Option>
                                                </Select>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">Break Start</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={BreakStart}
                                                    changetextvalue={(e) => setBreakStart(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">Break End</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={Breakend}
                                                    changetextvalue={(e) => setBreakEnd(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Early In Calculation</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Select
                                                    value={earlyincalculation}
                                                    onChange={(event, newValue) => setearlyincalculation(event, newValue)}
                                                    size='sm'
                                                    variant='outlined'
                                                >
                                                    <Option value={1}>Calculate As Normal Work Day</Option>
                                                    <Option value={2}>Calculate As Over Time</Option>
                                                    <Option value={3}>Calculate As Weekend Over Time</Option>
                                                </Select>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Early Out Calculation</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Select
                                                    value={earlyoutcalculation}
                                                    onChange={(event, newValue) => setearlyoutcalculation(newValue)}
                                                    size='sm'
                                                    variant='outlined'
                                                >
                                                    <Option value={1}>Calculate As Normal Work Day</Option>
                                                    <Option value={2}>Calculate As Over Time</Option>
                                                    <Option value={3}>Calculate As Weekend Over Time</Option>
                                                </Select>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Allowed Late In</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <MinutePicker
                                                    value={LateIn}
                                                    changeMinuteValue={(e) => setlateInTime(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1"> Allowed Late Out</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <MinutePicker
                                                    value={LateOut}
                                                    changeMinuteValue={(e) => setlateOutTime(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">First Half Check In Time</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={firsthalfcheckin}
                                                    changetextvalue={(e) => setfirsthalfcheckin(e)} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">  First Half Check Out Time</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={firsthalfcheckout}
                                                    changetextvalue={(e) => setfirsthalfcheckout(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">Second Half Check In Time</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={Secondhalfcheckin}
                                                    changetextvalue={(e) => setSecondhalfcheckin(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, ml: 0.5 }}>
                                        <Box sx={{ width: "100%", display: 'flex', flexDirection: "row" }}>
                                            <Box sx={{ flex: 1, mt: 1, ml: 1 }}>
                                                <Typography level="body1">  Second Half Check Out Time</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Timepicker
                                                    value={Secondhalfcheckout}
                                                    changetextvalue={(e) => SetSecondhalfcheckout(e)}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 1 }}>
                                    <Box sx={{}}>
                                        <JoyCheckbox
                                            label='Night Off'
                                            checked={nightoff}
                                            name="nightoff"
                                            onchange={(e) => updateShiftmasterData(e)}
                                        />
                                    </Box>
                                    <Box sx={{ ml: 0.5 }}>
                                        <JoyCheckbox
                                            label='Shift Status'
                                            checked={shift_status}
                                            name="shift_status"
                                            onchange={(e) => updateShiftmasterData(e)}
                                        />
                                    </Box>
                                    <Box sx={{ ml: 0.5 }}>
                                        <JoyCheckbox
                                            label='24 Hr Shift'
                                            checked={twenty_four}
                                            name="twenty_four"
                                            onchange={(e) => updateShiftmasterData(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', flexDirection: "row", mt: 1 }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        color="primary"
                                        onClick={submitFormData}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                            xgfx
                        </Grid>
                    </Grid>
                </Box>

            </MasterLayout>
        </>
    )
}

export default memo(ShiftMasterPage) 