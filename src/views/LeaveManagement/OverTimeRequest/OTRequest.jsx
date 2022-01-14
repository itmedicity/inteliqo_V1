import React, { Fragment, useEffect, useContext, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
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

const OTRequest = () => {
    const history = useHistory()
    const [otDate, setOtDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [count, setcount] = useState()
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { em_no, em_name, desg_name } = employeedetails
    const [flag, setflag] = useState(0)
    const [tabledata, setTableData] = useState({
        date: '',
        shift: '',
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
    })

    //Initializing
    const [request, setrequest] = useState({
        otDate: '',
        ot_reson: '',
        ot_remarks: '',
        shft_slno: '',
        checkin: new Date(),
        checkout: new Date(),
        shiftcheckout: new Date(),
        shiftcheckin: new Date(),
        finaltime: '',
        ot_slno: ''
    })
    const postdata = {
        emp_no: em_no,
        ot_days: otDate,
    }

    const getShiftdetail = async () => {
        const result = await axioslogin.post('/common/getShiftdetails', postdata)
        const { success, data } = result.data;
        if (success === 1) {
            const { ot_days, shft_code, shft_slno, shft_chkin_time, shft_chkout_time, check_in, check_out } = data[0]
            const frmdata = {
                date: ot_days,
                shift: shft_code,
                shift_Start: format(new Date(shft_chkin_time), "HH:mm:ss"),
                shift_end: format(new Date(shft_chkout_time), "HH:mm:ss"),
                in_time: format(new Date(check_in), "HH:mm:ss"),
                out_time: format(new Date(check_out), "HH:mm:ss")
            }
            const set = {
                otDate: '',
                ot_reson: '',
                ot_remarks: '',
                shft_slno: shft_slno,
                checkin: check_in,
                checkout: check_out,
                shiftcheckout: shft_chkout_time,
                shiftcheckin: shft_chkin_time
            }
            setTableData(frmdata);
            setrequest(set)
        } else if (success === 2) {
            infoNofity("No Shift is added to this employee")
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }

    //Shift Hours
    const x = moment(request.shiftcheckin).format("YYYY-MM-DD HH:mm:ss")
    const xx = moment(x)
    const y = moment(request.shiftcheckout).format("YYYY-MM-DD HH:mm:ss")
    const yy = moment(y)
    const exactWork = getTotalShiftHours(xx, yy)
    //Working hours
    const a = moment(new Date(request.checkin)).format("YYYY-MM-DD HH:mm:ss")
    const aa = moment(a)
    const b = moment(new Date(request.checkout)).format("YYYY-MM-DD HH:mm:ss")
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
    var hrRate = (othour * 200)
    if (otminute >= 30) {
        minRate = 200 / 2
    } else { }
    var amount = hrRate + minRate

    useEffect(() => {
    }, []);

    const getDate = (e) => {
        var selectdate = e.target.value
        var selectDate = format(new Date(selectdate), "yyyy-MM-dd")
        setOtDate(selectDate)
    }

    //Destructuring
    const { ot_reson, ot_remarks } = request;
    const updateRequest = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setrequest({ ...request, [e.target.name]: value })
    }

    //post Data
    const postData = {
        emp_no: employeedetails.em_no,
        ot_date: new Date(),
        ot_days: tabledata.date,
        ot_shift_id: request.shft_slno,
        check_in: request.checkin,
        check_out: request.checkout,
        over_time: overTime,
        ot_reson: ot_reson,
        ot_remarks: ot_remarks,
        ot_convert: '0',
        ot_amount: amount
    }

    const resetForm = {
        otDate: '',
        ot_reson: '',
        ot_remarks: '',
        shft_slno: '',
        checkin: new Date(),
        checkout: new Date(),
        shiftcheckout: new Date(),
        shiftcheckin: new Date(),
        date: '',
        shift: '',
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
        over_time: '',
        finaltime: ''
    }
    const patchData = {
        ot_reson: ot_reson,
        ot_remarks: ot_remarks,
        ot_slno: request.ot_slno
    }

    //Submit data
    const submitRequest = async (e) => {
        e.preventDefault();
        if (flag === 0) {
            if (overTime > 60) {
                const result = await axioslogin.post('/overtimerequest', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setrequest(resetForm);
                    setTableData(resetForm);
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
                setrequest(resetForm);
                setTableData(resetForm);
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
            <PageLayoutSave
                heading="Over Time Request"
                redirect={RedirectToProfilePage}
                submit={submitRequest}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="row g-1">
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee Name"
                                    value={em_no}
                                    name="em_name"
                                    disabled="Disabled"
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee ID"
                                    value={em_name}
                                    name="em_no"
                                    disabled="Disabled"
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Designation"
                                    value={desg_name}
                                    name="desg_name"
                                    disabled="Disabled"
                                />
                            </div>
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
                            <div className="col-md-1 pl-2">
                                <MdOutlineAddCircleOutline align="right" className="text-danger" size={32}
                                    onClick={getShiftdetail} />
                            </div>
                        </div>
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
                                                    <TableCell align="center">In</TableCell>
                                                    <TableCell align="center">Out</TableCell>
                                                    <TableCell align="center">OT(In hour)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{tabledata.date}</TableCell>
                                                    <TableCell align="center">{tabledata.shift}</TableCell>
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
