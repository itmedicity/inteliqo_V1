// import { useEffect, React, useState, Fragment, memo } from 'react';
// import { axioslogin } from '../Axios/Axios';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import { useCallback } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const SelectTopics = ({ setTopic }) => {
    const [view, setView] = useState([]);
    const [topicname, setTopicname] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/selecttopic`)
            const { data, success } = result.data
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const obj = {
            topicname: topicname
        }
        setTopic(obj);
    }, [topicname])

    return (
        <Fragment>
            <FormControl
                fullWidth
                size='small'
            >
                <Select
                    value={topicname}
                    onChange={(e) => setTopicname(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ maxWidth: "100%" }}

                >
                    <MenuItem disabled value={0}  >
                        Select Training Topics
                    </MenuItem>
                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.topic_slno}>{val.training_topic_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment >
        // <Fragment>
        //     <Select
        //         value={value}
        //         onChange={(event, newValue) => {
        //             setValue(newValue);
        //         }}
        //         size="small"
        //         variant='outlined'
        //     >
        //         <Option disabled value={0}>Select Topics</Option>
        //         {
        //             view?.map((val, index) => {
        //                 return <Option key={val.topic_slno} value={val.topic_slno}>{val.training_topic_name}</Option>
        //             })
        //         }
        //     </Select>
        // </Fragment>
    )
}

export default memo(SelectTopics)
