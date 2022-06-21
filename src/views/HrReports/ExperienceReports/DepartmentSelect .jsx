import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';


const DepartmentSelect = ({ name, style, onChange }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [])

    //department lists
    const empDepartmentList = useSelector((state) => {
        return state.getDepartmentList.empDepartmentList
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
                        Department
                    </MenuItem>
                    {
                        empDepartmentList && empDepartmentList.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Fragment>
    )
}
export default DepartmentSelect