import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const EarnTypeSelect = ({ value, setValue }) => {

    const [earntype, setEarnType] = useState([])

    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Earntype')
            const { success, data } = result.data;
            if (success === 1) {
                setEarnType(data)
            } else {
                setEarnType([])
            }
        }

        getemptypedata()

    }, []);
    return (
        <FormControl fullWidth size="small"  >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} disabled >Select Earn Type</MenuItem>
                {
                    earntype && earntype.map((val, index) => {
                        return <MenuItem key={index} value={val.erning_type_id}>{val.earning_type_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(EarnTypeSelect) 