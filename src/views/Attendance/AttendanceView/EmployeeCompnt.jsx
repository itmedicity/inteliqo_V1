import React, { Fragment, useMemo } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const EmployeeCompnt = ({ mainArray }) => {

    const empArray = useMemo(() => mainArray, [mainArray]);

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={0} sx={{
                    display: "flex",
                    p: 1,
                    alignItems: "center",
                }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='black' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Attendance Details
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Box component={Grid}
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        display: 'flex',
                        overflow: 'auto',
                        '::-webkit-scrollbar': {
                            height: 8,
                        },
                        '::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                            borderRadius: '0px',
                        },

                        '::-webkit-scrollbar-thumb': {
                            // background: '#077DFA',
                            borderRadius: '0px',
                        },

                        '::-webkit-scrollbar-thumb:hover': {
                            //   background: 'rgb(255, 251, 251)',
                        },
                        p: 1
                    }} >
                    <TableContainer component={Grid}
                        item
                        xs={'auto'}
                        sm={'auto'}
                        md={'auto'}
                        lg={'auto'}
                        xl={'auto'}
                        sx={{
                            display: 'flex',
                        }}>
                        <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                            <TableHead>
                                <TableRow>
                                    {empArray && empArray.map((val, index) => (
                                        <TableCell key={index} sx={{
                                            width: 100,
                                            p: 0,
                                            border: 0.1, borderColor: '#E1E6E1',
                                            backgroundColor: val.holiday === 1 ? '#e3f2fd' : '#f1faee',
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{ minHeight: 25, maxHeight: 25, textAlign: 'center' }}
                                            >
                                                {val.date}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {empArray && empArray.map((val, index) => (
                                        <TableCell key={index} sx={{
                                            p: 0,
                                            width: 100,
                                            backgroundColor: val.sunday === '0' ? '#ffebee' : '#f1faee',
                                            border: 0.1,
                                            borderColor: '#E1E6E1',
                                        }}
                                        >
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                    textTransform: 'capitalize',
                                                    color: val.holiday === 1 || val.sunday === '0' ? '#880e4f' : '#212121'
                                                }}
                                            >
                                                {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    selected={true}
                                    hover={true}
                                >
                                    {empArray && empArray.map((row, index) => (
                                        <TableCell key={index} sx={{ p: 0, width: 100, }}>
                                            <Box
                                                component={Grid}
                                                item
                                                sx={{
                                                    minHeight: 25, maxHeight: 25,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {row.duty_desc}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Fragment>
    )
}

export default EmployeeCompnt