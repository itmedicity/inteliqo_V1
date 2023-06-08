import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const DepartmentSection = ({ setSection, sectionVal, formSubmit }) => {
    const state = useSelector((state) => state.hodAuthorisedSection.sectionDetal, _.isEqual);
    console.log("dfghbnm");
    return (
        <FormControl
            fullWidth={true}
            margin="dense"
            size='small'
        >
            <Select
                fullWidth
                variant="outlined"
                margin='dense'
                size='small'
                disabled={formSubmit}
                value={sectionVal}
                onChange={(e) => setSection(e.target.value)}
            >
                <MenuItem value={0} disabled>
                    Select Department Section
                </MenuItem>
                {
                    state && state.map((val, index) => {
                        return <MenuItem key={index} value={val.dept_section}>{val.sect_name}</MenuItem>
                    })

                }
            </Select>
        </FormControl>
    )
}

export default memo(DepartmentSection)