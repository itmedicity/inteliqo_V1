import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const DepartmentSection = ({ setSection, sectionVal, formSubmit }) => {
    const state = useSelector((state) => state.hodAuthorisedSection.sectionDetal, _.isEqual);

    const handleChange = (event, newValue) => {
        setSection(newValue)
    };

    return (
        <Select defaultValue={sectionVal} onChange={handleChange}
            sx={{ width: '100%' }}
            size='sm'
        >
            <Option value={0}  >Select Department Section</Option>
            {

                state && state?.map((val, index) => {
                    return <Option key={index} value={val.dept_section}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DepartmentSection)