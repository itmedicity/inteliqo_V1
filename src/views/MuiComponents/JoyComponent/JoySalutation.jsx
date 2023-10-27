import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const JoySalutation = ({ value, setValue }) => {

    const [saltation, setSalutation] = useState([]);
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        const getSaluation = async () => {
            const result = await axioslogin.get('/common/getSalutation');
            const { success, data } = await result.data;
            if (success === 1) {
                setSalutation(data);
            } else {
                setSalutation([])
            }
        }
        getSaluation();
    }, []);

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = saltation?.find((e) => e.sa_code === parseInt(value))
            setValue(array.sa_code)
        }
    }, [value, flag, saltation])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [value])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Salutation </Option>
            {
                saltation?.map((val, index) => {
                    return <Option key={index} value={val.sa_code}>{val.sal_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySalutation) 