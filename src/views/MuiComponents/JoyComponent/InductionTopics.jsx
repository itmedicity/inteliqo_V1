import React, { memo, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InductionTrainingTopics } from 'src/redux/actions/Training.Action';
import { Option, Select } from '@mui/joy';

const InductionTopics = ({ topic, setTopic }) => {

    const topicData = useSelector((state) => state?.gettrainingData?.InductionTopics?.InductionTopicsList)

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

export default memo(InductionTopics) 
