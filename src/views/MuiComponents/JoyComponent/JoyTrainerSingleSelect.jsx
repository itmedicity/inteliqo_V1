import React, { memo, useEffect, useState } from 'react'
import { Option, Select } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const JoyTrainerSingleSelect = ({ setTrainer }) => {

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
        <Select
            value={Tname}
            onChange={(event, newValue) => {
                setTname(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Training Topic</Option>
            {
                view?.map((val, index) => {
                    return <Option key={index} value={val.em_id}>{val.em_name}</Option>
                })
            }
        </Select>
    )
}


export default memo(JoyTrainerSingleSelect) 
