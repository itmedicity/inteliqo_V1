import { format } from 'date-fns'
import React, { Fragment, useEffect, useState, memo } from 'react'
import TextInput from 'src/views/Component/TextInput'
import ShiftHalfdayComponent from './Component/ShiftHalfdayComponent'
import TestCasulLeave from './Component/TestCasulLeave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import Timepicker from 'src/views/Component/Timepicker';
import { axioslogin } from 'src/views/Axios/Axios'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const HalfDayLeaveRequest = ({ sethalfday, em_id }) => {
    console.log(em_id)
    const { updateleavereqtype } = useContext(PayrolMasterContext)
    const [casualdata, setcasual] = useState(0)
    const [planslno, setplanslno] = useState(0)
    const [monthleave, setmonthleave] = useState('')
    const [checkOut, setCheckOut] = useState(new Date());
    const [checkIn, setCheckIn] = useState(new Date());

    const [getcasleave, updatecasleaveusestate] = useState({
        dsname: '',
        getvalvalue: 0
    });

    const [casullevemonth, setcasualleavemnth] = useState(0)
    const handleChange = ({ target: { name, value }, nativeEvent }) => {
        setmonthleave(nativeEvent.target.innerText)
        setcasualleavemnth(value)
        updatecasleaveusestate({ ...getcasleave, dsname: name, getvalvalue: value })
    }

    const [selectshifhalf, setshifthalf] = useState(0);
    // use state for start and end date
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
    })
    // destructuring start and end date
    const { startDate } = formData
    // for shift based on the date selected
    const [shiftdata, setshiftdata] = useState([{
        shift_id: '',
        shft_desc: ''
    }])
    const [casualLeavesallowable, setcasualleaveallowable] = useState([])// allowable casual leave 
    //  data based on employeee category
    const [leavestate, setleavestate] = useState({
        ecat_cl: 0,
        ecat_confere: 0,
        ecat_cont: 0,
        ecat_doff_allow: 0,
        ecat_el: 0,
        ecat_esi_allow: 0,
        ecat_fh: 0,
        ecat_lop: 0,
        ecat_mate: 0,
        ecat_nh: 0,
        ecat_prob: 0,
        ecat_woff_allow: 0,
        ecat_sl: 0,
        em_category: 0
    })
    // const { ecat_cl
    // } = leavestate
    useEffect(() => {
        const getshiftdata = async () => {
            const setformdataset = {
                startDate: startDate,
                em_id: em_id
            }
            const result = await axioslogin.post('LeaveRequest/gethafdayshift/', setformdataset)
            const { success, data } = result.data
            if (success === 1) {
                var arrayshiftdata = data.map((val) => {
                    setplanslno(val.shift_id)
                    const shiftseledata = {
                        shift_id: val.shift_id,
                        shft_desc: val.shft_desc
                    }
                    return shiftseledata
                })
                setshiftdata(arrayshiftdata)
            }
        }
        const getcaual = async () => {
            const result1 = await axioslogin.get(`/yearleaveprocess/allwbleCL/${em_id}`)
            setcasual(1)
            if (result1.data.success === 1) {
                setcasualleaveallowable(result1.data.data)
            }
            else if (result1.data.success === 2) {
                updateleavereqtype(0)
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        // get current data allowed  leave based on category
        const getcategorydata = async () => {
            const result = await axioslogin.get(`/common/getannprocess/${em_id}`)
            const { data } = result.data
            setleavestate(data[0])
        }
        getcategorydata();
        getshiftdata()
        getcaual()
    }, [formData, em_id])

    const handeleonchange = async (e) => {
        setshifthalf(e.target.value)
        if (e.target.value === 1) {
            const result = await axioslogin.get(`/LeaveRequest/`)
            const { data } = result.data
            setCheckIn(new Date(data[0].first_half_in))
            setCheckOut(new Date(data[0].first_half_out))
        } else {
            const result = await axioslogin.get(`/LeaveRequest/getsecondhalf`)
            const { data } = result.data
            setCheckIn(new Date(data[0].second_half_in))
            setCheckOut(new Date(data[0].second_half_out))
        }


    }

    const casualonchange = () => {

    }

    const setstartdate = (e) => {
        const constdata = {
            startDate: e.target.value,
        }
        setFormData(constdata)
    }

    // to set half day leave to masterdata
    useEffect(() => {
        const formdataa = {

            casullevemonth: casullevemonth, //value
            checkIn: checkIn,
            checkOut: checkOut,
            startDate: startDate,
            planslno: planslno, // duty plan slno
            monthleave: monthleave // value - innexr text name
        }
        sethalfday(formdataa)
    }, [casullevemonth, checkIn, checkOut, monthleave])
    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <div className="row g-1">
                            <div className='row g-1 col-md-6'>
                                <div className="col-md-6">
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="Start Date"
                                        name="startDate"
                                        value={startDate}
                                        changeTextValue={(e) => setstartdate(e)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl
                                        fullWidth
                                        margin="dense"
                                        className="mt-1 mb-0"
                                    >
                                        <Select
                                            // name={`el${name}`}
                                            onChange={(e) => { handeleonchange(e) }}
                                            fullWidth
                                            value={selectshifhalf}
                                            variant="outlined"
                                            className="ml-0"
                                            defaultValue={0}
                                            style={SELECT_CMP_STYLE}
                                        >
                                            <MenuItem value={0}   >Select Shift Half</MenuItem>
                                            <MenuItem value={1}   >First Half</MenuItem>
                                            <MenuItem value={2}   >Second Half</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row g-1 col-md-6'>
                                <div className="col-md-6">
                                    <FormControl
                                        fullWidth
                                        margin="dense"
                                        className="mt-1 mb-0"
                                    >
                                        <Select
                                            // name={`el${name}`}
                                            onChange={casualonchange}
                                            fullWidth
                                            value={1}
                                            variant="outlined"
                                            className="ml-0"
                                            defaultValue={0}
                                            style={SELECT_CMP_STYLE}
                                        >
                                            <MenuItem value={1}   >Casual Leave</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="row g-1">
                            <div className='row g-1 col-md-6'>
                                <div className="col-md-6">
                                    <ShiftHalfdayComponent style={SELECT_CMP_STYLE} shiftdata={shiftdata} />
                                </div>
                                <div className=" row g-1 col-md-6">
                                    <div className='col-md-6'>
                                        <Timepicker
                                            value={checkIn}
                                            changetextvalue={(e) => setCheckIn(e)}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <Timepicker
                                            value={checkOut}
                                            changetextvalue={(e) => setCheckOut(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-1 col-md-6'>
                                <div className="col-md-6">
                                    <TestCasulLeave
                                        CL={casualLeavesallowable}
                                        style={SELECT_CMP_STYLE}
                                        setcasualleavemnth={setcasualleavemnth}
                                        onChange={handleChange}//on change of allowable leaves
                                        getcasleave={getcasleave}
                                        updatecasleaveusestate={updatecasleaveusestate}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    )
}

export default memo(HalfDayLeaveRequest)