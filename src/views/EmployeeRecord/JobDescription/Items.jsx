import { Checkbox, CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Items = () => {
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
                    <CssVarsProvider>
                        <Checkbox
                            color="primary"
                            size="lg"
                            variant="outlined"
                        />
                    </CssVarsProvider>
                </Paper>
                <Paper square sx={{ display: "flex", px: 0.5, justifyContent: "center", alignItems: "center", width: "100%" }} variant="outlined" >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            asdasdasdasddddd asdasdasdas asdasdasd asdasdasdasd asdasd sdasdasdasdasd
                            asdasdasdasddddd asdasdasdas asdasdasd asdasdasdasd asdasd sdasdasdasdasd
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, justifyItems: "center" }} >
                <DeleteOutlinedIcon color='error' />
            </Box>
        </Box>
    )
}

export default Items