import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'


const JoyUniversitySelect = ({ value, setValue, unidisable, setSectName }) => {
    // const [flag, setFlag] = useState(0)

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

    const handleOnChange = (event, newValue) => {
        if (newValue === null) {
            setSectName('');
        } else {
            setValue(newValue);
            setSectName(event.target.innerText);
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
            <Option disabled value={0}>  Select University </Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.unver_slno}>{val.unver_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyUniversitySelect)