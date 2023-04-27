import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import Form from 'react-bootstrap/Form'
import { format } from 'date-fns/esm';

const CasualLeaveSelected = ({ handleChange, index, date }) => {

    const [casualLeve, setCasualLeave] = useState([]);
    const [status, setStatus] = useState(false);

    const casulLeves = useSelector((state) => state.getCreditedCasualLeave, _.isEqual);
    const casualLve = useMemo(() => casulLeves, [casulLeves])

    useEffect(() => {
        const { apiStats, casualLeave } = casualLve;
        apiStats && setStatus(true)
        setCasualLeave(casualLeave);
    }, [casualLve])

    useEffect(() => {
        return () => {
            setStatus(false)
        }
    })

    //handle change casal leave 

    const changeCasualLeave = useCallback(async (event) => {

        const selectedValue = event.target.value;
        const casualLeave = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'CASUAL LEAVE',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, casualLeave)
    })

    return (
        <Form.Select
            onChange={(e) => changeCasualLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  >Choose Casual Leave</option>
            {
                casualLeve?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_cl_slno}
                        disabled={val.hl_lv_tkn_status === 1 ? true : false}
                    >
                        {`${val.cl_lv_mnth} - ${val.cl_bal_leave}`}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(CasualLeaveSelected)