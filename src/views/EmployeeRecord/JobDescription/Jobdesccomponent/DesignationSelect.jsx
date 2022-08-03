import React, { Fragment, memo, useEffect } from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { setDesignation } from 'src/redux/actions/Designation.Action';

const DesignationSelect = ({ value, setValue, style, label }) => {
    //desg_slno: 53, desg_name
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDesignation())
    }, [])
    const designation = useSelector((state) => {
        return state.getEmployeeDesignation.designationList
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
                        designation && designation.map((val, index) => {
                            return <MenuItem key={index} value={val.desg_slno}>{val.desg_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default DesignationSelect