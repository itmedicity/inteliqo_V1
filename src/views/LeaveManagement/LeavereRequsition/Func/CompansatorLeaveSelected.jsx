import { format } from 'date-fns';
import React, { memo } from 'react'
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const CompansatorLeaveSelected = ({ handleChange, index, date }) => {

    const [coff, setCoff] = useState([]);
    // const [status, setStatus] = useState(false);

    const copansatoryOff = useSelector((state) => state.getCreitedCompansatoryOffLeave, _.isEqual);
    const compOff = useMemo(() => copansatoryOff, [copansatoryOff]);

    useEffect(() => {
        const {
            compansatory } = compOff;
        //apiStats && setStatus(true)
        setCoff(compansatory);
    }, [compOff])

    // useEffect(() => {
    //     return () => {
    //         setStatus(false)
    //     }
    // })

    //handle change compansatory off
    const changeConpansatoryLeave = useCallback(async (event) => {
        const selectedValue = event.target.value;
        const copansatoryLeave = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'COMPENSATORY OFF',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, copansatoryLeave)
    }, [handleChange, index, date])

    return (
        <Form.Select
            onChange={(e) => changeConpansatoryLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  >Choose C-OFF</option>
            {
                coff?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_calc_holiday}
                    >
                        {`C off -${val.calculated_date}`}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(CompansatorLeaveSelected)