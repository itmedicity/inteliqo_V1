import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'

const PerformanceGradeScale = () => {

    const arr = [
        { slno: 1, grade: 'Score O', Score: '100%', description: ' Key Performer' },
        { slno: 1, grade: 'Score A', Score: '91-99%', description: ' Star Performer' },
        { slno: 1, grade: 'Score B', Score: '81-90%', description: ' Good Performer' },
        { slno: 1, grade: 'Score C', Score: '71-80%', description: ' Potential Performer' },
        { slno: 1, grade: 'Score D', Score: '61-70%', description: ' Genral Performer' }
    ]

    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", px: 3, width: '100%', }}>
                <Box border={1} sx={{ display: "flex", flex: 1, fontWeight: 500, justifyContent: 'center' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Grades
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ justifyContent: 'center', fontWeight: 500, display: "flex", flex: 1, }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Score
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ justifyContent: 'center', fontWeight: 500, display: "flex", flex: 1, }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Performance Description
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Box>

            {
                arr && arr.map((val, index) => {
                    return <Box sx={{ display: "flex", flexDirection: "row", px: 3, width: '100%', }}
                        key={index}
                    >
                        <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ display: "flex", flex: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.grade}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", flex: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.Score}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", flex: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.description}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                })
            }

        </Fragment >
    )
}

export default memo(PerformanceGradeScale) 