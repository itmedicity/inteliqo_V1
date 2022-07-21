
import { Box, TextareaAutosize } from '@mui/material'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const KraItem = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
            <Box sx={{ flex: 0, pr: 0.2 }} >
                <IconButton variant="outlined" size='sm' >
                    <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                </IconButton>
            </Box>
            <Box sx={{ flex: 2 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder="Sourcing"
                />
            </Box>
            <Box sx={{ flex: 3, px: 0.5 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder=""
                />
            </Box>
            <Box sx={{ flex: 3, }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder=""
                />
            </Box>
            <Box sx={{ flex: 0, px: 0.5 }} >
                <DeleteOutlinedIcon color='error' />
            </Box>

        </Box>
    )
}

export default KraItem