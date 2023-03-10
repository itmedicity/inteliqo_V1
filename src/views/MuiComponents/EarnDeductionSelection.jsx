import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';
import _ from 'underscore';
import { useMemo } from 'react';

const EarnDeductionSelection = ({ style, value, setValue }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(getEarnDeduction()), [dispatch])

    const Earn = useSelector((state) => state.getEarnData.DataList, _.isEqual);
    const EarnValues = useMemo(() => Earn, [Earn])


    return (
        <Box sx={{ width: '100%' }}>
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                // sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                // sx={{ ...style, minWidth: 100 }}
                >
                    <MenuItem value={0} disabled >Select Wage Type</MenuItem>
                    {
                        EarnValues && EarnValues.map((val, index) => {
                            return <MenuItem key={index} value={val.earnded_id}>{val.earnded_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(EarnDeductionSelection)