
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import _ from 'underscore';

const TrainingTopicsRdx = ({ getTopic, topicValue, disabled }) => {
    const [flag, setFlag] = useState(0)
    // Redux state for training topics
    const topic = useSelector((state) => state?.gettrainingData?.trainingTopics?.trainingTopicsList, _.isEqual);
    // Local state for Autocomplete
    const [topics, setTopics] = useState([{ topic_slno: 0, training_topic_name: '' }]);
    const [value, setValue] = useState(topics[0]);
    const [inputValue, setInputValue] = useState('');

    // useEffect(() => {
    //     if ((topicValue !== 0) && (flag === 0)) {
    //         const array = topics?.filter((e) => e.topic_slno === topicValue)
    //         setValue(array[0]);
    //     }

    //     console.log("TrainingTopicsRdx", topicValue);
    // }, [topicValue, topics, setValue, flag])

    const onClick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            setFlag(1)
            getTopic(value.topic_slno);
        } else {
            setFlag(0)
            getTopic(0);
            setValue({})
        }
    }, [getTopic, setFlag, setValue])

    // useEffect(() => {
    //     topic.length > 0 && setTopics(topic)
    // }, [topic]);

    useEffect(() => {
        if (topic.length > 0) {
            setTopics(topic);
            if (topicValue !== 0) {
                const selectedTopic = topic?.find((t) => t.topic_slno === topicValue);
                if (selectedTopic) {
                    setValue(selectedTopic);
                }
            }
        }
    }, [topic, topicValue]);

    return (
        <Autocomplete
            id="autocomplete"
            placeholder="Select Topic"
            value={topicValue === 0 ? topics : value}
            clearOnBlur
            onChange={(event, newValue) => {
                onClick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            size="md"
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.training_topic_name === value.training_topic_name}
            getOptionLabel={(option) => option.training_topic_name || ''}
            options={topics}
            disabled={disabled}
        />
    );
};

export default TrainingTopicsRdx;
