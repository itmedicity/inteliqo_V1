import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { memo } from 'react';


const ExperienceItem = ({ val, setDeleteItem, jobedit }) => {

    const deleteexperience = (id) => {
        setDeleteItem(id)
    }
    return (
        <Box sx={{ display: "flex", width: "100%", alignItems: "center", px: 0.1 }} >
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {jobedit === 0 ? val.course : val.course}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {jobedit === 0 ? val.specialization : val.specialization}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, px: 0.2 }} >
                <IconButton variant="outlined" size='xs' onClick={(e) => deleteexperience(val.id)}>
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default memo(ExperienceItem) 