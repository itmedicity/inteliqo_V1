import React from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from '@mui/material';

const SelectBasic = ({ style, label }) => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{
            "&.MuiFormControl-root": {
                marginTop: '4px',
            },
        }} >
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
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
                <MenuItem sx={{ height: 30 }} value="" >{label}</MenuItem>
                <MenuItem value={10} sx={{ height: 30 }}>Ten</MenuItem>
                <MenuItem value={20} sx={{ height: 30 }}>Twenty</MenuItem>
                <MenuItem value={30} sx={{ height: 30 }}>Thirty</MenuItem>
            </Select>
        </FormControl >
    )
}

export default SelectBasic