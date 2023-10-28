import React, { Fragment, useState } from 'react';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { TableCell, TableRow } from '@mui/material';

const Mainviewdata = ({ tableData, setTableData, maxcount, mincount, setmincount, setmaxcount }) => {

    // const getValue = async (e, val) => {
    //     const obj = {
    //         maxcount: maxcount,
    //         mincount: mincount,
    //     };
    //     let arr = tableData.map((item) => item.em_designation_number === val.em_designation_number ? { ...item, ...obj, status: 1 } : item);
    //     setTableData(arr);
    // }

    const handleCountChange = (newValue, property, val) => {
        const updatedTableData = tableData.map((item) => {
            if (item.em_designation_number === val.em_designation_number) {
                return { ...item, [property]: parseInt(newValue) };
            }
            return item;
        });
        setTableData(updatedTableData);
    }

    const groupedData = tableData.reduce((result, item) => {
        const { grade_desg } = item;
        const gradeLabel = grade_desg || "No Grade";
        if (!result[gradeLabel]) {
            result[gradeLabel] = [];
        }
        result[gradeLabel].push(item);
        return result;
    }, {});

    return (
        <>
            {Object.keys(groupedData).map((grade) => (
                <Fragment key={`grade-${grade}`}>
                    <TableRow>
                        <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                            {grade}
                        </TableCell>
                    </TableRow>
                    {groupedData[grade].map((val, ind) => (
                        <TableRow key={`grade-${grade}-row-${ind}`} sx={{ p: 0 }}>
                            <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0' }}>{val?.desg_name}</TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    sx={{ p: 0, m: 0 }}
                                    type="number"
                                    value={val.MinCount === null ? 0 : val.MinCount}
                                    onchange={(newValue) => handleCountChange(newValue, "MinCount", val)}
                                    size="sm"
                                />
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    type="number"
                                    value={val.MaxCount === null ? 0 : val.MaxCount}
                                    onchange={(newValue) => handleCountChange(newValue, "MaxCount", val)}
                                    size="sm"
                                />
                            </TableCell>
                            {/* <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                {val.status === 0 ? (
                                    <ControlPointIcon
                                        sx={{ color: '#90caf9' }}
                                        fontSize="small"
                                        onClick={(e) => getValue(e, val)}
                                    />
                                ) : (
                                    <ControlPointIcon fontSize="small" sx={{ color: '#81c784' }} />
                                )}
                            </TableCell> */}
                        </TableRow>
                    ))}
                </Fragment>
            ))}
        </>
    );
}

export default Mainviewdata;
