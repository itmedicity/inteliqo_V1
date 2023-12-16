import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Box, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const Vacancylistinf = ({ vacancydata, selectedVacancies, setSelectedVacancies }) => {


    const handleCheckboxChange = (desgId, isChecked) => {
        if (isChecked) {
            setSelectedVacancies([...selectedVacancies, desgId]);
        } else {
            const updatedVacancies = selectedVacancies.filter(id => id !== desgId);
            setSelectedVacancies(updatedVacancies);
        }
    };

    return (
        <>
            <CustmTypog title={'Vacancy List Based on Your Qualification'} />
            <TableContainer sx={{ mt: 1 }}>
                {vacancydata.map((val, index) => {
                    return (
                        <Table sx={{ p: 0, mt: 1, border: '1px solid #e0e0e0', width: '100%' }} key={val.desg_id}>

                            <TableBody>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Number of Vacancy </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>

                                        <Typography sx={{ ml: 1 }}>{val?.manpower_required_no === "" ? "not updated" : val?.manpower_required_no} </Typography>

                                    </TableCell>
                                </TableRow>

                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Name Of Post</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{val?.desg_name === "" ? "not updated" : val?.desg_name} </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Click Tick to Apply For the Post</Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Box sx={{ ml: 1, mt: 1 }}>
                                            <JoyCheckbox
                                                label=''
                                                name={`recruitment_status_${val.desg_id}`}
                                                checked={selectedVacancies.includes(val.desg_id)}
                                                onchange={(e) => handleCheckboxChange(val.desg_id, e.target.checked)}
                                            />
                                        </Box>
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

export default memo(Vacancylistinf) 