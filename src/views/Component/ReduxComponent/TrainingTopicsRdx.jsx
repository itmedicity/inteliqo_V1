
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import _ from 'underscore';
import { Actiontypes } from 'src/redux/constants/action.type';
import { TrainingTopics } from 'src/redux/actions/Training.Action';
import { Box } from '@mui/material';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
const TrainingTopicsRdx = ({ getTopic }) => {
    const dispatch = useDispatch();
    const { FETCH_TRAINING_TOPICS_ALL } = Actiontypes;

    // Redux state for training topics
    const topic = useSelector((state) => state?.gettrainingData?.trainingTopics?.trainingTopicsList, _.isEqual);
    console.log(topic);
    // Local state for Autocomplete
    const [topics, setTopics] = useState([{ topic_slno: 0, training_topic_name: '' }]);
    const [value, setValue] = useState(topics[0]);
    const [inputValue, setInputValue] = useState('');

    // Fetch training topics when value changes
    useEffect(() => {
        // const fetchTopicData = (topic_slno) => {
        //     getTopic(topic_slno);
        // };
        if (value !== null) {
            getTopic(value.topic_slno);
        } else {
            getTopic(0);
        }
    }, [value, getTopic,]);

    // Update local state when training topics change
    useEffect(() => {
        if (topic?.length > 0) {
            setTopics(topic);
        }
    }, [topic]);

    return (

        <Select
            defaultValue="dog"

        >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
        </Select>
        // <Autocomplete
        //     // multiple
        //     //id="autocomplete"
        //     placeholder="Select Topic"
        //     value={value}
        //     clearOnBlur
        //     onChange={(event, newValue) => {
        //         setValue(newValue);
        //     }}
        //     inputValue={inputValue}
        //     onInputChange={(event, newInputValue) => {
        //         setInputValue(newInputValue);
        //     }}
        //     loading={true}
        //     loadingText="Loading..."
        //     freeSolo
        //     isOptionEqualToValue={(option, value) => option.training_topic_name === value.training_topic_name}
        //     getOptionLabel={(option) => option.training_topic_name || ''}
        //     options={topics}
        // // style={{ width: 500 }}
        // />
    );
};

export default TrainingTopicsRdx;
