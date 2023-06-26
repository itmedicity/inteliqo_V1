import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const RegionSelectRedux = ({ value, setValue }) => {

    const pinwiseRegion = useSelector((state) => state.getPinWiseRegionData.pinWiseRegionList, _.isEqual)

    const reigionList = useMemo(() => pinwiseRegion, [pinwiseRegion]);

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
                <MenuItem value={0} disabled>
                    Select Region
                </MenuItem>
                {
                    reigionList && reigionList.map((val, ind) => {
                        return <MenuItem key={ind} value={val.reg_slno} >{val.reg_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default RegionSelectRedux