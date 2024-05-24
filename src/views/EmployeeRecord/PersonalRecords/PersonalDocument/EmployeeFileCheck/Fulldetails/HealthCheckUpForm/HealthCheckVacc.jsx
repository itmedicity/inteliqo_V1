import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';

const HealthCheckVacc = () => {
    return (
        <>
            <Table>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '100%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>2.Vaccination details </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>A.Have you checked your titer within 1 year </Typography>
                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        label={"Yes"}
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                If Yes, Submit the Certificate
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>

                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
            <Table>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        label={"No"}
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Check the titer
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
            <CustmTypog title='Declaration by applicant' />
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>I hereby declare that the information given above are true and correct to the best of my knowledge and belief.I agree if this information is found to be incorrect/ false the company is free to terminate my job approval.</Typography>
            <Table>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>Name of the staff </Typography>
                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Signature
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Date
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </TableCell>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                a
                            </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                a
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </>
    )
}

export default memo(HealthCheckVacc)