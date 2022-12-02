import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import TextInput from 'src/views/Component/TextInput';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import EXistContractDetl from './EXistContractDetl';
import AttendanceDetails from './AttendanceDetails';
import Old_dataTo_copy from './Old_dataTo_copy';
import Renew_Process from './Renew_Process';
import { addDays, format } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import ModelOldDataToCopy from './ModelOldDataToCopy';
import ModelLeaveProcess from '../EmployeeFile/EmpFileComponent/ModelLeaveProcess';
import { getProcessserialnum } from 'src/views/Constant/Constant';
import { useDispatch } from 'react-redux';
import { setEmployeeProcessDetail } from 'src/redux/actions/EmployeeLeaveProcessDetl';
import moment from 'moment';
import _ from 'underscore';
import { employeeNewContractEntry, employeeRecordUpdationMandatory, employeeRecordUpdationUserChoice, updateArrearSalary, updateEmployeeMasterTable, updateoldAttndanceDetail } from './Function/ContractFun';
import { setPersonalData } from 'src/redux/actions/Profile.action';

const ContractRenewalProcess = () => {
  const { id, no } = useParams()
  const history = useHistory()
  const dispatch = useDispatch();
  //useState for fine
  const [probationperiod, setProbationPeriod] = useState(0)
  const [fine, setFine] = useState(0)
  const [disable, setDisable] = useState(false)
  const [contractstart, setContractStart] = useState(0)
  const [contractend, setContractEnd] = useState(0)
  const [graceperiod, setgraceperiod] = useState(0)
  const [attendanceDays, setattendanceDays] = useState(0)
  const [newCatgeory, setnewCategory] = useState(0)
  const [oldCategory, setOldctaegory] = useState(0)
  // to open model ModelLeaveProcess consition
  const [modelvalue, setmodelvalue] = useState(0)
  // use State foe serial number
  const [processslno, setprocessslno] = useState(0)
  const [castable, setcastable] = useState(0)
  const [nodatacl, setnodatacl] = useState(0)
  const [nodatahl, setnodatahl] = useState(0)
  const [nodatael, setnodatael] = useState(0)
  const [nodatafixed, setnodatafixed] = useState(0)
  //  data based on employeee category
  const [leavestate, setleavestate] = useState({
    ecat_cl: 0,
    ecat_confere: 0,
    ecat_cont: 0,
    ecat_doff_allow: 0,
    ecat_el: 0,
    ecat_esi_allow: 0,
    ecat_fh: 0,
    ecat_lop: 0,
    ecat_mate: 0,
    ecat_nh: 0,
    ecat_prob: 0,
    ecat_woff_allow: 0,
    ecat_sl: 0,
    em_category: 0,
    em_doj: ''
  })
  const { ecat_cl, ecat_el, ecat_esi_allow,
    ecat_lop, ecat_mate, ecat_nh, ecat_sl, em_category
  } = leavestate

  const [open, setOpen] = useState(false)
  const [openleavemodel, setOpenModel] = useState(false)
  const [probsataus, setProbstatus] = useState(0)// for setting probation status
  const [contstatus, setContrstatus] = useState(0)//for setting contract status
  const [attendanceata, setAttendanceData] = useState([])

  const [contractrenew, setContractrenew] = useState(false)//checkbox state for contract renewal
  const [contractTpPermanent, setcontractTpPermanent] = useState(false)//checkbox state for contract permanent

  useEffect(() => {
    dispatch(setPersonalData(no))
  }, [dispatch, no])

  // to get employee's date of join, contract end date, retiremnt date
  const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)
  const { em_doj, em_contract_end_date, em_retirement_date } = state

  //getting data to save
  const datatoSave = useSelector((state) => {
    return state.getContractClosedata
  })
  const { contractclose, attendancedetls, arreardetails, olDataTocopy, oldPersonalData, newCategory
  } = datatoSave

  //useEffect for setting new employee category
  useEffect(() => {
    setnewCategory(newCategory.newEmpcat)
  }, [newCategory.newEmpcat])

  useEffect(() => {
    const getLeavedetails = async () => {
      const result = await axioslogin.get(`/common/getannprocess/${no}`)
      const { data } = result.data
      setleavestate(data[0])
    }
    getLeavedetails();
    getProcessserialnum().then((val) => {
      setprocessslno(val)
    }
    )
    // Get the Employee Joinng / Contract / category Details ( All Date Detail )
    dispatch(setEmployeeProcessDetail(id))

    return (
      dispatch(setEmployeeProcessDetail(id))
    )
  }, [newCatgeory])


  //function for open leave model
  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseModel = () => {
    setmodelvalue(0)
    setOpenModel(false)
  }

  //new contract details
  const [newContract, updateNewContract] = useState({
    newempId: "",
    newcontractstart: format(new Date(), 'yyyy-MM-dd'),
    newcontractend: format(new Date(), 'yyyy-MM-dd'),
    permanentEmpNo: '',
    newdateofjoin: format(new Date(), 'yyyy-MM-dd'),
  })
  const { newempId, newcontractstart, newcontractend, permanentEmpNo, newdateofjoin } = newContract

  //login employee number
  const empno = useSelector((state) => {
    //return state.getProfileData.ProfileData[0]
    return state.getProfileData.ProfileData[0].em_no
    //const status = state.getProfileData.lodingStatus
  })

  //new entry contract details
  const newcontractdetl = {
    em_no: newempId,
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
    em_contract_end_date: contstatus === 1 && contractrenew === true ? newcontractend : em_contract_end_date,
    em_prob_end_date: contstatus === 1 && contractrenew === true ? moment(addDays(new Date(newcontractstart), probationperiod)).format('YYYY-MM-DD') : moment(addDays(new Date(newdateofjoin), probationperiod)).format('YYYY-MM-DD'),
    em_id: no,
    probation_status: probsataus === 1 ? 1 : 0,
    contract_status: contstatus === 1 && contractrenew === true ? 1 : 0,
    em_doj: contstatus === 0 && contractrenew === false ? newdateofjoin : em_doj,
    actual_doj: em_doj
  }

  const checkemid = {
    em_no: newempId
  }

  //for closing window
  const redirect = async () => {
    history.push('/Home/Contract_end_details')
  }

  //useEffect for getting attendancde details to process earn leave
  useEffect(() => {
    const postdata = {
      emp_id: no,
      startdate: moment(new Date(contractstart)).format('YYYY-MM-DD'),
      endate: moment(new Date(contractend)).format('YYYY-MM-DD'),
    }
    // data based on the calculation of earn leave
    const getattendanceData = async () => {
      const result = await axioslogin.post('/yearleaveprocess/dataannualcalculationemp', postdata)
      const { success, data } = result.data;
      if (success === 2) {
        setAttendanceData(data[0])
      }
      else if (success == 2) {
        setAttendanceData([])
      }
      else {
        setAttendanceData([])
      }
    }
    getattendanceData()

  }, [no])

  //function for saving new contract
  const RenewOldContract = async (e) => {
    e.preventDefault();
    if (Object.keys(contractclose.contCloseData).length === 0) {
      infoNofity("Please Close The First Contract")
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
          updateoldAttndanceDetail(attendancedetls).then((values) => {
            const { status, message } = values;
            if (status === 1) {
              updateArrearSalary(arreardetails).then((values) => {
                const { status, message } = values;
                if (status === 1) {
                  updateEmployeeMasterTable(updateempMast, no, oldCategory, newCatgeory, newempId, empno).then((messsage) => {
                    const { modelStatus, openStatus, disableStatus } = messsage;
                    if (modelStatus === 1 && contstatus === 0) {
                      employeeRecordUpdationMandatory(newcontractdetl, oldPersonalData).then((message) => {
                        if (olDataTocopy.dataTocopy.salaryinformation === true) {
                          employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((message) => {
                            if (status === 1) {
                              setmodelvalue(1)
                              setOpenModel(true)
                              setDisable(false)
                            }
                          })
                        } else {
                          setmodelvalue(1)
                          setOpenModel(true)
                          setDisable(false)
                        }
                      })
                      /** 1 -> next category contain contract
                  */
                    } else if (modelStatus === 1 && contstatus === 1) {
                      employeeNewContractEntry(newcontractdetl).then((message) => {
                        if (status === 1) {
                          employeeRecordUpdationMandatory(newcontractdetl, oldPersonalData).then((message) => {
                            if (olDataTocopy.dataTocopy.salaryinformation === true) {
                              employeeRecordUpdationUserChoice(newcontractdetl, oldPersonalData).then((message) => {
                                if (status === 1) {
                                  setmodelvalue(1)
                                  setOpenModel(true)
                                  setDisable(false)
                                }
                              })
                            } else {
                              setmodelvalue(1)
                              setOpenModel(true)
                              setDisable(false)
                            }
                          })
                        } else {
                          warningNofity("Error while adding new contract entry")
                        }

                      })

                    }
                  })
                } else {
                  warningNofity("Error While closing Contract")
                }
              })
            }
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <ToastContainer />
      {modelvalue === 1 && open === false ? <ModelLeaveProcess
        open={openleavemodel}
        dataleave={leavestate} // {Allowed Leaves based on category}
        handleClose={handleCloseModel}
        setOpen={setOpen}  //for open model
        id={newempId}//employee id
        no={no}//employee number
        valuemessage={'Category Change You Want To Process Leave'}//model message
        leaveprocessid={0} //current proceess details from the 
        processslno={processslno}//processess serialno
        olddata={1}// check value === 1 then this is the new process and 0 is not a new process
        setcastable={setcastable}//casual leave table rerender
        setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
        setnodatael={setnodatael} //dataset render  for rerendering the earnleave
        setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
        setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
        setmodelvalue={setmodelvalue}
        nameel={attendanceata === undefined ? [] : attendanceata}
      /> : null}
      {open === true ? <ModelOldDataToCopy open={open} handleClose={handleClose} /> : null}
      <Box sx={{ width: "100%" }}>
        <Paper square elevation={2} sx={{ p: 0.5, flexDirection: "row" }} >
          <EXistContractDetl
            id={id}
            no={no}
            fine={fine}
            setFine={setFine}
            setContractEnd={setContractEnd}
            setContractStart={setContractStart}
            setgraceperiod={setgraceperiod}
            setattendanceDays={setattendanceDays}
            setOldctaegory={setOldctaegory}
          />

          {/*attendance details */}
          <Paper square elevation={3} sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
          }}  >
            <AttendanceDetails
              id={id}
              no={no}
              em_cont_end={contractend}
              grace_period={graceperiod}
              attendanceDays={attendanceDays}
            // formData={formData}
            />
          </Paper>
          {/* old Contract details top copy */}
          <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
            <Old_dataTo_copy
              id={id}
              no={no}
            />
          </Paper>
          {/* conntract renew process */}
          <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
            <Box sx={{ p: 1, display: "flex" }} >
              <CssVarsProvider>
                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" sx={{ flex: 2 }}>
                  Employee Renewal / Confirmation Process
                </Typography>
              </CssVarsProvider>
            </Box>
            {/* Contract renew process */}
            <Renew_Process
              em_cont_end={contractend}
              grace_period={graceperiod}
              newContract={newContract}
              updateNewContract={updateNewContract}
              emp_doj={em_doj}
              emp_retireDate={em_retirement_date}
              contractrenew={contractrenew}
              setContractrenew={setContractrenew}
              contractTpPermanent={contractTpPermanent}
              setcontractTpPermanent={setcontractTpPermanent}
            />
          </Paper>
          <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
            <Box sx={{ flex: 0 }} >
              <IconButton variant="outlined" size='sm' onClick={RenewOldContract}
                disabled={disable}
              >
                <LibraryAddCheckOutlinedIcon color='primary' />
              </IconButton>
              <IconButton variant="outlined" size='sm' onClick={redirect}>
                <CssVarsProvider>
                  <DisabledByDefaultOutlinedIcon color='primary' />
                </CssVarsProvider>
              </IconButton>
            </Box>
          </Paper >
        </Paper >
      </Box >
    </Fragment >
  )
}

export default ContractRenewalProcess