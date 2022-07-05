import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action';

const DeptSectionSelect = ({ name, style, onChange, dept }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (dept !== 0) {
            dispatch(setDeptWiseSection(dept));
        }
    }, [dept])

    //selector for department wise dept_section
    const deptSectionList = useSelector((state) => {
        return state.getDeptSectList.deptSectionList
    })

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-2"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0'>
                        Department Section
                    </MenuItem>
                    {
                        deptSectionList && deptSectionList.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Fragment>
    )
}

export default DeptSectionSelect
