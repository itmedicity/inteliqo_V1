import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const GroupMultiSelect = ({ value, setValue }) => {


    const [groupName, setGroupName] = useState([])

    useEffect(() => {
        const getGroupNameList = async () => {
            const result = await axioslogin.get('/usergroup/select')
            const { data, success } = result.data
            if (success === 1) {
                setGroupName(data)
            } else {
                setGroupName([])
            }
        }
        getGroupNameList()
    }, [])

    const handlechange = useCallback((e, newValue) => {
        setValue(newValue);
    }, [setValue])

    return (
        <Select
            defaultValue={[]}
            value={value}
            onChange={(e, newValue) => handlechange(e, newValue)}
            sx={{
                minWidth: '13rem',
            }}
            multiple
            variant='outlined'
        >
            <Option disabled value={0}>Select Group Name</Option>
            {
                groupName?.map((val, index) => {
                    return <Option key={index} value={val.user_grp_slno}>{val.user_group_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(GroupMultiSelect) 