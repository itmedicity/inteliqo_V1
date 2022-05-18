import { IconButton } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import PageLayoutCloseOnly from '../../CommonCode/PageLayoutCloseOnly'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import '../Att_Style.css'
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import { addDays, eachDayOfInterval, format } from 'date-fns'
import { useState, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DutyPlanningMainCard from './DutyPlanningMainCard'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getdeptShift, getempdetails } from 'src/redux/actions/dutyplan.action'
import ShiftSelectModel from './ShiftSelectModel';
const moment = extendMoment(Moment);


const DutyPlanning = () => {
  const history = useHistory()
  const { selectedDept, selectDeptSection } = useContext(PayrolMasterContext)
  //disptach function for updating store
  const dispatch = useDispatch()
  //use state for employee details
  const [empData, setempData] = useState([])
  //use State for Date Format
  const [dateFormat, setdateFormat] = useState([])
  //states for rendering the components
  const [duty, setDuty] = useState(0)
  const [duty1, setDuty1] = useState(0)
  const [update, setupdate] = useState(0)
  const [count, setCount] = useState(0)
  const [state, setstate] = useState(0)
  //use state for initial start date and end date
  const [formData, setFormData] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  })
  //de structuring
  const { startDate, endDate } = formData
  //getting form data
  const updateDutyPlanning = async (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value })
  }
  //date validations
  const maxdate = addDays(new Date(startDate), 30)
  const maxdatee = moment(maxdate).format('YYYY-MM-DD')
  //use effect getting the employee details of the selected department and department section
  useEffect(() => {
    //dispatichng employee details of the selected department and department section
    const getempdetl = async () => {
      if (selectedDept !== 0 && selectDeptSection !== 0) {
        const postData = {
          em_department: selectedDept,
          em_dept_section: selectDeptSection
        }
        dispatch(getempdetails(postData))
      }
    }
    getempdetl()
  }, [selectedDept, selectDeptSection])

  //getting employee details of selected department and department secion from redux
  const empdetl = useSelector((state) => {
    return state.getEmployeedetailsDutyplan.EmpdetlInitialdata

  })

  //insert duty planning (click function of plus button in th duty planning page)
  const insertDutyPlanning = async () => {
    setCount(count + 1)
    //checking whether the selected department section have employees
    if (Object.keys(empdetl).length > 0) {
      //setting employee data to a use state
      setempData(empdetl)
      //checking whether shift is assigned for this department and department section
      const postData = {
        em_department: selectedDept,
        em_dept_section: selectDeptSection
      }
      const results = await axioslogin.post("/departmentshift/checkshift", postData);
      const { successs } = results.data
      //if shift is assinged to this department secion 
      if (successs === 1) {
        //finding the dates between start date and end date
        const rage = eachDayOfInterval(
          { start: new Date(startDate), end: new Date(endDate) }
        )
        //finding the dates between start date and end date
        const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D-dd'), sunday: moment(val).format('d') } })
        setdateFormat(newDateFormat)
        const newDateFormat2 = rage.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } })
        //getting employee id from employee details
        const empidata = empdetl && empdetl.map((val) => {
          return val.em_id
        })
        const postDate = {
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          empData: empidata
        }
        //checking wheher duty plan is already inserted in these dates
        const result = await axioslogin.post("/plan/check", postDate)
        const { success, data } = result.data
        //if duty plan is already inserted
        if (success === 1) {
          const dutyday = empdetl.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
              return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
          })
          const dutyplanarray = dutyday.flat(Infinity)
          //filtering the data from the data base and inserting dates and finding the new array to insert
          const newdutyplanarray = dutyplanarray.filter((val) => {
            return data.filter((data) => {
              return val.emp_id === data.emp_id && val.date === moment(data.duty_day).format('YYYY-MM-DD')
            }).length === 0
          })

          //inserting duty plan based on date of join
          const insertnewdutyplanarray = newdutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? 0 : 1000 }
          })
          //if new array lenth is zero no need to inset
          if (newdutyplanarray.length === 0) {
            setDuty(1)
          }
          //if new array length not eqal to zero inserting the new array
          else {
            //inserting the duty plan
            const results = await axioslogin.post("/plan/insert", insertnewdutyplanarray)
            const { success1 } = results.data
            if (success1 === 1) {
              setDuty(1)
              setDuty1(1)
            }
            else {
              errorNofity("Error Occured!!Please Contact EDP")
            }
          }
        }
        //if the no dates are inserted betwen the start date and end date inserting the dates
        else {
          const dutyday = empdetl.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
              return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
          })
          const dutyplanarray = dutyday.flat(Infinity)
          //inserting duty plan based on date of join
          const insertdutyplanarray = dutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? 0 : 1000 }
          })
          //inserting the duty plan
          const results = await axioslogin.post("/plan/insert", insertdutyplanarray)
          const { success1 } = results.data
          if (success1 === 1) {
            setDuty(1)
            setDuty1(duty1 + 1)
          }
          else {
            errorNofity("Error Occured!!Please Contact EDP")
          }
        }

      }
      //if shift is not assigned to this department section
      else {
        setDuty(0)
        infoNofity("Please Map Shift For This Department Section")
      }
    }
    ///if there is no employees in the department section
    else {
      setDuty(0)
      warningNofity("There Is No Employees Under This Department Section")
    }
    // getting shift assigned to the selected department and department section
    if (selectedDept !== 0 && selectDeptSection !== 0) {
      const postDataaa = {
        dept_id: selectedDept,
        sect_id: selectDeptSection
      }
      dispatch(getdeptShift(postDataaa))
    }

  }
  //redirecting to profile page
  const redirecting = () => {
    history.push('/Home')
  }
  //Model for shift default selecting
  const [emid, setemid] = useState(0)
  const [open, setOpen] = useState(false);
  const [modelstatus, setmodelstatus] = useState(0)
  //for Closing Model
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <PageLayoutCloseOnly heading="Duty Planning"
        redirect={redirecting}>
        <div className="col-md-12 mb-2">
          <div className="row g-2">
            <div className="col-md-2">
              <TextInput
                type="date"
                classname="form-control form-control-sm custom-datefeild-height"
                Placeholder="Date"
                name="startDate"
                value={startDate}
                changeTextValue={(e) => updateDutyPlanning(e)}
              />
            </div>
            <div className="col-md-2">
              <TextInput
                type="date"
                classname="form-control form-control-sm custom-datefeild-height"
                Placeholder="Date"
                name="endDate"
                value={endDate}
                min={startDate}
                max={maxdatee}
                changeTextValue={(e) => updateDutyPlanning(e)}
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
                onClick={insertDutyPlanning}
              >
                <MdOutlineAddCircleOutline className="text-info" size={30} />
              </IconButton>
            </div>
          </div>
        </div>
        <div>{
          duty === 1 ?
            <DutyPlanningMainCard
              dateformat={dateFormat}
              employeedata={empData}
              startdate={startDate}
              enddate={endDate}
              duty={duty}
              duty1={duty1}
              count={count}
              selectedDept={selectedDept}
              selectDeptSection={selectDeptSection}
              setemid={setemid}
              setOpen={setOpen}
              update={update}
              setmodelstatus={setmodelstatus}
              state={state}
              setstate={setstate}
            /> : null
        }
        </div>
        {modelstatus === 1 ? < ShiftSelectModel empid={emid} open={open} handleClose={handleClose} startdate={startDate}
          enddate={endDate} setDuty1={setDuty1} duty1={duty1} setupdate={setupdate} update={update} /> : null}
      </PageLayoutCloseOnly >
    </Fragment>
  )


}

export default DutyPlanning
