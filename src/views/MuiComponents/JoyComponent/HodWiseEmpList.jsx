import { Box, Option, Select, Typography } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const HodWiseEmpList = ({ section, setEmployee }) => {

    const [value, setValue] = useState(0)
    const [emno, setEmno] = useState(0)
    const [emplList, setEmplList] = useState([]);

    const state = useSelector((state) => state.hodBasedSectionNameList.sectionEmployeeName, _.isEqual);
    const filterEmployeeList = useMemo(() => state, [state]);

    useEffect(() => {
        if (Object.keys(filterEmployeeList).length > 0) {
            const filterdEmpList = filterEmployeeList.filter((val) => val.em_dept_section === section)
            setEmplList(filterdEmpList)
        }
    }, [filterEmployeeList, section])

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

    }, [value, emno, setEmployee])


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
                emplList?.map((val, index) => {
                    return <Option key={index} value={val.em_id} label={val.em_name} onClick={() => getEmployeeId(val.em_no)} >
                        <Box gap={-1}
                            sx={{
                                display: 'flex',
                                flex: 1,
                                // backgroundColor: 'lightgreen',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingX: 1,
                                mx: -1,
                                gap: 0
                            }}>
                            <Typography level='body-sm'>{val.em_name}</Typography>
                            <Typography endDecorator={val.em_no} color='success' level='body-md'></Typography>
                        </Box>
                    </Option>
                    //  <Option key={index} value={val.em_id} onClick={() => getEmployeeId(val.em_no)}>{val.em_name + ' ' + '(' + val.em_no + ')'}</Option>

                })
            }
        </Select>
    )
}

export default memo(HodWiseEmpList) 