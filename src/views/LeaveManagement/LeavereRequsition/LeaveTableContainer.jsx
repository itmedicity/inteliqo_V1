import { Paper } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeHalfdayRequest, getEmployeeLeaveRequest, getEmployeeMisspunchRequest, getSectionHaldayRequest, getSectionLeaveRequest, getSectionMisspunchRequest } from 'src/redux/actions/LeaveReqst.action'
import { getCommonSettings, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import LeaveCalanderEmp from './Func/LeaveCalanderEmp'
import { getDepartmentSectionBasedHod } from './Func/LeaveFunction'
import RequestedLeaveTable from './Func/RequestedLeaveTable'

const LeaveTableContainer = ({ count, setCount }) => {

    const dispatch = useDispatch()
    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    //const [count, setCount] = useState(0)

    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_id, em_dept_section } = employeeInform;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    //GET THE DEPARTMENT SECTION DETAILS BASED ON LOGED USER EM_ID
    useEffect(() => {
        // IF THE LOGGED EMPLOYEE IS HOD OR INCHARGE
        if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {

            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)

                const flag = section?.find((e) => e === em_dept_section) === undefined ? true : false

                if (flag === true) {
                    const postData = {
                        sectIds: section
                    }
                    if (postData?.sectIds?.length > 0) {
                        dispatch(getSectionLeaveRequest(postData))
                        dispatch(getSectionHaldayRequest(postData))
                        dispatch(getSectionMisspunchRequest(postData))
                        setCount(0)
                    } else {
                        dispatch(getSectionLeaveRequest([]))
                        dispatch(getSectionHaldayRequest([]))
                        dispatch(getSectionMisspunchRequest([]))
                        setCount(0)
                    }

                } else {
                    const sectArray = [...section, em_dept_section]
                    const postData = {
                        sectIds: sectArray
                    }
                    if (postData?.sectIds?.length > 0) {
                        dispatch(getSectionLeaveRequest(postData))
                        dispatch(getSectionHaldayRequest(postData))
                        dispatch(getSectionMisspunchRequest(postData))
                        setCount(0)
                    } else {
                        dispatch(getSectionLeaveRequest([]))
                        dispatch(getSectionHaldayRequest([]))
                        dispatch(getSectionMisspunchRequest([]))
                        setCount(0)
                    }
                }
            }
            fetchData(em_id)

        } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)
                const flag = section?.find((e) => e === em_dept_section) === undefined ? true : false

                if (flag === true) {
                    const sectArray = [...section, em_dept_section]
                    const postData = {
                        sectIds: sectArray
                    }
                    if (postData?.sectIds?.length > 0) {
                        dispatch(getSectionLeaveRequest(postData))
                        dispatch(getSectionHaldayRequest(postData))
                        dispatch(getSectionMisspunchRequest(postData))
                        setCount(0)
                    } else {
                        dispatch(getSectionLeaveRequest([]))
                        dispatch(getSectionHaldayRequest([]))
                        dispatch(getSectionMisspunchRequest([]))
                        setCount(0)
                    }
                } else {
                    const postData = {
                        sectIds: section
                    }
                    if (postData?.sectIds?.length > 0) {
                        dispatch(getSectionLeaveRequest(postData))
                        dispatch(getSectionHaldayRequest(postData))
                        dispatch(getSectionMisspunchRequest(postData))
                        setCount(0)
                    } else {
                        dispatch(getSectionLeaveRequest([]))
                        dispatch(getSectionHaldayRequest([]))
                        dispatch(getSectionMisspunchRequest([]))
                        setCount(0)
                    }
                }
            }
            fetchData(em_id)
        } else {
            dispatch(getEmployeeLeaveRequest(em_id))
            dispatch(getEmployeeHalfdayRequest(em_id))
            dispatch(getEmployeeMisspunchRequest(em_id))
            setCount(0)
        }
    }, [dispatch, hod, incharge, em_id, em_dept_section, masterGroupStatus, count, setCount])


    return (
        <Paper variant="outlined" sx={{ display: "flex", flexDirection: 'column', flex: 1, p: 0.3, mb: 0.5 }} >
            <LeaveCalanderEmp />
            <RequestedLeaveTable setCount={setCount} />
        </Paper>
    )
}

export default memo(LeaveTableContainer) 