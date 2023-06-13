import React, { memo, useState } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Earnings from './Earnings';
import Fixed from './Fixed';
import Deduction from './Deduction';

const TableView = ({ val }) => {

    //to open popover box
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [fixdata, setFixData] = useState({})

    const handleClick = (e, val) => {
        setFixData(val)
        setAnchorEl(e.currentTarget);
    };

    const [earnAnchorEl, setEarnAnchorEl] = useState(null)
    const open1 = Boolean(earnAnchorEl);
    const [earnData, setEarnData] = useState({})

    const getEarningDetls = (e, val) => {
        setEarnData(val)
        setEarnAnchorEl(e.currentTarget)
    }

    const [deductAnchorEl, setDeductAnchorEl] = useState(null)
    const open2 = Boolean(deductAnchorEl);
    const [deductData, setdeductData] = useState({})

    const getdeductDetls = (e, val) => {
        setdeductData(val)
        setDeductAnchorEl(e.currentTarget)
    }

    return (
        <>
            <Fixed open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} data={fixdata} />
            <Earnings open={open1} anchorEl={earnAnchorEl} setAnchorEl={setEarnAnchorEl} data={earnData} />
            <Deduction open={open2} anchorEl={deductAnchorEl} setAnchorEl={setDeductAnchorEl} data={deductData} />
            <TableRow  >
                {/* <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ minHeight: 25, fontWeight: 550 }}>
                    <CommonCheckBox />
                </TableCell> */}
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.em_name}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} >  {val.em_no}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.total_working_days}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} >{val.total_days} </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.fixedValue}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    <IconButton aria-label="delete" size="small" sx={{ p: 0 }}

                        onClick={(e) => handleClick(e, val)} >
                        <ListAltOutlinedIcon />
                    </IconButton>
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} >{val.earningvalue}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    <IconButton aria-label="delete" size="small" sx={{ p: 0 }}

                        onClick={(e) => getEarningDetls(e, val)} >
                        <ListAltOutlinedIcon />
                    </IconButton>
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} >{val.deductValue}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ color: '#003A75', fontWeight: 550 }} >
                    <IconButton aria-label="delete" size="small" sx={{ p: 0 }}

                        onClick={(e) => getdeductDetls(e, val)} >
                        <ListAltOutlinedIcon />
                    </IconButton>
                </TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.allesiemployee}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.allpfemployee}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.gross}</TableCell>
                <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }} > {val.net}</TableCell>
            </TableRow>

        </>
    )
}
export default memo(TableView) 