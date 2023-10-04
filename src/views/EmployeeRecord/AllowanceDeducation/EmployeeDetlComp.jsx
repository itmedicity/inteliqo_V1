import { TableCell, TableRow } from '@mui/material'
import React, { memo, useState } from 'react'
import { IconButton, Input } from '@mui/joy';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import moment from 'moment';

const EmployeeDetlComp = ({ value, selectMonth, firstAmount, handleChange }) => {
    const [newDate, setNewDate] = useState(moment(new Date(selectMonth)).format('YYYY-MM-DD'))
    const [newAmount, setNewamount] = useState(firstAmount)

    const { em_no, em_name, earnded_name, em_amount, status } = value;

    const [start_date, setstart_date] = useState(moment(new Date(selectMonth)).format('YYYY-MM-DD'))
    const [increment_amount, setincrement_amount] = useState(firstAmount)

    const getAlloDate = (e) => {
        setstart_date(e)
        setNewDate(e)
    }

    const getAmount = (e) => {
        setincrement_amount(e.target.value)
        setNewamount(e.target.value)
    }

    const newObj = {
        em_no: em_no,
        newDate: newDate,
        newAmnt: newAmount
    }

    return (
        <>
            <TableRow sx={{ p: 0.5 }} >
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }} > {em_no}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }} >  {em_name}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }} > {earnded_name}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }} >{em_amount} </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, pt: 0.5 }} >
                    <JoyInput
                        type="date"
                        size="sm"
                        name="start_date"
                        value={start_date}
                        onchange={(e) => getAlloDate(e)}
                    />
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    <Input
                        variant='outlined'
                        placeholder="Amount"
                        required
                        value={increment_amount}
                        onChange={getAmount}
                    />
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {
                        status === 0 ? <IconButton aria-label="delete" size="small" sx={{ p: 0 }}
                            onClick={() => handleChange(newObj)} >
                            <AddTaskRoundedIcon />
                        </IconButton> : <IconButton aria-label="delete" size="small" sx={{ p: 0 }} disabled >
                            <AddTaskRoundedIcon />
                        </IconButton>
                    }


                    {/* <IconButton aria-label="delete" size="small" sx={{ p: 0 }}
                        onClick={() => handleChange(newObj)} >
                        <AddTaskRoundedIcon />
                    </IconButton> */}
                </TableCell>
            </TableRow>
        </>
    )
}

export default memo(EmployeeDetlComp) 