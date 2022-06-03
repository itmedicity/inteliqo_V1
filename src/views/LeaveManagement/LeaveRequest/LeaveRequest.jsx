import React, { Fragment, useContext, useEffect, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { getleaverequest, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import LeaveCalender from './LeaveCalender'
import DirLeaveRequest from './DirLeaveRequest'
import HalfDayLeaveRequest from './HalfDayLeaveRequest'
import { add, format } from 'date-fns'
import NoPunchRequest from './NoPunchRequest'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LeaveRequestType from 'src/views/CommonCode/LeaveRequestType'
import { errorNofity, getTotalShiftHours, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import Compensatoryoff from './Component/Compensatoryoff'
import moment from 'moment'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getannualleave } from 'src/redux/actions/Profile.action'
import LeaveRequestTable from './LeaveRequestTable'
import InchargeLeaveReqEmp from './Component/InchargeLeaveReqEmp'
const Input = styled('input')({
    display: 'none',
});
const LeaveRequest = () => {
    // use conext data 
    const { employeedetails,//for employee details
        getleavereqtype,//type of leave request half,leave,latecoming
        updateleavereqtype, authorization } = useContext(PayrolMasterContext)
    const { incharge_level, hod_level, ceo_level, is_incharge, is_hod } = authorization
    // destructuring employee details
    const { dept_name, em_department, em_dept_section, em_id, em_name, em_no, sect_name } = employeedetails
    const dispath = useDispatch()
    //for use history  
    const history = useHistory()
    // usestate for leaveslno
    const [leaveslno, setleaveslno] = useState()
    const [emplId, SetEmpId] = useState(0)
    const [Emno, SetEmno] = useState(0)
    const [inchargedeptSec, SetinchargedeptSec] = useState([])
    const [levereqtype, setleavereqtype] = useState(0)
    const [leavdaystype, setleavedaystype] = useState(0)
    const [singleselect, setsingleselect] = useState(0)
    const [count, setCount] = useState(0)
    useEffect(() => {
        getleaverequest().then((val) => {
            setleaveslno(val)
        })
        if (em_id !== '' && is_incharge !== 1) {
            dispath(getannualleave(em_id))
        }
        else if (is_incharge === 1 && emplId !== 0) {
            dispath(getannualleave(emplId))
        }
    }, [getleaverequest, em_id, emplId])
    //if loggined user is incharge getting the department section under the incharge
    useEffect(() => {
        if (is_incharge === 1) {
            const getInchargeDeptSect = async () => {
                const result = await axioslogin.get(`/common/inchargedeptSect/${em_id}`)
                const { success, data1 } = result.data
                if (success === 1) {
                    SetinchargedeptSec(data1)
                }
            }
            getInchargeDeptSect()
        }
    }, [is_incharge, em_id])
    //getting selected employee
    const handleChange = async (e) => {
        SetEmpId(e)
    }
    useEffect(() => {
        const getEmpId = async () => {
            if (emplId !== 0) {
                const result = await axioslogin.get(`/common/getENameLeaveCarry/${emplId}`)
                const { success, data } = result.data
                if (success === 1) {
                    SetEmno(data[0].em_no)
                }
                else {
                    SetEmno(0)
                }
            }
        }
        getEmpId();
    }, [emplId])

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
    // for main page details of leave 
    const [leaveDetails, setLeaveDetails] = useState({
        resonforleave: '',
    })
    // destructuring of leave details
    const { resonforleave } = leaveDetails
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
        em_id: is_incharge === 1 ? emplId : em_id,
        em_no: is_incharge === 1 ? Emno : em_no,
        em_department: em_department,
        em_dept_section: em_dept_section,
        leavefrom_date: startDate,
        leavetodate: endDate,
        rejoin_date: format(add(new Date(endDate), { days: 1 }), "yyyy-MM-dd"),
        request_status: 1,
        incharge_level: is_incharge === 1 ? 0 : incharge_level,
        hod_level: is_hod === 1 ? 0 : hod_level,
        ceo_level: ceo_level,
        leavdaystype: (leavdaystype >= 3) && (leavdaystype < 5) ? 1 : (leavdaystype >= 5) ? 2 : 0,
        resonforleave: resonforleave,
    }
    const checkattendnceSave = {
        attenddate: moment(new Date(startDate)).format('MMM-YYYY'),
        empId: is_incharge === 1 ? emplId : em_id,
    }
    const submitLeave = async () => {
        //checking whether attendance marking saved for this month
        const result = await axioslogin.post('/attedancemarkSave/check', checkattendnceSave)
        const { success, dataa } = result.data
        if (success === 1) {
            //if employee data is pressent in attendance marking save table cannot save leave
            if (dataa.length > 0) {
                warningNofity("Attendance Is Already Saved For This Month!!!Cannot Save Attendance")
            }
        }
        else {
            if (levereqtype === 1) {
                if ((leveda.length === 0) || (leveda.length !== leavdaystype)) {
                    warningNofity("Plese Select The Details")
                }
                else {
                    const leavedatadetl = leveda.map((val) => {
                        const levedsata = {
                            leaveid: leaveslno,
                            caulmnth: val.caulmnth,
                            index: val.index,
                            leave: val.leave,
                            levtypename: val.levtypename,
                            lveDate: val.lveDate,
                            lveType: val.lveType,
                            incharge_level: incharge_level,
                            hod_level: hod_level,
                            ceo_level: ceo_level,
                            nof_leave: singleselect === 1 ? val.noofdays : 1,
                            singleleave: singleselect
                        }
                        return levedsata
                    })
                    if (resonforleave !== '') {
                        const result = await axioslogin.post('/LeaveRequest', leavemastdata)
                        const { success } = result.data
                        if (success === 1) {
                            const result2 = await axioslogin.post('/LeaveRequest/createdetlleave', leavedatadetl)
                            if (result2.data.success === 1) {

                                getleaverequest().then((val) => {
                                    setleaveslno(val)
                                })
                                succesNofity(result2.data.message)
                                setCount(count + 1)
                                updateleavereqtype(0)
                                setleavereqtype(0)
                                setleavedaystype(0)
                                setsingleselect(0)
                                sethalfday()
                                setnopunch({})
                                setcopensatoryoff()
                                setLeaveDetails({
                                    resonforleave: '',
                                })
                                setLveData([])
                                updateleavereqtype(0)
                                getleaverequest().then((val) => {
                                    setleaveslno(val)
                                })

                                history.push('/Home/LeaveRequest')
                            }
                            else if (result2.data.success === 2) {
                                warningNofity("There Is No Casual Leave Left For This Employee")
                            }
                            else {
                                errorNofity("Error Occured!!!!Please Contact EDP6767")
                            }
                        }
                        else if (success === 2) {
                            warningNofity("There Is No Casual Leave Left For This Employee")
                        }
                        else {
                            errorNofity("Error Occured!!!!Please Contact EDPrty")
                            updateleavereqtype(0)
                            setleavereqtype(0)
                            setleavedaystype(0)
                            setsingleselect(0)
                            sethalfday()
                            setnopunch({})
                            setcopensatoryoff()
                            setLeaveDetails({
                                resonforleave: ''
                            })
                            setLveData([])
                            getleaverequest().then((val) => {
                                setleaveslno(val)
                            })
                            history.push('/Home/LeaveRequest')
                        }
                    } else {
                        warningNofity("Please Enter The Reason")
                    }
                }


            }

            else if (levereqtype === 2) {

                if ((halfday.casullevemonth !== 0 && halfday.monthleave !== "" && halfday.planslno !== 0)) {
                    const halfdaysavedata = {
                        checkIn: format(halfday.checkIn, "yyyy-MM-dd HH:MM:SS"),
                        checkOut: format(halfday.checkOut, "yyyy-MM-dd HH:MM:SS"),
                        leavedate: halfday.startDate,
                        planslno: halfday.casullevemonth,
                        shiftid: halfday.planslno,
                        month: halfday.monthleave,
                        em_id: is_incharge === 1 ? emplId : em_id,
                        em_no: is_incharge === 1 ? Emno : em_no,
                        em_department: em_department,
                        em_dept_section: em_dept_section,
                        incharge_level: is_incharge === 1 ? 0 : incharge_level,
                        hod_level: is_hod === 1 ? 0 : hod_level,
                        ceo_level: ceo_level,
                        resonforleave: resonforleave,
                    }
                    if (resonforleave !== '') {
                        const result = await axioslogin.post('/LeaveRequest/inserthalfdayreque', halfdaysavedata)
                        const { success, message } = result.data
                        if (success === 1) {
                            history.push('/Home/LeaveRequest')
                            getleaverequest().then((val) => {
                                setleaveslno(val)
                            })
                            succesNofity(result.data.message)
                            setCount(count + 1)
                            updateleavereqtype(0)
                            setleavereqtype(0)
                            setleavedaystype(0)
                            setsingleselect(0)
                            sethalfday()
                            setnopunch({})
                            setcopensatoryoff()
                            setLeaveDetails({
                                resonforleave: '',
                            })
                            setLveData([])

                            updateleavereqtype(0)

                        } else {
                            errorNofity(message)
                        }
                    }
                    else {
                        warningNofity("Please Enter The Reason")
                    }

                } else {
                    warningNofity("Please enter Complete Details")

                    updateleavereqtype(0)
                    setleavereqtype(0)
                    setleavedaystype(0)
                    setsingleselect(0)
                    sethalfday()
                    setnopunch({})
                    setcopensatoryoff()
                    setLeaveDetails({
                        resonforleave: ''
                    })
                    setLveData([])
                    getleaverequest().then((val) => {
                        setleaveslno(val)
                    })
                    history.push('/Home/LeaveRequest')
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
                            em_id: is_incharge === 1 ? emplId : em_id,
                            em_no: is_incharge === 1 ? Emno : em_no,
                            em_department: em_department,
                            em_dept_section: em_dept_section,
                            punch_slno: punch_slno,
                            incharge_level: is_incharge === 1 ? 0 : incharge_level,
                            hod_level: is_hod === 1 ? 0 : hod_level,
                            ceo_level: ceo_level,
                            resonforleave: resonforleave,

                        }
                        if (resonforleave !== '') {
                            const result = await axioslogin.post('/LeaveRequest/insertnopunchrequest', lopdayreqst)
                            const { success, message } = result.data
                            if (success === 1) {
                                history.push('/Home/LeaveRequest')
                                getleaverequest().then((val) => {
                                    setleaveslno(val)
                                })
                                succesNofity(message)
                                setCount(count + 1)
                                updateleavereqtype(0)
                                setleavereqtype(0)
                                setleavedaystype(0)
                                setsingleselect(0)
                                sethalfday()
                                setnopunch({})
                                setcopensatoryoff()
                                setLeaveDetails({
                                    resonforleave: '',
                                })
                                setLveData([])

                            } else {
                                errorNofity(message)
                            }
                        }
                        else {

                            warningNofity("Please Enter The Reason")
                        }
                    }
                    else {
                        warningNofity('Select A Punch')
                    }
                } else {
                    warningNofity('Already request Added')
                }
            }
            else if (levereqtype === 4) {
                const { punchin, punchout, reqtype, selectshitid, shifturation, startdate } = compensatoryoff

                if (compensatoryoff !== undefined) {
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
                            em_id: is_incharge === 1 ? emplId : em_id,
                            em_no: is_incharge === 1 ? Emno : em_no,
                            em_department: em_department,
                            em_dept_section: em_dept_section,
                            shift_id: selectshitid,
                            incharge_level: is_incharge === 1 ? 0 : incharge_level,
                            hod_level: is_hod === 1 ? 0 : hod_level,
                            ceo_level: ceo_level,
                            resonforleave: resonforleave,

                        }
                        if (resonforleave !== '') {
                            const result = await axioslogin.post('/LeaveRequest/insertcompensatyoff', constdatasave)
                            const { success, message } = result.data
                            if (success === 1) {
                                history.push('/Home/LeaveRequest')
                                getleaverequest().then((val) => {
                                    setleaveslno(val)
                                })
                                succesNofity(message)
                                setCount(count + 1)
                                updateleavereqtype(0)
                                setleavereqtype(0)
                                setleavedaystype(0)
                                setsingleselect(0)
                                sethalfday()
                                setnopunch({})
                                setcopensatoryoff()
                                setLeaveDetails({
                                    resonforleave: '',
                                })
                                setLveData([])
                                succesNofity(message)
                                updateleavereqtype(0)
                            } else {
                                errorNofity(message)
                            }
                        }
                        else {
                            warningNofity("Please Enter The Reason")
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
                            em_id: is_incharge === 1 ? emplId : em_id,
                            em_no: is_incharge === 1 ? Emno : em_no,
                            em_department: em_department,
                            em_dept_section: em_dept_section,
                            incharge_level: is_incharge === 1 ? 0 : incharge_level,
                            hod_level: is_hod === 1 ? 0 : hod_level,
                            ceo_level: ceo_level,
                            resonforleave: resonforleave,
                        }
                        if (resonforleave !== '') {
                            const result = await axioslogin.post('/LeaveRequest/insertcompensatyoff', constdatasave)
                            const { success, message } = result.data
                            if (success === 1) {
                                history.push('/Home/LeaveRequest')
                                getleaverequest().then((val) => {
                                    setleaveslno(val)
                                })
                                succesNofity(message)
                                setCount(count + 1)
                                updateleavereqtype(0)
                                setleavereqtype(0)
                                setleavedaystype(0)
                                setsingleselect(0)
                                sethalfday()
                                setnopunch({})
                                setcopensatoryoff()
                                setLeaveDetails({
                                    resonforleave: ''
                                })
                                setLveData([])
                                updateleavereqtype(0)
                                succesNofity(message)
                            } else {
                                errorNofity(message)
                            }
                        }
                        else {
                            warningNofity("Please Enter The Reason")
                        }
                    }

                }
                else {
                    history.push('/Home/LeaveRequest')
                    getleaverequest().then((val) => {
                        setleaveslno(val)
                    })
                    updateleavereqtype(0)
                    setleavereqtype(0)
                    setleavedaystype(0)
                    setsingleselect(0)
                    sethalfday()
                    setnopunch({})
                    setcopensatoryoff(0)
                    setLeaveDetails({
                        resonforleave: '',
                    })
                    setLveData([])
                    warningNofity('Please enter complete detalis')
                }

            }
        }
    }
    return (
        <Fragment>
            <AuthorizationDetails />
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
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                    value={sect_name}
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Number"
                                    disabled="disabled"
                                    value={em_no}
                                />
                            </div>
                            <div className="col-md-2">
                                {
                                    is_incharge === 1 ?
                                        <InchargeLeaveReqEmp inchargedeptSec={inchargedeptSec}
                                            onChange={handleChange}
                                            style={SELECT_CMP_STYLE}
                                        /> :
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Employee Name"
                                            disabled="disabled"
                                            value={em_name}
                                        />
                                }
                            </div>
                            <div className="col-md-3">
                                <LeaveRequestType style={SELECT_CMP_STYLE} select="Leave Request Type" setleavereqtype={setleavereqtype} />
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
                                emid={is_incharge === 1 ? emplId : em_id}// employee id
                                leaveDetails={leaveDetails} // for main page details of leave 
                                leaveretypeid={getleavereqtype}////type of leave request half,leave,latecoming
                                setLeveData={setLveData}
                                leveData={lveData}
                                setleavestartend={setleavestartend}
                                setleavedata={setleavedata}
                                setleavedaystype={setleavedaystype}
                                setsingleselect={setsingleselect}
                                leavdaystype={leavdaystype}//no days leave
                            /> :
                                getleavereqtype === 2 ? <HalfDayLeaveRequest sethalfday={sethalfday}
                                    em_id={is_incharge === 1 ? emplId : em_id} /> :
                                    getleavereqtype === 3 ? <NoPunchRequest setnopunch={setnopunch}
                                        em_id={is_incharge === 1 ? emplId : em_id} /> :
                                        getleavereqtype === 4 ? <Compensatoryoff setcopensatoryoff={setcopensatoryoff}
                                            em_id={is_incharge === 1 ? emplId : em_id} /> : null
                        }
                    </div>
                    {/* Diplay the Allowed Leave Calender */}
                    <div className="card">
                        <div className="row">
                            <div className="col-md-5">
                                <LeaveCalender em_id={is_incharge === 1 ? emplId : em_id} count={count} setCount={setCount} />
                            </div>
                            <div className="col-md-7">
                                <LeaveRequestTable em_id={is_incharge === 1 ? emplId : em_id} count={count} setCount={setCount} />
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayoutSave >
        </Fragment>
    )
}
export default LeaveRequest
