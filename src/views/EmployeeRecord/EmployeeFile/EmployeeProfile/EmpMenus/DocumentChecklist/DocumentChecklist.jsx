import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const DocumentChecklist = () => {
    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Document Checklist
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default DocumentChecklist