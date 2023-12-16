import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const EarnTypeSelect = ({ value, setValue }) => {

    const [list, setList] = useState([])

    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Earntype')
            const { success, data } = result.data;
            if (success === 1) {
                setList(data)
            } else {
                setList([])
            }
        }
        getemptypedata()
    }, []);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Earn Type </Option>
            {
                list?.map((val, index) => {
                    return <Option key={index} value={val.erning_type_id}>{val.earning_type_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(EarnTypeSelect) 