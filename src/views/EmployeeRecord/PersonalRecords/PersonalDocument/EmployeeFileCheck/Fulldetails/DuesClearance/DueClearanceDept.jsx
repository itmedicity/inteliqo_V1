import { Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const DueClearanceHr = lazy(() => import('./DueClearanceHr'))


const DueClearanceDept = () => {
    return (
        <>
            <Box sx={{ mt: 1 }}>
                <CustmTypog title="Clearance From Other Departments" />
            </Box>
            <Table sx={{ mt: 0, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>SN </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>DEPARTMENTS </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>REMARKS </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>SIGNATURE </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>1 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Store(Surgical) </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>2 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Canteen(Medicity Cafe)</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>3 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Canteen(Staff Canteen) </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>4 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>IT </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>5 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Store(General) </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>6 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Hostel </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>7 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Linen </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>8 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Uniform </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>9 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Key Section </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>10 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Library </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>11</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>MRD </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>12 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Quality </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>13 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Training and Development </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>

                </TableBody>
            </Table>
            <CustmTypog title="Any other Department" />
            <Table>
                <TableBody>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>14 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }}>
                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>15 </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '16%' }}>
                            <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
            <DueClearanceHr />
        </>

    )
}

export default memo(DueClearanceDept) 