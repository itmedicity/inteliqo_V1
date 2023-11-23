import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import Form from 'react-bootstrap/Form'

const MultiLeaveTypeSelectCmp = ({ index, onChange, leaveTypeChange }) => {
    const [leaveType, setLeveType] = useState([])

    //get employee category based allowed leave type
    const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData, _.isEqual);
    const allowedLeaveData = useMemo(() => state?.leaveData, [state]);

    //filter the allowed leave type based on type === 0 (means not credited || only filter the credited leave type) 
    useEffect(() => {
        const allowedLeaveType = allowedLeaveData?.filter((val) => val.type !== 0).map((val) => {
            return { "type": val.type, "typeleve": val.typeleve }
        })
        setLeveType(allowedLeaveType)
    }, [allowedLeaveData])


    const handleChange = useCallback((event) => {
        onChange(event.target.value);
        const singleLeave = event.target.value === '1' ||
            event.target.value === '4' ||
            event.target.value === '3' ||
            event.target.value === '11' || event.target.value === '8' ? 0 : 1;
        leaveTypeChange({
            index: index,
            'leaveType': event.target.value,
            'leaveTypeName': event.target.selectedOptions[0].label,
            'singleLeave': singleLeave
        }, null)
    }, [index, onChange, leaveTypeChange])


    return (
        <Form.Select
            onChange={handleChange}
            defaultValue={0}
        >
            <option value={0} disabled  >Select Leave Type</option>
            {
                leaveType?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.type}
                    >
                        {val.typeleve}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(MultiLeaveTypeSelectCmp)