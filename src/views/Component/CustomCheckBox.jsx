import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import React from 'react'

const CustomCheckBox = ({
    name, color, value, onChange, label, style
}) => {

    const customStyle = {
        paddingLeft: 2,
        paddingY: 0.3
    }
    return (
        <FormControl
            fullWidth
            margin='dense'
        >
            <FormControlLabel
                sx={{ ...customStyle, ...style }}
                control={
                    <Checkbox
                        name={name}
                        color={color}
                        value={value}
                    // onChange={(e) => onChange(e)}
                    />
                }
                label={label}
            >
            </FormControlLabel>
        </FormControl>
    )
}

export default CustomCheckBox