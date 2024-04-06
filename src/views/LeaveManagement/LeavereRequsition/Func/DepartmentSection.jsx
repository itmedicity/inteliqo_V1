// import { FormControl, MenuItem, Select } from '@mui/material'
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
        // <FormControl
        //     fullWidth={true}
        //     margin="dense"
        //     size='small'
        // >
        //     <Select
        //         fullWidth
        //         variant="outlined"
        //         margin='dense'
        //         size='small'
        //         disabled={formSubmit}
        //         value={sectionVal}
        //         onChange={(e) => setSection(e.target.value)}
        //     >
        //         <MenuItem value={0} disabled>
        //             Select Department Section
        //         </MenuItem>
        //         {
        //             state && state.map((val, index) => {
        //                 return <MenuItem key={index} value={val.dept_section}>{val.sect_name}</MenuItem>
        //             })

        //         }
        //     </Select>
        // </FormControl>

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