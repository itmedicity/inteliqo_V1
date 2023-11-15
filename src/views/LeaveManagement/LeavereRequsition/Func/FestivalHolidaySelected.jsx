import React, { memo } from 'react'
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { format } from 'date-fns/esm';

const FestivalHolidaySelected = ({ handleChange, index, date }) => {
    /****
     * This component for festival holiday - 4  
     */
    const [holiday, setHoliday] = useState([]);
    //const [status, setStatus] = useState(false);

    const holidayLeaves = useSelector((state) => state.getCreitedHolidayLeave, _.isEqual);
    const holidays = useMemo(() => holidayLeaves, [holidayLeaves]);

    useEffect(() => {
        const { holidayLeave } = holidays;
        //apiStats && setStatus(true)
        const festivalHoliday = holidayLeave?.filter((val) => val.lvetype_slno === 4)
        setHoliday(festivalHoliday);
    }, [holidays])


    // useEffect(() => {
    //     return () => {
    //         setStatus(false)
    //     }
    // })
    // handle the holiday leaves

    const changeHolidayLeves = useCallback(async (event) => {
        const selectedValue = event.target.value;
        const holidaySelectedObj = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'FESTIVAL HOLIDAY',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, holidaySelectedObj)
    }, [date, handleChange, index])

    return (
        <Form.Select
            onChange={(e) => changeHolidayLeves(e)}
            defaultValue={0}
        >
            <option value={0} disabled  >Choose Festival Holiday</option>
            {
                holiday?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_hl_slno}
                        disabled={val.hl_lv_tkn_status === 1 ? true : false}
                    >
                        {val.hld_desc}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(FestivalHolidaySelected)