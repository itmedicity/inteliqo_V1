import React, { Fragment, useEffect, useState } from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { axioslogin } from 'src/views/Axios/Axios';

const BranchSelect = ({ value, setValue, style, label }) => {
    const [branchMast, setBranchMast] = useState([])
    useEffect(() => {
        const getBranchName = async () => {
            const result = await axioslogin.get('/branch');
            const { success, data } = await result.data;
            if (success === 1) {
                setBranchMast(data);
            }
        }
        getBranchName();
    }, []);
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
                        branchMast && branchMast.map((val, index) => {
                            return <MenuItem key={index} value={val.branch_slno}>{val.branch_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default BranchSelect