import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Option, Select } from '@mui/joy';

const JoyDeptSectWiseTrainers = ({ value, setValue }) => {
    const data = useSelector((state) => state?.gettrainingData?.DeptSectnWiseTrainers?.DeptSectnWiseTrainersList)
    const Trainers = useMemo(() => data, [data])

    return (
        <Select
            defaultValue={[]}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            multiple
        >
            <Option disabled value={0}> Select Trainers</Option>
            {
                Trainers?.map((val, index) => {
                    return <Option key={index} value={val.em_id}>{val.em_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyDeptSectWiseTrainers) 
