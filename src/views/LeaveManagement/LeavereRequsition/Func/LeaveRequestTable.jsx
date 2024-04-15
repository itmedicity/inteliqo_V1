import { Box, Button, Option, Select, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import Sun from '@mui/icons-material/LightMode';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const LeaveRequestTable = ({ leaveArray, value, seletedLveDates }) => {
    const [selectedLeave, setSelectedLeave] = useState(0)
    const [leveSlno, setLeveSlno] = useState([])


    //HANDLE CHANGE FUNCTION FOR LEAVE TYPE SELECTION
    const handleChangeLeaveTypeSection = useCallback((e, val) => {
        //GET THE SELECTED LEAVE TYPE NAME AND SLNO
        const selectedLeaveTyepeName = e?.nativeEvent?.target?.innerText;
        setSelectedLeave(val)
        // SPREAD THE LEAVE TYPE AND SLNO
        value.leaveTypeName = val === null ? '' : selectedLeaveTyepeName;
        value.leavetype = val === null ? 0 : val;

        //FILTER THE DATE ARRAY BASED ON SELECTED LEAVE TYPE AND GET THE SELECTED LEAVES SLNO
        if (val !== null) {
            const selectedLeavesBasedType = seletedLveDates?.filter((el) => el.leavetype === val)?.map((e) => e.selectedLveSlno)
            setLeveSlno([...selectedLeavesBasedType])
        }
    }, [value])


    //HANDLE CHANGE LEAVE SELECTION
    const handleChangeLeaveName = useCallback((e, val) => {
        const selectedLeaveName = e?.nativeEvent?.target?.innerText;
        value.selectedLveSlno = val === null ? 0 : val;
    }, [value])

    const onClickLveName = useCallback((data) => {
        console.log(data)
        value.selectedLveName = data.month;
        value.selectedLvType = data.type;
        value.count = data.count;
        value.commonLeave = data.cmn;
        value.commonLeaveSlno = data.cmn === 1 ? data.common_slno : 0
    }, [value])

    return (
        <tr style={{ p: 0, m: 0 }} >
            <td>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 0 }} >
                    <Box>
                        <Typography
                            level="title-md"
                            textColor="var(--joy-palette-success-plainColor)"
                            fontFamily="monospace"
                            sx={{ opacity: '80%' }}
                        >
                            {format(value.date, 'dd-MMMM')}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            level="title-md"
                            textColor="var(--joy-palette-success-plainColor)"
                            fontFamily="monospace"
                            sx={{ opacity: '50%' }}
                        >
                            {format(value.date, 'eee')}
                        </Typography>
                    </Box>
                </Box>
            </td>
            <td>
                <Select
                    color="primary"
                    placeholder="Leave Type ....."
                    size="sm"
                    variant="outlined"
                    onChange={handleChangeLeaveTypeSection}
                    sx={{ py: 0 }}
                // disabled={disabled1}
                >
                    {
                        [...new Set(leaveArray?.map(e => JSON.stringify({ name: e.name, type: e.leavetype })))].map(JSON.parse)
                            ?.map((m, idx) => <Option value={m.type} key={idx} name={m.name} >{m.name}</Option>)
                    }
                </Select>
            </td>
            <td>
                <Select
                    color='primary'
                    placeholder="Select Leaves ...."
                    size="sm"
                    variant="outlined"
                    sx={{ py: 0 }}
                    onChange={handleChangeLeaveName}
                // disabled={disabled}
                >
                    <Option value={0} >Select Leaves ....</Option>
                    {
                        leaveArray?.filter((e) => e.leavetype === selectedLeave)
                            ?.filter(el => el.cmn === 0 ? !leveSlno.includes(el.slno) : el.cmn === 1)
                            ?.map((m, idx) => <Option value={m.slno} key={idx} onClick={() => onClickLveName(m)} >{m.month}</Option>)
                    }
                </Select>
            </td>
        </tr>
    )
}

export default memo(LeaveRequestTable) 