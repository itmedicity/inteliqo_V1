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
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DutyPlanningMainCard from './DutyPlanningMainCard'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getdeptShift, getempdetails } from 'src/redux/actions/dutyplan.action'
import ShiftSelectModel from './ShiftSelectModel';
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import _ from 'underscore';
import { setCommonSetting } from 'src/redux/actions/Common.Action'
const moment = extendMoment(Moment);

const DutyPlanning = () => {

  const history = useHistory()
  const { selectBranchMast } = useContext(PayrolMasterContext);
  const dispatch = useDispatch()
  useEffect(() => dispatch(setCommonSetting()), [])

  const commonState = useSelector((state) => state.getCommonSettings, _.isEqual)
  const { notapplicable_shift, default_shift } = commonState;

  const [dept, setDept] = useState(0)
  const [deptSec, setDeptSec] = useState(0)

  //disptach function for updating store

  //use state for employee details
  const [empData, setempData] = useState([])
  const [hldadata, sethldadata] = useState([])
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

  /***
   * Date validation for restricting the frondend calander for selecting the date not more than 30
   * days from the selected start date
   */

  const maxdate = addDays(new Date(startDate), 30)
  const maxDateForDisplyCalender = moment(maxdate).format('YYYY-MM-DD')

  //use effect getting the employee details of the selected department and department section
  useEffect(() => {
    //dispatichng employee details of the selected department and department section
    const getempdetl = async () => {
      if (selectBranchMast !== 0 && dept !== 0 && deptSec !== 0) {
        const postData = {
          em_department: dept,
          em_dept_section: deptSec,
          em_branch: selectBranchMast
        }
        dispatch(getempdetails(postData))
      }
    }
    getempdetl()
  }, [dept, deptSec, selectBranchMast])


  useEffect(() => {
    const getholidays = async () => {
      //getting the holidays between start date and end date
      const getholiday = {
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD'),
      }
      const result = await axioslogin.post('/holidaylist/getholiday', getholiday)
      const { success, data } = result.data
      if (success === 2) {
        sethldadata(data)
      }
    }
    getholidays()
  }, [startDate, endDate])

  //getting employee details of selected department and department secion from redux
  const empdetlNew = useSelector((state) => state.getEmployeedetailsDutyplan.EmpdetlInitialdata, _.isEqual)

  // Filter the employee data for correcting the employee date of joining 
  const empdetl = empdetlNew.map((val) => {
    return {
      desg_name: val.desg_name,
      em_id: val.em_id,
      em_name: val.em_name,
      em_no: val.em_no,
      em_doj: val.contract_status === 1 ? val.em_cont_start : val.em_doj
    }
  })

  //insert duty planning (click function of plus button in th duty planning page)
  const insertDutyPlanning = async () => {
    setDuty(0) // this function rerender the duty plan display component every time Onclick function set the "duty" value set as "0"
    setCount(count + 1)

    //checking whether the selected department section have employees
    if (Object.keys(empdetl).length > 0) {
      //setting employee data to a use state
      setempData(empdetl)
      //checking whether shift is assigned for this department and department section
      const postData = {
        em_department: dept,
        em_dept_section: deptSec,
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
        // Date Format --> {date: 'Oct-1-Sa', sunday: '6'}
        const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D-dd'), sunday: moment(val).format('d') } })
        setdateFormat(newDateFormat)
        const newDateFormat2 = rage.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } })

        //getting employee id from employee details - date fomat --> {date: '2022-10-01'} 
        const empidata = empdetl && empdetl.map((val) => val.em_id)

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

          /******** if the duty plan is excist between these days **********/
          const dutyday = empdetl.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
              return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
          })

          //convert to a single array from mlti array
          const dutyplanarray = dutyday.flat(Infinity)

          //filtering the data from the data base and inserting dates and finding the new array to insert
          /***
           * filtering the data from the database if the all date have the shift id inserted or not 
           * if no shift id in that date filter that date and return a new array
           * if all date have the shift id then blank array will return
           */
          const newdutyplanarray = dutyplanarray.filter((val) => {
            return data.filter((data) => {
              return val.emp_id === data.emp_id && val.date === moment(data.duty_day).format('YYYY-MM-DD')
            }).length === 0
          })

          /**
           * returned array object 
           * {date: '2022-11-19', emp_id: 1212, doj: '2022-10-05'}
           * with date of join
           * Again filter tis array for the shift id Mapping
           * if the date is greater than the Date of join for a empoyee that particular 
           * employee shift id is marker as "Not applicable shift id" from common setting
           * other wise "default shift id " from common setting
           * 
           */

          const insertnewdutyplanarray = newdutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? default_shift : notapplicable_shift }
          })

          //if new array lenth is zero no need to inset
          if (newdutyplanarray.length === 0) {
            setDuty(1)
          } else {

            //if new array length not eqal to zero inserting the new array
            //inserting the duty plan

            const results = await axioslogin.post("/plan/insert", insertnewdutyplanarray)
            const { success1 } = results.data
            if (success1 === 1) {
              setDuty(1)
              setDuty1(1)
              if (hldadata.length > 0) {
                const result = await axioslogin.patch("/plan/holiday", hldadata);
                const { success } = result.data;
                if (success === 0) {
                  errorNofity("Error Updating the Holidays ! Please Contact EDP")
                }
              }
            }
            else {
              errorNofity("Error Occured!! Please Contact EDP")
            }
          }
        } else {

          /******** if not excist  **********/
          //if the no dates are inserted betwen the start date and end date inserting the dates

          const dutyday = empdetl.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
              return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
          })
          const dutyplanarray = dutyday.flat(Infinity)
          //inserting duty plan based on date of join
          const insertdutyplanarray = dutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? default_shift : notapplicable_shift }
          })

          if (default_shift === null || notapplicable_shift === null) {
            errorNofity("Check The Common Setting For Default and Not Applicable Shift") //Default and Notapplicable Shift Not Updaed in Common Setting
          } else {

            //inserting the duty plan
            const results = await axioslogin.post("/plan/insert", insertdutyplanarray)
            const { success1 } = results.data
            if (success1 === 1) {
              setDuty(1)
              setDuty1(duty1 + 1)
              if (hldadata.length > 0) {
                const result = await axioslogin.patch("/plan/holiday", hldadata);
                const { success } = result.data;
                if (success === 0) {
                  errorNofity("Error Updating the Holidays ! Please Contact EDP")
                }
              }

            }
            else {
              errorNofity("Error Occured!!Please Contact EDP")
            }

          }

        }

      }
      //if shift is not assigned to this department section
      else {
        setDuty(0)
        infoNofity("Please Map Shift For This Department Section")
      }
    } else { ///if there is no employees in the department section *****************
      setDuty(0)
      warningNofity("There Is No Employees Under This Department Section")
    }


    // getting shift assigned to the selected department and department section
    if (dept !== 0 && deptSec !== 0) {
      const postDataaa = {
        dept_id: dept,
        sect_id: deptSec
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
                max={maxDateForDisplyCalender}
                changeTextValue={(e) => updateDutyPlanning(e)}
              />
            </div>
            <div className="col-md-2">
              <BrnachMastSelection style={SELECT_CMP_STYLE} />
            </div>
            <div className="col-md-2  pt-1" >
              <DeptSelectByRedux value={dept} setValue={setDept} style={SELECT_CMP_STYLE} />
              {/* <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} /> */}
            </div>
            <div className="col-md-3  pt-1">

              <DeptSecSelectByRedux dept={dept} value={deptSec} setValue={setDeptSec} />
              {/* <DepartmentSectionSelect select="Department Section" style={SELECT_CMP_STYLE} /> */}
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
              dateformat={dateFormat}  // Date Format --> {date: 'Oct-1-Sa', sunday: '6'}
              employeedata={empData} // Selected Employee Data
              startdate={startDate} // Selected Start Date
              enddate={endDate} // Selected End Date
              duty={duty}  // after inserting the default shift "duty" state canged to 1
              duty1={duty1} // after inserting the default shift "duty" state canged to 1
              count={count}  //Click function state each click count + 1
              selectedDept={dept}  //Selected department
              selectDeptSection={deptSec} // Selected Department Section
              setemid={setemid} //For model opening default 
              setOpen={setOpen} //For model opening default 
              update={update}  //For model opening default 
              setmodelstatus={setmodelstatus} //For model opening default 
              state={state} // This state updation not from this component 
              setstate={setstate} // This state updation not from this component 
            /> : null
        }
        </div>
        {modelstatus === 1 ?
          <ShiftSelectModel
            empid={emid}
            open={open}
            handleClose={handleClose}
            startdate={startDate}
            enddate={endDate}
            setDuty1={setDuty1}
            duty1={duty1}
            setupdate={setupdate}
            update={update} /> : null}
      </PageLayoutCloseOnly >
    </Fragment>
  )


}

export default DutyPlanning
