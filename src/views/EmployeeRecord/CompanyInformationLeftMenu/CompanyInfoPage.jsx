import { CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { addDays, format, } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { setInstitution } from 'src/redux/actions/InstitutionType.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { ToastContainer } from 'react-toastify'
import moment from 'moment'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import CloseIcon from '@mui/icons-material/Close';
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection'
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import JoyInstitutionSelect from 'src/views/MuiComponents/JoyComponent/JoyInstitutionSelect'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import JoyCategorySelect from 'src/views/MuiComponents/JoyComponent/JoyCategorySelect'
import ContractConfirmationModal from './ContractConfirmationModal'
import PermanentConfirationModal from './PermanentConfirationModal'

const CompanyInfoPage = ({ emno, empid, setOpen }) => {


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

    const [probationperiod, setProbationPeriod] = useState('');
    const [count, setCount] = useState(0)
    const [data, setTableData] = useState();
    const [emname, setEmname] = useState('')
    const [newcontract_status, setNewContract_status] = useState(0)
    const [oldContractStatus, setOldContractStatus] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [permanentModal, setPermanentMoal] = useState(false)

    const [doj, setDoj] = useState('')


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

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

    //Get Data
    useEffect(() => {
        const getTable = async (empNo) => {
            const result = await axioslogin.get(`/common/getcompanylog/${empNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No update is done against this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getTable(empNo);
    }, [empNo, count]);

    //Get data
    useEffect(() => {
        const getCompany = async (empNo) => {
            const result = await axioslogin.get(`/common/getcompanydetails/${empNo}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date,
                    em_dept_section, em_institution_type, em_category,
                    em_designation, em_name, em_doj } = data[0]
                setBranch(em_branch === null ? 0 : em_branch)
                setDept(em_department === null ? 0 : em_department)
                setDeptSection(em_dept_section === null ? 0 : em_dept_section)
                setInstitute(em_institution_type === null ? 0 : em_institution_type)
                setCategory(em_category === null ? 0 : em_category)
                setOldCategory(em_category === null ? 0 : em_category)
                setDesignation(em_designation === null ? 0 : em_designation)
                setoldDesg(em_designation === null ? 0 : em_designation)
                setProbationPeriod(em_prob_end_date === null ? '' : em_prob_end_date)
                setDoj(em_doj)
                setEmname(em_name)

            } else {
                setBranch(0)
                setDept(0)
                setDeptSection(0)
                setInstitution(0)
                setCategory(0)
                setOldCategory(0)
                setDesignation(0)
                setProbationPeriod('')
            }
        }
        getCompany(empNo)
    }, [empNo])

    const state = useSelector((state) => state?.getCommonSettings,)
    const commonSetting = useMemo(() => state, [state])
    const { external_trainee } = commonSetting;

    useEffect(() => {
        if ((category !== oldCate) && (category !== 0)) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empcat/${category}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { ecat_cont_period, ecat_prob_period, ecat_cont } = data[0]
                    setNewContract_status(ecat_cont)
                    // setEmptype(emp_type)
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
        } else if (oldCate !== 0) {
            const getOldEmptype = async () => {
                const result = await axioslogin.get(`/empcat/${oldCate}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { ecat_cont } = data[0]
                    setOldContractStatus(ecat_cont)
                } else {
                    setOldContractStatus(0)
                }
            }
            getOldEmptype()
        }
    }, [category, oldCate])

    const updateData = useMemo(() => {
        return {
            em_doj: (external_trainee === oldCate) && (oldCate !== category) ? cateineffectdate : doj,
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSection,
            em_institution_type: institute,
            com_category: oldCate,
            com_category_new: category,
            em_category: category,
            em_prob_end_date: probsataus === 1 ? moment(probationperiod).format('YYYY-MM-DD') : '2000-01-31',
            contract_status: empstatus === 1 ? 1 : 0,
            probation_status: probsataus === 1 ? 1 : 0,
            create_user: employeeIdNumber(),
            edit_user: employeeIdNumber(),
            em_id: empId,
            em_no: empNo,
            com_designation: oldDesg,
            com_designation_new: designation,
            em_designation: designation,
            ineffective_date: oldDesg !== designation ? ineffectdate : null,
            category_ineffect_date: oldCate !== category ? cateineffectdate : null,
            // em_cont_start: cateineffectdate,
            // em_cont_end: cateineffectdate !== null ? format(addDays(new Date(cateineffectdate), 365), 'yyyy-MM-dd') : null,
            // em_prob_end_date: '2000-01-01',
            em_conf_end_date: cateineffectdate,
            // status: 0
        }
    }, [branch, dept, institute, category, oldCate, external_trainee, doj,
        probationperiod, empstatus, probsataus, empNo, empId, designation, oldDesg,
        ineffectdate, deptSection, cateineffectdate])



    const submitCompany = useCallback(async () => {

        if (oldDesg !== designation && ineffectdate === '') {
            warningNofity("Fill the Designation With Effective Date")
        } else if (oldCate !== category && cateineffectdate === '') {
            warningNofity("Fill the Employee Category With Effective Date")
        } else if (oldContractStatus === 1 && newcontract_status === 0) {
            warningNofity("Cannot Change Employee Category Contract to Permanent, Please Close Contract First!!")
        } else if (oldContractStatus === 0 && newcontract_status === 1) {
            setOpenModal(true)
        } else if (oldContractStatus === 1 && newcontract_status === 1) {
            setOpenModal(true)
        }
        else {
            setPermanentMoal(true)

        }
    }, [oldDesg, designation, ineffectdate, cateineffectdate, newcontract_status,
        oldContractStatus, category, oldCate,])

    const close = useCallback(async () => {
        setOpen(0)
    }, [setOpen])

    return (
        <Fragment>
            <ToastContainer />
            <ContractConfirmationModal open={openModal} data={updateData} setOpen={setOpenModal}
                count={count} setCount={setCount} />
            <PermanentConfirationModal open={permanentModal} data={updateData} setOpen={setPermanentMoal}
                count={count} setCount={setCount} />
            <Box sx={{
                width: "100%",
                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper variant='outlined' square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                    <Box sx={{ flex: 1, pl: 20, fontWeight: 500, }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary" >
                                Employee Number : {empNo}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, fontWeight: 500, }}>
                        <CssVarsProvider>
                            <Typography textColor="text.secondary" >
                                Employee Name : {emname}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", width: "100" }} >
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
                                <JoyBranchSelect value={branch} setValue={setBranch} />
                            </Box>
                            <Box sx={{ width: "20%", ml: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Department Name
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <JoyDepartment deptValue={dept} getDept={setDept} />
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
                                <JoyDepartmentSection sectValues={deptSection} getSection={setDeptSection} dept={dept} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Employee Institution
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <JoyInstitutionSelect value={institute} setValue={setInstitute} />
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
                                <JoyDesignationSelect desgValue={designation} getDesg={setDesignation} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Designation Change Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <Input
                                    type="date"
                                    slotProps={{
                                        input: {
                                            max: moment(new Date()).format('YYYY-MM-DD'),
                                        },
                                    }}
                                    // value={ineffectdate}
                                    name="ineffectdate"
                                    onChange={(e) => getDate(e)}
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
                                <JoyCategorySelect value={category} setValue={setCategory} />
                            </Box>
                            <Box sx={{ width: "20%", pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Category Change Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: "30%" }} >
                                <Input
                                    type="date"
                                    slotProps={{
                                        input: {
                                            max: moment(new Date()).format('YYYY-MM-DD'),
                                        },
                                    }}
                                    //value={cateineffectdate}
                                    name="cateineffectdate"
                                    onChange={(e) => getCateDate(e)}
                                />
                            </Box>
                        </Box>
                        {/* fourth row end */}
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={data}
                        sx={{
                            height: 400,
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
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' onClick={close} >
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(CompanyInfoPage) 