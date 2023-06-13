import { CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { addDays, format } from 'date-fns'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { setInstitution } from 'src/redux/actions/InstitutionType.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import TextInput from 'src/views/Component/TextInput'
import BranchSelectRedux from 'src/views/MuiComponents/BranchSelectRedux'
import CategorySelectRedux from 'src/views/MuiComponents/CategorySelectRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux'
import InstitutionTypeSelectRedux from 'src/views/MuiComponents/InstitutionTypeSelectRedux'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { ToastContainer } from 'react-toastify'
import moment from 'moment'
import { employeeNumber } from 'src/views/Constant/Constant'
import { useDispatch, useSelector } from 'react-redux'

const CompanyInfoPage = ({ emno, empid }) => {

    const empNo = useMemo(() => emno, [emno]);
    const empId = useMemo(() => empid, [empid])

    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [branch, setBranch] = useState(0)
    const [institute, setInstitute] = useState(0)
    const [designation, setDesignation] = useState(0)
    const [category, setCategory] = useState(0)
    const [oldCate, setOldCategory] = useState(0)
    const [oldDesg, setoldDesg] = useState(0)

    const [ineffectdate, setineffectdate] = useState('');
    const [cateineffectdate, setCateineffectdate] = useState('')

    const [empstatus, setempStatus] = useState(0)
    const [probsataus, setProbstatus] = useState(0)
    const [contractStatus, setContractStatus] = useState(0)

    const [probationperiod, setProbationPeriod] = useState('');
    const [oldprob_end_date, setProb_end_date] = useState('')

    const [contractend, setContractEnd] = useState('')
    const [oldContractEnd, setOldContractEnd] = useState('')

    const [emptype, setEmptype] = useState(0)
    const [oldemptype, setoldEmptype] = useState(0)

    const [desgtype, setDesgtype] = useState(0)
    const [oldDesgtype, setOldDesgType] = useState(0)

    const getDate = useCallback((e) => {
        var startdate = e.target.value
        var ineffectdate = format(new Date(startdate), "yyyy-MM-dd")
        setineffectdate(ineffectdate)
        return (ineffectdate)
    }, [])

    const getCateDate = useCallback((e) => {
        var startdate = e.target.value
        var cateineffectdate = format(new Date(startdate), "yyyy-MM-dd")
        setCateineffectdate(cateineffectdate)
        return (cateineffectdate)
    }, [])

    const [columnDef] = useState([
        { headerName: 'Update Date', field: 'ineffective_date' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Update User ', field: 'edit_user' },
    ])

    //Get data
    useEffect(() => {
        const getCompany = async (empNo) => {
            const result = await axioslogin.get(`/common/getcompanydetails/${empNo}`)
            const { success, data } = result.data
            if (success === 1) {
                console.log(data);
                const { em_branch, em_department, em_prob_end_date,
                    em_dept_section, em_institution_type, em_category,
                    em_designation, contract_status, em_contract_end_date } = data[0]
                setBranch(em_branch === null ? 0 : em_branch)
                setDept(em_department === null ? 0 : em_department)
                setDeptSection(em_dept_section === null ? 0 : em_dept_section)
                setInstitute(em_institution_type === null ? 0 : em_institution_type)
                setCategory(em_category === null ? 0 : em_category)
                setOldCategory(em_category === null ? 0 : em_category)
                setDesignation(em_designation === null ? 0 : em_designation)
                setoldDesg(em_designation === null ? 0 : em_designation)
                setProbationPeriod(em_prob_end_date === null ? '' : em_prob_end_date)
                setProb_end_date(em_prob_end_date === null ? '' : em_prob_end_date)
                setOldContractEnd(em_contract_end_date === null ? '' : em_contract_end_date)
                setContractStatus(contract_status)

            } else {
                setBranch(0)
                setDept(0)
                setDeptSection(0)
                setInstitution(0)
                setCategory(0)
                setOldCategory(0)
                setDesignation(0)
                setProbationPeriod(0)
            }
        }
        getCompany(empNo)
    }, [empNo])

    useEffect(() => {
        if ((category !== oldCate) && (category !== 0)) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empcat/${category}`)
                const { success, data } = result.data
                if (success === 1) {
                    console.log(data);
                    const { ecat_cont_period, ecat_prob_period, emp_type, des_type } = data[0]
                    setEmptype(emp_type)
                    setDesgtype(des_type)
                    setProbationPeriod(addDays(new Date, ecat_prob_period))
                    if (ecat_cont_period > 0) {
                        setempStatus(1)
                    } else {
                        setempStatus(0)
                    }
                    if (ecat_prob_period > 1) {
                        setProbstatus(1)
                    } else {
                        setProbstatus(0)
                    }
                }
                else {
                    warningNofity(" Category doesn't Exist")
                }
            }
            getEmpType()
        } else {
            const getOldEmptype = async () => {
                const result = await axioslogin.get(`/empcat/${oldCate}`)
                const { success, data } = result.data
                if (success === 1) {
                    console.log(data);
                    const { ecat_cont_period, ecat_prob_period, emp_type, des_type } = data[0]
                    setoldEmptype(emp_type)
                    setOldDesgType(des_type)
                } else {
                    setoldEmptype(0)
                    setOldDesgType(0)
                }
            }
            getOldEmptype()
        }
    }, [category, oldCate])

    const today = moment(new Date()).format('YYYY-MM-DD');

    const updateData = useMemo(() => {
        return {
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSection,
            em_institution_type: institute,
            com_category: oldCate,
            com_category_new: category,
            em_category: category,
            em_prob_end_date: moment(probationperiod).format('YYYY-MM-DD') === today ? cateineffectdate : moment(probationperiod).format('YYYY-MM-DD'),
            contract_status: empstatus === 1 ? 1 : 0,
            probation_status: probsataus === 1 ? 1 : 0,
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
            em_id: empId,
            em_no: empNo,
            com_designation: oldDesg,
            com_designation_new: designation,
            em_designation: designation,
            ineffective_date: oldDesg !== designation ? ineffectdate : null,
            category_ineffect_date: oldCate !== category ? cateineffectdate : null
        }
    }, [branch, dept, institute, category, oldCate,
        probationperiod, empstatus, probsataus, empNo, empId, designation, oldDesg,
        ineffectdate, deptSection, cateineffectdate, today])



    const submitCompany = async () => {
        console.log(oldprob_end_date);
        console.log(updateData);
        console.log(oldDesg, designation)
        console.log(oldCate, category);

        console.log("new", emptype, desgtype)
        console.log("old", oldemptype, oldDesgtype);

        if (oldDesg !== designation && ineffectdate === '') {
            warningNofity("Fill the Designation With Effective Date")
        } else if (oldCate !== category && cateineffectdate === '') {
            warningNofity("Fill the Employee Category With Effective Date")
        }
        else {
            if (oldemptype === 2 && emptype === 1) {
                warningNofity("Cannot Change Employee Category Contract to Permanent, Please Close Contract First!!")
            } else if (oldemptype === 1 && emptype === 2) {
                warningNofity("Cannot Change Employee Category Permanent to Contract")
            } else {
                if (oldContractEnd > today) {
                    warningNofity("Cannot change Category contract end date exceeded")
                } else {

                }

            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{
                width: "100%",
                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper square elevation={3} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", width: "100" }} >
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100" }}>
                            <Box sx={{ width: "20%" }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Branch Name
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <BranchSelectRedux value={branch} setValue={setBranch} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Department Name
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DeptSelectByRedux value={dept} setValue={setDept} />
                            </Box>
                        </Box>
                        {/* first row end */}

                        {/* second row start */}
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 0.5 }}>
                            <Box sx={{ width: "20%" }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Department Section Name
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DeptSecSelectByRedux dept={dept} value={deptSection} setValue={setDeptSection} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Employee Institution
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <InstitutionTypeSelectRedux value={institute} setValue={setInstitute} />
                            </Box>
                        </Box>
                        {/* second row end */}
                        {/* third row start */}
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 0.5 }}>
                            <Box sx={{ width: "20%" }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Designation
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <DesignationSelectRedux value={designation} setValue={setDesignation} />
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
                                    changeTextValue={(e) => {
                                        getDate(e)
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* third row end */}

                        {/* fourth row start */}
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5, width: "100%" }}>
                            <Box sx={{ width: "20%" }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Employee Category
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }}>
                                <CategorySelectRedux value={category} setValue={setCategory} />
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
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        //tableData={nameList}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30} />
                </Paper>
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' onClick={submitCompany} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default CompanyInfoPage