import { Option, Select } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const RegionSelectRedux = ({ value, setValue }) => {

    const pinwiseRegion = useSelector((state) => state?.getPinWiseRegionData?.pinWiseRegionList, _.isEqual)

    const reigionList = useMemo(() => pinwiseRegion, [pinwiseRegion]);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
        >
            <Option disabled value={0}> Select Region</Option>
            {
                reigionList?.map((val, index) => {
                    return <Option key={index} value={val.reg_slno}>{val.reg_name}</Option>
                })
            }
        </Select>

    )
}

export default memo(RegionSelectRedux) 