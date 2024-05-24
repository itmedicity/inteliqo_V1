import React, { lazy, memo } from 'react'
import { TableCell, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { Box, Typography } from '@mui/joy';

const PerformanceDataHod = lazy(() => import('./PerformanceDataHod'))


const PerformanceDataBalance = () => {
    return (
        <>
            <TableRow sx={{ p: 0 }}>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}> 6 </Typography>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}>Care of entrusted Materials </Typography>

                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Outstanding </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Very Careful</Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Careful </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Average </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Careless </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow sx={{ p: 0 }}>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}> 7 </Typography>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}>Compliance of Institutional Polices </Typography>

                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Outstanding </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Very High</Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>High </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Average </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Poor </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow sx={{ p: 0 }}>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}> 8 </Typography>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}>Personality,Behavior & Discipline </Typography>

                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Outstanding </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Very Good</Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Good </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Average </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Poor </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow sx={{ p: 0 }}>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}> 9 </Typography>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}>Reliability </Typography>

                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Outstanding </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Very High</Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>High </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Average </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Poor </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow sx={{ p: 0 }}>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}> 10 </Typography>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1 }}>Leadership </Typography>

                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Outstanding </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Very High</Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>High </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Average </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                    <Typography sx={{ ml: 1, textAlign: "center" }}>Poor </Typography>
                    <Box sx={{ borderTop: '1px solid #e0e0e0', textAlign: "center", pt: 1 }}>
                        <JoyCheckbox
                            sx={{}}
                            name="workstation"
                        // checked={workstation}
                        // onchange={(e) => setworkstation(e.target.checked)}

                        />
                    </Box>
                </TableCell>
            </TableRow>
            <PerformanceDataHod />
        </>
    )
}

export default memo(PerformanceDataBalance) 