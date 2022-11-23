import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const ShiftSelect = () => {

    const departmentShiftt = useSelector((state) => state.getDepartmentShiftData.deptShiftData, _.isEqual);
    const deptShift = useMemo(() => departmentShiftt, [departmentShiftt])

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <select style={{ width: '100%' }} >
            <option disabled defaultValue={0} >Select...</option>
            {
                deptShift && deptShift.map((val, index) => <option key={index} value={val.shiftcode}>{val.shiftDescription}</option>)
            }
        </select>
    )
}

export default memo(ShiftSelect)