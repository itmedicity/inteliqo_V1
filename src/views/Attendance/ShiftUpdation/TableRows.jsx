import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { lazy } from 'react'
import { memo } from 'react'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Suspense } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { Chip } from '@mui/joy';
import { format, isValid } from 'date-fns';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const ShiftModal = lazy(() => import('./ShiftModal'))

const TableRows = ({ data, disable, no, punchData, punchMaster, setTableArray }) => {

    const state = useSelector((state) => state?.getCommonSettings)
    const commonSetting = useMemo(() => state, [state])

    const { group_slno, cmmn_early_out, cmmn_grace_period, cmmn_late_in, salary_above,
        week_off_day, notapplicable_shift, default_shift, noff } = commonSetting;

    // console.log(data)
    const { isNOff, isWeekOff } = data;
    const hideStatus = data?.hideStatus;
    //MODAL OPEN STATE
    const [open, setOpen] = useState(false);
    return (
        <>
            <Suspense>
                <ShiftModal open={open} setOpen={setOpen} data={data} punchData={punchData} punchMast={punchMaster} setTableArray={setTableArray} />
            </Suspense>
            <TableRow hover sx={{ backgroundColor: (data?.late_in > 0 || data?.early_out) ? '#FCD7D7' : (data?.isWeekOff === true || data?.isNOff === true) ? '#CBE6CE' : '' }} >
                {
                    hideStatus === 0 ?
                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                            {
                                disable === true ?
                                    <IconButton aria-label="delete" size="small" sx={{ p: 0 }} disabled><ArticleOutlinedIcon /></IconButton>
                                    :
                                    (isNOff === true || isWeekOff === true) ?
                                        <IconButton aria-label="delete" size="small" sx={{ p: 0 }} disabled  ><ArticleOutlinedIcon color='disabled' /></IconButton>
                                        :
                                        <IconButton aria-label="delete" size="small" sx={{ p: 0 }} onClick={() => setOpen(true)} ><ArticleOutlinedIcon color='secondary' /></IconButton>
                            }
                        </TableCell> :
                        <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >{no + 1}</TableCell>
                }
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {moment(data.duty_day).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    {data.em_no}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >{data.shift_in}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >{data.shift_out}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >
                    {isValid(new Date(data.punch_in)) && data.punch_in !== null ? format(new Date(data.punch_in), 'dd/MM/yyyy HH:mm') : data.punch_in}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550, textTransform: 'lowercase' }} >
                    {isValid(new Date(data.punch_out)) && data.punch_out !== null ? format(new Date(data.punch_out), 'dd/MM/yyyy HH:mm') : data.punch_out}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >{data.hrs_worked}</TableCell>
                <TableCell size='small' padding='none' align="center"
                    sx={{
                        color: data?.late_in > 0 ? 'white' : '#003A75',
                        fontWeight: 550,
                        backgroundColor: (data?.late_in === 0 || cmmn_grace_period >= data?.late_in) ? 'green' : '#FB5C5C'
                    }}
                >
                    {data.late_in !== null ? data.late_in : 0}
                </TableCell>
                <TableCell size='small' padding='none' align="center"
                    sx={{
                        color: data?.early_out > 0 ? 'white' : '#003A75',
                        fontWeight: 550, backgroundColor: data?.early_out > 0 && '#F8698D'
                    }}
                >
                    {data.early_out !== null ? data.early_out : 0}
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#860707', fontWeight: 200 }} >
                    <Chip size="sm" variant="outlined" sx={{ fontSize: 10, fontWeight: 700, m: 0 }} >{data.duty_desc}</Chip>
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#860707', fontWeight: 200 }} >
                    <Chip size="sm" variant="outlined" sx={{ fontSize: 10, fontWeight: 700, m: 0 }} >{data.lvereq_desc}</Chip>
                </TableCell>
            </TableRow>
        </>
    )
}

export default memo(TableRows)