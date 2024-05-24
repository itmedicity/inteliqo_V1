import React, { lazy, memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';

const ExitQuestionManag = lazy(() => import('./ExitQuestionManag'))

const Question = () => {
    return (
        <>
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Excellent</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Good</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Average </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Need Improvement </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>Unsatisfactory </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Responsibility Given</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Work Load</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Management of your development </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Job Security</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Ambience</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Location</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Physical working condition</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Equipments</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Internal Relationship</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Relationship with peers</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Relationship with subordinates</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Relationship with Manager /dept.Head</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Team Work</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Communication within the department</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Communication with in the organization</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Renumeration and Benefits</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Salary</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Holiday</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Medical</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography level="title-md" sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <ExitQuestionManag />
        </>
    )
}

export default memo(Question)