import { Autocomplete } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';
import _ from 'underscore';

const JoyWageSelect = ({ wagevalue, setWage }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEarnDeduction())
    })
    const [earntype, setEarnType] = useState([{ earnded_id: 0, earnded_name: 'Select Wage Type' }])
    const [value, setValue] = useState(earntype[0]);
    const [inputValue, setInputValue] = useState('');
    const Earn = useSelector((state) => state?.getEarnData?.DataList, _.isEqual);
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((wagevalue !== 0) && (flag === 0)) {
            const array = Earn?.filter((e) => e.earnded_id === wagevalue)
            setValue(array[0]);
        }

    }, [wagevalue, flag, Earn])

    useEffect(() => {
        Earn.length > 0 && setEarnType(Earn)
    }, [Earn])

    const onClick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setWage(value.earnded_id)
            setValue(value)
        } else {
            setWage(0)
        }
        return
    }, [setWage])

    return (
        <Autocomplete
            placeholder="Select Department Section"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                onClick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.earnded_name === value.earnded_name}
            getOptionLabel={option => option.earnded_name || ''}
            options={earntype}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyWageSelect) 