import { Option, Select } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const BankSelection = ({ setValue, value }) => {
    const [Bank, setBank] = useState([])
    useEffect(() => {
        const getBankMaster = async () => {
            const result = await axioslogin.get('/bank/getbank/bankmaster')
            const { success, data } = result.data
            if (success === 1) {
                setBank(data)
            } else {
                setBank([])
            }
        }
        getBankMaster()
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
            <Option disabled value={0}>Select Bank</Option>
            {
                Bank?.map((val, index) => {
                    return <Option key={index} value={val.bankmast_slno}>{val.bankmast_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(BankSelection) 