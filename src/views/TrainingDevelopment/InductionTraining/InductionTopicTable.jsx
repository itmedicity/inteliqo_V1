import { TableCell, TableRow } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider, IconButton, Input } from '@mui/joy';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const InductionTopicTable = ({ value, ScheduleDate, handleChange }) => {

    const [newDate, setNewDate] = useState(moment(new Date(ScheduleDate)).format('YYYY-MM-DD'))
    const [start_date, setstart_date] = useState(moment(new Date()));

    const { topic, trainers_name, trainers, topic_slno, status } = value

    useEffect(() => {
        setNewDate(start_date)
    }, [start_date])

    const newObj = {
        trainers: trainers,
        topic_slno: topic_slno,
        topic: topic,
        trainers_name: trainers_name,
        newDate: (moment(new Date(newDate)).format('YYYY-MM-DD HH:mm:ss')),
    }

    return (
        <>
            <TableRow sx={{ p: 0.5 }} >
                <TableCell size='small' padding='none' sx={{ p: 1, minHeight: 25 }} > {topic}</TableCell>
                <TableCell size='small' padding='none' sx={{ p: 1, minHeight: 25 }} >{trainers_name} </TableCell>
                <TableCell size='small' padding='none' sx={{ p: 1, minHeight: 25, pt: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        < DatePicker
                            views={['day']}
                            value={start_date}
                            size="small"
                            onChange={(newValue) => {
                                setstart_date(newValue);
                            }}

                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    <CssVarsProvider>
                                        <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 500 }} />
                                    </CssVarsProvider>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
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
                </TableCell>
            </TableRow>
        </>
    )
}

export default memo(InductionTopicTable)






