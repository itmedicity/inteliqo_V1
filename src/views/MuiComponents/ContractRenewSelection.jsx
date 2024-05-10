import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const ContractRenewSelection = ({ value, setValue, disable }) => {
    const [renewCate, setRenewCate] = useState([])

    useEffect(() => {
        const getCate = async () => {
            const result = await axioslogin.get(`/empcat/rewnewCate/List`)
            const { success, data } = result.data
            if (success === 1) {
                setRenewCate(data)
            }
            else {
                setRenewCate([])
            }
        }
        getCate()
    }, [])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={disable}
        >
            <Option disabled value={0}> Employee Category</Option>
            {
                renewCate?.map((val, index) => {
                    return <Option key={index} value={val.category_slno}>{val.ecat_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(ContractRenewSelection) 