import { FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReligion } from 'src/redux/actions/Religion.Action'
import _ from 'underscore'

const ReligionSelectRedux = ({ value, setValue }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setReligion()), [dispatch])

    const empReligions = useSelector((state) => state.getEmployeeReligion.empRel, _.isEqual)
    const religionList = useMemo(() => empReligions, [empReligions]);

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Religion
                </MenuItem>
                {
                    religionList && religionList.map((val, index) => {
                        return <MenuItem key={index} value={val.relg_slno}>{val.relg_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(ReligionSelectRedux) 