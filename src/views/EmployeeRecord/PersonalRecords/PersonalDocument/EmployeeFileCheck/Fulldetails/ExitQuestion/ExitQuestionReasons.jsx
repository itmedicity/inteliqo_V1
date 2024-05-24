import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const ExitQuestionReasons = () => {
    return (
        <>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Reasons for leaving (Please tick those which apply) </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Retirement </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>

                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Low Remuneration and Benefits </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Health reasons  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Higher Studies </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Long journey to work </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Relocation of partner </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Better career Prospects </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Improved status </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Better training and development opportunities </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Work Environment </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Others(Please state) </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Box sx={{ ml: 1 }}>
                                <JoyCheckbox
                                    sx={{}}
                                    name="workstation"
                                // checked={workstation}
                                // onchange={(e) => setworkstation(e.target.checked)}

                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Additional Comments </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>aaa </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Declaration </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>I declare to the best of my knowledge the information given in this form is correct. </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Employee Signature </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Date </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>Hospital representative interviewing the employee </Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Name and  Signature </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Date </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </>
    )
}

export default memo(ExitQuestionReasons)