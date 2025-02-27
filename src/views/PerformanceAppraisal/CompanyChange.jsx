import React, { Fragment, useState, useEffect, memo, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { Button, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Paper } from '@mui/material'
import IconButton from '@mui/joy/IconButton'
import { useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import CommonAgGrid from '../Component/CommonAgGrid'
import CloseIcon from '@mui/icons-material/Close';
import CommonCheckBox from '../Component/CommonCheckBox'
import JoyBranchSelect from '../MuiComponents/JoyComponent/JoyBranchSelect'
import JoyDepartment from '../MuiComponents/JoyComponent/JoyDepartment'
import JoyDepartmentSection from '../MuiComponents/JoyComponent/JoyDepartmentSection'
import JoyInstitutionSelect from '../MuiComponents/JoyComponent/JoyInstitutionSelect'
import JoyDesignationSelect from '../MuiComponents/JoyComponent/JoyDesignationSelect'
import moment from 'moment'
//import JoyCategorySelect from '../MuiComponents/JoyComponent/JoyCategorySelect'
import SaveIcon from '@mui/icons-material/Save';
import { setDepartment } from 'src/redux/actions/Department.action'
import PermannetCategorySelect from '../MuiComponents/PermannetCategorySelect'

const CompanyChange = ({ empid, setFlag, empno, display, name }) => {

    const em_no = useMemo(() => empno, [empno])
    const em_id = useMemo(() => empid, [empid])
    const disp = useMemo(() => display, [display])
    const empname = useMemo(() => name, [name])

    const [branch, setBranch] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [institute, setInstitute] = useState(0)
    const [empDesignation, setEmpDesignation] = useState(0)
    const [empcategory, setEmpCategory] = useState(0)
    const [company, setcompany] = useState(0)//for setting old category
    const [designation, setdesignation] = useState(0)// for setting old desgination
    const [ineffectdate, setineffectdate] = useState('');//designation change date
    const [cateineffectdate, setCateineffectdate] = useState('')//category change date
    const [probationconfDate, setProbationconfDate] = useState('')// probation confirmation date
    const [empstatus, setempStatus] = useState(0)
    const [count, setcount] = useState(0)
    const [tabledata, setTableData] = useState();
    const [extended_checkbox, setextended_checkbox] = useState(false)//probation extend date checkbox
    const [prob_extendDate, setprob_extendDate] = useState('')//probation extend date

    const [old_cont_end_date, setOld_cont_end_date] = useState('')
    const [old_cont_conf_date, setOld_cont_conf_end_date] = useState('')//setting old contract confirmation date

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

    /** to get stored category values from redux */
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    //Get data from clicked employee
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date,
                    em_dept_section, em_institution_type, em_category,
                    em_designation, em_doj, em_contract_end_date, em_conf_end_date } = data[0]
                setBranch(em_branch)
                setDept(em_department === 0 ? 0 : em_department)
                setDeptSection(em_dept_section === 0 ? 0 : em_dept_section)
                setInstitute(em_institution_type)
                setEmpCategory(em_category)
                setEmpDesignation(em_designation)
                setcompany(em_category)
                setdesignation(em_designation)
                setp_startdate(em_doj)
                setOld_cont_end_date(em_contract_end_date)
                setOld_cont_conf_end_date(em_conf_end_date)
                setp_endadate(em_prob_end_date)
            }
        }
        getCompany()
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
                setTableData([])
            } else {
                setTableData([])
            }
        }
        getDetails();
    }, [em_no, count]);

    useEffect(() => {
        if (empcategory !== 0) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empcat/${empcategory}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { emp_type } = data[0]
                    if (emp_type === 1) {
                        setempStatus(1)
                    } else {
                        setempStatus(0)
                    }
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }
            }
            getEmpType()
        }
    }, [empcategory])

    //post Data for new entry hrm_emp_company_log && updating on hrm_emp_master
    const updateData = useMemo(() => {
        return {
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSection,
            em_institution_type: institute,
            com_category: company,
            com_category_new: empcategory,
            em_category: empcategory,
            //em_prob_end_date: moment(probationperiod).format('YYYY-MM-DD'),
            contract_status: 0,
            probation_status: 0,
            create_user: employeeIdNumber(),
            edit_user: employeeIdNumber(),
            em_id: em_id,
            em_no: empno,
            com_designation: designation,
            com_designation_new: empDesignation,
            em_designation: empDesignation,
            //designation ineffect date
            ineffective_date: designation !== empDesignation ? ineffectdate : null,
            //category ineffect date
            category_ineffect_date: company !== empcategory ? cateineffectdate : null,
            //training con date for hrm_emp_company_log
            //training_conf_date: disp === 1 && training_checkbox === false ? trainingConfDate : null,
            //probation con date for hrm_emp_company_log
            probation_conf_date: disp === 2 && extended_checkbox === false ? probationconfDate : null,
            //conf date for probation or training list
            em_conf_end_date: disp === 2 && extended_checkbox === false ? probationconfDate : old_cont_conf_date,
            //training extend date for hrm_emp_company_log
            //training_extend_date: disp === 1 && training_checkbox === true ? training_extendDate : null,
            //probation extend date for hrm_emp_company_log
            probation_extend_date: disp === 2 && extended_checkbox === true ? prob_extendDate : null,
            //setting probation end date on hrm_emp_matser when probation or training date extend
            em_prob_end_date: disp === 2 && extended_checkbox === true ? prob_extendDate : p_enddate,
            em_cont_end: old_cont_end_date,
            // em_cont_start: startdate
        }
    }, [branch, dept, institute, company, empcategory, empno, old_cont_conf_date, em_id,
        empDesignation, designation, ineffectdate, deptSection, cateineffectdate,
        probationconfDate, prob_extendDate, disp,
        extended_checkbox, old_cont_end_date, p_enddate])

    //probation extend checkbox value
    const getextendValue = useCallback((e) => {
        if (e.target.checked === true) {
            setextended_checkbox(true)
        } else {
            setextended_checkbox(false)
        }
    }, [])

    const submitCompany = useCallback(async (e) => {
        if (empstatus === 0) {
            warningNofity("Please Change Employee Category  to Permanent!!")
        } else if (designation !== empDesignation && ineffectdate === '') {
            infoNofity("Please Add Designation Change Date")
        } else if (company !== empcategory && cateineffectdate === '') {
            infoNofity("Please Add Category Change Date")
        }
        else {
            const result = await axioslogin.post('/empmast/company', updateData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setcount(count + 1)

            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [updateData, cateineffectdate, empDesignation, empcategory, count, company, designation,
        ineffectdate, empstatus])

    return (
        <Fragment>
            <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* heading section start */}
                    <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                            <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                                <Box sx={{ display: "flex" }}>
                                    <DragIndicatorOutlinedIcon />
                                    <CssVarsProvider>
                                        <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                            Probation Confirmation
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color="danger"
                                            onClick={RedirectToHome}
                                            sx={{ color: '#ef5350' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                    {/* heading section end */}
                    <Paper variant='outlined' square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1, pl: 20, fontWeight: 500, }} >
                            <Typography textColor="text.secondary" >
                                Employee Number : {em_no}
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1, fontWeight: 500, }}>
                            <Typography textColor="text.secondary" >
                                Employee Name : {empname}
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper square elevation={0} sx={{
                        p: 0.5, mt: 0.5, display: 'flex', alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                            {/* First row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100" }}>
                                <Box sx={{ width: "20%" }}>
                                    <Typography textColor="text.secondary" >
                                        Branch Name
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <JoyBranchSelect value={branch} setValue={setBranch} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <Typography textColor="text.secondary" >
                                        Department Name
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <JoyDepartment deptValue={dept} getDept={setDept} />
                                </Box>
                            </Box>
                            {/* first row end */}

                            {/* second row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 0.5 }}>
                                <Box sx={{ width: "20%" }}>
                                    <Typography textColor="text.secondary" >
                                        Department Section Name
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <JoyDepartmentSection sectValues={deptSection} getSection={setDeptSection} dept={dept} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <Typography textColor="text.secondary" >
                                        Employee Institution
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <JoyInstitutionSelect value={institute} setValue={setInstitute} />
                                </Box>
                            </Box>
                            {/* second row end */}
                            {/* third row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 0.5 }}>
                                <Box sx={{ width: "20%" }}>
                                    <Typography textColor="text.secondary" >
                                        Designation
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <JoyDesignationSelect desgValue={empDesignation} getDesg={setEmpDesignation} />
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <Typography textColor="text.secondary" >
                                        Designation Change Date
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <Input
                                        type="date"
                                        slotProps={{
                                            input: {
                                                min: moment(new Date(p_enddate)).format('YYYY-MM-DD'),
                                            },
                                        }}
                                        value={ineffectdate}
                                        name="ineffectdate"
                                        onChange={(e) => getDate(e)}
                                    />
                                </Box>
                            </Box>
                            {/* third row end */}
                            {/* fourth row start */}
                            <Box sx={{
                                display: "flex", flexDirection: "row", pt: 0.5, width: "100%"
                            }}>
                                <Box sx={{ width: "20%" }}>
                                    <Typography textColor="text.secondary" >
                                        Employee Category
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }}>
                                    <PermannetCategorySelect
                                        disable={false}
                                        value={empcategory}
                                        setValue={setEmpCategory}
                                    />
                                    {/* / <JoyCategorySelect value={empcategory} setValue={setEmpCategory} /> */}
                                </Box>
                                <Box sx={{ width: "20%", pl: 0.5 }}>
                                    <Typography textColor="text.secondary" >
                                        Category Change Date
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%" }} >
                                    <Input
                                        type="date"
                                        slotProps={{
                                            input: {
                                                min: moment(new Date(p_enddate)).format('YYYY-MM-DD'),
                                            },
                                        }}
                                        value={cateineffectdate}
                                        name="cateineffectdate"
                                        onChange={(e) => getCateDate(e)}
                                    />
                                </Box>
                            </Box>
                            {/* fourth row end */}

                            {/* fourth row start */}
                            {
                                disp === 2 ? <Box sx={{
                                    display: "flex", flexDirection: "row", mt: 0.5, width: "100%"
                                }}>
                                    <Box sx={{ width: "20%", fontWeight: 500, }}>
                                        <Typography textColor="text.secondary" >

                                            Probation Start Date :  {p_startdate}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "20%", pl: 0.5, fontWeight: 500, }}>
                                        <Typography textColor="text.secondary" >
                                            Probation End Date :{p_enddate}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "20%", pl: 0.5 }}>
                                        <CommonCheckBox
                                            label="Extend Date"
                                            name="extended_checkbox"
                                            // value={extended_checkbox}
                                            checked={extended_checkbox}
                                            onChange={(e) => getextendValue(e)}
                                        />
                                    </Box>
                                    {
                                        extended_checkbox === true ? <Box sx={{
                                            display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                        }}>
                                            <Box sx={{ width: "50%" }}>
                                                <Typography textColor="text.secondary" >
                                                    Probation Extend Date
                                                </Typography>
                                            </Box>
                                            <Box sx={{ width: "50%" }}>
                                                <Input
                                                    type="date"
                                                    slotProps={{
                                                        input: {
                                                            min: moment(new Date(p_enddate)).format('YYYY-MM-DD'),
                                                        },
                                                    }}
                                                    value={prob_extendDate}
                                                    name="prob_extendDate"
                                                    onChange={(e) => getProbationExtendDate(e)}
                                                />
                                            </Box>
                                        </Box> : <Box sx={{
                                            display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                        }}>
                                            <Box sx={{ width: "50%" }}>
                                                <Typography textColor="text.secondary" >
                                                    Probation Confirmation Date
                                                </Typography>
                                            </Box>
                                            <Box sx={{ width: "50%" }}>
                                                <Input
                                                    type="date"
                                                    slotProps={{
                                                        input: {
                                                            min: moment(new Date(p_enddate)).format('YYYY-MM-DD'),
                                                        },
                                                    }}
                                                    value={probationconfDate}
                                                    name="probationconfDate"
                                                    onChange={(e) => getProbationDate(e)}
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
                    <Tooltip title="Save" followCursor placement='top' arrow>
                        <Box sx={{ display: "flex", pr: 1 }}>
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                onClick={submitCompany}
                            >
                                <SaveIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(CompanyChange)