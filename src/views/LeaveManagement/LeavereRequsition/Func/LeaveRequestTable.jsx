import { Option, Select } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import Sun from '@mui/icons-material/LightMode';
import Chip from '@mui/joy/Chip';

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
            // console.log(selectedLeavesBasedType)
            setLeveSlno([...selectedLeavesBasedType])
        }
    }, [value, leveSlno, leaveArray, selectedLeave])


    //HANDLE CHANGE LEAVE SELECTION
    const handleChangeLeaveName = useCallback((e, val) => {
        // console.log(val)
        const selectedLeaveName = e?.nativeEvent?.target?.innerText;
        value.selectedLveSlno = val === null ? 0 : val;

    }, [value, leveSlno, leaveArray, selectedLeave])



    return (
        <tr>
            {/* <td>{format(value.date, 'dd-MMMM-yyyy') + '  ' + format(value.date, 'EEEE')}</td> */}
            <td>
                <Chip
                    variant="soft"
                    color='primary'
                    startDecorator={<Sun fontSize='inherit' />}
                    // endDecorator={format(value.date, 'EEEE')}
                    sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        "--Chip-paddingInline": "50px",
                    }}
                >
                    {format(value.date, 'dd-MMMM-yyyy')}
                </Chip>
            </td>
            <td>
                <Select
                    defaultValue="dog"
                    color="primary"
                    placeholder="Leave Type ....."
                    size="sm"
                    variant="outlined"
                    onChange={handleChangeLeaveTypeSection}
                >
                    {
                        [...new Set(leaveArray?.map(e => JSON.stringify({ name: e.name, type: e.leavetype })))].map(JSON.parse)
                            ?.map((m, idx) => <Option value={m.type} key={idx} name={m.name} >{m.name}</Option>)
                    }
                </Select>
            </td>
            <td>
                <Select
                    defaultValue="dog"
                    color='primary'
                    placeholder="Select Leaves ...."
                    size="sm"
                    variant="outlined"
                    onChange={handleChangeLeaveName}
                >
                    {
                        leaveArray?.filter((e) => e.leavetype === selectedLeave)
                            ?.filter(el => el.cmn === 0 ? !leveSlno.includes(el.slno) : el.cmn === 1)
                            ?.map((m, idx) => <Option value={m.slno} key={idx} >{m.month + '-' + m.type + ' - ' + m.slno}</Option>)
                    }
                </Select>
            </td>
        </tr>
    )
}

export default memo(LeaveRequestTable) 