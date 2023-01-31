import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const CommonLeaveOptionCmp = ({ active, setCommonLeve, value, setLeaveDesc }) => {
    const singleLeaveType = useSelector((state) => state.getEmpLeaveData.commonLeave, _.isEqual);
    const CommonLeaveType = useMemo(() => singleLeaveType, [singleLeaveType]);

    return (
        <FormControl
            fullWidth={true}
            margin="dense"
            size='small'
            sx={{ display: "flex", flex: 1 }}
        >
            <Select
                fullWidth
                variant="outlined"
                margin='dense'
                size='small'
                disabled={active === true ? false : true}
                value={value}
                onChange={(e) => setCommonLeve(e.target.value)}
            >
                <MenuItem value={0} disabled>
                    Select Common Single Leave Type
                </MenuItem>
                {
                    CommonLeaveType && CommonLeaveType.map((val, index) => {
                        return <MenuItem key={index} value={val.llvetype_slno} onClick={() => setLeaveDesc(val.lvetype_desc)} >{val.lvetype_desc}</MenuItem>
                    })

                }
            </Select>
        </FormControl>
    )
}

export default memo(CommonLeaveOptionCmp)