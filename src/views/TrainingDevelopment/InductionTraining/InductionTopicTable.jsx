import { TableCell, TableRow } from '@mui/material'
import React, { memo, useState } from 'react'
import { IconButton } from '@mui/joy';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import moment from 'moment';

const InductionTopicTable = ({ value, ScheduleDate, handleChange }) => {

    const [newDate, setNewDate] = useState(moment(new Date(ScheduleDate)).format('YYYY-MM-DD'))
    const [start_date, setstart_date] = useState('')
    const { topic, trainers_name, trainers, topic_slno, status } = value;


    const getAlloDate = (e) => {
        setNewDate(e)
        setstart_date(e)
    }

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
                    <JoyInput
                        type="date"
                        size="sm"
                        name="start_date"
                        value={start_date}
                        onchange={(e) => getAlloDate(e)}
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
                </TableCell>
            </TableRow>
        </>
    )
}

export default memo(InductionTopicTable)






