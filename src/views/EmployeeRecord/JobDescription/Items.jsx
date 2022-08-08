import { CssVarsProvider } from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const Items = ({ val, id, setEdit, setDelete }) => {
    const EditItem = (id) => {
        setEdit(id)
    }
    const DeleteItem = (id) => {
        setDelete(id)
    }
    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1, }} >
            <Box sx={{ display: "flex", flex: 1, pr: 1, flexDirection: "row" }}>
                <Paper
                    square
                    variant="outlined"
                    sx={{
                        display: "flex",
                        px: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "inherit",
                        minHeight: 32
                    }}
                >
                    <Box sx={{ flex: 0, pr: 0.2 }} >
                        <IconButton variant="outlined" size='sm' onClick={(e) => EditItem(val.id)} >
                            <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                        </IconButton>
                    </Box>
                </Paper>
                <Paper square sx={{ display: "flex", px: 0.5, justifyContent: "center", alignItems: "center", width: "100%" }} variant="outlined" >
                    <CssVarsProvider>
                        <Typography level="body1">
                            {val.dutiess}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, justifyItems: "center" }} >
                <IconButton variant="outlined" size='sm' onClick={(e) => DeleteItem(val.id)} >
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Items