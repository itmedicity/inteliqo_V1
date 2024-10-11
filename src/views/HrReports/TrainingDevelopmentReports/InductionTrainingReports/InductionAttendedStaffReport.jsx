import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentSectionAll, getDepartmentAll, getEmployeeInformationLimited, getCommonSettings } from 'src/redux/reduxFun/reduxHelperFun';
import { Box, CssVarsProvider, Tooltip, Typography, IconButton } from '@mui/joy';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { ToastContainer } from 'react-toastify';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import SearchIcon from '@mui/icons-material/Search';
import { getDepartmentSectionBasedHod, getEmployeeArraySectionArray } from 'src/views/LeaveManagement/LeavereRequsition/Func/LeaveFunction';
import ReportLayout from '../../ReportComponent/ReportLayout';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { format } from 'date-fns';

const InductionAttendedStaffReport = () => {

    const dispatch = useDispatch();

    //dispatch for getting department and department section
    useEffect(() => {
        dispatch(setDept())
        dispatch(setdeptSection())
    }, [dispatch])

    const [deptID, setDeptID] = useState(0);
    const [deptSection, setDeptSection] = useState(0);
    const [employeeID, setEmployeeID] = useState(0);
    const [disabled, setDisables] = useState(false);
    const [emplist, setEmpList] = useState([]);
    const [mapEmpList, setMapEmpList] = useState([]);
    const [hodBasedSection, setHodBasedSection] = useState([]);
    const [deptSectionList, setDeptSectionList] = useState([]);
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const [hodEmpFilter, setHodEmpFilter] = useState(false);
    const [empDisableStat, setEmpDisableStat] = useState(false)
    const [requestUser, setRequestUser] = useState({
        deptID: 0,
        sectionID: 0,
        emNo: 0,
        emID: 0
    })
    const [drop, setDropOpen] = useState(false)
    const [EmployeeData, SetEmployeeData] = useState([]);

    const department = useSelector((state) => getDepartmentAll(state))
    const departmentNameList = useMemo(() => department, [department])
    const filterDeptSection = useSelector((state) => getDepartmentSectionAll(state))
    const departmentSectionListFilterd = useMemo(() => filterDeptSection, [filterDeptSection])

    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section } = employeeInform;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        setMasterGroupStatus(groupStatus)
        dispatch(setCommonSetting());
        dispatch(setShiftDetails())
    }, [groupStatus])

    //GET THE DEPARTMENT SECTION DETAILS BASED ON LOGED USER EM_ID
    useEffect(() => {
        // IF THE LOGGED EMPLOYEE IS HOD OR INCHARGE
        if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {
            setDisables(false)
            setHodBasedSection([])

        } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
            setDisables(true)
            setDeptID(0)
            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)
                // if the employee is hhod or incharge in another department but they can access thery information but this function hel to view ther datas
                section?.find((e) => e === em_dept_section) === undefined ? setHodEmpFilter(true) : setHodEmpFilter(false)
                setHodBasedSection([...section, em_dept_section]) // INCLUDING HOD OR INCHARGE DEPARTMENT SECTION IF IT NOT IN THE AUTHORISED SECTION
            }
            fetchData(em_id)
        } else {
            setDisables(false)
        }

        //CLEAN UP FUNCTION
        return () => {
            setHodBasedSection([])
        }
    }, [hod, incharge, em_id, em_dept_section, masterGroupStatus])

    // FILTERING AND SORTING DEPARTMENT SECTION AND EMPLOYEE
    useEffect(() => {
        // if (departmentSectionListFilterd?.length > 0 && hodBasedSection?.length === 0) {
        if (departmentSectionListFilterd?.length > 0 && masterGroupStatus === true) {
            // NO FILTER FOR DEPARTMENT AND DEPARTMENT SECTION
            const departmentSection = departmentSectionListFilterd?.filter((e) => e.dept_id === deptID)
            setDeptSectionList(departmentSection)
            const filterSectionId = departmentSection?.map((e) => e.sect_id)
            getEmployeeArraySectionArray(filterSectionId).then((e) => e?.length > setEmpList(e))
        } else if (departmentSectionListFilterd?.length > 0 && hodBasedSection?.length > 0) {
            //HOD BASED DEPRTMENT SECTION SHOWING
            const hodBasedSecion = departmentSectionListFilterd?.filter((e) => hodBasedSection?.includes(e.sect_id))
            setDeptSectionList(hodBasedSecion)

            //GET EMPLOYEE -> HOD AND INCHARGE BASED DEPARTMENT SECTION WISE EMPLYEE 
            getEmployeeArraySectionArray(hodBasedSection).then((e) => e?.length > setEmpList(e))
        } else {
            setDeptSectionList([])
            setEmpList([])
        }
        return () => { //Clean up function
            setDeptSectionList([])
            setEmpList([])
        }

    }, [departmentSectionListFilterd, deptID, hodBasedSection, masterGroupStatus])

    //HANDELE CHANGE DEPARTMENT
    const handleChangeDepartmentID = useCallback((e, value) => {
        setDeptID(value)
        setDeptSection(0)
        setEmployeeID(0)
        setMapEmpList([]) // EMPLOYEE ARRAY SET TO BLANK
        setRequestUser({ ...requestUser, deptID: value, sectionID: 0, emNo: 0, emID: 0 })
    }, [setRequestUser, requestUser])

    //HANDLE CHANGE DEPARTMENT SECTION
    const handleChangeDepetSection = useCallback(async (e, value) => {
        setMapEmpList([...emplist?.filter((e) => e.em_dept_section === value)])
        setDeptSection(value)
        setEmployeeID(0)
        // if the employee is hhod or incharge in another department but they can access thery information but this function hel to view ther datas
        if (hodEmpFilter === true && value === em_dept_section) {
            // em_id
            setEmployeeID(em_no)
            setRequestUser({ ...requestUser, deptID: em_department, sectionID: value, emNo: em_no, emID: em_id })
            setEmpDisableStat(true)
        } else {
            setEmpDisableStat(false)
            setRequestUser({ ...requestUser, sectionID: value, emNo: 0, emID: 0 })
        }
    }, [emplist, hodEmpFilter, setRequestUser, requestUser, em_no, em_id, em_department, em_dept_section])

    //HANDLE CHANGE EMPLOYEE NAME 
    const handleChangeEmployeeName = useCallback((e, value) => {
        setEmployeeID(value)
        setRequestUser({ ...requestUser, emNo: value })
    }, [requestUser, setRequestUser])

    const SearchingProcess = useCallback(async () => {
        const id = requestUser?.emID;
        if (requestUser?.deptID !== 0 && requestUser?.sectionID !== 0 && requestUser?.emID !== 0) {
            try {
                const result = await axioslogin.get(`/TrainingDetails/getInductiontrainings/${id}`);
                const { success, data } = result.data;
                if (success === 2 && data?.length !== 0) {
                    let obj = data.map((val) => ({
                        Induct_slno: val.Induct_slno,
                        em_no: val.em_no,
                        em_name: val.em_name,
                        em_id: val.em_id,
                        induction_date: val.induction_date,
                        date: format(new Date(val.induction_date), 'dd-MM-yyyy'),
                        trainer_name: val.trainer_name,
                        dept_name: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        pretest_mark: val.induct_pre_mark !== null ? val.induct_pre_mark : "Not Updated",
                        posttest_mark: val.induct_post_mark !== null ? val.induct_post_mark : "Not Updated",
                        schedule_topic: val.schedule_topic,
                        retest: val.retest === 0 ? "No" : "Yes",
                        HodVerification: val.training_induct_hod_aprvl_status !== 0 ? "Verified" : "Not Verified",
                        TndVerification: val.training_iduct_tnd_verify_status !== 0 ? "Verified" : "Not Verified",
                        training_status: val.training_status,
                        Attandance: val.training_status === 1 ? "Present" : "Absent",
                        pretest_status: val.pretest_status === 1 ? "Attended" : "Not Attended",
                        posttest_status: val.posttest_status === 1 ? "Attended" : "Not Attended",
                        offline_mode: val.offline_mode,
                        online_mode: val.online_mode,
                        TrainingMode: val.offline_mode === 1 ? "Offline" : val.online_mode === 1 ? "Online" : "Not Updated",
                        sect_name: val.sect_name
                    }));
                    SetEmployeeData(obj); // Update state with final object
                } else {
                    SetEmployeeData([]) // Clear data if no result
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                SetEmployeeData([]); // Clear data on error
            }
        } else {
            warningNofity("Select Basic Information for Search");
            SetEmployeeData([]); // Clear data if no department or section is selected
        }
    }, [employeeID, requestUser]);


    const [columnDef] = useState([
        { headerName: 'Sl no', field: 'Induct_slno', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Date', field: 'date', filter: true, width: 150 },
        { headerName: 'Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Trainer Name', field: 'trainer_name', filter: true, width: 250 },
        { headerName: 'Attandance', field: 'Attandance', filter: true, width: 150 },
        { headerName: 'Pretest_status', field: 'pretest_status', filter: true, width: 150 },
        { headerName: 'Post_status', field: 'posttest_status', filter: true, width: 150 },
        { headerName: 'Pre-Mark', field: 'pretest_mark', filter: true, width: 150 },
        { headerName: 'Post_Mark', field: 'posttest_mark', filter: true, width: 150 },
        { headerName: 'Training Mode', field: 'TrainingMode', filter: true, width: 150 },
        { headerName: 'Re-Test', field: 'retest', filter: true, width: 150 },
        { headerName: 'HOD Verification', field: 'HodVerification', filter: true, width: 200 },
        { headerName: 'TND Verification', field: 'TndVerification', filter: true, width: 200 },
    ])


    return (
        <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >
            <ReportLayout title="Induction Employee Wise Training Report" data={EmployeeData} displayClose={true} >
                <ToastContainer />
                <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
                <Box sx={{ width: '100%', }} >
                    <Paper variant="outlined" sx={{ p: 0.5, mt: 0.5 }}>
                        <Box sx={{ display: 'flex', flex: 1 }} >
                            <Box sx={{ flex: 1, px: 0.3 }} >
                                <Select
                                    defaultValue={0}
                                    onChange={handleChangeDepartmentID}
                                    sx={{ width: '100%' }}
                                    value={deptID}
                                    variant='outlined'
                                    color='primary'
                                    size='sm'
                                    disabled={disabled}
                                    placeholder="Select Department"
                                    slotProps={{
                                        listbox: {
                                            placement: 'bottom-start',
                                        },
                                    }}
                                >
                                    <Option disabled value={0}>Select Department</Option>
                                    {
                                        departmentNameList && departmentNameList?.map((val, index) => {
                                            return <Option key={index} value={val.dept_id}>{val.dept_name}</Option>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.3 }}>
                                <Select
                                    defaultValue={0}
                                    value={deptSection}
                                    onChange={handleChangeDepetSection}
                                    sx={{ width: '100%' }}
                                    size='sm'
                                    variant='outlined'
                                    color='primary'
                                    placeholder="Select Department Section"
                                    endDecorator={deptSectionList?.length === 0 && <div className='loading-spinner' ></div>}

                                >
                                    <Option disabled value={0}>Select Department Section</Option>
                                    {
                                        deptSectionList && deptSectionList?.map((val, index) => {
                                            return <Option key={index} value={val.sect_id}  >{val.sect_name}</Option>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box sx={{ width: '15%', px: 0.3 }}>
                                <Select
                                    onChange={handleChangeEmployeeName}
                                    sx={{ width: '100%' }}
                                    value={employeeID}
                                    size='sm'
                                    variant='outlined'
                                    color='primary'
                                    disabled={empDisableStat}
                                    placeholder="Employee Name"
                                    endDecorator={mapEmpList?.length === 0 && <div className='loading-spinner' ></div>}
                                >
                                    <Option disabled value={0}  >Employee Name</Option>
                                    {
                                        mapEmpList && mapEmpList?.map((val, index) => {
                                            return <Option key={index} value={val.em_no} label={val.em_name} onClick={() => setRequestUser({ ...requestUser, emID: val.em_id })} >
                                                <Box gap={-1}
                                                    sx={{
                                                        display: 'flex',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        paddingX: 1,
                                                        mx: -1,
                                                        gap: 0
                                                    }}>
                                                    <Typography level='body-sm'>{val.em_name}</Typography>
                                                    <Typography endDecorator={val.em_no} color='success' level='body-md'></Typography>
                                                </Box>
                                            </Option>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box sx={{ px: 0.3 }}>
                                <CssVarsProvider>
                                    <Tooltip title="Search Employees">
                                        <IconButton variant="outlined" size='sm' color="primary"
                                            onClick={SearchingProcess}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                    </Paper>

                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ height: 500, display: 'flex', flexDirection: "column" }}>
                            <CustomAgGridRptFormatOne
                                tableDataMain={EmployeeData}
                                columnDefMain={columnDef}
                                sx={{
                                    height: 300,
                                    width: "100%",
                                    mt: 1
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                    </Box>
                </Box>
            </ReportLayout>
        </Paper>
    )
}

export default memo(InductionAttendedStaffReport) 
