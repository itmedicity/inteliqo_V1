import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    getCommonLeaveData, getEmployeeInformation,
    getCreditedCasualLeave, getCreitedCommonLeave, getCreitedHolidayLeave,
    getCreitedCompansatoryOffLeave, getCreditedEarnLeave,
} from 'src/redux/actions/LeaveReqst.action';
import { getannualleave } from 'src/redux/actions/Profile.action';
import _ from 'underscore';
import { Actiontypes } from 'src/redux/constants/action.type';

const EmployeeAgainSection = ({ section, employeeId, setEmployeeId, formSubmit }) => {

    const { GET_SELECTED_EMPLOYEE_LEAVE_REQUEST } = Actiontypes;

    const dispatch = useDispatch();
    const [emplList, setEmplList] = useState([]);
    const [emid, setEmid] = useState(0)
    const state = useSelector((state) => state.hodBasedSectionNameList.sectionEmployeeName, _.isEqual);
    const filterEmployeeList = useMemo(() => state, [state]);

    useEffect(() => {
        setEmployeeId(0);
        if (Object.keys(filterEmployeeList).length > 0) {
            const filterdEmpList = filterEmployeeList.filter((val) => val.em_dept_section === section)
            setEmplList(filterdEmpList)
        }
    }, [section, filterEmployeeList])

    useEffect(() => {
        const empData = { em_no: employeeId, em_id: emid }
        dispatch(getCommonLeaveData(employeeId));
        dispatch({ type: GET_SELECTED_EMPLOYEE_LEAVE_REQUEST, payload: empData })
    }, [employeeId, emid])

    const getEmployeeId = useCallback((em_id) => {
        setEmid(em_id)
        const data = { em_id: em_id }
        dispatch(getCreditedCasualLeave(em_id));
        dispatch(getCreitedCommonLeave(data));
        dispatch(getCreitedHolidayLeave(em_id));
        dispatch(getCreitedCompansatoryOffLeave(em_id));
        dispatch(getCreditedEarnLeave(em_id));
        dispatch(getannualleave(em_id))
        dispatch(getEmployeeInformation(em_id))
    })

    return (
        <FormControl
            fullWidth={true}
            margin="dense"
            size='small'
            sx={{ minHeight: 10, p: 0 }}
        >
            <Select
                fullWidth
                variant="outlined"
                margin='dense'
                size='small'
                disabled={formSubmit}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                sx={{ minHeight: 10, p: 0 }}
            >
                <MenuItem value={0} disabled>
                    Select Employee Name
                </MenuItem>
                {
                    emplList && emplList.map((val, index) => {
                        return <MenuItem key={index} value={val.em_no} onClick={() => getEmployeeId(val.em_id)} >{val.em_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(EmployeeAgainSection) 