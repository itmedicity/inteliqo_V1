import React, { Fragment, memo, useEffect } from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';


const DeptSelectionRedux = ({ value, setValue, style, label }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDepartment())
    }, [])
    const empDepartment = useSelector((state) => {
        return state.getDepartmentList.empDepartmentList

    })


    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <Fragment>
            <FormControl fullWidth sx={{
                "&.MuiFormControl-root": {
                    marginTop: '4px',
                },
            }} >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='Department'
                    value={value}
                    onChange={handleChange}
                    // size="small"
                    fullWidth
                    displayEmpty
                    variant='outlined'
                    sx={{
                        height: 26,
                        lineHeight: 1,
                        ...style,
                        "&.MuiOutlinedInput-root": {
                            // height: '1px',
                        },
                    }}
                >
                    <MenuItem value='0' disabled>
                        {label}
                    </MenuItem>
                    {
                        empDepartment && empDepartment.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}


export default DeptSelectionRedux