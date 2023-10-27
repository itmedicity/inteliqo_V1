import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const JoyDoctorTypeSelect = ({ value, setValue, disabled }) => {
    const [doctortype, setDoctortype] = useState([]);

    useEffect(() => {
        const getdoctypedata = async () => {
            const result = await axioslogin.get('/doctype/select')
            const { success, data } = result.data;
            if (success === 1) {
                setDoctortype(data)
            } else {
                setDoctortype([])
            }
        }
        getdoctypedata()
    }, []);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={disabled}
        >
            <Option disabled value={0}>Doctor Type </Option>
            {
                doctortype?.map((val, index) => {
                    return <Option key={index} value={val.doctype_slno}>{val.doctype_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyDoctorTypeSelect) 