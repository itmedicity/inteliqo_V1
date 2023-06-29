import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
const UniversitySelect = ({ value, setValue, unidisable }) => {

    const [data, setData] = useState([])
    useEffect(() => {
        const getUniversity = async () => {
            const result = await axioslogin.get('/common/getUniver');
            const { data, success } = await result.data;
            if (success === 1) {
                setData(data)
            } else {
                setData([])
            }
        }
        getUniversity()
    }, []);

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                disabled={unidisable}
            >
                <MenuItem value={0} >
                    Select University
                </MenuItem>
                {
                    data && data.map((val, index) => {
                        return <MenuItem key={index} value={val.unver_slno}>{val.unver_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(UniversitySelect)