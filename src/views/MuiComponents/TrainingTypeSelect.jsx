import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Option, Select } from '@mui/joy';

const TrainingTypeSelect = ({ value, setValue }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async () => {
            const result = await axioslogin.get('TrainingType/select')
            const { success, data } = result.data;
            setView(data);
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        selectData()
    }, [])

    return (
          <Select
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Training Type</Option>
            {
                view?.map((val, index) => {
                    return <Option key={index} value={val?.trainingtype_slno}>{val?.type_name}</Option>
                })
            }
        </Select>

    )
}

export default memo(TrainingTypeSelect)

