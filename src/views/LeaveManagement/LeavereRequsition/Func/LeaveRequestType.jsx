import React from 'react'
import { useState } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const LeaveRequestType = ({ onChange, onChangeVal }) => {

    const [leaveRequestType, setleaveRequestType] = useState([]);

    useEffect(() => {
        const getLeaveRequestType = async () => {
            const result = await axioslogin.get('/leaveRequestType/select')
            const { success, data } = result.data;
            if (success === 1) {

                const arr = data?.filter((val) => val.lrequest_slno !== 5 && val.lrequest_slno !== 6)
                setleaveRequestType(arr)
            } else {
                setleaveRequestType([]);
            }
        }
        getLeaveRequestType()

    }, []);

    //onchage leave requst select option
    const onChangeLeaveReqSelectOption = (e) => {
        onChange(e)
    }

    return (
        <Select
            defaultValue={onChangeVal}
            onChange={(e, val) => onChangeLeaveReqSelectOption(val)}
            size='sm'
            sx={{ width: '100%' }}
            variant='outlined'
            color='primary'
        >
            <Option value={0} disabled >Leave Request Type ...</Option>
            {
                leaveRequestType && leaveRequestType.map((val, index) => {
                    return <Option key={index} value={val.lrequest_slno}>{val.lrequest_type}</Option>
                })
            }
        </Select>

    )
}

export default memo(LeaveRequestType)