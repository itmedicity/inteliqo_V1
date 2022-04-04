import { IconButton } from '@material-ui/core'
import { eachDayOfInterval } from 'date-fns'
import moment from 'moment'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import AttendanceMarkingMainCard from './AttendanceMarkingMainCard'

const AttendanceMarking = () => {

    const { selectedDept, selectDeptSection, updateDepartmentSection, updateSelected } = useContext(PayrolMasterContext)
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
            if (selectedDept !== 0 && selectDeptSection !== 0) {
                const postData = {
                    em_department: selectedDept,
                    em_dept_section: selectDeptSection
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
    }, [selectedDept, selectDeptSection, dateFormat, updateDepartmentSection, updateSelected])
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
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Attendance Marking">
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
                            // disabled={disable}
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
                        // selectedDept={selectedDept}
                        // selectDeptSection={selectDeptSection}
                        />
                        : null
                }
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default AttendanceMarking