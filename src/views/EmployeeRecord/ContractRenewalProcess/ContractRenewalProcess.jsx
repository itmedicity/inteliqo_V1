import { Chip } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useMemo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, addYears, format, lastDayOfMonth } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';
import {
  employeeNewContractEntry,
  employeeRecordUpdationMandatory,
  employeeRecordUpdationUserChoice,
  employeeUpdateExpTable,
  employeeUpdatePersonaltable,
  employeeUpdateQualificationTable,
  updateArrearSalary,
  updateEmployeeMasterTable,
  updateoldAttndanceDetail
} from './Function/ContractFun';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { employeeNumber } from 'src/views/Constant/Constant';
import { getContractClosedata } from 'src/redux/reduxFun/reduxHelperFun';

const EXistContractDetl = React.lazy(() => import('./EXistContractDetl'))
const AttendanceDetails = React.lazy(() => import('./AttendanceDetails'))
const OldDatatoCopy = React.lazy(() => import('./OldDatatoCopy'))
const RenewProcess = React.lazy(() => import('./RenewProcess'))

const ContractRenewalProcess = () => {

  const { id, no } = useParams()
  const history = useHistory()

  const [doj, setDoj] = useState('')
  const [contractStartDate, setContractStartDate] = useState(moment(new Date()))
  const [contractEnddate, setContractEndDate] = useState(moment(new Date()))
  const [permanetDOJ, setPermanentDoj] = useState(moment(new Date()))
  const [retirementdate, setRetirementdate] = useState(moment(new Date()))
  const [updateSlno, setUpdateSlno] = useState(0)
  const [newCatgeory, setnewCategory] = useState(0)
  const [newDesign, setNewDesignation] = useState(0)
  const [contractend, setContractEnd] = useState('')
  const [contstatus, setContrstatus] = useState(0)//for setting contract status
  const [punchmast, setPunchMast] = useState([])
  const [dutyplanData, setDutyplanData] = useState([])
  const [email, setEmail] = useState('')
  const [contractrenew, setContractrenew] = useState(false)//checkbox state for contract renewal
  const [contractTpPermanent, setcontractTpPermanent] = useState(false)//checkbox state for contract permanent

  const [oldCategory, setOldCategory] = useState(0)
  const [oldContarctStatus, setOldContStatus] = useState(0)
  const [oldDesignation, setOldDesignation] = useState(0)


  const [fine, setFine] = useState(0)
  //const [contractstart, setContractStart] = useState('')
  const [graceperiod, setgraceperiod] = useState(0)


  //getting data to save
  const datatoSave = useSelector((state) => getContractClosedata(state))
  const datatooSave = useMemo(() => datatoSave, [datatoSave])
  const { attendancedetls, olDataTocopy, oldPersonalData, newCategory,
    newDesignation
  } = datatooSave

  //useEffect for setting new employee category
  useEffect(() => {
    setnewCategory(newCategory.newEmpcat)
    setNewDesignation(newDesignation.newEmpDesg)
  }, [newCategory, newDesignation])


  useEffect(() => {
    const getEmployeedetails = async () => {
      const result = await axioslogin.get(`/empmast/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        const { em_doj, em_contract_end_date, em_dob, em_email, contract_status, em_designation,
          em_category } = data[0]
        setDoj(em_doj)
        setContractEnd(em_contract_end_date)
        setRetirementdate(addYears(new Date(em_dob), 56))
        setEmail(em_email)
        setOldCategory(em_category)
        setOldContStatus(contract_status)
        setOldDesignation(em_designation)
      } else {
        setDoj('')
        setContractEnd('')
        setRetirementdate('')
        setEmail("")
        setOldCategory(0)
        setOldContStatus(0)
        setOldDesignation(0)
      }
    }
    getEmployeedetails()

  }, [id])


  //new contract details
  const [newContract, updateNewContract] = useState({
    newempId: "",
    permanentEmpNo: '',
  })
  const { newempId, permanentEmpNo, newdateofjoin } = newContract

  //getting new probation or training end details    
  useEffect(() => {
    const getCtaehoryDetl = async () => {
      if (newCatgeory > 0) {
        const result = await axioslogin.get(`/empcat/${newCatgeory}`)
        const { success, data } = result.data
        if (success === 1) {
          const { ecat_cont } = data[0]
          if (ecat_cont === 1) {
            setContrstatus(1)
          }
          else {
            setContrstatus(0)
          }
        }
        else {
          setContrstatus(0)
        }
      }
    }
    getCtaehoryDetl()
  }, [newCatgeory])



  useEffect(() => {
    const dutyplandata = async (id) => {
      const postdata = {
        em_no: id,
        from: contstatus === 1 && contractrenew === true ? moment(new Date(contractStartDate)).format('YYYY-MM-DD') : moment(new Date(permanetDOJ)).format('YYYY-MM-DD'),
        to: moment(lastDayOfMonth(new Date(contractStartDate))).format('YYYY-MM-DD')
      }

      const getDutyplan = {
        emp_id: no,
        start_date: contstatus === 1 && contractrenew === true ? moment(new Date(contractStartDate)).format('YYYY-MM-DD') : moment(new Date(permanetDOJ)).format('YYYY-MM-DD'),
        end_date: moment(lastDayOfMonth(new Date(contractStartDate))).format('YYYY-MM-DD')
      }
      const insertDutyPlainIntDB = await axioslogin.post("/plan", getDutyplan)
      const { success, data } = insertDutyPlainIntDB.data;
      if (success === 1) {
        const planslno = insertDutyPlainIntDB.data.data?.map(val => val.plan_slno)
        setDutyplanData(planslno)
        const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
        const { success, data } = result.data
        if (success === 1) {
          const punchslno = data?.map(val => val.punch_slno)
          setPunchMast(punchslno)
        } else {
          setPunchMast([])
        }
      } else {
        setDutyplanData([])
      }
    }
    dutyplandata(id)

  }, [id, no, contstatus, contractrenew, contractStartDate, newempId, permanentEmpNo, permanetDOJ])

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

  //update empmaster data
  const updateempMast = useMemo(() => {
    return {
      em_no: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
      em_category: newCatgeory,
      em_contract_end_date: contstatus === 1 && contractrenew === true ? format(new Date(contractEnddate), 'yyyy-MM-dd') : '2000-01-01',
      em_prob_end_date: '2000-01-31',
      em_id: no,
      probation_status: 0,
      contract_status: contstatus === 1 && contractrenew === true ? 1 : 0,
      em_doj: contstatus === 1 && contractrenew === true ? format(new Date(contractStartDate), 'yyyy-MM-dd') : moment(new Date(permanetDOJ)).format('YYYY-MM-DD'),
      actual_doj: doj,
      em_designation: newDesign,
      emp_slno: updateSlno,
      emp_no: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
      emp_id: no,
      emp_status: 1,
      emp_username: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
      emp_password: contstatus === 1 && contractrenew === true ? newempId : permanentEmpNo,
      emp_email: email,
      create_user: employeeNumber(),
      dutyplanData: dutyplanData,
      punchmast: punchmast,
      old_emno: id,
      old_cate: oldCategory,
      old_doj: doj,
      old_contracteEnd: contractend,
      oldContarctStatus: oldContarctStatus,
      oldDesignation: oldDesignation
    }
  }, [contstatus, contractrenew, newempId, permanentEmpNo, newCatgeory, permanetDOJ, newDesign,
    updateSlno, no, doj, email, newdateofjoin, contractEnddate, contractStartDate, dutyplanData,
    punchmast, id, oldCategory, contractend, oldContarctStatus, oldDesignation])

  //function for saving new contract
  const RenewOldContract = useCallback(async (e) => {
    e.preventDefault();
    if ((contractTpPermanent === true) && (newCatgeory === 0 || permanentEmpNo === '')) {
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
      const result = await axioslogin.post('/empmast/checkEmno/contracterenew', updateempMast)
      const { data } = result.data
      if (data.length !== 0) {
        warningNofity("Employee ID Already Exist")
      }
      else {
        const result = await axioslogin.patch('/empcontract/update/contract', updateempMast)
        const { success, message } = result.data
        if (success === 1) {
          const updateContractLogTable = await axioslogin.post('/empcontract/createcontractlog', oldPersonalData.personalData)
          if (updateContractLogTable.data.success === 1) {
            succesNofity("Contract Renewal Completed Successfully!")
            history.push(`/Home/Prfle/${id}/${no}/${0}`)
          }
          else {
            warningNofity(message)
          }
        } else {
          warningNofity(message)
        }

      }
    }
  }, [contractTpPermanent, newCatgeory, permanentEmpNo, updateempMast])




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





  // updateEmployeeMasterTable(updateempMast, no, updateSlno).then((messsage) => {
  //   const { modelStatus } = messsage;
  //   if (modelStatus === 1 && contstatus === 0) {
  //     employeeRecordUpdationMandatory(oldPersonalData).then((values) => {
  //       const { contrLogStatus, message } = values
  //       if (contrLogStatus === 1) {
  //         employeeUpdatePersonaltable(newcontractdetl)
  //         employeeUpdateQualificationTable(newcontractdetl)
  //         employeeUpdateExpTable(newcontractdetl).then((values) => {
  //           const { expeStatus, message } = values
  //           if (expeStatus === 1) {
  //             updateoldAttndanceDetail(attendancedetls, punchmast, dutyplanData).then((values) => {
  //               const { status, message } = values;
  //               if (status === 1) {
  //                 updateArrearSalary(arreardetails).then((values) => {
  //                   if (olDataTocopy.dataTocopy.salaryinformation === true) {
  //                     employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((values) => {
  //                       const { status } = values
  //                       if (status === 1) {
  //                         history.push(`/Home/Prfle/${id}/${no}/${0}`)
  //                       }
  //                     })
  //                   } else {
  //                     history.push(`/Home/Prfle/${id}/${no}/${0}`)
  //                   }
  //                 })
  //               } else {
  //                 warningNofity(message)
  //               }
  //             })
  //           } else {
  //             warningNofity(message)
  //           }
  //         })
  //       } else {
  //         warningNofity(message)
  //       }
  //     })
  //     /** 1 -> next category contain contract*/
  //   } else if (modelStatus === 1 && contstatus === 1) {
  //     console.log(newcontractdetl);
  //     employeeNewContractEntry(newcontractdetl).then((values) => {
  //       const { status } = values
  //       if (status === 1) {
  //         employeeRecordUpdationMandatory(oldPersonalData).then((values) => {
  //           const { contrLogStatus, message } = values
  //           if (contrLogStatus === 1) {
  //             employeeUpdatePersonaltable(newcontractdetl)
  //             employeeUpdateQualificationTable(newcontractdetl)
  //             employeeUpdateExpTable(newcontractdetl).then((values) => {
  //               const { expeStatus, message } = values
  //               if (expeStatus === 1) {
  //                 updateoldAttndanceDetail(attendancedetls, punchmast).then((values) => {
  //                   const { status, message } = values;
  //                   if (status === 1) {
  //                     updateArrearSalary(arreardetails).then((values) => {
  //                       if (olDataTocopy.dataTocopy.salaryinformation === true) {
  //                         employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((values) => {
  //                           const { status } = values
  //                           if (status === 1) {
  //                             history.push(`/Home/Prfle/${id}/${no}/${0}`)
  //                           }
  //                         })
  //                       } else {
  //                         history.push(`/Home/Prfle/${id}/${no}/${0}`)
  //                       }
  //                     })
  //                   } else {
  //                     warningNofity(message)
  //                   }
  //                 })
  //               }
  //               else {
  //                 warningNofity(message)
  //               }
  //             })
  //           }
  //           else {
  //             warningNofity(message)
  //           }
  //         })
  //       } else {
  //         warningNofity("Error while adding new contract entry")
  //       }
  //     })
  //   }
  // })



  return (
    <Fragment>
      <ToastContainer />
      <CustomLayout title="Employee Contract Renewal Process" displayClose={true} >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
            <EXistContractDetl
              id={id}
              no={no}
              fine={fine}
              setFine={setFine}
              setgraceperiod={setgraceperiod}
            />
            {/* </Box>
          <Box sx={{ flex: 1 }}> */}
            <AttendanceDetails
              id={id}
              no={no}
              em_cont_end={contractend}
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
              contractrenew={contractrenew}
              setContractrenew={setContractrenew}
              contractTpPermanent={contractTpPermanent}
              setcontractTpPermanent={setcontractTpPermanent}
              contractStartDate={contractStartDate}
              setContractStartDate={setContractStartDate}
              setContractEndDate={setContractEndDate}
              permanetDOJ={permanetDOJ}
              setPermanentDoj={setPermanentDoj}
              emp_retireDate={retirementdate}
              setRetirementdate={setRetirementdate}


              em_cont_end={contractend}
              grace_period={graceperiod}
              newContract={newContract}
              updateNewContract={updateNewContract}
              emp_doj={doj}



            />
          </Box>
          <Paper square elevation={0} sx={{ display: "flex", flexDirection: "column" }}   >
            <Box sx={{ display: 'flex', flexDirection: "row-reverse", mr: 2, mt: 0.5 }} >
              <Chip
                color="success"
                onClick={RenewOldContract}
                size="md"
                variant="outlined"
              >Save All Data
              </Chip>
            </Box>
          </Paper>
        </Box>
      </CustomLayout>





      {/* 
        
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
     */}
    </Fragment >
  )
}

export default memo(ContractRenewalProcess) 