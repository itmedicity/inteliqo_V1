import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const PermannetCategorySelect = ({ value, setValue, disable }) => {

    const [permanentData, setPermanentData] = useState([])

    useEffect(() => {
        const getPermanent = async () => {
            const result = await axioslogin.get(`/empcat/permanent/data`)
            const { success, data } = result.data
            if (success === 1) {
                setPermanentData(data)
            }
            else {
                setPermanentData([])
            }
        }
        getPermanent()
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
            <Option disabled value={0}> Employee Permanent Category</Option>
            {
                permanentData?.map((val, index) => {
                    return <Option key={index} value={val.category_slno}>{val.ecat_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(PermannetCategorySelect) 