import { CssVarsProvider, Typography, Button } from '@mui/joy'
import { Box, IconButton, Paper } from '@mui/material'
import React from 'react'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const ScannedDoc = () => {
    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }} >
            <Paper sx={{ width: '20%', p: 0.5 }} >
                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Button
                            variant="soft"
                            startIcon={<FilePresentIcon />}
                            color="neutral"
                            sx={{ width: '100%', fontWeight: "bold" }}
                        >Accademic Documents</Button>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper sx={{ width: '80%', p: 0.5 }} >sada</Paper>
        </Box>
    )
}


export default ScannedDoc