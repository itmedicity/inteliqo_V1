import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const SelectEmp = ({ dept, value, setValue }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const selectData = async (dept) => {
            const result = await axioslogin.get(`TrainingEmployeeSchedule/selectemp/${dept}`)
            const { success, data } = result.data;
            if (success === 1) {
                setView(data);
            } else {
                setView([]);
            }
        }
        selectData(dept)

    }, [dept])
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
                    multiple
                >
                    <MenuItem disabled value={value.length === 0}  >
                        Select Employee Names
                    </MenuItem>
                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(SelectEmp)