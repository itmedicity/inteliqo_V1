import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { lazy } from 'react'
import { memo } from 'react'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Suspense } from 'react';
import { useState } from 'react';

const ShiftModal = lazy(() => import('./ShiftModal'))

const TableRows = ({ data, disable }) => {

    //MODAL OPEN STATE
    const [open, setOpen] = useState(false);

    return (
        <>
            <Suspense>
                <ShiftModal open={open} setOpen={setOpen} data={data} />
            </Suspense>
            <TableRow hover >
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {disable === true ? <IconButton aria-label="delete" size="small" sx={{ p: 0 }}
                        disabled
                    >
                        <ArticleOutlinedIcon />
                    </IconButton> : <IconButton aria-label="delete" size="small" sx={{ p: 0 }}
                        onClick={() => setOpen(true)} >
                        <ArticleOutlinedIcon />
                    </IconButton>}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {data.duty_day}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {data.em_no}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >{data.shift_in}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >{data.shift_out}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >
                    {data.punch_in}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >
                    {data.punch_out}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >{data.hrs_worked}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >{data.late_in !== null ? data.late_in : 0}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >{data.early_out !== null ? data.early_out : 0}</TableCell>
            </TableRow>
        </>
    )
}

export default memo(TableRows)