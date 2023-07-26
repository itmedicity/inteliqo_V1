import { FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const GeneralrequestSelect = ({ value, setValue }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getAllData = async () => {
            const result = await axioslogin.get(`/CommonRequestMast`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data)
            } else {
                setData([])
            }
        }
        getAllData()
    }, [])

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Request Type
                </MenuItem>
                {
                    data && data.map((val, index) => {
                        return <MenuItem key={index} value={val.slno}>{val.request_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(GeneralrequestSelect) 