import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'


const JoyHrd = ({ value, setValue, unidisable }) => {

    // const [flag, setFlag] = useState(0)

    const [data, setData] = useState([])
    useEffect(() => {
        const getState = async () => {
            const result = await axioslogin.get('/applicationform/empselect');
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

            size='md'
            variant='outlined'
            disabled={unidisable}

        >
            <Option disabled value={0}>  Select Employee </Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.em_no}>{val.em_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyHrd)