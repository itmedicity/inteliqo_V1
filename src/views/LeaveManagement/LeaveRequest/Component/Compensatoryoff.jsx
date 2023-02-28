import React, { Fragment, useEffect, memo, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { add, format } from 'date-fns'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { useContext } from 'react'
import { errorNofity, infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import ShiftHalfdayComponent from './ShiftHalfdayComponent'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { IconButton } from '@mui/material'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import Compenofflpundata from './Compenofflpundata'
import moment from 'moment'

const Compensatoryoff = ({ setcopensatoryoff, em_id }) => {
    const [punchtime, setmunctime] = useState([{
        desc: 'Select Punch',
        value: 0
    }])
    const [shifturation, setshiftduration] = useState(0)
    const [selectshitid, setselectedshiftid] = useState(0)
    const [punchview, setpunchview] = useState(0)
    const [reqtype, setreqtype] = useState(0)
    const [punchindatamain, setpunchindatamain] = useState(0)
    const [punchoutdatamain, setpunchoutdatamain] = useState(0)
    const { employeedetails,//for employee details
    } = useContext(PayrolMasterContext)
    // destructuring employee details
    const { em_department, em_dept_section, em_no, } = employeedetails
    const [shiftdata, setshiftdata] = useState([{
        shift_id: 0,
        shft_desc: '',
        shft_chkin_time: '',
        shft_chkout_time: '',
        plan_slno: ''
    }])
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
    })
    // destructuring start and end date
    const { startDate } = formData
    useEffect(() => {
        //postData
        const postData = {
            dept_id: em_department,
            sect_id: em_dept_section
        }
        const getdepartmentShift = async () => {
            if (em_department !== 0 && em_dept_section !== 0) {
                const result = await axioslogin.post('/departmentshift/shift', postData)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0]
                    const obj = JSON.parse(shft_code)
                    var shift = obj.map((val) => {
                        const arrydata = {
                            shift_id: val.shiftcode,
                            shft_desc: val.shiftDescription
                        }
                        return arrydata
                    })
                    setshiftdata(shift);
                }
                if (success === 0) {

                    infoNofity(message);
                }
            }
        }
        getdepartmentShift()
    }, [em_department, em_dept_section])

    const getpuchdetl = async (e) => {
        const datagetpunch = {
            emp_id: em_id,
            duty_day: e.target.value
        }
        const result = await axioslogin.post('common/getShiftdetails/', datagetpunch)
        const { success, data } = result.data
        if (success === 1) {
            const { ot_request_flag } = data[0]

            if (ot_request_flag === 1) {
                errorNofity('Already Request Present')
            }
        } else if (success === 2) {
        }
    }
    const displaypunch = async () => {
        if (selectshitid === 0 || reqtype === 0) {
            warningNofity("Plese Select Shift And Type")
        }
        else {
            const datagetpunch = {
                emp_id: em_id,
                duty_day: startDate
            }
            const result = await axioslogin.post('common/getShiftdetails/', datagetpunch)
            const { success, data } = result.data
            if (success === 1) {
                const { ot_request_flag } = data[0]
                if (ot_request_flag === 1) {
                    warningNofity('Already Request Present')
                } else {
                    const datatogetpunch = {
                        date1: moment(new Date(startDate)).format('YYYY-MM-DD'),
                        date2: moment(add(new Date(startDate), { days: 1 })).format('YYYY-MM-DD'),
                        em_no: em_no
                    }

                    const result = await axioslogin.post('common/getShiftdata/', datatogetpunch)
                    const { success, data } = result.data
                    if (success === 1) {
                        setpunchview(1)
                        const punchdata = data.map((val) => {
                            const punchtime = {
                                desc: val.punch_time,
                                value: val.punch_time
                            }
                            return punchtime
                        })
                        setmunctime(punchdata)
                    } else if (success === 0) {
                        warningNofity('No Shift Present')

                    }
                }
            }
        }
    }

    const handleChnage = async (e) => {
        setselectedshiftid(e.target.value)
        const result = await axioslogin.get(`shift/${e.target.value}`)
        const { success, data } = result.data

        if (success === 1) {
            setshiftduration(data[0].shift_duration_in_min)
        }
    }
    useEffect(() => {
        if (punchoutdatamain !== 0) {
            const compensoffdata = {
                startdate: startDate,
                reqtype: reqtype,
                shifturation: shifturation,
                // selectshitid: selectshitid,
                punchin: punchindatamain,
                punchout: punchoutdatamain,
                selectshitid: selectshitid
            }
            setcopensatoryoff(compensoffdata)
        }
    }, [punchoutdatamain])


    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="card">
                        <div className="card-body">
                            <div className="row col-md-12 mb-2">
                                <div className='col-md-6'>
                                    <div className="row g-1">
                                        <div className="col-md-4 pt-1">
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
                                        <div className="col-md-4 pt-1">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-1 mb-0"
                                            >
                                                <Select
                                                    name={`hol`}
                                                    // name={holname}
                                                    onChange={(e) => {
                                                        setreqtype(e.target.value)
                                                        // getrequestontype(e)
                                                    }

                                                    }
                                                    fullWidth
                                                    value={reqtype}
                                                    variant="outlined"
                                                    className="ml-0"
                                                    defaultValue={0}
                                                    style={SELECT_CMP_STYLE}
                                                >
                                                    <MenuItem value={0} disabled selected >Type of request</MenuItem>
                                                    <MenuItem value={1}  >Extra Time</MenuItem>
                                                    <MenuItem value={2}  >OFF Day</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </div>
                                        <div className="col-md-3 pt-1">
                                            <ShiftHalfdayComponent style={SELECT_CMP_STYLE} shiftdata={shiftdata} onChange={handleChnage} />

                                        </div>
                                        <div className="col-md-1 pt-1">
                                            <IconButton
                                                aria-label="add"
                                                style={{ padding: '0rem' }}
                                                onClick={displaypunch}
                                            >
                                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                                            </IconButton>
                                        </div>



                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    {punchview === 1 ? <Compenofflpundata
                                        style={SELECT_CMP_STYLE}
                                        punchtime={punchtime}
                                        setpunchindatamain={setpunchindatamain}
                                        setpunchoutdatamain={setpunchoutdatamain}
                                    /> : null}
                                </div>



                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </Fragment >
    )
};

export default memo(Compensatoryoff);
