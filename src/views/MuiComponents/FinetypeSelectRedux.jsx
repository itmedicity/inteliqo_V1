import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const FinetypeSelectRedux = ({ value, setValue, updatefine }) => {
    const [fine, setFine] = useState([]);

    useEffect(() => {
        const getFine = async () => {
            const result = await axioslogin.get('/common/getfineded');
            const { data, success } = await result.data;
            if (success === 1) {
                setFine(data)
            } else {
                setFine([])
            }
        }
        getFine()
    }, [updatefine]);

    return (
        <FormControl
            fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Fine/Deduction
                </MenuItem>
                {
                    fine && fine.map((val, index) => {
                        return <MenuItem key={index} value={val.fine_slno}>{val.fine_desc}
                        </MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default FinetypeSelectRedux