import { Box, Button, Chip, Input, Sheet, Table, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, getYear, subMonths, subYears } from 'date-fns';
import React, { Fragment, lazy, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SearchIcon from '@mui/icons-material/Search';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getProcessserialnum, screenInnerHeight } from 'src/views/Constant/Constant';
import { checkContractStatus, getEmployeeCurrentCategoryInfom, insertNewLeaveProcessData, newProcessedEmployeeData } from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/LeaveProcess/Functions/LeaveProcessFun';
import { getStatutoryInfo } from 'src/redux/actions/LeaveProcess.action';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import { setEmployeeProcessDetail } from 'src/redux/actions/EmployeeLeaveProcessDetl';
import { ToastContainer } from 'react-toastify';

const LeaveProcess = lazy(() => import('./AnnualLeaveComponents/LeaveProcessModal'))

const EmployeeAnnualLeaveProcess = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [value, setValue] = useState(new Date())
    const [tableArray, setTableArray] = useState([])
    const [open, setopen] = useState(false)
    const [empdata, setEmpdata] = useState([])
    const [processSlno, setProcessSlno] = useState(0)
    const [empCategory, setEmpCategory] = useState({})
    const [newLeaveData, setNewLeaveData] = useState({})
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        //new process serial number
        getProcessserialnum().then((val) => {
            setProcessSlno(val)
            setUpdate(0)
        })
    }, [update])

    const getEmpdata = useCallback(async () => {
        const getEmpData = {
            em_department: deptartment,
            em_dept_section: section,
        }
        const result1 = await axioslogin.post("/payrollprocess/sectionEmployees", getEmpData);
        const { succes, dataa: employeeData } = result1.data
        if (succes === 1) {
            setTableArray(employeeData)
        } else {
            setTableArray([])
            warningNofity("No Employee Under This Department!")
        }
    }, [deptartment, section])


    const handleFunction = useCallback(async (e, val) => {

        const { lv_process_slno, em_no, em_id,
            contract_status, em_prob_end_date, ecat_prob, ecat_training,
            em_cont_end, probation_status } = val

        const contractStatus = await checkContractStatus(em_cont_end, contract_status,
            em_prob_end_date, ecat_prob, ecat_training, probation_status)



        let employeeIDs = {
            em_no: em_id,
            em_id: em_no,
        }

        if (contractStatus.status === true) {
            if (lv_process_slno === null) {
                getEmployeeCurrentCategoryInfom(em_id)
                    .then((value) => {
                        const { success, data } = value.data
                        if (success === 1) {
                            setEmpCategory(data[0])
                            newProcessedEmployeeData(data[0], processSlno, employeeIDs)
                                .then(async (newEmployeeObj) => {
                                    insertNewLeaveProcessData(newEmployeeObj)
                                        .then((insertMessage) => {
                                            let { success, message } = insertMessage
                                            if (success === 1) {
                                                succesNofity("Employee Leave Deactivated ")
                                                getEmpdata(deptartment, section)
                                                setUpdate(Math.random())
                                            } else {
                                                warningNofity(
                                                    `error ! ${message} , EmployeeAnnualLeaveProcess line # 108, Contact Information Technology`,
                                                )
                                            }
                                        })
                                        .catch((error) =>
                                            warningNofity(
                                                `error ! ${error} ,EmployeeAnnualLeaveProcess  line # 114, Contact Information Technology`,
                                            ),
                                        )
                                })
                                .catch((error) =>
                                    warningNofity(
                                        `error ! ${error},EmployeeAnnualLeaveProcess  line # 120, Contact Information Technology `,
                                    ),
                                )
                        } else {
                            warningNofity("Error While getting Employee Current Leave")
                        }
                    })

            } else {

                const leaveProcessSlnoObj = {
                    oldprocessslno: lv_process_slno,
                    lv_process_slno: lv_process_slno,
                }

                const inactiveLv = {
                    em_no: em_no,
                    lastYear: getYear(subYears(new Date(), 2))
                }

                //to inactive employee casual leave
                const inctiveCasual = new Promise(async (resolve, reject) => {
                    let casualLeaveUpdation = await axioslogin.post(
                        '/yearleaveprocess/updatecasualleaveupdateslno',
                        leaveProcessSlnoObj,
                    )
                    const { success, message } = casualLeaveUpdation.data
                    if (success === 2 || success === 1) {
                        resolve('Casual Leave Deactivated')
                    } else {
                        reject(`CL Updation ! Error ${message}`)
                    }
                })

                // to inactive employee earnleave
                const inactiveEarn = new Promise(async (resolve, reject) => {
                    const earnLeaveUpdation = await axioslogin.post(
                        '/yearleaveprocess/inactiveEarnLeave',
                        inactiveLv,
                    )
                    const { success, message } = earnLeaveUpdation.data
                    if (success === 2 || success === 1) {
                        resolve('Earn Leave Deactivated')
                    } else {
                        reject(`EL Updation ! Error ${message}`)
                    }
                })

                //to inactive employee common leave
                const inactiveCommon = new Promise(async (resolve, reject) => {
                    const commonleave = await axioslogin.post(
                        '/yearleaveprocess/updateCommonUpdateSlno',
                        leaveProcessSlnoObj,
                    )
                    const { success, message } = commonleave.data
                    if (success === 2 || success === 1) {
                        resolve('Common Leave Deactivated')
                    } else {
                        reject(`Common Leave Updation ! Error ${message}`)
                    }
                })

                Promise.all([
                    inctiveCasual,
                    inactiveEarn,
                    inactiveCommon,
                ]).then(async (result) => {
                    //update status as 'N'
                    const inactiveLastYearProcessData = await axioslogin.post('/yearleaveprocess/inactiveLastYearProcessData', leaveProcessSlnoObj);
                    const { success, updateMessage } = inactiveLastYearProcessData.data;
                    if (success === 1) {
                        let employeeIDs = {
                            em_no: em_id,
                            em_id: em_no,
                        }

                        getEmployeeCurrentCategoryInfom(em_id)
                            .then((value) => {
                                const { success, data } = value.data
                                if (success === 1) {
                                    setEmpCategory(data[0])
                                    newProcessedEmployeeData(data[0], processSlno, employeeIDs)
                                        .then(async (newEmployeeObj) => {
                                            insertNewLeaveProcessData(newEmployeeObj)
                                                .then((insertMessage) => {
                                                    let { success, message } = insertMessage
                                                    if (success === 1) {
                                                        succesNofity("Employee Leave Deactivated ")
                                                        getEmpdata(deptartment, section)
                                                        setUpdate(Math.random())
                                                    } else {
                                                        warningNofity(
                                                            `error ! ${message} , EmployeeAnnualLeaveProcess line # 212, Contact Information Technology`,
                                                        )
                                                    }
                                                })
                                                .catch((error) =>
                                                    warningNofity(
                                                        `error ! ${error} ,EmployeeAnnualLeaveProcess  line # 218, Contact Information Technology`,
                                                    ),
                                                )
                                        })
                                        .catch((error) =>
                                            warningNofity(
                                                `error ! ${error} `,
                                            ),
                                        )
                                } else {
                                    warningNofity("Error While getting Employee Current Leave")
                                }
                            })
                    } else {
                        errorNofity(updateMessage)
                    }
                }).catch(error => {
                    errorNofity('Error Updating Leave Request')
                    const errorLog = {
                        error_log_table: 'punch_master,leave_request,leave_reqdetl',
                        error_log: error,
                        em_no: empdata?.em_no,
                        formName: 'Leave Approval Modal Approval HR Page'
                    }
                    axioslogin.post(`/common/errorLog`, errorLog);
                })
            }
        } else {
            warningNofity(contractStatus.message)
        }

    }, [deptartment, processSlno, section, empdata, getEmpdata])

    const activeNewLeave = useCallback(async (e, val) => {

        const { em_id, em_no } = val

        setNewLeaveData(val)

        const getProcessDataObj = {
            em_no: em_no,
            year: getYear(new Date(),)
        }
        const getProcessDataLastYear = await axioslogin.post('/yearleaveprocess/getLeaveProccedData', getProcessDataObj);
        const { success, msge } = getProcessDataLastYear.data;
        if (success === 1) {
            const { lv_process_slno } = msge;
            setopen(true)
            dispatch(getStatutoryInfo(em_no));
            dispatch(setPersonalData(em_id));
            dispatch(setEmployeeProcessDetail(em_no))

            getEmployeeCurrentCategoryInfom(em_id)
                .then((value) => {
                    const { success, data } = value.data
                    if (success === 1) {
                        setEmpCategory(data[0])
                    }
                }).catch((error) =>
                    warningNofity(
                        `error ! ${error} , EmployeeAnnualLeaveProcess line # 268, Contact Information Technology`,
                    ),
                )

            const processedLeaveData = [
                { ...msge, name: 'Casual Leave', value: msge?.hrm_clv ?? 2, leave: 1, lv_process_slno: lv_process_slno },
                { ...msge, name: 'Common Leave', value: msge?.hrm_cmn ?? 2, leave: 2, lv_process_slno: lv_process_slno },
                { ...msge, name: 'Privilege Leave', value: msge?.hrm_ern_lv ?? 2, leave: 3, lv_process_slno: lv_process_slno },
                { ...msge, name: 'Holiday Leave', value: msge?.hrm_hld ?? 2, leave: 4, lv_process_slno: lv_process_slno },
            ]

            setEmpdata(processedLeaveData)

        } else {
            warningNofity(' EmployeeAnnualLeaveProcess line # 284 Contact Information Technology')
        }
    }, [dispatch])



    return (
        <CustomLayout title="Annual Leave Process" displayClose={true} >
            <ToastContainer />
            <LeaveProcess open={open} setOpen={setopen} empdata={empdata} empCategory={empCategory} newLeaveData={newLeaveData} />
            <Paper sx={{ display: 'flex', height: screenInnerHeight * 83 / 100, flexDirection: 'column', width: '100%' }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                    <Box sx={{ flex: 1, px: 0.5, }}>
                        <DepartmentDropRedx getDept={setDepart} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, }}>
                        <DepartmentSectionRedx getSection={setDepartSection} />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5, }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
                                size="small"
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} disabled={true} />

                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 0, px: 1, }}>
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={getEmpdata}
                                fullWidth
                                startDecorator={<SearchIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Search
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, }}>
                    </Box>
                </Paper>
                <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column', p: 0.5,
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                }}>
                    <Sheet
                        variant="outlined"
                        invertedColors
                        sx={{
                            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                            overflow: 'auto',
                            borderRadius: 5,
                            // width: '100%'
                        }}
                    >

                        <Table
                            // borderAxis="bothBetween"
                            // stripe="odd"
                            variant='soft'
                            hoverRow
                            stickyHeader
                            size='sm'
                            sx={{
                                '& tr > *:last-child': {
                                    position: 'sticky',
                                    right: 0,
                                    // bgcolor: 'var(--TableCell-headBackground)',
                                },
                            }}
                        >
                            <thead>
                                <tr >
                                    <th style={{ textAlign: 'center', fontSize: 12 }} >ID#</th>
                                    <th style={{ textAlign: 'center' }} >NAME</th>
                                    <th style={{ textAlign: 'center' }} >DESIGNATION</th>
                                    <th style={{ textAlign: 'center' }} >CATEGORY</th>
                                    <th style={{ textAlign: 'center' }} >PROCESS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableArray && tableArray.map((row, index) => (

                                    <Fragment key={index}>

                                        <tr >
                                            <td style={{ textAlign: 'center' }} >
                                                {row.em_no}
                                            </td>
                                            <td style={{ textAlign: 'center' }} >
                                                {row.em_name}
                                            </td>
                                            <td style={{ textAlign: 'center' }} >
                                                {row.desg_name}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {row.ecat_name}
                                            </td>
                                            <td >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >

                                                    <Chip
                                                        color={row.hrm_process_status === 'N' ? 'neutral' : getYear(new Date(row.next_updatedate)) === getYear(new Date()) ? 'neutral' : 'danger'}
                                                        onClick={row.hrm_process_status === 'N' ? null : getYear(new Date(row.next_updatedate)) === getYear(new Date()) ? null : (e) => handleFunction(e, row)}
                                                        size="sm"
                                                        variant="outlined"
                                                    >Inactive Existing Leave</Chip>
                                                    <Chip
                                                        color="success"
                                                        onClick={(e) => activeNewLeave(e, row)}
                                                        size="sm"
                                                        variant="outlined"
                                                    >Active New Leave</Chip>
                                                </Box>
                                            </td>
                                        </tr>

                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Paper>
        </CustomLayout>
    )
}

export default memo(EmployeeAnnualLeaveProcess) 