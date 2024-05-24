import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'


const JoyState = ({ value, setValue, disabled }) => {

    // const [flag, setFlag] = useState(0)

    const [data, setData] = useState([])
    useEffect(() => {
        const getState = async () => {
            const result = await axioslogin.get('/common/getState');
            const { data, success } = await result.data;
            if (success === 1) {
                setData(data)
            } else {
                setData([])
            }
        }
        getState()
    }, []);

    const handleOnChange = (event, newValue) => {
        if (newValue === null) {
            // setSectName('');
        } else {
            setValue(newValue);
            // setSectName(event.target.innerText);
        }
    };
    return (
        <Select
            value={value}
            // onChange={(event, newValue) => {
            //     Onclick(newValue);
            //     setSectName(event.target.innerText === null ? event.target.innerText : event.target.innerText)

            // }}
            onChange={handleOnChange}
            disabled={disabled}
            size='md'
            variant='outlined'
        // disabled={unidisable}

        >
            <Option disabled value={0}>  Select State </Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.state_slno}>{val.state_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyState)