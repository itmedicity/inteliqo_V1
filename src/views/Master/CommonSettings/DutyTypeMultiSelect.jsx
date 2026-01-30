import { Option, Select } from '@mui/joy';
import React, { memo } from 'react'
import { useQuery } from 'react-query';
import { getDoctordutyList } from '../MenuCreationMaster/FuncLis';

const DutyTypeMultiSelect = ({ value, setValue }) => {

    const {
        data: dutyList,
        isLoading: isdoctorDutyLoading,
        error: doctorDutyError,
    } = useQuery({
        queryKey: ['doctorDutyList'],
        queryFn: getDoctordutyList,
    })

    return (
        <Select
            defaultValue={[]}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            multiple
            variant='outlined'
            sx={{ width: '100%' }}
        >
            <Option disabled value={[]}> Select Category</Option>
            {
                dutyList?.map((val, index) => {
                    return <Option key={index} value={val.dutyslno}>{val.duty_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DutyTypeMultiSelect) 
