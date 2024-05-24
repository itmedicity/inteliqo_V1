import { Option, Select } from '@mui/joy'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const KraSelect = ({ value, setValue }) => {

    const [KraMast, setKraMast] = useState([])
    //getting Kra Details
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/KraMast/byStatus')
            const { success, data } = result.data
            if (success === 1) {
                setKraMast(data)
            } else {
                setKraMast([])
            }
        }
        getData()
    }, [])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Key Result Areas (KRA)</Option>
            {
                KraMast?.map((val, index) => {
                    return <Option key={index} value={val.kra_slno}>{val.kra_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(KraSelect) 