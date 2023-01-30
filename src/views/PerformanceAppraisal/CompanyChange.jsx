import { addDays, compareAsc, lastDayOfYear, startOfYear, sub } from 'date-fns'
import React, { Fragment, useContext, useState, useEffect, memo, useMemo } from 'react'
import { useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory'
import EmployeeInstitutiontype from 'src/views/CommonCode/EmployeeInstitutiontype'
import { employeeNumber, getProcessserialnum, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import ModelLeaveProcess from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelLeaveProcess'
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Paper } from '@mui/material'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import IconButton from '@mui/joy/IconButton'
import moment from 'moment'
import DepartmentSelect from 'src/views/MuiComponents/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import TextInput from 'src/views/Component/TextInput'
import { useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action'
import _ from 'underscore'
import CommonAgGrid from '../Component/CommonAgGrid'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'
import CustomModel from '../MuiComponents/CustomModel'
import CommonCheckBox from '../Component/CommonCheckBox'
import { setPersonalData } from 'src/redux/actions/Profile.action'
import { es } from 'date-fns/locale'

const CompanyChange = ({ empid, setFlag, empno, display, name }) => {

    const history = useHistory();
    const { id, no } = useParams();
    const { selectBranchMast, updateBranchSelected,
        selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectInstiType, updateInstituteSeleted,
        getemployeecategory, udateemployeecategory, updateDeptSection,
        selectDesignation, updateDesignation
    } = useContext(PayrolMasterContext)
    //Employee Category set
    const [cat, setCat] = useState({
        catemp: ''
    })
    const [probationperiod, setProbationPeriod] = useState('');
    const [company, setcompany] = useState(0)//for setting old category
    const [designation, setdesignation] = useState(0)// for setting old desgination
    const [ineffectdate, setineffectdate] = useState('');//designation change date
    const [cateineffectdate, setCateineffectdate] = useState('')//category change date
    const [startdate, setstartdate] = useState('')//date of joining
    const [enddate, setenddate] = useState('')//probation or training end date
    const [trainingConfDate, setTrainingConfDate] = useState('')// training confirmation date
    const [probationconfDate, setProbationconfDate] = useState('')// probation confirmation date
    const [empcatory, setempcat] = useState(0)
    const [empstatus, setempStatus] = useState(0)
    const [probsataus, setProbstatus] = useState(0)// for setting probation status

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
        em_category: getemployeecategory
    })
    // use State foe serial number
    const [processslno, setprocessslno] = useState(0)
    // to open model ModelLeaveProcess consition
    const [modelvalue, setmodelvalue] = useState(0)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
    // set open model 
    const [open, setOpen] = useState(false);
    // current process details
    const [leaveprocessid, leaveprocessidupdate] = useState({
        hrm_calcu: 0,
        hrm_clv: 0,
        hrm_cmn: 0,
        hrm_ern_lv: 0,
        hrm_hld: 0,
        lv_process_slno: 0,
        category_slno: 0
    });
    // to open model leave  list
    const [modellist, setmodellist] = useState(false)
    const [count, setcount] = useState(0)
    // to check the annpual leave procee wheter ist from category change
    const [categorychge, setcategorychange] = useState(1)
    //for table data
    const [tabledata, setTableData] = useState();

    const [old_type, setOld_type] = useState(0)  //for seeting old emp_type
    const [new_type, setNew_type] = useState(0)  //for setting new emp_type

    const [cp_open, setcp_open] = useState(0)//for setting contract to permanent model open
    const [cp_message, setcp_message] = useState('')//for setting modal message

    const [extended_checkbox, setextended_checkbox] = useState(false)//probation extend date checkbox
    const [prob_extendDate, setprob_extendDate] = useState('')//probation extend date

    const [training_checkbox, setTraining_Checkbox] = useState(false)//training extended checkbox
    const [training_extendDate, settraining_extendDate] = useState('')//training extended date

    const [old_destype, setold_destype] = useState(0)// to get old des type
    const [old_cont_end_date, setOld_cont_end_date] = useState('')
    const [old_cont_conf_date, setOld_cont_conf_end_date] = useState('')//setting old contract confirmation date

    const [destype, setDestype] = useState(0)//for setting destype

    const [p_status, setp_status] = useState(0)
    const [p_startdate, setp_startdate] = useState('')
    const [p_enddate, setp_endadate] = useState('')

    //date for designation change date
    const getDate = useCallback((e) => {
        var startdate = e.target.value
        var ineffectdate = format(new Date(startdate), "yyyy-MM-dd")
        setineffectdate(ineffectdate)
        return (ineffectdate)
    }, [])

    //date for category change
    const getCateDate = useCallback((e) => {
        var startdate = e.target.value
        var cateineffectdate = format(new Date(startdate), "yyyy-MM-dd")
        setCateineffectdate(cateineffectdate)
        return (cateineffectdate)
    }, [])

    //training confirmation date
    const getTrainingDate = useCallback((e) => {
        var startdate = e.target.value
        var trainingConfDate = format(new Date(startdate), "yyyy-MM-dd")
        setTrainingConfDate(trainingConfDate)
        return (trainingConfDate)
    }, [])

    //probation confirmation date
    const getProbationDate = useCallback((e) => {
        var startdate = e.target.value
        var probationconfDate = format(new Date(startdate), "yyyy-MM-dd")
        setProbationconfDate(probationconfDate)
        return (probationconfDate)
    }, [])

    //probation extend date
    const getProbationExtendDate = useCallback((e) => {
        var startdate = e.target.value
        var prob_extendDate = format(new Date(startdate), "yyyy-MM-dd")
        setprob_extendDate(prob_extendDate)
        return (prob_extendDate)
    }, [])

    //training extend date
    const getTraingExtendDate = useCallback((e) => {
        var startdate = e.target.value
        var training_extendDate = format(new Date(startdate), "yyyy-MM-dd")
        settraining_extendDate(training_extendDate)
        return (training_extendDate)
    }, [])

    /** to get stored category values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCategory());
        dispatch(setPersonalData(em_id))
    }, [dispatch])

    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    //Employee contract status
    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)
    const { contract_status, em_prob_end_date, em_contract_end_date, em_doj } = state;

    const disp = useMemo(() => display, [display])
    const empname = useMemo(() => name, [name])


    useEffect(() => {

        //get current category employee type like permanent or contract
        if (company === getemployeecategory) {
            const arr = empCate && empCate.filter((val) => {
                if (val.category_slno === getemployeecategory) {
                    return val.emp_type
                }
            })
            const value = arr && arr.map((val) => {
                return val.emp_type
            })
            const value1 = arr && arr.map((val) => {
                return val.des_type
            })
            setold_destype(value1)
            setOld_type(value)
        }
        else {
            //get changed category employee type
            const arr = empCate && empCate.filter((val) => {
                if (val.category_slno === getemployeecategory) {
                    return val.emp_type
                }
            })
            const value = arr && arr.map((val) => {
                return val.emp_type
            })
            setNew_type(value)
        }
    }, [empCate, getemployeecategory, company])

    const em_no = useMemo(() => empno, [empno])
    const em_id = useMemo(() => empid, [empid])

    //Get data from clicked employee
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date,
                    em_dept_section, em_institution_type, em_category,
                    em_designation, em_doj, em_contract_end_date, em_conf_end_date } = data[0]
                const frm = {
                    catemp: em_category
                }
                setCat(frm)
                setProbationPeriod(em_prob_end_date)
                updateBranchSelected(em_branch)
                updateSelected(em_department === 0 ? 0 : em_department)
                updateDepartmentSection(em_dept_section)
                updateInstituteSeleted(em_institution_type)
                udateemployeecategory(em_category)
                updateDesignation(em_designation)
                setcompany(em_category)
                setdesignation(em_designation)
                setOld_cont_end_date(em_contract_end_date)
                setOld_cont_conf_end_date(em_conf_end_date)
                setp_startdate(em_doj)
                setp_endadate(em_prob_end_date)
                const result = await axioslogin.get(`/empcontract/contractByno/${em_no}`)
                if (result.data.success === 1) {
                    const { em_cont_start, em_prob_end_date } = result.data.data[0]
                    setstartdate(em_cont_start)
                    setenddate(em_prob_end_date)
                }
            }
        }
        getCompany()
        return () => {
            setCat('')
            setProbationPeriod('')
            updateBranchSelected(0)
            updateSelected(0)
            updateDepartmentSection(0)
            updateInstituteSeleted(0)
            udateemployeecategory(0)
            updateDesignation(0)
            setcompany(0)
            setdesignation(0)
            setstartdate('')
            setenddate('')
            setOld_cont_end_date('')
            setOld_cont_conf_end_date('')
        }
    }, [em_no])

    //back to list table
    const RedirectToHome = () => {
        setFlag(0)
    }

    //column for table view
    const [columnDef] = useState([
        { headerName: 'Update Date', field: 'ineffective_date' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Update User ', field: 'edit_user' },
    ])

    //Get Data from database
    useEffect(() => {
        const getDetails = async () => {
            const result = await axioslogin.get(`/common/getcompanylog/${em_no}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No update is done against this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getDetails();
    }, [em_no]);

    useEffect(() => {
        //if ((getemployeecategory !== cat.catemp) || (getemployeecategory !== 0)) {
        if (getemployeecategory !== 0) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empcat/${getemployeecategory}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { ecat_cont_period, ecat_prob_period, emp_type, ecat_cont, ecat_prob, des_type } = data[0]
                    setProbationPeriod(addDays(new Date, ecat_prob_period))
                    setempcat(emp_type)
                    setDestype(des_type)//setting category destype
                    if (ecat_cont === 1) {
                        setempStatus(1)
                    }
                    else {
                        setempStatus(0)
                    }
                    if (ecat_prob === 1) {
                        setProbstatus(1)
                    }
                    else {
                        setProbstatus(0)
                    }
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }
            }
            getEmpType()
        }
    }, [getemployeecategory, cat.catemp])

    //post Data for new entry hrm_emp_company_log && updating on hrm_emp_master
    const updateData = useMemo(() => {
        return {
            em_branch: selectBranchMast,
            em_department: selectedDept,
            em_dept_section: selectDeptSection,
            em_institution_type: selectInstiType,
            com_category: company,
            com_category_new: getemployeecategory,
            em_category: getemployeecategory,
            //em_prob_end_date: moment(probationperiod).format('YYYY-MM-DD'),
            contract_status: empstatus === 1 ? 1 : 0,
            probation_status: destype === 1 || destype === 2 ? probsataus : 0,
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
            em_id: empid,
            em_no: empno,
            com_designation: designation,
            com_designation_new: selectDesignation,
            em_designation: selectDesignation,
            //designation ineffect date
            ineffective_date: designation !== selectDesignation ? ineffectdate : null,
            //category ineffect date
            category_ineffect_date: company !== getemployeecategory ? cateineffectdate : null,
            //training con date for hrm_emp_company_log
            training_conf_date: disp === 1 && training_checkbox === false ? trainingConfDate : null,
            //probation con date for hrm_emp_company_log
            probation_conf_date: disp === 2 && extended_checkbox === false ? probationconfDate : null,
            //conf date for probation or training list
            em_conf_end_date: disp === 2 && extended_checkbox === false ? probationconfDate :
                disp === 1 && training_checkbox === false ? trainingConfDate : old_cont_conf_date,
            //training extend date for hrm_emp_company_log
            training_extend_date: disp === 1 && training_checkbox === true ? training_extendDate : null,
            //probation extend date for hrm_emp_company_log
            probation_extend_date: disp === 2 && extended_checkbox === true ? prob_extendDate : null,
            //setting probation end date on hrm_emp_matser when probation or training date extend
            em_prob_end_date: disp === 1 && training_checkbox !== false ? training_extendDate :
                disp === 2 && extended_checkbox === true ? prob_extendDate : p_enddate,
            em_cont_end: old_cont_end_date,
            em_cont_start: startdate
        }
    }, [selectBranchMast, selectedDept, selectInstiType, company, getemployeecategory,
        probationperiod, empstatus, probsataus, no, id, selectDesignation, designation,
        ineffectdate, selectDeptSection, cateineffectdate, trainingConfDate, probationconfDate,
        prob_extendDate, training_extendDate, disp, training_checkbox, extended_checkbox, em_prob_end_date, enddate, destype])

    const reset = () => {
        updateBranchSelected(0)
        updateSelected(0)
        updateDepartmentSection(0)
        updateInstituteSeleted(0)
        udateemployeecategory(0)
        updateDesignation(0)
        setineffectdate('')
        setCateineffectdate('')
    }

    //for leave process
    const postFormdata = useMemo(() => {
        return {
            em_no: em_no,
            em_id: em_id
        }
    }, [em_no, em_id])

    //update Data
    const submitCompany = async (e) => {
        e.preventDefault();
        //get current data allowed  leave based on category
        const getcategorydata = async () => {
            const result = await axioslogin.get(`/common/getannprocess/${em_id}`)
            const { data } = result.data
            setleavestate(data[0])
        }
        getcategorydata();

        const getdata = async () => {
            getProcessserialnum().then((val) => {
                setprocessslno(val)
            })

            // check the table where data present if present get the details process table
            const result = await axioslogin.post('/yearleaveprocess/', postFormdata)
            const { success, message } = result.data;
            const { category_slno, hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld,
                lv_process_slno, next_updatedate } = message[0]
            const dataprvleave = {
                hrm_calcu: hrm_calcu,
                hrm_clv: hrm_clv,
                hrm_cmn: hrm_cmn,
                hrm_ern_lv: hrm_ern_lv,
                hrm_hld: hrm_hld,
                category_slno: category_slno,
                lv_process_slno: lv_process_slno
            }

            // if no data available
            if (success === 0) {
                // if no data is present means new employee  set model
                setmodelvalue(1)
                setmodelmessage('Leave process is not done for the employee')
                setolddat(1)
                setOpen(true)
            }
            else if (success === 1) {
                leaveprocessidupdate(dataprvleave)
                // if employee process date has over 
                if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {
                    setOpen(true)
                    setmodelvalue(1)
                    setmodelmessage('Date Exceeded do you Want To Process')
                }
                else if (category_slno !== getemployeecategory) {

                    setmodelvalue(1)
                    setmodelmessage('Category Change Do You Want to  To Process')
                    setOpen(true)
                }
                // if process contain data and pending leave process is present
                else if (hrm_calcu === 0 || hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0) {
                    setmodellist(true)
                }
            }
        }

        //only designation change
        const getdatasub = async () => {
            const result = await axioslogin.post('/empmast/company', updateData)
            const { message, success } = result.data;
            if (success === 1) {
                getcategorydata()
                succesNofity(message);
                setcount(count + 1)
                reset()
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }

        //category change and leave process
        const getdatasub1 = async () => {
            const result = await axioslogin.post('/empmast/company', updateData)
            const { message, success } = result.data;
            if (success === 1 && contract_status === 1) {
                getcategorydata()
                //succesNofity(message);
                setcount(count + 1)
                getdata()
                reset()
                const result = await axioslogin.patch('/empmast/update/contractdetl', updateData);
                const { success, message } = result.data;
                if (success === 2) {
                    succesNofity(message)
                }
                else {
                    infoNofity(message)
                }
            } else if (success === 1 && contract_status === 0) {
                getcategorydata()
                //succesNofity(message);
                setcount(count + 1)
                getdata()
                reset()
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
        if (contract_status === 1) {
            if (old_destype[0] === 2 || old_destype[0] === 1 && old_type[0] !== 2 || new_type[0] !== 1) {
                getdatasub1()

            } //contract to permanent change
            else if (old_type[0] === 2 && new_type[0] === 1 && old_destype[0] === 1 || old_destype[0] === 2) {
                setcp_open(1)
                setOpen(true)
                setcp_message('Cannot Change Employee Category Contract to Permanent, Please Close Contract First!!')
            } else {
                warningNofity('Contract Employee Category Change Only Through Contract Process Window')
            }
        } else if (contract_status === 0) {
            //if the category is permanent+ probation
            getdatasub1()
        } else if (designation !== selectDesignation && ineffectdate === '') {
            infoNofity("Please Add Designation Change Date")
        } else if (designation !== selectDesignation && ineffectdate !== '') {
            getdatasub()
        } else if (company !== getemployeecategory && cateineffectdate === '') {
            infoNofity("Please Add Category Change Date")
        } else {
            getdatasub1()
        }
    }

    //useEffect for getting attendancde details to process earn leave
    const [attendanceata, setAttendanceData] = useState([])
    const year = moment(new Date()).format('YYYY')
    useEffect(() => {
        const postdata = {
            emp_id: em_id,
            startdate: moment(startOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
            endate: moment(lastDayOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
        }
        // const postdata = {
        //     emp_id: no,
        //     startdate: '2022-01-01',
        //     endate: '2022-12-30'
        // }
        // data based on the calculation of earn leave
        const getattendanceData = async () => {
            const result = await axioslogin.post('/yearleaveprocess/dataannualcalculationemp', postdata)
            const { success, data } = result.data;
            if (success === 2) {
                setAttendanceData(data[0])
            }
            else if (success === 2) {
                setAttendanceData([])
            }
            else {
                setAttendanceData([])
            }
        }
        getattendanceData()

    }, [no, year])

    const handleClose = () => {
        setmodellist(false)
    }

    //model close function
    const Close = () => {
        setOpen(false)
    }
    //probation extend checkbox value
    const getextendValue = useCallback((e) => {
        if (e.target.checked === true) {
            setextended_checkbox(true)
        }
        else {
            setextended_checkbox(false)
        }
    })

    //training extend checkbox value
    const gettraingCheckBox = useCallback((e) => {
        if (e.target.checked === true) {
            setTraining_Checkbox(true)
        }
        else {
            setTraining_Checkbox(false)
        }
    })

    return (
        <Fragment>
            {modelvalue === 1 ? <ModelLeaveProcess
                open={open}
                dataleave={leavestate} // {leaves available based on category}
                handleClose={handleClose}
                setOpen={setOpen}  //for open model
                id={em_no}//employee id
                no={em_id}//employee number
                valuemessage={modelmessage}//model message
                leaveprocessid={leaveprocessid} //current proceess details
                processslno={processslno}//processess serialno
                olddata={olddata}// check wheather new data
                setmodelvalue={setmodelvalue}
                categorychge={categorychge}
                nameel={attendanceata === undefined ? [] : attendanceata}
            /> : cp_open === 1 ? <CustomModel
                open={open}
                handleClose={Close}
                setOpen={setOpen}
                valuemessage={cp_message}
                sx={{
                    minWidth: 500,
                    maxWidth: 500
                }}
                Close={Close}
                closeMessage={'OK,Got It'}
            /> : null}
            <Box sx={{
                width: "100%",
                // height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >

                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* heading section start */}
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Company Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={RedirectToHome}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* heading section end */}


                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1, pl: 20, fontWeight: 500, }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Employee Number : {em_no}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, fontWeight: 500, }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Employee Name : {empname}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Paper square elevation={3} sx={{
                        p: 0.5, mt: 0.5, display: 'flex', alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                            {/* First row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", px: 20, width: "100" }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Branch Name
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <BrnachMastSelection style={SELECT_CMP_STYLE} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Department Name
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <DepartmentSelect style={SELECT_CMP_STYLE} />
                                </Box>
                            </Box>
                            {/* first row end */}

                            {/* second row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", px: 20, width: "100%", pt: 0.5 }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Department Section Name
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Employee Institution
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <EmployeeInstitutiontype style={SELECT_CMP_STYLE} />
                                </Box>
                            </Box>
                            {/* second row end */}
                            {/* third row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", px: 20, width: "100%", pt: 0.5 }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Designation
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <DesignationMast style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Designation Change Date
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="Date"
                                        min={new Date()}
                                        value={ineffectdate}
                                        name="ineffectdate"
                                        //disabled={Toggle === 1 ? false : true}
                                        changeTextValue={(e) => {
                                            getDate(e)
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* third row end */}
                            {/* fourth row start */}
                            <Box sx={{
                                display: "flex", flexDirection: "row", px: 20, pt: 0.5, width: "100%"
                            }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Employee Category
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }}>
                                    <EmployeeCategory style={SELECT_CMP_STYLE} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Category Change Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="Date"
                                        min={new Date()}
                                        value={cateineffectdate}
                                        name="cateineffectdate"
                                        //disabled={true}
                                        changeTextValue={(e) => {
                                            getCateDate(e)
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* fourth row end */}

                            {/* fourth row start */}
                            {
                                disp === 1 ? <Box sx={{
                                    display: "flex", flexDirection: "row", px: 20, pt: 0.5, width: "100%"
                                }}>
                                    <Box sx={{ width: "20%", fontWeight: 500, }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                Training Start Date : {old_type[0] === 2 ? startdate : startdate}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ width: "20%", pl: 0.5, fontWeight: 500, }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                Training End Date :{old_type[0] === 2 ? p_enddate : p_enddate}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ width: "20%", pl: 0.5 }}>
                                        <CommonCheckBox
                                            label="Extend Date"
                                            name="training_checkbox"
                                            value={training_checkbox}
                                            checked={training_checkbox}
                                            onChange={(e) => gettraingCheckBox(e)}
                                        />
                                    </Box>
                                    {
                                        training_checkbox === true ? <Box sx={{
                                            display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                        }}>
                                            <Box sx={{ width: "50%" }}>
                                                <CssVarsProvider>
                                                    <Typography textColor="text.secondary" >
                                                        Training Extend Date
                                                    </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ width: "50%" }}>
                                                <TextInput
                                                    type="date"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Date"
                                                    min={new Date()}
                                                    value={training_extendDate}
                                                    name="training_extendDate"
                                                    //disabled={true}
                                                    changeTextValue={(e) => {
                                                        getTraingExtendDate(e)
                                                    }}
                                                />
                                            </Box>
                                        </Box> : <Box sx={{
                                            display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                        }}>
                                            <Box sx={{ width: "50%" }}>
                                                <CssVarsProvider>
                                                    <Typography textColor="text.secondary" >
                                                        Training confirmation Date
                                                    </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ width: "50%" }}>
                                                <TextInput
                                                    type="date"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Date"
                                                    min={new Date()}
                                                    value={trainingConfDate}
                                                    name="trainingConfDate"
                                                    //disabled={true}
                                                    changeTextValue={(e) => {
                                                        getTrainingDate(e)
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    }

                                </Box>
                                    : display === 2 ? <Box sx={{
                                        display: "flex", flexDirection: "row", px: 20, pt: 0.5, width: "100%"
                                    }}>
                                        <Box sx={{ width: "20%", fontWeight: 500, }}>
                                            <CssVarsProvider>
                                                <Typography textColor="text.secondary" >
                                                    Probation Start Date : {old_type[0] === 2 ? startdate : p_startdate}
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ width: "20%", pl: 0.5, fontWeight: 500, }}>
                                            <CssVarsProvider>
                                                <Typography textColor="text.secondary" >
                                                    Probation End Date :{old_type[0] === 2 ? p_enddate : p_enddate}
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ width: "20%", pl: 0.5 }}>
                                            <CommonCheckBox
                                                label="Extend Date"
                                                name="extended_checkbox"
                                                value={extended_checkbox}
                                                checked={extended_checkbox}
                                                onChange={(e) => getextendValue(e)}
                                            />
                                        </Box>
                                        {
                                            extended_checkbox === true ? <Box sx={{
                                                display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                            }}>
                                                <Box sx={{ width: "50%" }}>
                                                    <CssVarsProvider>
                                                        <Typography textColor="text.secondary" >
                                                            Probation Extend Date
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Box sx={{ width: "50%" }}>
                                                    <TextInput
                                                        type="date"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Date"
                                                        min={new Date()}
                                                        value={prob_extendDate}
                                                        name="prob_extendDate"
                                                        //disabled={true}
                                                        changeTextValue={(e) => {
                                                            getProbationExtendDate(e)
                                                        }}
                                                    />
                                                </Box>
                                            </Box> : <Box sx={{
                                                display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                            }}>
                                                <Box sx={{ width: "50%" }}>
                                                    <CssVarsProvider>
                                                        <Typography textColor="text.secondary" >
                                                            Probation Confirmation Date
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Box sx={{ width: "50%" }}>
                                                    <TextInput
                                                        type="date"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Date"
                                                        min={new Date()}
                                                        value={probationconfDate}
                                                        name="probationconfDate"
                                                        //disabled={true}
                                                        changeTextValue={(e) => {
                                                            getProbationDate(e)
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        }
                                    </Box> : null
                            }

                            {/* fourth row start */}

                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tabledata}
                            sx={{ height: 400, width: "100%" }} rowHeight={30} headerHeight={30} />
                    </Paper>
                </Paper>
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })}
                                onClick={submitCompany}
                            >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(CompanyChange)