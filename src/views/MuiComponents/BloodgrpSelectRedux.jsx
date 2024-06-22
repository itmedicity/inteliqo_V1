import React, { useEffect, memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';
import { Option, Select } from '@mui/joy';

const BloodgrpSelectRedux = ({ value, setValue }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setBloodgrp()), [dispatch])

    const data = useSelector((state) => state.getEmployeeBloodgrp.empBlood, _.isEqual)
    const bloodgrp = useMemo(() => data, [data])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option value={0} disabled> Select Blood Group</Option>
            {
                bloodgrp?.map((val, ind) => {
                    return <Option key={ind} value={val.group_slno}>{val.group_name}</Option>
                })
            }
        </Select>
        // <FormControl fullWidth
        //     size='small'   >
        //     <Select
        //         value={value}
        //         onChange={(e) => setValue(e.target.value)}
        //         size="small"
        //         fullWidth
        //         variant='outlined'
        //     >
        //         <MenuItem value={0} >
        //             Select Blood Group
        //         </MenuItem>
        //         {
        //             bloodgrp && bloodgrp.map((val, index) => {
        //                 return <MenuItem key={index} value={val.group_slno}>{val.group_name}</MenuItem>
        //             })
        //         }
        //     </Select>
        // </FormControl>
    )
}

export default memo(BloodgrpSelectRedux)