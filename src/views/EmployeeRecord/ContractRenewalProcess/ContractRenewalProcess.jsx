import { IconButton, CssVarsProvider, Tooltip } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, format, lastDayOfMonth } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';
import { employeeNewContractEntry, employeeRecordUpdationMandatory, employeeRecordUpdationUserChoice, employeeUpdateExpTable, employeeUpdatePersonaltable, employeeUpdateQualificationTable, updateArrearSalary, updateEmployeeMasterTable, updateoldAttndanceDetail } from './Function/ContractFun';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const EXistContractDetl = React.lazy(() => import('./EXistContractDetl'))
const AttendanceDetails = React.lazy(() => import('./AttendanceDetails'))
const OldDatatoCopy = React.lazy(() => import('./OldDatatoCopy'))
const RenewProcess = React.lazy(() => import('./RenewProcess'))

const ContractRenewalProcess = () => {

  const { id, no } = useParams()
  const history = useHistory()
  const [probationperiod, setProbationPeriod] = useState(0)
  const [fine, setFine] = useState(0)
  //const [contractstart, setContractStart] = useState('')
  const [contractend, setContractEnd] = useState('')
  const [graceperiod, setgraceperiod] = useState(0)
  const [retirementdate, setRetirementdate] = useState('')
  const [attendanceDays, setattendanceDays] = useState(0)
  const [newCatgeory, setnewCategory] = useState(0)
  // const [oldCategory, setOldctaegory] = useState(0)
  const [probsataus, setProbstatus] = useState(0)// for setting probation status
  const [contstatus, setContrstatus] = useState(0)//for setting contract status
  //const [attendanceata, setAttendanceData] = useState([])
  const [doj, setDoj] = useState('')

  const [contractrenew, setContractrenew] = useState(false)//checkbox state for contract renewal
  const [contractTpPermanent, setcontractTpPermanent] = useState(false)//checkbox state for contract permanent
  const [punchmast, setPunchMast] = useState([])
  const [updateSlno, setUpdateSlno] = useState(0)

  // to get employee's date of join, contract end date, retiremnt date
  const state = useSelector((state) => state?.getPrifileDateEachEmp?.empPersonalData?.personalData, _.isEqual)

  useEffect(() => {

    if (Object.keys(state).length !== 0) {
      const { em_cont_end,
        em_doj, em_retirement_date } = state;
      setContractEnd(em_cont_end)
      // setContractStart(em_cont_start)
      //setOldctaegory(category_slno)
      setRetirementdate(em_retirement_date)
      setDoj(em_doj)
    } else {
      setContractEnd('')
      // setContractStart('')
      // setOldctaegory(0)
      setRetirementdate('')
      setDoj('')
    }

  }, [state])

  //getting data to save
  const datatoSave = useSelector((state) => state?.getContractClosedata, _.isEqual)
  const { contractclose, attendancedetls, arreardetails, olDataTocopy, oldPersonalData, newCategory
  } = datatoSave

  //useEffect for setting new employee category
  useEffect(() => {
    setnewCategory(newCategory.newEmpcat)
  }, [newCategory.newEmpcat])

  //new contract details
  const [newContract, updateNewContract] = useState({
    newempId: "",
    newcontractstart: format(new Date(), 'yyyy-MM-dd'),
    newcontractend: format(new Date(), 'yyyy-MM-dd'),
    permanentEmpNo: '',
    newdateofjoin: format(new Date(), 'yyyy-MM-dd'),
  })
  const { newempId, newcontractstart, newcontractend, permanentEmpNo, newdateofjoin } = newContract

  // //login employee number
  // const em_no = useSelector((state) => state.getProfileData.ProfileData[0].em_no, _.isEqual)

  // const empno = useMemo(() => em_no, [em_no])

  //new entry contract details
  const newcontractdetl = {
    em_no: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
    em_id: no,
    em_cont_start: newcontractstart,
    em_cont_end: newcontractend,
    em_prob_end_date: moment(addDays(new Date(newcontractstart), probationperiod)).format('YYYY-MM-DD')
  }

  //getting new probation or training end details    
  useEffect(() => {
    const getCtaehoryDetl = async () => {
      if (newCatgeory > 0) {
        const result = await axioslogin.get(`/empcat/${newCatgeory}`)
        const { success, data } = result.data
        if (success === 1) {
          const { ecat_prob_period, ecat_prob, ecat_cont } = data[0]
          setProbationPeriod(ecat_prob_period)
          if (ecat_prob === 1) {
            setProbstatus(1)
          }
          else {
            setProbstatus(0)
          }
          if (ecat_cont === 1) {
            setContrstatus(1)
          }
          else {
            setContrstatus(0)
          }
        }
        else {
          setProbationPeriod(0)
        }
      }
    }
    getCtaehoryDetl()
  }, [newCatgeory])

  //update empmaster data
  const updateempMast = {
    em_no: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
    em_category: newCatgeory,
    em_contract_end_date: contstatus === 1 && contractrenew === true ? newcontractend : contractend,
    em_prob_end_date: contstatus === 1 && contractrenew === true ? moment(addDays(new Date(newcontractstart), probationperiod)).format('YYYY-MM-DD') : moment(addDays(new Date(newdateofjoin), probationperiod)).format('YYYY-MM-DD'),
    em_id: no,
    probation_status: probsataus === 1 ? 1 : 0,
    contract_status: contstatus === 1 && contractrenew === true ? 1 : 0,
    em_doj: contstatus === 0 && contractrenew === false ? newdateofjoin : doj,
    actual_doj: doj
  }

  const checkemid = {
    em_no: newempId
  }

  //for closing window
  const redirect = async () => {
    history.push('/Home/Contract_end_details')
  }

  //useEffect for getting attendancde details to process earn leave
  // useEffect(() => {
  //   const postdata = {
  //     emp_id: no,
  //     startdate: moment(new Date(contractstart)).format('YYYY-MM-DD'),
  //     endate: moment(new Date(contractend)).format('YYYY-MM-DD'),
  //   }
  //   // data based on the calculation of earn leave
  //   const getattendanceData = async () => {
  //     const result = await axioslogin.post('/yearleaveprocess/dataannualcalculationemp', postdata)
  //     const { success, data } = result.data;
  //     if (success === 2) {
  //       setAttendanceData(data[0])
  //     }
  //     else if (success === 2) {
  //       setAttendanceData([])
  //     }
  //     else {
  //       setAttendanceData([])
  //     }
  //   }
  //   getattendanceData()
  // }, [no, contractstart, contractend])

  useEffect(() => {
    const dutyplandata = async (id) => {
      const postdata = {
        em_no: id,
        from: newcontractstart,
        to: moment(lastDayOfMonth(new Date(newcontractstart))).format('YYYY-MM-DD')
      }
      const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
      const { success, data } = result.data
      if (success === 1) {
        const arr = data?.map((val) => {
          const obj = {
            em_no: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
            duty_day: val.duty_day,
            punch_slno: val.punch_slno
          }
          return obj
        })
        setPunchMast(arr)
      } else {
        setPunchMast([])
      }
    }
    dutyplandata(id)

  }, [newcontractstart, id, contstatus, contractrenew, newempId, permanentEmpNo])

  useEffect(() => {
    const getLoginDetails = async () => {
      const result = await axioslogin.get(`/empcontract/empdetails/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        const { emp_slno } = data
        setUpdateSlno(emp_slno)
      } else {
        setUpdateSlno(0)
      }
    }
    getLoginDetails(id)
  }, [id])


  //function for saving new contract
  const RenewOldContract = async (e) => {
    e.preventDefault();
    if (Object.keys(contractclose.contCloseData).length === 0) {
      infoNofity("Please Close The First Contract")
    }
    else if ((contractTpPermanent === true) && (newCatgeory === 0 || permanentEmpNo === '')) {
      warningNofity("Please Select Category & Change Employee Number")
    }
    else if (Object.keys(olDataTocopy.dataTocopy).length === 0) {
      infoNofity("Please Select Previous Data To Copy")
    }
    else if (Object.keys(attendancedetls.attendancedata).length === 0) {
      infoNofity("Please Process the attendance of the employee till date")
    }
    else if (fine > 0) {
      warningNofity("Please Clear Fine Before Renewing the Contract")
    }
    else if (addDays(new Date(contractend), graceperiod) > new Date()) {
      warningNofity("Grace Period Not Completed")
    }
    else if ((contractrenew === false) && (contractTpPermanent === false)) {
      warningNofity("Please Change Category")
    }
    else if ((contractrenew === true) && (newCatgeory === 0 || newempId === '')) {
      warningNofity("Please Select Category & Change Employee Number")
    }
    else {
      const result = await axioslogin.post('/empmast/checkEmno/contracterenew', checkemid)
      const { data } = result.data
      if (data.length > 1) {
        warningNofity("Employee ID Already Exist")
      }
      else {

        //closing first contract
        const result = await axioslogin.patch('/empcontract/contractrenew', contractclose.contCloseData)
        const { success } = result.data
        if (success === 2) {
          /**
           * 1-> updation and salary closing of old attendance details and salary details 
           * 2 -> update employee master emp_no,category,contract_status,probation_status, start & aend date
           * 3 -> inactive old login details -> update "hrm_employee" table for inactive old login
           * 4 -> if next category in contract the insert the contract details table ( if condition)
           * 5 -> update personal infomration with new emp_no 
           *  a-> personal infomration
           *  b-> experience
           *  c-> qualification
           *  d-> salary head split details (earning and deduction details)
           *  e-> contract log updation
           */
          updateEmployeeMasterTable(updateempMast, no, updateSlno).then((messsage) => {
            const { modelStatus } = messsage;
            if (modelStatus === 1 && contstatus === 0) {
              employeeRecordUpdationMandatory(oldPersonalData).then((values) => {
                const { contrLogStatus, message } = values
                if (contrLogStatus === 1) {
                  employeeUpdatePersonaltable(newcontractdetl)
                  employeeUpdateQualificationTable(newcontractdetl)
                  employeeUpdateExpTable(newcontractdetl).then((values) => {
                    const { expeStatus, message } = values
                    if (expeStatus === 1) {
                      updateoldAttndanceDetail(attendancedetls, punchmast).then((values) => {
                        const { status, message } = values;
                        if (status === 1) {
                          updateArrearSalary(arreardetails).then((values) => {
                            if (olDataTocopy.dataTocopy.salaryinformation === true) {
                              employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((values) => {
                                const { status } = values
                                if (status === 1) {
                                  history.push(`/Home/Prfle/${id}/${no}/${0}`)
                                }
                              })
                            } else {
                              history.push(`/Home/Prfle/${id}/${no}/${0}`)
                            }
                          })
                        } else {
                          warningNofity(message)
                        }
                      })
                    } else {
                      warningNofity(message)
                    }
                  })
                } else {
                  warningNofity(message)
                }
              })
              //     /** 1 -> next category contain contract*/
            } else if (modelStatus === 1 && contstatus === 1) {
              employeeNewContractEntry(newcontractdetl).then((values) => {
                const { status } = values
                if (status === 1) {
                  employeeRecordUpdationMandatory(oldPersonalData).then((values) => {
                    const { contrLogStatus, message } = values
                    if (contrLogStatus === 1) {
                      employeeUpdatePersonaltable(newcontractdetl)
                      employeeUpdateQualificationTable(newcontractdetl)
                      employeeUpdateExpTable(newcontractdetl).then((values) => {
                        const { expeStatus, message } = values
                        if (expeStatus === 1) {
                          updateoldAttndanceDetail(attendancedetls, punchmast).then((values) => {
                            const { status, message } = values;
                            if (status === 1) {
                              updateArrearSalary(arreardetails).then((values) => {
                                if (olDataTocopy.dataTocopy.salaryinformation === true) {
                                  employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((values) => {
                                    const { status } = values
                                    if (status === 1) {
                                      history.push(`/Home/Prfle/${id}/${no}/${0}`)
                                    }
                                  })
                                } else {
                                  history.push(`/Home/Prfle/${id}/${no}/${0}`)
                                }
                              })
                            } else {
                              warningNofity(message)
                            }
                          })
                        }
                        else {
                          warningNofity(message)
                        }
                      })
                    }
                    else {
                      warningNofity(message)
                    }
                  })
                } else {
                  warningNofity("Error while adding new contract entry")
                }
              })
            }
          })
        } else {
          warningNofity("Error While Closing Contract")
        }
      }
    }
  }

  return (
    <Fragment>
      <ToastContainer />

      <Box sx={{
        display: "flex",
        flexGrow: 1,
        height: window.innerHeight - 85,
        width: "100%",
        flexDirection: 'column'
      }} >
        <Paper sx={{
          display: 'flex', flex: 1, p: 1,
          // bgcolor: 'pink',
          // justifyContent: 'space-between',
          // height: window.innerHeight - 85,
          flexDirection: 'column', overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
        }}>

          <Box sx={{ flex: 1 }}>
            <EXistContractDetl
              id={id}
              no={no}
              fine={fine}
              setFine={setFine}
              setgraceperiod={setgraceperiod}
              setattendanceDays={setattendanceDays}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AttendanceDetails
              id={id}
              no={no}
              em_cont_end={contractend}
              grace_period={graceperiod}
              attendanceDays={attendanceDays}
            // formData={formData}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <OldDatatoCopy
              id={id}
              no={no}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <RenewProcess
              em_cont_end={contractend}
              grace_period={graceperiod}
              newContract={newContract}
              updateNewContract={updateNewContract}
              emp_doj={doj}
              emp_retireDate={retirementdate}
              contractrenew={contractrenew}
              setContractrenew={setContractrenew}
              contractTpPermanent={contractTpPermanent}
              setcontractTpPermanent={setcontractTpPermanent}
            />
          </Box>
        </Paper>
        <Paper square elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 0, gap: 2 }} >
            <CssVarsProvider>
              <Tooltip title="Save" followCursor placement='top' arrow>
                <IconButton variant="outlined" size='xs' color="primary" onClick={RenewOldContract}  >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </CssVarsProvider>

            <CssVarsProvider>
              <Tooltip title="Close" followCursor placement='top' arrow>
                <IconButton variant="outlined" size='xs' color="danger" onClick={redirect}  >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </CssVarsProvider>
          </Box>
        </Paper >
      </Box>
    </Fragment >
  )
}

export default memo(ContractRenewalProcess) 