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
//import { format } from 'date-fns'
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Paper } from '@mui/material'
import CompanyInformationTable from './CompanyInformationTable'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import IconButton from '@mui/joy/IconButton'
import moment from 'moment'
// import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSelect from 'src/views/MuiComponents/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import TextInput from 'src/views/Component/TextInput'
import { useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from 'src/redux/actions/Category.Action'
import _ from 'underscore'

const CompanyInformtion = () => {
    //const history = useHistory()
    const { id, no } = useParams();
    const { selectBranchMast, updateBranchSelected,
        selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectInstiType, updateInstituteSeleted,
        getemployeecategory, udateemployeecategory, updateDeptSection, getDeptSection,
        selectDesignation, updateDesignation
    } = useContext(PayrolMasterContext)

    // to check the annpual leave procee wheter ist from category change
    const [categorychge, setcategorychange] = useState(1)
    const [count, setcount] = useState(0)
    const [company, setcompany] = useState(0)
    // to open model ModelLeaveProcess consition
    const [modelvalue, setmodelvalue] = useState(0)
    // to open model leave  list
    const [modellist, setmodellist] = useState(false)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    // use State foe serial number
    const [processslno, setprocessslno] = useState(0)
    // set open model 
    const [open, setOpen] = useState(false);
    // current process details

    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
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
    //Employee Category set
    const [cat, setCat] = useState({
        catemp: ''
    })
    //Employee Type and Designation Type Set
    const [empstatus, setempStatus] = useState(0)
    const [probsataus, setProbstatus] = useState(0)
    const [probationperiod, setProbationPeriod] = useState(0);

    const [ineffectdate, setineffectdate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [designation, setdesignation] = useState(0)
    const [empcatory, setempcat] = useState(0)


    /** to get stored category values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCategory());
    }, [dispatch])

    /** to get employee category details from redux */
    // const empCate = useSelector((state) => state.getEmployeeCategory.empCategory || 0, _.isEqual)

    //Get data
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date,
                    em_dept_section, em_institution_type, em_category,
                    em_designation } = data[0]
                const frm = {
                    catemp: em_category
                }
                setCat(frm)
                setProbationPeriod(em_prob_end_date)
                updateBranchSelected(em_branch)
                updateSelected(em_department)
                updateDepartmentSection(em_dept_section)
                updateInstituteSeleted(em_institution_type)
                udateemployeecategory(em_category)
                updateDesignation(em_designation)
                setcompany(em_category)
                setdesignation(em_designation)
            }
        }
        getCompany()
    }, [id, updateBranchSelected, updateSelected, selectedDept, updateDepartmentSection, updateDeptSection, updateInstituteSeleted, udateemployeecategory, updateDesignation])


    useEffect(() => {
        if ((getemployeecategory !== cat.catemp) && (getemployeecategory !== 0)) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empcat/${getemployeecategory}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { ecat_cont_period, ecat_prob_period, emp_type } = data[0]
                    setProbationPeriod(addDays(new Date, ecat_prob_period))
                    setempcat(emp_type)
                    if (ecat_cont_period > 0) {
                        setempStatus(1)
                    }
                    if (ecat_prob_period > 1) {
                        setProbstatus(1)
                    }
                }

                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }
            }
            getEmpType()
        }
    }, [getemployeecategory, cat.catemp])

    const getDate = useCallback((e) => {
        var startdate = e.target.value
        var ineffectdate = format(new Date(startdate), "yyyy-MM-dd")
        setineffectdate(ineffectdate)
        return (ineffectdate)
    }, [])

    //post Data
    const updateData = useMemo(() => {
        return {
            em_branch: selectBranchMast,
            em_department: selectedDept,
            em_dept_section: selectDeptSection,
            em_institution_type: selectInstiType,
            com_category: company,
            com_category_new: getemployeecategory,
            em_category: getemployeecategory,
            em_prob_end_date: moment(probationperiod).format('YYYY-MM-DD'),
            contract_status: empstatus === 1 ? 1 : 0,
            probation_status: probsataus === 1 ? 1 : 0,
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
            em_id: no,
            em_no: id,
            com_designation: designation,
            com_designation_new: selectDesignation,
            em_designation: selectDesignation,
            ineffective_date: ineffectdate
        }
    }, [selectBranchMast, selectedDept, selectInstiType, company, getemployeecategory,
        probationperiod, empstatus, probsataus, no, id, selectDesignation, designation,
        ineffectdate, selectDeptSection])

    const reset = () => {
        updateBranchSelected(0)
        updateSelected(0)
        updateDepartmentSection(0)
        updateInstituteSeleted(0)
        udateemployeecategory(0)
        updateDesignation(0)
        setineffectdate(format(new Date(ineffectdate), "yyyy-MM-dd"))
    }

    const postFormdata = useMemo(() => {
        return {
            em_no: no,
            em_id: id
        }
    }, [no, id])

    //Employee State
    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)
    const { contract_status, em_contract_end_date } = state;

    //update Data
    const submitCompany = async (e) => {
        e.preventDefault();

        if (contract_status === 1) {
            warningNofity('Contract Employee Category Change Only Through Contract Process Window')
        } else {

            // get current data allowed  leave based on category
            const getcategorydata = async () => {
                const result = await axioslogin.get(`/common/getannprocess/${no}`)
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
            const result = await axioslogin.post('/empmast/company', updateData)
            const { message, success } = result.data;
            if (success === 1) {
                getcategorydata()
                succesNofity(message);
                setcount(count + 1)
                getdata()
                reset()
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }


        }


    }


    //useEffect for getting attendancde details to process earn leave
    const [attendanceata, setAttendanceData] = useState([])
    const year = moment(new Date()).format('YYYY')
    useEffect(() => {
        const postdata = {
            emp_id: no,
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
    //Redirect
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home/Profile/${id}/${no}`)
    // }

    const handleClose = () => {
        setmodellist(false)
    }

    return (
        <Fragment>
            {modelvalue === 1 ? <ModelLeaveProcess
                open={open}
                dataleave={leavestate} // {leaves available based on category}
                handleClose={handleClose}
                setOpen={setOpen}  //for open model
                id={id}//employee id
                no={no}//employee number
                valuemessage={modelmessage}//model message
                leaveprocessid={leaveprocessid} //current proceess details
                processslno={processslno}//processess serialno
                olddata={olddata}// check wheather new data
                setmodelvalue={setmodelvalue}
                categorychge={categorychge}
                nameel={attendanceata === undefined ? [] : attendanceata}
            /> : null}
            <Box sx={{
                width: "100%",
                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >

                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* heading section start */}
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Company Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* heading section end */}

                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5,
                        }}>

                            {/* First row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                                width: "100"
                            }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Branch Name
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <BrnachMastSelection
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Department Name
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <DepartmentSelect
                                        style={SELECT_CMP_STYLE} />
                                </Box>
                            </Box>
                            {/* first row end */}

                            {/* second row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                                width: "100%",
                                pt: 0.5
                            }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Department Section Name
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <DepartmentSectionSelect
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Employee Institution
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <EmployeeInstitutiontype
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Box>
                            </Box>
                            {/* second row end */}


                            {/* third row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                                width: "100%",
                                pt: 0.5
                            }}>
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
                                            Date
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
                                        changeTextValue={(e) => {
                                            getDate(e)
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* third row end */}



                            {/* fourth row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                                pt: 0.5,
                                width: "100%"
                            }}>
                                <Box sx={{ width: "20%" }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Employee Category
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>

                                <Box sx={{ width: "80%" }}>
                                    <EmployeeCategory
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Box>
                            </Box>
                            {/* fourth row end */}

                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        //alignItems: "center",
                        //flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        //backgroundColor: "lightcyan",
                        flexDirection: "column"

                    }} >
                        <CompanyInformationTable update={count} />
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
                            })} onClick={submitCompany} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(CompanyInformtion)