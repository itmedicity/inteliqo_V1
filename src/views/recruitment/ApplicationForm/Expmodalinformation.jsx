import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Typography } from '@mui/joy';
import moment from 'moment';

const Expmodalinformation = ({ formdata, expdata }) => {
    // const { Workingstatus, Employer, expstartdate, expenddate, jobexp } = expdata
    return (
        <>
            <CustmTypog title={'Your Experience Information'} />
            <TableContainer sx={{ mt: 2 }}>
                {expdata?.map((val, index) => {
                    return (
                        <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }} key={val.id}>

                            <TableBody >
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Employer Name </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Employer === "" ? "not updated" : val?.Employer} </Typography>

                                    </TableCell>
                                </TableRow>

                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>  Job Title</Typography>


                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.jobexp === "" ? "not updated" : val?.jobexp} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> Start Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.expstartdate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>End Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                        <Typography sx={{ ml: 1 }}>{val?.expenddate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Currently Working</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Workingstatus === false ? "No" : val?.Workingstatus === true ? "Yes" : "not updated"}</Typography>

                                    </TableCell>
                                </TableRow>


                            </TableBody>

                        </Table>
                    )
                })}

            </TableContainer>
        </>
    )
}

export default memo(Expmodalinformation)