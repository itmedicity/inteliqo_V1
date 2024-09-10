import React, { lazy, memo } from 'react'
import { Box, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const PerformanceDataBalance = lazy(() => import('./PerformanceDataBalance'))

const PerformanceData = () => {
    return (
        <Box >
            {/* <CustmTypog title={itemname} /> */}
            <TableContainer sx={{ mt: 2 }}>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}> Sl No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Parameter </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Outstanding </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Exceeds Expection </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Meets Expection </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Occasionally Meet </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Fails to Meet </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Points </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>5(A) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>4(B) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>3(C) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>2(D) </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textAlign: "center" }}>1(E) </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}> 1 </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Job Knowledge </Typography>

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
                                <Typography sx={{ ml: 1 }}> 2 </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Attitude towards work </Typography>

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
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Positive </Typography>
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
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Neutral </Typography>
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
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Negative </Typography>
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
                                <Typography sx={{ ml: 1 }}> 3 </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Initiative </Typography>

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
                                <Typography sx={{ ml: 1, textAlign: "center" }}>Low </Typography>
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
                                <Typography sx={{ ml: 1 }}> 4 </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Quality of work </Typography>

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
                                <Typography sx={{ ml: 1 }}> 5 </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1 }}>Quantity of Work </Typography>

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
                        <PerformanceDataBalance />
                    </TableBody>
                </Table>



            </TableContainer>

        </Box >
    )
}

export default memo(PerformanceData) 