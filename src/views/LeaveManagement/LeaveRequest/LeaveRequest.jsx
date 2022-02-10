import React, { Fragment, useContext, useEffect, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import { employeeNumber, getleaverequest, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import LeaveCalender from './LeaveCalender'
import DirLeaveRequest from './DirLeaveRequest'
import HalfDayLeaveRequest from './HalfDayLeaveRequest'
import { add, format, intervalToDuration } from 'date-fns'
import NoPunchRequest from './NoPunchRequest'
import LateComming from './LateComming'
import EarlyGoing from './EarlyGoing'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LeaveRequestTypeComponent from './Component/LeaveRequestTypeComponent'
import LeaveRequestType from 'src/views/CommonCode/LeaveRequestType'
import { errorNofity, getTotalShiftHours, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { id } from 'date-fns/locale'
import Compensatoryoff from './Component/Compensatoryoff'
import moment from 'moment'
const Input = styled('input')({
    display: 'none',
});
const LeaveRequest = () => {
    //for use history  
    const history = useHistory()
    // usestate for leaveslno
    const [leaveslno, setleaveslno] = useState()
    const [levereqtype, setleavereqtype] = useState(0)
    useEffect(() => {
        getleaverequest().then((val) => {
            setleaveslno(val)
        })
    }, [getleaverequest])
    // get haif day requested
    const [halfday, sethalfday] = useState()
    // no puch request details
    const [nopunch, setnopunch] = useState({
        nopunchdate: '',
        checkinflag: '',
        checkoutflag: '',
        checkintime: '',
        checkouttime: '',
        plan_slno: '',
        shift_id: '',
        punch_slno: '',
        mispunchflag: 0
    })
    const { checkinflag, checkintime, checkoutflag, checkouttime, nopunchdate, plan_slno, shift_id, punch_slno, mispunchflag } = nopunch

    // redirect to home page 
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    // compensatoryoffdetails
    const [compensatoryoff, setcopensatoryoff] = useState()

    const [leveda, setleavedata] = useState()
    // use conext data 
    const { employeedetails,//for employee details
        updateemployeedetails,
        getleavereqtype,//type of leave request half,leave,latecoming
        updateleavereqtype } = useContext(PayrolMasterContext)

    // destructuring employee details
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails

    // for main page details of leave 
    const [leaveDetails, setLeaveDetails] = useState({
        fromDate: '',
        noofleavetaken: '',
        resonforleave: '',
        emergencynumber: '',
    })
    // destructuring of leave details
    const { fromDate, noofleavetaken, resonforleave, emergencynumber } = leaveDetails

    // on change in main page 
    const updateLeaveDetails = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLeaveDetails({ ...leaveDetails, [e.target.name]: value })
    }
    const [lveData, setLveData] = useState([]);
    const [leavestartend, setleavestartend] = useState({ startDate: format(new Date(), "yyyy-MM-dd"), endDate: format(new Date(), "yyyy-MM-dd") });//to get start and end date
    const { startDate, endDate } = leavestartend
    const leavemastdata = {
        leaveid: leaveslno,
        em_id: em_id,
        em_no: em_no,
        em_department: em_department,
        em_dept_section: em_dept_section,
        leavefrom_date: startDate,
        leavetodate: endDate,
        rejoin_date: format(add(new Date(endDate), { days: 1 }), "yyyy-MM-dd"),
        request_status: 1
    }
    const submitLeave = async () => {

        if (levereqtype === 1) {
            const leavedatadetl = leveda.map((val) => {
                const levedsata = {
                    leaveid: leaveslno,
                    caulmnth: val.caulmnth,
                    index: val.index,
                    leave: val.leave,
                    levtypename: val.levtypename,
                    lveDate: val.lveDate,
                    lveType: val.lveType
                }
                return levedsata
            })

            const result = await axioslogin.post('/LeaveRequest/', leavemastdata)
            const { success, data } = result.data
            if (success === 1) {

                const result = await axioslogin.post('/LeaveRequest/createdetlleave', leavedatadetl)
                if (success === 1) {

                    succesNofity('saved successsfully')
                    updateleavereqtype(0)
                }
                else if (success === 2) {
                    warningNofity("There Is No Casual Leave Left For This Employee")
                }
                else {
                    errorNofity("Error Occured!!!!Please Contact EDP")
                }
            }
            else if (success === 2) {
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        else if (levereqtype === 2) {
            const halfdaysavedata = {
                checkIn: format(halfday.checkIn, "yyyy-MM-dd HH:MM:SS"),
                checkOut: format(halfday.checkOut, "yyyy-MM-dd HH:MM:SS"),
                leavedate: halfday.startDate,
                planslno: halfday.casullevemonth,
                shiftid: halfday.planslno,
                month: 'januvary',
                em_id: em_id,
                em_no: em_no,
                em_department: em_department,
                em_dept_section: em_dept_section,
            }

            const result = await axioslogin.post('/LeaveRequest/inserthalfdayreque', halfdaysavedata)


            const { success, message } = result.data

            if (success === 1) {
                succesNofity(message)

                updateleavereqtype(0)

            } else {
                errorNofity(message)
            }
        }


        else if (levereqtype === 3) {


            if (mispunchflag === 0) {
                if (checkinflag === true || checkoutflag === true) {
                    const lopdayreqst = {
                        checkinflag: checkinflag === true ? 1 : 0,
                        checkintime: checkinflag === true ? checkintime : '0000-00-00 00:00:00',
                        checkoutflag: checkoutflag === true ? 1 : 0,
                        checkouttime: checkoutflag === true ? checkouttime : '0000-00-00 00:00:00',
                        nopunchdate: nopunchdate,
                        plan_slno: plan_slno,
                        shift_id: shift_id,
                        crted_user: em_id,
                        em_id: em_id,
                        em_no: em_no,
                        em_department: em_department,
                        em_dept_section: em_dept_section,
                        punch_slno: punch_slno
                    }



                    const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', lopdayreqst)
                    const { success, message } = result.data

                    if (success === 1) {
                        succesNofity(message)

                        updateleavereqtype(0)

                    } else {
                        errorNofity(message)
                    }





                }
                else {

                    warningNofity('Select A Punch')
                }
            } else {
                warningNofity('Already request Added')
            }






        }
        else if (levereqtype === 5) {



            const { punchin, punchout, reqtype, selectshitid, shifturation, startdate } = compensatoryoff

            if (reqtype === 1) {
                const puin = moment(punchin).format("YYYY-MM-DD HH:mm:ss")
                const puninfinal = moment(puin)
                const puout = moment(punchout).format("YYYY-MM-DD HH:mm:ss")
                const punoutfinal = moment(puout)
                const duration = getTotalShiftHours(puninfinal, punoutfinal)


                const constdatasave = {
                    startdate: startdate,
                    punchindata: punchin,
                    punchoutdata: punchout,
                    req_type: reqtype,
                    reqtype_name: "Extra Time",
                    durationpunch: duration,
                    shiftduration: shifturation,
                    extratime: shifturation > duration ? 0 : (duration - shifturation),
                    em_id: em_id,
                    em_no: em_no,
                    em_department: em_department,
                    em_dept_section: em_dept_section,
                    shift_id: selectshitid

                }

                const result = await axioslogin.post('/LeaveRequest/insertcompensatyoff', constdatasave)
                const { success, message } = result.data

                if (success === 1) {
                    succesNofity(message)

                    updateleavereqtype(0)

                } else {
                    errorNofity(message)
                }

            }
            if (reqtype === 2) {

                const puin = moment(punchin).format("YYYY-MM-DD HH:mm:ss")
                const puninfinal = moment(puin)
                const puout = moment(punchout).format("YYYY-MM-DD HH:mm:ss")
                const punoutfinal = moment(puout)
                const duration = getTotalShiftHours(puninfinal, punoutfinal)


                const constdatasave = {
                    startdate: startdate,
                    punchindata: punchin,
                    punchoutdata: punchout,
                    req_type: reqtype,
                    reqtype_name: "Duty Off",
                    durationpunch: duration,
                    shiftduration: shifturation,
                    extratime: duration,
                    em_id: em_id,
                    em_no: em_no,
                    em_department: em_department,
                    em_dept_section: em_dept_section,

                }
                const result = await axioslogin.post('/LeaveRequest/insertcompensatyoff', constdatasave)
                const { success, message } = result.data

                if (success === 1) {

                    updateleavereqtype(0)

                    succesNofity(message)
                } else {
                    errorNofity(message)
                }





            }


        }
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Request"
                redirect={RedirectToProfilePage}
                submit={submitLeave}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1 mb-2">
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department"
                                    disabled="disabled"
                                    value={dept_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                    value={sect_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee Name"
                                    disabled="disabled"
                                    value={em_name}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Number"
                                    disabled="disabled"
                                    value={em_no}
                                />
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
                            <div className="col-md-3">
                                <LeaveRequestType style={SELECT_CMP_STYLE} select="Leave Request Type" setleavereqtype={setleavereqtype} />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="From Date"
                                    name="fromDate"
                                    value={fromDate}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="No of Leave Taken"
                                    name="noofleavetaken"
                                    value={noofleavetaken}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emergency Contact Number During Leave"
                                    name="emergencynumber"
                                    value={emergencynumber}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
                            <div className="col-md-9">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Reason For Leave"
                                    name="resonforleave"
                                    value={resonforleave}
                                    changeTextValue={(e) => updateLeaveDetails(e)}
                                />
                            </div>
                            <div className="col-md-3 text-center">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                        <Button variant="contained" component="span" size="small">
                                            Upload
                                        </Button>
                                    </label>
                                </Stack>
                            </div>
                        </div>
                    </div>
                    {/* Leave Request Card */}
                    <div className="col-md-12 mb-2">
                        {
                            getleavereqtype === 1 ? <DirLeaveRequest
                                emid={em_id}// employee id
                                leaveDetails={leaveDetails} // for main page details of leave 
                                leaveretypeid={getleavereqtype}////type of leave request half,leave,latecoming
                                setLeveData={setLveData}
                                leveData={lveData}
                                setleavestartend={setleavestartend}
                                setleavedata={setleavedata}
                            /> :
                                getleavereqtype === 2 ? <HalfDayLeaveRequest sethalfday={sethalfday} /> :
                                    getleavereqtype === 3 ? <NoPunchRequest setnopunch={setnopunch} /> :
                                        getleavereqtype === '4' ? <LateComming /> :
                                            getleavereqtype === '5' ? <EarlyGoing /> :
                                                getleavereqtype === 5 ? <Compensatoryoff setcopensatoryoff={setcopensatoryoff} /> : null
                        }
                    </div>
                    {/* Diplay the Allowed Leave Calender */}
                    <div className="col-md-12">
                        <LeaveCalender />
                    </div>
                </form>
            </PageLayoutSave >
        </Fragment>
    )
}

export default LeaveRequest
