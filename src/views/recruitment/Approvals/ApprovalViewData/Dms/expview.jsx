import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Typography } from '@mui/joy';
import moment from 'moment'

const expview = ({ details }) => {
    const { exp } = details;
    return (
        <>
            <CustmTypog title={' Experience Information'} />
            <TableContainer>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Sl No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Employer Name </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Job Title</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Start Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>End Date</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Additional information</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography textColor="#000000" sx={{ ml: 1 }}>Currently Working</Typography>
                            </TableCell>
                        </TableRow>
                        {exp.map((val, index) => {
                            return (
                                <TableRow sx={{ p: 0 }} key={val.id}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}></Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Employer === "" ? "not updated" : val?.Employer} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.jobexp === "" ? "not updated" : val?.jobexp} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.expstartdate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.expenddate === 0 ? "not updated" : moment(val?.expenddate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Additionalinf === "" ? "not updated" : val?.Additionalinf} </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Workingstatus === false ? "No" : val?.Workingstatus === true ? "Yes" : "not updated"}</Typography>
                                    </TableCell>
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TableContainer sx={{ mt: 2 }}>
                {exp.map((val, index) => {
                    return (
                        <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }} key={val.id}>

                            <TableBody >
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Employer Name </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Employer === "" ? "not updated" : val?.Employer} </Typography>

                                    </TableCell>
                                </TableRow>

                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>  Job Title</Typography>


                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.jobexp === "" ? "not updated" : val?.jobexp} </Typography>

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
                                        <Typography sx={{ ml: 1 }}>{val?.expenddate === 0 ? "not updated" : moment(val?.expenddate).format('DD-MM-YYYY')} </Typography>
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
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Supervisor Name</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.SupervisorName === "" ? "not updated" : val?.SupervisorName} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Additional information</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Additionalinf === "" ? "not updated" : val?.Additionalinf} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Other information</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Other === "" ? "not updated" : val?.Other} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Responsibilities</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{val?.Responsibilities === "" ? "not updated" : val?.Responsibilities} </Typography>

                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>
                    )
                })}

            </TableContainer> */}
        </>
    )
}

export default memo(expview)