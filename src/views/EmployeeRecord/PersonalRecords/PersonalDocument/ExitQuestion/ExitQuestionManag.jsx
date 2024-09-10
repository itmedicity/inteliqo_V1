import React, { lazy, memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';

const ExitQuestionReasons = lazy(() => import('./ExitQuestionReasons'))

const ExitQuestionManag = () => {
    return (
        <>

            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Line Managment</Typography>
                            <Typography sx={{ ml: 1 }}>(Did you Immediate Manager)</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}>Always</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}>Usually</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>Seldom </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>Never </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Explain about roles and responsibilities ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Give praise for work well done ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Give help when needed ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Inform you regarding your progress ?</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Listen Suggestions/criticism </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "20%" }}>
                            <Typography sx={{ ml: 1 }}>Deal promptly with problems </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}> </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>  </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>Which organization are you going to work for ?  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>aa  </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table sx={{ mt: 1 }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>How did you find your new position ?  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow>

                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "12%" }}>
                            <Typography sx={{ ml: 1, }}>aa  </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <ExitQuestionReasons />
        </>
    )
}

export default memo(ExitQuestionManag)