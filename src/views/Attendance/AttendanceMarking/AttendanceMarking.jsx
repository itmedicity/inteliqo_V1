import { IconButton } from '@material-ui/core'
import { eachDayOfInterval } from 'date-fns'
import moment from 'moment'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import AttendanceMarkingMainCard from './AttendanceMarkingMainCard'
import { useHistory } from 'react-router'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useSelector } from 'react-redux';
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'

const AttendanceMarking = () => {
    const history = useHistory()
    const { selectedDept, selectDeptSection, updateDepartmentSection, updateSelected, selectBranchMast } = useContext(PayrolMasterContext)
    const [year, setYear] = useState(new Date());
    const [rageset, setrange] = useState()
    const [count, setcount] = useState(0)
    const firstdate = moment(year).startOf('month').format('yyyy-MM-DD');
    const endodate = moment(year).endOf('month').format('yyyy-MM-DD');
    const [value, setValue] = useState(0)
    const [empData, setempData] = useState([])
    //use State for Date Format
    const [dateFormat, setdateFormat] = useState([])

    const setchange = (e) => {
        //finding the dates between start date and end date
        setYear(e.target.value)
        const f1date = moment(e.target.value).startOf('month').format('yyyy-MM-DD');
        const enddate = moment(e.target.value).endOf('month').format('yyyy-MM-DD');
        const rage = eachDayOfInterval(
            { start: new Date(f1date), end: new Date(enddate) }
        )
        setrange(rage)
        //finding the dates between start date and end date
        const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D'), sunday: moment(val).format('d') } })
        setdateFormat(newDateFormat)
        setcount(count + 1)
    }

    useEffect(() => {
        const getempdetl = async () => {
            if (selectBranchMast !== 0 && selectedDept !== 0 && selectDeptSection !== 0) {
                const postData = {
                    em_department: selectedDept,
                    em_dept_section: selectDeptSection,
                    em_branch: selectBranchMast
                }
                const result = await axioslogin.post("/plan/create", postData);
                const { success, data } = result.data
                if (success === 1) {
                    setempData(data)
                }
                else {
                    warningNofity("There is No employees In This Department And Department Section")

                }
            }
        }
        getempdetl()
    }, [selectedDept, selectBranchMast, selectDeptSection, dateFormat, updateDepartmentSection, updateSelected])
    //attendance marking function
    const attendanceMarking = () => {
        setValue(1)
        setcount(count + 1)
        //finding the dates between start date and end date
        const rage = eachDayOfInterval(
            { start: new Date(firstdate), end: new Date(endodate) }
        )

        //finding the dates between start date and end date
        const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D'), sunday: moment(val).format('d') } })
        setdateFormat(newDateFormat)
    }
    //redirecting to profile page
    const redirecting = () => {
        history.push('/Home')
    }
    const [arrytry, setArrytry] = useState([])
    const empidarray = arrytry.map((val) => {
        return val.emid
    })
    const PostDataSave = {
        emp_id: empidarray,
        start: moment(firstdate).format('YYYY-MM-DD'),
        end: moment(endodate).format('YYYY-MM-DD')
    }
    //getting the employee id of loggined user
    const loggineduser = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })
    //FUNCTION FOR SAVING ATTENDANCE MARKING
    const AttendanceMarkingSave = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/attandancemarking/getattendancetotalEmp', PostDataSave)
        const { success, data } = result.data
        if (success === 1) {
            const attendancesave = data.map((val) => {
                return {
                    em_id: val.emp_id,
                    em_no: val.em_no,
                    attendance_marking_month: moment(new Date(firstdate)).format('MMM-YYYY'),
                    total_working_days: dateFormat.length,
                    tot_days_present: val.duty_status,
                    total_leave: val.leave_type,
                    total_lop: parseFloat(dateFormat.length) - (parseFloat(val.duty_status) + parseFloat(val.leave_type)),
                    total_days: (parseFloat(val.duty_status) + parseFloat(val.leave_type)), updated_user: loggineduser,
                    attnd_mark_startdate: moment(firstdate).format('YYYY-MM-DD'),
                    attnd_mark_enddate: moment(endodate).format('YYYY-MM-DD'),

                }
            })
            const result = await axioslogin.post('/attedancemarkSave', attendancesave)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            }
            else if (success === 7) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDp")
            }
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDp")
        }

    }




    return (
        <Fragment>
            <PageLayoutSave
                heading="Attendance Marking" redirect={redirecting}
                submit={AttendanceMarkingSave}>
                <div className="col-md-12 mb-2">
                    <div className="row g-2">

                        <div className="col-md-2">
                            <TextInput
                                type="month"
                                classname="form-control form-control-sm"
                                Placeholder="Arrived Time"
                                changeTextValue={(e) => {
                                    setchange(e)
                                }}
                                value={year}
                                name="monthwise"
                            />
                        </div>
                        <div className="col-md-3">
                            <BrnachMastSelection select="Branch" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSectionSelect select="Department Section" style={SELECT_CMP_STYLE} />
                        </div>

                        <div className="col-md-1 text-center">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={(e) => { attendanceMarking() }}
                            >
                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div>{
                    value === 1 ?
                        <AttendanceMarkingMainCard
                            dateformat={dateFormat}
                            employeedata={empData}
                            startdate={firstdate}
                            enddate={endodate}
                            rageset={rageset}
                            count={count}
                            arrytry={arrytry}
                            setArrytry={setArrytry}

                        />
                        : null
                }
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default AttendanceMarking