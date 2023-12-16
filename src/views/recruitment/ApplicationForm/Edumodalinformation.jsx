import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Typography } from '@mui/joy';
import moment from 'moment';
const Edumodalinformation = ({ formdata, education, edudata, eduname }) => {

    return (
        <>
            <CustmTypog title={'Your Education Information'} />
            <TableContainer sx={{ mt: 2 }}>
                {edudata.map((val, index) => {
                    const correspondingEduName = eduname[index]; // Assuming there's a corresponding value in eduname

                    return (
                        <Table sx={{ p: 0, mt: 1, border: '1px solid #e0e0e0', width: '100%' }} key={val.id}>

                            <TableBody>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Education </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>

                                        <Typography sx={{ ml: 1 }}>{correspondingEduName?.edu_desc === "" ? "not updated" : correspondingEduName?.edu_desc} </Typography>

                                    </TableCell>
                                </TableRow>

                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> School Name</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>

                                        <Typography sx={{ ml: 1 }}>{val?.schoolname === "" ? "not updated" : val?.schoolname} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> Start Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.edustartdate === 0 ? "not updated" : moment(val?.edustartdate).format('DD-MM-YYYY')} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>End Date</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                        <Typography sx={{ ml: 1 }}>{val?.eduenddate === 0 ? "not updated" : moment(val?.eduenddate).format('DD-MM-YYYY')} </Typography>

                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>
                                            Graduated</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.Graduated === false ? "No" : val?.Graduated === true ? "Yes" : "not updated"}</Typography>
                                    </TableCell>
                                </TableRow>
                                {/* <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Region</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    </TableCell>
                                </TableRow> */}

                            </TableBody>

                        </Table>
                    )
                })}
            </TableContainer>
        </>
    )
}

export default memo(Edumodalinformation)