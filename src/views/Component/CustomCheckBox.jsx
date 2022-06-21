import { FormControl, FormControlLabel } from '@mui/material'
import React from 'react'

const CustomCheckBox = () => {
    return (
        <FormControl
            fullWidth
            margin='dense'
            className='mt-1 mb-2'
        >
            <FormControlLabel
                control={
                    <Checkbox
                        name="test"
                        color="secondary"
                        value={false}
                    // onChange={() => onChange(e)}
                    />
                }
                label="checkbox"
            >
            </FormControlLabel>
        </FormControl>
    )
}

export default CustomCheckBox