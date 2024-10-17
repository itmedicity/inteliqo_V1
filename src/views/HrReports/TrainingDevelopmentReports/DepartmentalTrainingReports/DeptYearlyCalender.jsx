import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentSectionAll, getDepartmentAll, getEmployeeInformationLimited, getCommonSettings } from 'src/redux/reduxFun/reduxHelperFun';
import { Box, CssVarsProvider, Tooltip, IconButton, Input } from '@mui/joy';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { ToastContainer } from 'react-toastify';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { format, isValid } from 'date-fns';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { getDepartmentSectionBasedHod, getEmployeeArraySectionArray } from 'src/views/LeaveManagement/LeavereRequsition/Func/LeaveFunction';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import ReportLayout from 'src/views/HrReports/ReportComponent/ReportLayout';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const DeptYearlyCalender = () => {

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
    const [TrainingData, SetTrainingData] = useState([]);
    const [selectedYear, setselectedYear] = useState('');

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

    const SearchingProcess = useCallback(async () => {
        if (requestUser?.deptID !== 0 && requestUser?.sectionID !== 0 && selectedYear !== '') {
            const obj = {
                deptID: requestUser?.deptID,
                sectionID: requestUser?.sectionID,
                selectedYear: format(new Date(selectedYear), 'yyyy')
            };
            try {
                const result = await axioslogin.post(`/TrainingInductionReport/GetYearWiseDepartmentalTrainingList`, obj);
                const { success, data } = result.data;
                if (success === 2 && data?.length !== 0) {
                    const mappedData = data.map((val) => ({
                        Slno: val.Slno,
                        schedule_date: val.schedule_date,
                        date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                        dept_name: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        schedule_remark: val.schedule_remark,
                        trainer_name: val.trainer_name,
                        sect_name: val.sect_name
                    }));

                    // Set the mapped data to the state
                    SetTrainingData(mappedData);
                } else {
                    warningNofity("No Records Found");
                    SetTrainingData([]); // Clear data when no records are found
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                SetTrainingData([]); // Clear data on error
            }
        }
        else {
            // warningNofity("Select Department & Department Section");
        }
    }, [employeeID, requestUser, selectedYear, setDropOpen]);



    const [columnDef] = useState([
        { headerName: 'Sl no', field: 'Slno', filter: true, width: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 300 },
        { headerName: 'Department section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Date', field: 'date', filter: true, width: 160 },
        { headerName: 'Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Trainer Name', field: 'trainer_name', filter: true, width: 250 },
        { headerName: 'Remark', field: 'schedule_remark', filter: true, width: 250 },

    ])

    const HandleYear = useCallback(async (newValue) => {
        const date = new Date(newValue);
        if (isValid(date) && date !== null && date !== undefined) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setselectedYear(formattedDate);
        } else {
            warningNofity("Selected Date is not valid");
        }
    }, []);

    return (
        <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >
            <ReportLayout title="Yearly Departmental Calendar Reports" data={TrainingData} displayClose={true} >
                <ToastContainer />
                <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
                <Box sx={{ width: '100%', }} >
                    <Paper variant="outlined" sx={{ p: 0.5, mt: 0.5 }}>
                        <Box sx={{ display: 'flex', flex: 1, justifyContent: "space-between" }} >
                            <Box sx={{ flex: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment} >
                                    <DatePicker
                                        views={['year']}
                                        inputFormat="DD-MM-YYYY"
                                        value={selectedYear}
                                        onChange={(newValue) => {
                                            HandleYear(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <CssVarsProvider>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
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
                                tableDataMain={TrainingData}
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

export default memo(DeptYearlyCalender) 
