import React, { memo } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { format } from 'date-fns';

const EarnLeaveSelected = ({ handleChange, index, date }) => {

    const [earnLeave, setEarnLeave] = useState([]);
    const [status, setStatus] = useState(false);

    const earnLeaves = useSelector((state) => state.getCreditedEarnLeave, _.isEqual);
    const earnLve = useMemo(() => earnLeaves, [earnLeaves]);

    useEffect(() => {
        const { apiStats, earnLeave } = earnLve;
        apiStats && setStatus(true)
        setEarnLeave(earnLeave);
    }, [earnLve])

    useEffect(() => {
        return () => {
            setStatus(false)
        }
    })

    // handle change earn leaves
    const changeEarnLeave = useCallback(async (event) => {

        const selectedValue = event.target.value;
        const earnLeaves = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'EARN LEAVE',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, earnLeaves)
    })

    return (
        <Form.Select
            onChange={(e) => changeEarnLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  > Choose Earned Leaves</option>
            {
                earnLeave?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_ernlv_slno}
                    >
                        {val.ernlv_mnth}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(EarnLeaveSelected)