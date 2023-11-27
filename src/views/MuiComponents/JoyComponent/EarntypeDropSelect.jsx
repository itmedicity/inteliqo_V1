import { Autocomplete } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from 'src/redux/constants/action.type';
import { useDispatch } from 'react-redux';
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';

const EarntypeDropSelect = ({ getEarn }) => {

    const dispatch = useDispatch();
    const { SELECTED_EARN_VAL } = Actiontypes;
    const [list, setList] = useState([])
    const [earntype, setEarnType] = useState([{ erning_type_id: 0, earning_type_name: 'Select EarnType' }])
    const [value, setValue] = useState(earntype[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Earntype')
            const { success, data } = result.data;
            if (success === 1) {
                setList(data)
            } else {
                setList([])
            }
        }
        getemptypedata()
    }, []);

    useEffect(() => {
        if (value !== null) {
            dispatch({ type: SELECTED_EARN_VAL, payload: value.erning_type_id })
            dispatch(getEarnDeduction())
            getEarn(value.dept_id)
        } else {
            dispatch({ type: SELECTED_EARN_VAL, payload: 0 })
            // dispatch(getDepartmentSection(0))
            getEarn(0)
        }
        return
    }, [value, dispatch, SELECTED_EARN_VAL, getEarn])

    useEffect(() => {
        list.length > 0 && setEarnType(list)
    }, [list])

    return (
        <Autocomplete
            placeholder="Select Earn"
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
            isOptionEqualToValue={(option, value) => option.earning_type_name === value.earning_type_name}
            getOptionLabel={option => option.earning_type_name || ''}
            options={earntype}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(EarntypeDropSelect) 