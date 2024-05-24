
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { Option, Select } from '@mui/joy';

const JoySelectTypeWiseTopics = ({ topic, setTopic }) => {
    const topicData = useSelector((state) => state?.gettrainingData?.TrainingTypeTopic?.TrainingTypeTopicList, _.isEqual)
    return (
        <Select
            value={topic}
            onChange={(event, newValue) => {
                setTopic(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Training Topic</Option>
            {
                topicData?.map((val, index) => {
                    return <Option key={index} value={val.topic_slno}>{val.training_topic_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySelectTypeWiseTopics) 