
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Option, Select } from '@mui/joy';

const JoySubTypeMultipleSelect = ({ value, setValue }) => {

    const data = useSelector((state) => state?.gettrainingData?.TrainingSubType?.TrainingSubTypeList)
    const SubType = useMemo(() => data, [data])

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
            <Option disabled value={0}> Select SubTypes</Option>
            {
                SubType?.map((val, index) => {
                    return <Option key={index} value={val.subtype_slno}>{val.subtype_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySubTypeMultipleSelect)
