import { Option, Select } from '@mui/joy';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const HodWiseDeptSection = ({ detSection, setSectionValue }) => {

    const state = useSelector((state) => state.hodAuthorisedSection.sectionDetal, _.isEqual);
    return (
        <Select
            value={detSection}
            onChange={(event, newValue) => {
                setSectionValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Department Section </Option>
            {
                state?.map((val, index) => {
                    return <Option key={index} value={val.dept_section}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(HodWiseDeptSection) 