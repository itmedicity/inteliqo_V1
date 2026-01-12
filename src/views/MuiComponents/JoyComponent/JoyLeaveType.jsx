import React, { memo, useEffect, useState } from 'react'
import { Option, Select } from '@mui/joy';
import { axioslogin } from '../../Axios/Axios';
import { useSelector } from 'react-redux';

const JoyLeaveType = ({ value, setValue }) => {
    const [leavetype, setleaveType] = useState([]);

    const commonSettings = useSelector((state) => state?.getCommonSettings)

    const { carry_hl, carry_el, carry_cl, carry_sl } = commonSettings

    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/leaveType/select')
                .then((response) => {
                    const arr = response?.data?.data?.filter((val) => {
                        if (carry_cl === 1 || carry_el === 1 || carry_hl === 1 || carry_sl === 1) {
                            return val.lvetype_slno === 1 || val.lvetype_slno === 7 || val.lvetype_slno === 8
                        }
                        //return response.data.data;
                    })
                    setleaveType(arr)
                })  
        
                .catch((error) => {
                    return error;
                });
            return result;
        }
        getleaveTypeData();
    }, [carry_hl, carry_el, carry_cl, carry_sl])
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Leave Type </Option>
            {
                leavetype?.map((val, index) => {
                    return <Option key={index} value={val.lvetype_slno}>{val.lvetype_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyLeaveType) 