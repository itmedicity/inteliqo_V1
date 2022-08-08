import React, { Fragment, memo, useEffect } from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';

const DeptSection = ({ value, setValue, style, label }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setdeptSection())
    }, [])
    const deptSection = useSelector((state) => {
        return state.getDeprtSection.empDeptSectionList
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
                        deptSection && deptSection.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default memo(DeptSection) 