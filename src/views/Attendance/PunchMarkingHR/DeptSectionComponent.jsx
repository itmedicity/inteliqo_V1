import { Box, Button, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import _ from 'underscore'
import { addDays, addMonths, format, getMonth, getYear, lastDayOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import moment from 'moment';
import { getAndUpdatePunchingData } from '../ShiftUpdation/Function'
import { Actiontypes } from 'src/redux/constants/action.type';

const DeptSectionComponent = ({ deptid, deptSection, value }) => {

    const [data, setData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const dispatch = useDispatch();
    const { FETCH_PUNCH_DATA, FETCH_SHIFT_DATA } = Actiontypes;
    const [msg, setmsg] = useState(0)
    const [depart, changeDept] = useState(0);
    const [section, changeSection] = useState(0);

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    const { em_no } = employeeProfileDetl

    // const state = useSelector((state) => state?.getDeptSectList?.deptSectionList, _.isEqual)

    useEffect(() => {
        const mapdata = deptSection?.filter((val) => val.dept_id === deptid)
        const array = mapdata.map((val) => {
            const obj = {
                status: 0
            }
            return {
                ...val,
                ...obj
            }
        })
        setData(array)
    }, [deptSection])


    const PunchSave = useCallback(async (val) => {
        setOpenBkDrop(true)
        const selectedDate = moment(value).format('YYYY-MM-DD');
        const { sect_id, dept_id } = val;
        changeDept(dept_id)
        changeSection(sect_id)
        const postData = {
            dept_id: dept_id,
            sect_id: sect_id
        }
        const result = await axioslogin.post('/empmast/getEmpDet', postData)
        const { success, data } = result.data
        if (success === 1) {
            data?.map((val) => {
                const postdata = {
                    em_no: val.em_no,
                    attendance_marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
                }
                const attendMarkCheck = async (postdata) => {
                    const dataExist = await axioslogin.post("/attendCal/checkAttendanceProcess/", postdata);
                    const { success } = dataExist.data
                    if (success === 1) {
                        setmsg(3)
                    } else {
                        const emply = { em_no: val.em_no }
                        const postData = {
                            fromDate: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            preFromDate: format(subDays(startOfMonth(new Date(value)), 1), 'yyyy-MM-dd 00:00:00'),
                            toDate: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd'),
                            preToDate: format(addDays(lastDayOfMonth(new Date(value)), 1), 'yyyy-MM-dd 23:59:59'),
                            dept: dept_id,
                            section: sect_id,
                            empId: emply
                        }
                        //Get Emp salary and common late in and early out
                        const resultdel = await axioslogin.get(`/common/getgrossSalary/${val.em_id}`);
                        const { dataa } = resultdel.data
                        const { gross_salary } = dataa[0]

                        const gracePeriod = await axioslogin.get('/commonsettings')
                        const { data } = gracePeriod.data
                        const { cmmn_early_out, cmmn_grace_period, cmmn_late_in, salary_above,
                            week_off_day, notapplicable_shift, default_shift, noff } = data[0]

                        const SelectMonth = getMonth(new Date(selectedDate))
                        const SelectYear = getYear(new Date(selectedDate))

                        const getHolidayPost = {
                            month: SelectMonth + 1,
                            year: SelectYear
                        }
                        //Get Holiday lIst
                        const holiday_data = await axioslogin.post("/attendCal/getHolidayDate/", getHolidayPost);
                        const { holidaydata } = holiday_data.data;


                        //Function for punch master updation. Based on duty plan and punch details in punch data 
                        const result = await getAndUpdatePunchingData(postData, holidaydata,
                            cmmn_early_out, cmmn_grace_period, cmmn_late_in,
                            gross_salary, data, dispatch, salary_above,
                            week_off_day, notapplicable_shift, default_shift, noff)

                        if (result !== undefined) {

                            const { status, message, shift, punch_data } = result;
                            if (status === 1) {
                                dispatch({ type: FETCH_PUNCH_DATA, payload: punch_data })
                                dispatch({ type: FETCH_SHIFT_DATA, payload: shift })
                                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
                                const { success } = punch_master_data.data;

                                if (success === 1) {
                                    const dutyLock = data && data.map((val, index) => {
                                        const obje = {
                                            em_no: val.em_no,
                                            from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                                            to: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd')
                                        }
                                        return obje
                                    })
                                    // After HR Punch in/Out marked then employee or incharge/Hod 
                                    // canot do punch in out mark
                                    const result1 = await axioslogin.patch("/payrollprocess/dutyPlanLock", dutyLock)

                                    const { success } = result1.data
                                    if (success === 1) {
                                        setmsg(2)
                                        return { status: 2 }
                                    }
                                }
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                            }

                        }
                        else {
                            setOpenBkDrop(false)
                            setmsg(1)
                        }
                    }
                }
                attendMarkCheck(postdata)
            })
        }
        else {
            warningNofity("No Employee under this department Section")
        }
    }, [])




    const [nextstage, setNextStage] = useState(0)
    useEffect(() => {
        if (msg === 1) {
            errorNofity("Duty Doesnot Planed, Please do Duty Plan")
        } else if (msg === 2) {
            setNextStage(1)
        } else if (msg === 3) {
            warningNofity("Attendance procees Already Done")
        }
    }, [msg])

    const punchMarkSave = async (saveDta) => {
        const result = await axioslogin.post('/payrollprocess/Insert/PunchInOutHr', saveDta)
        const { success } = result.data
        if (success === 1) {
            succesNofity("Punch Updated Successfully")
            setOpenBkDrop(false)
            // setFlag(1)
        } else {
            warningNofity("Error While Updating Punch")
        }
    }

    useEffect(() => {
        if (nextstage === 1) {
            const saveDta = {
                marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                dept_slno: depart,
                deptsec_slno: section,
                create_user: em_no,
                edit_user: em_no,
                status: 1
            }
            punchMarkSave(saveDta)
        }
    }, [nextstage, value, depart, section, em_no])

    console.log(data);

    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            {
                data?.length !== 0 ? <CssVarsProvider>
                    <Table borderAxis="both" size="lg"  >
                        <tbody>
                            {
                                data?.map((val, index) => (
                                    <tr key={index} style={{ textTransform: "capitalize" }}>
                                        <td key={index} style={{ textAlign: "center" }}  >
                                            {val.sect_name.toLowerCase()}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <Box sx={{ display: 'flex', height: 25 }}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ display: 'flex', mx: 0.5, flex: 1 }}
                                                    // disabled={processBtn}
                                                    onClick={() => {
                                                        PunchSave(val)
                                                    }}
                                                >
                                                    Process
                                                </Button>
                                            </Box>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody >
                    </Table >
                </CssVarsProvider> : <CssVarsProvider>
                    <Table
                        borderAxis="both"
                        size="lg" >
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "center" }}>No Department Section</td>
                            </tr>

                        </tbody>

                    </Table>
                </CssVarsProvider>
            }

            {/* <CssVarsProvider>
                <Table
                    borderAxis="both"
                    size="lg" >
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }}>No Department Section</td>
                        </tr>

                    </tbody>

                </Table>
            </CssVarsProvider> */}

        </Fragment>
    )
}

export default memo(DeptSectionComponent) 