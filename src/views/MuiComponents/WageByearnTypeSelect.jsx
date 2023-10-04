import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';
import _ from 'underscore';

const WageByearnTypeSelect = ({ value, setValue, earntype }) => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    useEffect(() => dispatch(getEarnDeduction()), [dispatch])

    const Earn = useSelector((state) => state.getEarnData.DataList, _.isEqual);
    const EarnValues = useMemo(() => Earn, [Earn])

    useEffect(() => {
        if (Object.keys(EarnValues).length !== 0) {
            const arr = EarnValues.filter((val) => val.erning_type_id === earntype)
            setData(arr)
        } else {
            setData([])
        }
    }, [earntype, EarnValues])

    return (
        <FormControl fullWidth size="small"  >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} disabled >Select Wage Type</MenuItem>
                {
                    data && data.map((val, index) => {
                        return <MenuItem key={index} value={val.earnded_id}>{val.earnded_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(WageByearnTypeSelect) 