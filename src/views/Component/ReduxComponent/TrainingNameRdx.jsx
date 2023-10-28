import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from 'react';
import { Actiontypes } from 'src/redux/constants/action.type';
import { gettrainingData } from 'src/redux/reducers/Training.Reducer';


const TrainingNameRdx = ({ getTrainingType }) => {
    const dispatch = useDispatch();
    const { FETCH_TRAINING_TYPE_ALL } = Actiontypes;
    const Trainingtype = useSelector((state) => state.gettrainingData.trainingTypeList)
    const [type, setType] = useState([{ trainingtype_slno: 0, type_name: 'Select Training Name' }])

    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            dispatch({ type: FETCH_TRAINING_TYPE_ALL, payload: value.trainingtype_slno })
            dispatch(gettrainingData(value.trainingtype_slno))
            getTrainingType(value.trainingtype_slno)
        } else {
            dispatch({ type: FETCH_TRAINING_TYPE_ALL, payload: 0 })
            dispatch(gettrainingData(0))
            getTrainingType(0)
        }
        return
    }, [value])

    useEffect(() => {
        Trainingtype.length > 0 && setType(Trainingtype)
    }, [Trainingtype])

    return (
        <Autocomplete
            placeholder="Select Training Type"
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
            isOptionEqualToValue={(option, value) => option.type_name === value.type_name}
            getOptionLabel={option => option.type_name || ''}
            options={type}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(TrainingNameRdx) 