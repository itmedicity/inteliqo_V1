import React, { useEffect, memo } from 'react'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';
import _ from 'underscore';
import { useMemo } from 'react';

const EarnDeductionSelection = ({ value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(getEarnDeduction()), [dispatch])

    const Earn = useSelector((state) => state.getEarnData.DataList, _.isEqual);
    const EarnValues = useMemo(() => Earn, [Earn])


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
                    EarnValues && EarnValues.map((val, index) => {
                        return <MenuItem key={index} value={val.earnded_id}>{val.earnded_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(EarnDeductionSelection)