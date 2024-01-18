import React, { useEffect, useMemo } from 'react'
import { Option, Select } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { DepartmentalScheduledTopicsDpDw } from 'src/redux/actions/Training.Action';
import _ from 'underscore';

const JoyDepartmentalTopicDrop = ({ setTopic, topic, dept }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(DepartmentalScheduledTopicsDpDw(dept))
    }, [dept, dispatch])

    const DeptTopicDpDw = useSelector((state) => state?.gettrainingData?.ScheduletopicDropdown?.ScheduletopicDropdownList, _.isEqual)
    const TopicList = useMemo(() => DeptTopicDpDw, [DeptTopicDpDw]);
    return (
        <Select
            value={topic}
            onChange={(event, newValue) => {
                setTopic(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>  Select Training Topics</Option>
            {
                TopicList?.map((val, index) => {
                    return <Option key={index} value={val.topic_slno}>{val.training_topic_name}</Option>
                })
            }
        </Select>

    )
}


export default JoyDepartmentalTopicDrop
