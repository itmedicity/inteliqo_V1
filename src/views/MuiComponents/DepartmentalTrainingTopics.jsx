import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Option, Select } from '@mui/joy'

const DepartmentalTrainingTopics = ({ topic, setTopic, dept }) => {
    const [view, setView] = useState([]);
    const [topicname, setTopicname] = useState([]);
    useEffect(() => {
        if (dept !== 0) {
            const getData = async (dept) => {
                const result = await axioslogin.get(`/TrainingAfterJoining/deptTrainingtopic/${dept}`)
                const { data, success } = result.data
                if (success === 1) {
                    setView(data);
                } else {
                    setView([]);
                }
            }
            getData(dept)
        }
    }, [dept])

    useEffect(() => {
        setTopic(topicname)
    }, [setTopic, topicname])

    return (
        <Select
            value={topic}
            onChange={(event, newValue) => {
                setTopicname(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select  Training Topics</Option>
            {
                view?.map((val, index) => {
                    return <Option key={index} value={val.topic_slno}>{val.training_topic_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DepartmentalTrainingTopics)
