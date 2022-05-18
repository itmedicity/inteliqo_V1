import React, { Fragment, useEffect, useContext, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OTRequestTable from './OTRequestTable'
import { getTotalShiftHours, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import moment from 'moment';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import GetPunchdata from '../OTComponent/GetPunchdata'

const OTRequest = () => {
    const history = useHistory()
    const [otDate, setOtDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [count, setcount] = useState(0)
    const [punchindatamain, setpunchindatamain] = useState(0)
    const [punchoutdatamain, setpunchoutdatamain] = useState(0)
    const { employeedetails, authorization } = useContext(PayrolMasterContext)
    const { em_id, em_name, desg_name, em_dept_section, sect_name, em_no } = employeedetails
    const { incharge_level, hod_level, ceo_level, is_incharge, is_hod } = authorization


    const [flag, setflag] = useState(0)
    const [shiftid, setShiftid] = useState(0)
    const [tableset, setTable] = useState(0)
    const [model, setmodel] = useState(0)
    const [tabledata, setTableData] = useState({
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
    })

    //Initializing
    const [request, setrequest] = useState({
        ot_reson: '',
        ot_remarks: '',
        finaltime: '',
        ot_slno: '',
        ot_amount: ''
    })
    const [shiftdata, setShiftdata] = useState({
        shiftcheckout: new Date(),
        shiftcheckin: new Date(),
    })
    const [dutyday, setdutyday] = useState(new Date())
    const defaultState = {
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
    }
    const defaltstate = {
        shiftcheckout: "",
        shiftcheckin: "",
    }
    const defal = {
        ot_reson: '',
        ot_remarks: '',
        finaltime: '',
        ot_slno: '',
        ot_amount: ''
    }
    const checkpost = {
        punch_in: punchindatamain,
        punch_out: punchoutdatamain,
        emp_id: em_id

    }
    useEffect(() => {
        if ((punchindatamain !== 0) && (punchoutdatamain !== 0)) {
            setTable(1)
            const getTable = async () => {
                const result = await axioslogin.get(`/shift/${shiftid}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { shft_chkin_time, shft_chkout_time } = data[0]
                    const frmdata = {
                        shift_Start: format(new Date(shft_chkin_time), "HH:mm:ss"),
                        shift_end: format(new Date(shft_chkout_time), "HH:mm:ss"),
                        in_time: punchindatamain,
                        out_time: punchoutdatamain
                    }
                    const set = {
                        shiftcheckout: shft_chkout_time,
                        shiftcheckin: shft_chkin_time,
                    }
                    setTableData(frmdata);
                    setShiftdata(set)
                } else {
                    setTableData(defaultState);
                    setShiftdata(defaltstate)
                    setrequest(defal)
                }
            }
            getTable()
            const getotamount = async () => {
                const result = await axioslogin.get(`/common/getotwage/${em_id}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { ot_amount } = data[0]
                    const frm = {
                        ot_amount: ot_amount,
                        ot_reson: '',
                        ot_remarks: '',
                        finaltime: '',
                        ot_slno: ''
                    }
                    setrequest(frm)
                }
                else {
                    setrequest(defaultState)
                }
            }
            getotamount()
            const checkpuch = async () => {
                const result = await axioslogin.post('/common/getdutydaycheck', checkpost)
                const { success, data } = result.data;
                if (success === 1) {
                    const { duty_day } = data[0]
                    if (duty_day !== 'NULL') {
                        setdutyday(duty_day)
                    } else {
                        setdutyday(new Date())
                    }
                }
            }
            checkpuch()
        } else {
            setTable(0)
        }
    }, [punchindatamain, punchoutdatamain, model]);

    //Shift Hours
    const x = moment(shiftdata.shiftcheckin).format("YYYY-MM-DD HH:mm:ss")
    const xx = moment(x)
    const y = moment(shiftdata.shiftcheckout).format("YYYY-MM-DD HH:mm:ss")
    const yy = moment(y)
    const exactWork = getTotalShiftHours(xx, yy)

    //Working hours
    const a = moment(new Date(punchindatamain)).format("YYYY-MM-DD HH:mm:ss")
    const aa = moment(a)
    const b = moment(new Date(punchoutdatamain)).format("YYYY-MM-DD HH:mm:ss")
    const bb = moment(b)
    const working = getTotalShiftHours(aa, bb)

    //over time
    const overTime = working - exactWork
    var othour = Math.floor(overTime / 60);
    var otminute = overTime % 60;
    var remove = Math.floor(otminute / 1);
    const finaltime = `${othour}:${remove}`;

    //over time rate calculation
    var minRate = 0;
    var hrRate = (othour * request.ot_amount)
    if (otminute >= 30) {
        minRate = request.ot_amount / 2
    } else { }
    var amount = hrRate + minRate

    //Destructuring
    const { ot_reson, ot_remarks } = request;
    const updateRequest = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setrequest({ ...request, [e.target.name]: value })
    }

    //post Data
    const postData = {
        emp_id: em_id,
        em_no: em_no,
        ot_date: new Date(),
        ot_days: otDate,
        ot_shift_id: shiftid,
        check_in: punchindatamain,
        check_out: punchoutdatamain,
        over_time: overTime,
        ot_reson: ot_reson,
        ot_remarks: ot_remarks,
        ot_convert: '0',
        ot_amount: amount,
        ot_inch_require: ((is_incharge === 1) || (is_hod === 1)) ? 0 : incharge_level,
        ot_hod_require: is_hod === 1 ? 0 : hod_level,
        ot_hr_require: '1',
        ot_ceo_require: ceo_level,
        ot_deptsec_id: em_dept_section,
        duty_day: moment(dutyday).format("YYYY-MM-DD")
    }

    const patchData = {
        ot_reson: ot_reson,
        ot_remarks: ot_remarks,
        ot_slno: request.ot_slno
    }
    const resetForm = {
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
    }
    const restfm = {
        shiftcheckout: "",
        shiftcheckin: "",
    }

    const reset = {
        ot_reson: '',
        ot_remarks: '',
        finaltime: '',
        ot_slno: '',
        ot_amount: ''
    }
    //Submit data
    const submitRequest = async (e) => {
        e.preventDefault();
        if (flag === 0) {
            if (overTime >= 60) {
                const result = await axioslogin.post('/overtimerequest', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setrequest(reset);
                    setTableData(resetForm);
                    setShiftdata(restfm)
                    setmodel(0)
                    setTable(0)
                    setdutyday(new Date())
                    history.push('/Home/OTRequest');
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
            else {
                warningNofity(" Over Time Less Than 1 Hour so do not applay for OT")
            }
        } else {
            const result = await axioslogin.patch('/overtimerequest', patchData)
            const { message, success } = result.data;
            if (success === 2) {
                setrequest(reset);
                setTableData(resetForm);
                setShiftdata(restfm)
                setmodel(0)
                setTable(0)
                setcount(count + 1)
                history.push('/Home/OTRequest');
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <AuthorizationDetails />
            <PageLayoutSave
                heading="Over Time Request"
                redirect={RedirectToProfilePage}
                submit={submitRequest}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row g-1 mb-2">
                                <div className="col-md-3">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Employee Name"
                                        value={em_id}
                                        name="em_name"
                                        disabled="Disabled"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Employee ID"
                                        value={em_name}
                                        name="em_no"
                                        disabled="Disabled"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Employee ID"
                                        value={sect_name}
                                        name="sect_name"
                                        disabled="Disabled"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Designation"
                                        value={desg_name}
                                        name="desg_name"
                                        disabled="Disabled"
                                    />
                                </div>
                            </div>
                        </div>
                        <GetPunchdata
                            otDate={otDate}
                            setOtDate={setOtDate}
                            shiftid={shiftid}
                            setShiftid={setShiftid}
                            setpunchindatamain={setpunchindatamain}
                            setpunchoutdatamain={setpunchoutdatamain}
                            setmodel={setmodel}
                            model={model}
                        />
                        {tableset === 1 ?
                            <div className="row g-1 ">
                                <div className="card ">
                                    <div className="col-md-12 pt-1">
                                        <TableContainer sx={{ maxHeight: 150 }}>
                                            <Table size="small"
                                                stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell align="center">Date</TableCell>
                                                        <TableCell align="center">Shift</TableCell>
                                                        <TableCell align="center">Shift Start</TableCell>
                                                        <TableCell align="center">Shift end</TableCell>
                                                        <TableCell align="center">Punch In</TableCell>
                                                        <TableCell align="center">Punch Out</TableCell>
                                                        <TableCell align="center">OT(In hour)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{otDate}</TableCell>
                                                        <TableCell align="center">{shiftid}</TableCell>
                                                        <TableCell align="center">{tabledata.shift_Start}</TableCell>
                                                        <TableCell align="center">{tabledata.shift_end}</TableCell>
                                                        <TableCell align="center">{tabledata.in_time}</TableCell>
                                                        <TableCell align="center">{tabledata.out_time}</TableCell>
                                                        <TableCell align="center">{finaltime}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        <div className="row g-1 pt-1">
                            < div className="col-md-12">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Over Time Reason"
                                    value={ot_reson}
                                    name="ot_reson"
                                    changeTextValue={(e) => updateRequest(e)}
                                />
                            </div>
                            <div className="row g-1 pt-1">
                                <div className="col-md-12 ">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder=" Over Time Remarks"
                                        value={ot_remarks}
                                        name="ot_remarks"
                                        changeTextValue={(e) => updateRequest(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 pt-2">
                    <div className="card">
                        <OTRequestTable
                            update={count}
                            setTableData={setTableData}
                            setrequest={setrequest}
                            setflag={setflag} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default OTRequest
