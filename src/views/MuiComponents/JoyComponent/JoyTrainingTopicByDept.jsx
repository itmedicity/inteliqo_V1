import React, { memo, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { TrainingTopicsByDept } from 'src/redux/actions/Training.Action';
import { Option, Select } from '@mui/joy';

const JoyTrainingTopicByDept = ({ topic, setTopic, dept }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (dept !== 0) {
            dispatch(TrainingTopicsByDept(dept))
        }
    }, [dispatch, dept])

    const topicData = useSelector((state) => state?.gettrainingData?.TrainingTopicByDept?.TrainingTopicByDeptList, _.isEqual)
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

export default memo(JoyTrainingTopicByDept) 