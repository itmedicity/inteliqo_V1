import { Autocomplete } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';

const WageByEarnDropSelect = ({ getWage }) => {

    const dispatch = useDispatch();
    const [list, setList] = useState([])
    const [earntype, setEarnType] = useState([{ earnded_id: 0, earnded_name: 'Select Wage Type' }])
    const [value, setValue] = useState(earntype[0]);
    const [inputValue, setInputValue] = useState('');

    const selectEarn = useSelector((state) => state?.selectedEarnData?.earn, _.isEqual);
    const Earn = useSelector((state) => state?.getEarnData?.DataList, _.isEqual);
    // const EarnValues = useMemo(() => Earn, [Earn])
    useEffect(() => {
        if (Object.keys(Earn).length !== 0) {
            const arr = Earn.filter((val) => val.erning_type_id === selectEarn)
            setList(arr)
        } else {
            setList([])
        }
    }, [selectEarn, Earn])

    useEffect(() => {
        if (value !== null) {
            getWage(value.earnded_id)
        } else {
            getWage(0)
        }
        return
    }, [value, dispatch, getWage])

    useEffect(() => {
        list.length > 0 && setEarnType(list)
    }, [list])
    return (
        <Autocomplete
            placeholder="Select Department Section"
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
            isOptionEqualToValue={(option, value) => option.earnded_name === value.earnded_name}
            getOptionLabel={option => option.earnded_name || ''}
            options={earntype}
            sx={{ width: '100%' }}
        />
    )
}

export default WageByEarnDropSelect