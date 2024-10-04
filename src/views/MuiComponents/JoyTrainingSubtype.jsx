import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Option, Select } from '@mui/joy';

const JoyTrainingSubtype = ({ value, setValue }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async () => {
            const result = await axioslogin.get('/TrainingSubType/select')
            const { success, data } = result.data;
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        selectData()
    }, [])

    return (
        <Fragment>

            <Select
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                size='md'
                variant='outlined'
            >
                <Option disabled value={0}>Select Training SubType</Option>
                {
                    view?.map((val, index) => {
                        return <Option key={index} value={val.subtype_slno}>{val.subtype_name}</Option>
                    })
                }
            </Select>
        </Fragment>
    )
}

export default memo(JoyTrainingSubtype) 
