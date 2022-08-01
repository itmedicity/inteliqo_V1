import React from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from '@mui/material';
import { NearMeTwoTone } from '@material-ui/icons';

const SelectMult = ({ style, label }) => {
    const [age, setAge] = React.useState([]);
    console.log(age)
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const names = [
        "Ten",
        "Twenty",
        "Thirty",
        "Fourty",
        "Fifty"
    ]

    return (
        <FormControl fullWidth sx={{
            "&.MuiFormControl-root": {
                marginTop: '4px',
            },
        }} >
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={age}
                onChange={handleChange}
                multiple
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
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    )
}

export default SelectMult