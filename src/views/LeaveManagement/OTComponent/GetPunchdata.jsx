import React, { Fragment, useState, useEffect, useContext } from 'react'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { MenuItem, Select } from '@material-ui/core'
import { format, add } from 'date-fns'
import moment from 'moment';
import TextInput from 'src/views/Component/TextInput'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import Compenofflpundata from '../LeaveRequest/Component/Compenofflpundata'

const GetPunchdata = ({ otDate, setOtDate, shiftid, setShiftid, setpunchindatamain, model, setpunchoutdatamain, setmodel }) => {
    const [shiftdata, setShiftdata] = useState([]);
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_department, em_dept_section, em_id, em_no } = employeedetails
    const [punchview, setpunchview] = useState(0)
    const [punchtime, setmunctime] = useState([{
        desc: 'Select Punch',
        value: 0
    }])
    const getDate = (e) => {
        var selectdate = e.target.value
        var selectDate = format(new Date(selectdate), "yyyy-MM-dd")
        setOtDate(selectDate)
    }
    const getshift = {
        dept_id: em_department,
        sect_id: em_dept_section
    }

    useEffect(() => {
        if ((em_department !== 0) && (em_dept_section !== 0)) {
            const getdepartmentShift = async () => {
                const result = await axioslogin.post('/departmentshift/shift', getshift)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0]
                    const obj = JSON.parse(shft_code)
                    setShiftdata(obj);
                }
                if (success === 0) {
                    setShiftdata(0)
                }
            }
            getdepartmentShift()
        }

    }, [model]);
    const getShiftdetail = async () => {
        if (shiftid === 0) {
            warningNofity('Please Select Shift')
        } else {
            setmodel(1)
        }
    }

    const displaypunch = async () => {
        const datagetpunch = {
            emp_id: em_id,
            duty_day: otDate
        }
        const result = await axioslogin.post('common/getShiftdetails/', datagetpunch)
        const { success, data } = result.data
        if (success === 1) {
            const { ot_request_flag } = data[0]
            if (ot_request_flag === 1) {
                warningNofity('Already Request Present')
            } else {

                const datatogetpunch = {
                    date1: moment(new Date(otDate)).format('YYYY-MM-DD'),
                    date2: moment(add(new Date(otDate), { days: 1 })).format('YYYY-MM-DD'),
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

    return (
        <Fragment>

            <div className="card">
                <div className="card-body">
                    <div className="row g-1 mb-1">
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Start Date"
                                value={otDate}
                                name="otDate"
                                max={moment(new Date()).format('YYYY-MM-DD')}
                                changeTextValue={(e) => {
                                    getDate(e)
                                }}
                            />
                        </div>
                        <div className="col-md-2 pt-1">
                            <Select
                                name="shiftid"
                                value={shiftid}
                                onChange={(e) => setShiftid(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className="ml-0"
                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                            >
                                <MenuItem value='0' >
                                    Select Shift
                                </MenuItem>
                                {
                                    shiftdata && shiftdata.map((val, index) => {
                                        return <MenuItem key={index} value={val.shiftcode}>{val.shiftDescription}</MenuItem >
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-md-1 pl-2">
                            <MdOutlineAddCircleOutline align="right" className="text-danger" size={32}
                                onClick={() => {
                                    getShiftdetail()
                                    displaypunch()
                                }} />

                        </div>
                        <div className="col-md-6">
                            {
                                model === 1 ? <Compenofflpundata
                                    style={SELECT_CMP_STYLE}
                                    punchtime={punchtime}
                                    setpunchindatamain={setpunchindatamain}
                                    setpunchoutdatamain={setpunchoutdatamain}
                                /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GetPunchdata