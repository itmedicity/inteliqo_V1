import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const HodWiseEmpList = ({ employee, setEmployee }) => {

    const [value, setValue] = useState(0)
    const [emno, setEmno] = useState(0)

    const state = useSelector((state) => state.hodBasedSectionNameList.sectionEmployeeName, _.isEqual);
    const filterEmployeeList = useMemo(() => state, [state]);

    useEffect(() => {
        if (value !== 0) {
            const obj = {
                em_id: value,
                em_no: emno
            }
            setEmployee(obj)
        } else {
            setEmployee({})
        }

    }, [value, emno])


    const getEmployeeId = useCallback((emno) => {
        setEmno(emno);
    }, [])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Employee Name </Option>
            {
                filterEmployeeList?.map((val, index) => {
                    return <Option key={index} value={val.em_id} onClick={() => getEmployeeId(val.em_no)}>{val.em_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(HodWiseEmpList) 