import React, { Fragment, useCallback } from 'react';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import { TableCell, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';

const Mainviewdata = ({ tableData, setTableData, }) => {

    const handleCountChange = useCallback((newValue, property, val) => {
        const updatedTableData = tableData.map((item) => {
            if (item.em_designation_number === val.em_designation_number) {
                return { ...item, [property]: parseInt(newValue) };
            }
            return item;
        });
        setTableData(updatedTableData);
    }, [tableData, setTableData]);

    const groupedData = tableData.reduce((result, item) => {
        const { grade_desg } = item;
        // const gradeLabel = grade_desg || "No Grade";
        if (!result[grade_desg]) {
            result[grade_desg] = [];
        }
        result[grade_desg].push(item);
        return result;
    }, {});

    return (
        <>
            {Object.keys(groupedData).map((grade) => (
                <Fragment key={`grade-${grade}`}>
                    <TableRow>
                        <TableCell colSpan={4} sx={{ fontWeight: 'bold', p: .5 }}>
                            {grade}
                        </TableCell>
                    </TableRow>
                    {groupedData[grade].map((val, ind) => (
                        <TableRow key={`grade-${grade}-row-${ind}`} sx={{ p: 0 }}>
                            <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0' }}>{val?.desg_name}</TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    variant="plain"
                                    sx={{ p: 0, m: 0 }}
                                    type="number"
                                    value={val.MinCount === null ? 0 : val.MinCount}
                                    onchange={(newValue) => handleCountChange(newValue, "MinCount", val)}
                                    size="sm"
                                />
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    variant="plain"
                                    type="number"
                                    value={val.MaxCount === null ? 0 : val.MaxCount}
                                    onchange={(newValue) => handleCountChange(newValue, "MaxCount", val)}
                                    size="sm"
                                />
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '100px' }}>
                                <Box sx={{ display: 'flex', }}> <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>from:</Typography>
                                    <JoyInput
                                        variant="plain"
                                        type="number"
                                        value={val.salaryfrom === null ? 0 : val.salaryfrom}
                                        onchange={(newValue) => handleCountChange(newValue, "salaryfrom", val)}
                                        size="sm"

                                    />
                                    <Typography color="neutral" sx={{ mt: .4, mr: 1 }}>to:</Typography>
                                    <JoyInput
                                        variant="plain"
                                        type="number"
                                        value={val.salaryto === null ? 0 : val.salaryto}
                                        onchange={(newValue) => handleCountChange(newValue, "salaryto", val)}
                                        size="sm"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </Fragment>
            ))}
        </>
    );
}

export default Mainviewdata;
