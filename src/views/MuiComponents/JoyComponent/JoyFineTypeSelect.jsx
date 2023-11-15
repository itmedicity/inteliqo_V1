import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const JoyFineTypeSelect = ({ value, setValue, updatefine }) => {
    const [fine, setFine] = useState([]);
    const [flag, setFlag] = useState(0)

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

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = fine?.find((e) => e.fine_slno === value)
            setValue(array.fine_slno)
        }
    }, [value, setValue, flag, fine])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [setValue])


    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Fine/Deduction</Option>
            {
                fine?.map((val, index) => {
                    return <Option key={index} value={val.fine_slno}>{val.fine_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyFineTypeSelect) 