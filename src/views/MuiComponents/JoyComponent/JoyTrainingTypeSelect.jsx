import React, { memo, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { TrainingType, } from 'src/redux/actions/Training.Action';
import { Option, Select } from '@mui/joy';

const JoyTrainingTypeSelect = ({ type, setType }) => {

    const dispatch = useDispatch()

    useEffect(() => dispatch(TrainingType()), [dispatch])

    const typeData = useSelector((state) => state?.gettrainingData?.trainingType?.trainingTypeList, _.isEqual)

    return (
        <Select
            value={type}
            onChange={(event, newValue) => {
                setType(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Training Type</Option>
            {
                typeData?.map((val, index) => {
                    return <Option key={index} value={val.trainingtype_slno}>{val.type_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyTrainingTypeSelect) 
