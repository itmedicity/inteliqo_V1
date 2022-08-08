import { Box, MenuItem, Select } from '@mui/material'
import React from 'react'

const MenuSelection = (
    { value,
        updatefn
    }) => {
    return (
        <Box
            style={{
                width: 250,
                alignItems: 'center'
            }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="value"
                value={value}
                onChange={(e) => updatefn(e.target.value)}
                fullWidth
                size='small'
                className="ml-1"
                defaultValue={0}
                sx={{
                    height: 25,
                }}
            >
                {/* menu item  */}
                <MenuItem value={0} disabled>
                    Select Experience
                </MenuItem>
                <MenuItem value={1} > TMCH </MenuItem>
                <MenuItem value={2} >NON TMCH</MenuItem>
                <MenuItem value={3} >Current Experience</MenuItem>
                <MenuItem value={4} >Current+Previous </MenuItem>
                <MenuItem value={5} >TMCH+Current</MenuItem>
                <MenuItem value={6} >Current+Previous+TMCH</MenuItem>
            </Select>
        </Box>
    )
}

export default MenuSelection