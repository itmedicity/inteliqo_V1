import { Box, Button } from '@mui/joy'
import { Modal, Paper } from '@mui/material'
import React, { memo } from 'react'

const ChecklistmodalView = ({ selectedFiles, selectedFileIndex, setSelectedFileIndex }) => {

    return (

        < Modal open={selectedFileIndex !== -1
        } onClose={() => setSelectedFileIndex(-1)}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    width: '80%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        width: '100%',
                        height: window.innerHeight - 85,
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {selectedFileIndex !== -1 && (
                        <>
                            {selectedFiles[selectedFileIndex].type.startsWith('image/') ? (
                                // Display the selected image
                                <img
                                    src={URL.createObjectURL(selectedFiles[selectedFileIndex])}
                                    alt="Selected File"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            ) : (
                                // Display the selected PDF file using the 'object' element
                                <object
                                    data={URL.createObjectURL(selectedFiles[selectedFileIndex])}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                >
                                    PDF Viewer not available. You can download the PDF file{' '}
                                    <a href={URL.createObjectURL(selectedFiles[selectedFileIndex])}>here</a>.
                                </object>
                            )}
                        </>
                    )}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="outlined" color="primary" onClick={() => setSelectedFileIndex(-1)}>
                        Close
                    </Button>
                </Box>
            </Paper>
        </Modal >
    )
}

export default memo(ChecklistmodalView)