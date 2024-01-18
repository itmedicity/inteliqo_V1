import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import _ from 'underscore';
import { Actiontypes } from 'src/redux/constants/action.type';
import { TrainerNames } from 'src/redux/actions/Training.Action';

const TrainerNamesRxd = ({ getTrainers }) => {
    const dispatch = useDispatch();
    const { FETCH_TRAINER_NAMES_ALL } = Actiontypes;

    // Redux state for trainer names
    const trainer = useSelector((state) => state?.gettrainingData?.trainerNames?.trainerNamesList, _.isEqual);
    // Local state for Autocomplete
    const [trainers, setTrainers] = useState([{ em_id: 0, em_name: 'Select Training Trainers' }]);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Fetch trainer names when value changes
    useEffect(() => {
        const fetchTrainerData = (em_id) => {
            dispatch({ type: FETCH_TRAINER_NAMES_ALL, payload: em_id });
            dispatch(TrainerNames(em_id));
            getTrainers(em_id);
        };

        if (value !== null) {
            fetchTrainerData(value);
        } else {
            fetchTrainerData(0);
        }
    }, [value, dispatch, getTrainers, FETCH_TRAINER_NAMES_ALL]);

    useEffect(() => {
        if (trainer?.length > 0) {
            setTrainers(trainer);
        }
    }, [trainer]);

    return (
        <Autocomplete
            multiple
            id="autocomplete"
            placeholder="Select Trainers"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
            getOptionLabel={(option) => option.em_name || ''}
            options={trainers}
        // style={{ width: 500 }}
        />
    );
};

export default TrainerNamesRxd;
