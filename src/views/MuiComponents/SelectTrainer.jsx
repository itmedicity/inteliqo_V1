
// import { React, useState, useEffect, Fragment, memo } from 'react';
// import { axioslogin } from '../Axios/Axios';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const SelectTrainer = ({ setTrainer }) => {
    const [view, setView] = useState([]);
    const [Tname, setTname] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/SelectTrainer`)
            const { data, success } = result.data;
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        setTrainer(Tname)
    }, [setTrainer, Tname])

    return (
        <Fragment>
            <FormControl
                fullWidth
                size='small'
            >
                <Select
                    value={Tname}
                    onChange={(e) => setTname(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ maxWidth: "100%" }}
                    multiple
                >
                    <MenuItem disabled value={0}  >
                        Select Training Topics
                    </MenuItem>
                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            {/* <Select
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                size="small"
                variant="outlined"
                multiple
            >
                <Option disabled value={0}>
                    Select Trainer(s)
                </Option>
                {view?.map((val, index) => (
                    <Option key={val.em_id} value={val.em_id}>
                        {val.em_name}
                    </Option>
                ))}
            </Select> */}
        </Fragment>
    )
}

export default memo(SelectTrainer)
