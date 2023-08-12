import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const SelectTrainingName = ({ value, setValue }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async () => {
            const result = await axioslogin.get('TrainingSchedule/selecttrainingname')
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
        <Fragment>
            <FormControl
                fullWidth
                size='small'
            >
                <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                >
                    <MenuItem disabled value={0}  >
                        Select Training Names
                    </MenuItem>
                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.name_slno}>{val.training_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(SelectTrainingName)
