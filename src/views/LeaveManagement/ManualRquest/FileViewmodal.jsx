import { Box, DialogContent } from '@mui/joy'
import { Dialog, Paper } from '@mui/material'
import React, { memo } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const FileViewmodal = ({ open, setOpen, fileUrsl }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="lg"
        >
            <DialogContent sx={{
                width: "100%",
                height: '60%',
                bgcolor: '#F6F6F6',
            }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{
                        flex: 1,
                        fontWeight: 'bold',
                        height: '50px',
                        //color: 'white',
                        fontSize: 20, p: 1
                    }}>
                        Attached File
                    </Box>
                    <Box sx={{
                        marginLeft: 'auto',
                        p: 1
                    }}>
                        <HighlightOffIcon sx={{
                            // color: 'white', 
                            cursor: 'pointer',
                            '&:hover': { color: '#F7BEC0' }
                        }} onClick={() => setOpen(false)} />
                    </Box>
                </Box>
                <Box sx={{ gap: 5 }}>
                    <Paper sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 700, width: 1000, mb: 1 }}>
                        <embed
                            id="pdf-embed"
                            src={fileUrsl}
                            type="application/pdf"
                            height={650}
                            width={'100%'} />

                    </Paper>

                </Box>
                {/* <DialogActions>
                    <Button
                        sx={{
                            //color: "white", 
                            fontWeight: 'bold', bgcolor: '#0C2D48'
                        }}
                        onClick={() => setOpen(false)}
                    >Cancel</Button>
                </DialogActions> */}
            </DialogContent>
        </Dialog>
    )
}

export default memo(FileViewmodal) 