import { Box, Button, Input, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from '../../Axios/Axios'
import JoyBranchSelect from '../../MuiComponents/JoyComponent/JoyBranchSelect'
import DepartmentSelect from 'src/views/MuiComponents/JoyComponent/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/MuiComponents/JoyComponent/DepartmentSectionSelect'
import InputComponent from '../../MuiComponents/JoyComponent/InputComponent'
import InstitutionSelect from '../../MuiComponents/InstitutionSelect'
import { format } from 'date-fns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import DesignationSelectComp from '../../MuiComponents/JoyComponent/DesignationSelectComp'
import PermannetCategorySelect from '../../MuiComponents/PermannetCategorySelect'
import CommonCheckBox from '../../Component/CommonCheckBox'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from '../../Component/CommonAgGrid'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const CategoryChangeComponent = ({ empno }) => {
    const em_no = useMemo(() => empno, [empno])

    const [empid, setEmpid] = useState(0)
    const [branch, setBranch] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [institute, setInstitute] = useState(0)
    const [empDesignation, setEmpDesignation] = useState(0)
    const [empcategory, setEmpCategory] = useState(0)
    const [emp_no, setEmp_no] = useState(0)
    const [em_name, setEm_name] = useState('')

    const [p_startdate, setp_startdate] = useState(new Date())
    const [p_enddate, setp_endadate] = useState(new Date())

    const [ineffectdate, setineffectdate] = useState(new Date());//designation change date
    const [cateineffectdate, setCateineffectdate] = useState(new Date())//category change date
    const [extended_checkbox, setextended_checkbox] = useState(false)//probation extend date checkbox

    const [prob_extendDate, setprob_extendDate] = useState(new Date())//probation extend date
    const [probationconfDate, setProbationconfDate] = useState(new Date())// probation confirmation date

    const [oldCate, setOldCate] = useState(0)
    const [oldDesg, setOldDesg] = useState(0)

    //Get data from clicked employee
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date, em_name, em_id,
                    em_dept_section, em_institution_type, em_category, em_no,
                    em_designation, em_doj } = data[0]
                setEmp_no(em_no !== undefined ? em_no : 0)
                setEm_name(em_name !== undefined ? em_name : '')
                setBranch(em_branch !== undefined ? em_branch : 0)
                setDept(em_department === undefined ? 0 : em_department)
                setDeptSection(em_dept_section === undefined ? 0 : em_dept_section)
                setInstitute(em_institution_type !== undefined ? em_institution_type : 0)
                setEmpCategory(em_category !== undefined ? em_category : 0)
                setEmpDesignation(em_designation !== undefined ? em_designation : 0)
                setOldCate(em_category)
                setOldDesg(em_designation)
                setp_startdate(em_doj)
                setEmpid(em_id)
                // setOld_cont_end_date(em_contract_end_date)
                // setOld_cont_conf_end_date(em_conf_end_date)
                setp_endadate(em_prob_end_date)
            }
        }
        getCompany()
    }, [em_no])

    //post Data for new entry hrm_emp_company_log && updating on hrm_emp_master
    const updateData = useMemo(() => {
        return {
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSection,
            em_institution_type: institute,
            com_category: oldCate,
            com_category_new: empcategory,
            em_category: empcategory,
            contract_status: 0,
            probation_status: extended_checkbox === true ? 1 : 0,
            create_user: employeeIdNumber(),
            edit_user: employeeIdNumber(),
            em_id: empid,
            em_no: emp_no,
            com_designation: oldDesg,
            com_designation_new: empDesignation,
            ineffective_date: oldDesg !== empDesignation ? format(new Date(ineffectdate), "yyyy-MM-dd") : '2000-01-31',
            category_ineffect_date: oldCate !== empcategory ? format(new Date(cateineffectdate), "yyyy-MM-dd") : '2000-01-31',
            probation_conf_date: extended_checkbox === false ? format(new Date(probationconfDate), "yyyy-MM-dd") : '2000-01-31',
            probation_extend_date: extended_checkbox === true ? format(new Date(prob_extendDate), "yyyy-MM-dd") : '2000-01-31',
            em_prob_end_date: extended_checkbox === true ? format(new Date(prob_extendDate), "yyyy-MM-dd") : '2000-01-31',
            em_designation: empDesignation,
            //em_conf_end_date: extended_checkbox === false ? probationconfDate : old_cont_conf_date,

        }
    }, [branch, dept, institute, oldCate, empcategory, empid, emp_no, prob_extendDate, empDesignation,
        oldDesg, ineffectdate, deptSection, cateineffectdate, probationconfDate, prob_extendDate,
        extended_checkbox])


    const submitCompany = useCallback(async () => {
        if (oldDesg !== empDesignation && ineffectdate === '') {
            warningNofity("Please Add Designation Change Date")
        } else if (oldCate !== empcategory && cateineffectdate === '') {
            warningNofity("Please Add Category Change Date")
        }
        else {
            const result = await axioslogin.post('/empmast/company', updateData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                //setcount(count + 1)

            } else if (success === 0) {
                warningNofity(message.sqlMessage);
            } else {
                warningNofity(message)
            }
        }
    }, [updateData, oldDesg, empDesignation, ineffectdate, oldCate, empcategory, cateineffectdate])


    //column for table view
    const [columnDef] = useState([
        { headerName: 'Update Date', field: 'ineffective_date' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Update User ', field: 'edit_user' },
    ])

    return (
        <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
            <Paper square elevation={2} >
                <Paper square elevation={0} sx={{
                    p: 0.5, mt: 0.5, display: 'flex', alignItems: "center",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                }} >
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100" }}>
                            <Box sx={{ width: "20%", my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }}  >
                                    Employee Name
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Employee Number"
                                    value={em_name}
                                    disabled={true}
                                />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5, my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Employee Number
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <InputComponent
                                    type="number"
                                    size="sm"
                                    placeholder="Employee Number"
                                    value={emp_no}
                                    disabled={true}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100" }}>
                            <Box sx={{ width: "20%", my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }}  >
                                    Branch Name
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <JoyBranchSelect value={branch} setValue={setBranch} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5, my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Department Name
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DepartmentSelect value={dept} setValue={setDept} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ width: "20%", my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Department Section Name
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DepartmentSectionSelect value={deptSection} setValue={setDeptSection} dept={dept} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5, my: 1 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Employee Institution
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <InstitutionSelect value={institute} setValue={setInstitute} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ width: "20%" }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }}>
                                    Designation
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DesignationSelectComp value={empDesignation} setValue={setEmpDesignation} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }}>
                                    Designation Change Date
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat='dd/MM/yyyy'
                                        minDate={new Date(p_enddate)}
                                        value={ineffectdate}
                                        onChange={(newValue) => {
                                            setineffectdate(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5, width: "100%" }}>
                            <Box sx={{ width: "20%" }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Employee Category
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }}>
                                <PermannetCategorySelect
                                    disable={false}
                                    value={empcategory}
                                    setValue={setEmpCategory}
                                />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <Typography textColor="text.secondary" sx={{ fontWeight: 500, }} >
                                    Category Change Date
                                </Typography>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat='dd/MM/yyyy'
                                        minDate={new Date(p_enddate)}
                                        value={cateineffectdate}
                                        onChange={(newValue) => {
                                            setCateineffectdate(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 0.5, width: "100%" }}>
                            <Box sx={{ width: "20%", fontWeight: 500, }}>
                                <Typography textColor="text.secondary"  >
                                    Probation Start Date :{format(new Date(p_startdate), 'dd-MM-yyyy')}
                                </Typography>
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5, fontWeight: 500, }}>
                                <Typography textColor="text.secondary" >
                                    Probation End Date :{format(new Date(p_enddate), 'dd-MM-yyyy')}
                                </Typography>
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CommonCheckBox
                                    label="Extend Date"
                                    name="extended_checkbox"
                                    checked={extended_checkbox}
                                    onChange={(e) => setextended_checkbox(e.target.checked)}
                                />
                            </Box>
                            {
                                extended_checkbox === true ? <Box sx={{
                                    display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                }}>
                                    <Box sx={{ width: "50%", fontWeight: 500 }}>
                                        <Typography textColor="text.secondary" >
                                            Probation Extend Date
                                        </Typography>
                                    </Box>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            inputFormat='dd/MM/yyyy'
                                            minDate={new Date(p_enddate)}
                                            value={prob_extendDate}
                                            onChange={(newValue) => {
                                                setprob_extendDate(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box> : <Box sx={{
                                    display: "flex", flexDirection: "row", pt: 0.5, width: "40%"
                                }}>
                                    <Box sx={{ width: "50%", fontWeight: 500 }}>
                                        <Typography textColor="text.secondary" >
                                            Probation Confirmation Date
                                        </Typography>
                                    </Box>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            inputFormat='dd/MM/yyyy'
                                            minDate={new Date(p_enddate)}
                                            value={probationconfDate}
                                            onChange={(newValue) => {
                                                setProbationconfDate(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Paper >
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        //  tableData={tabledata}
                        sx={{ height: 400, width: "100%" }} rowHeight={30} headerHeight={30} />
                </Paper>
            </Paper>
            <Paper square sx={{
                backgroundColor: "#F8F8F8",
                display: "flex",
                flexDirection: "row", mt: 0.5
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
    )
}

export default memo(CategoryChangeComponent) 