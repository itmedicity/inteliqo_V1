import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const UserGroupWithName = ({ value, setValue, setuserName }) => {
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

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setuserName(event.target.innerText);
            }}
            size='md'
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

export default memo(UserGroupWithName) 