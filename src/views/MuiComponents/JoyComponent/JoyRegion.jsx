import { Autocomplete } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRegionList } from 'src/redux/actions/Region.Actions'
import _ from 'underscore'

const JoyRegion = ({ regValue, getRegion }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setRegionList()), [dispatch])

    const emRegion = useSelector((state) => state?.getRegionList?.RegionList, _.isEqual)
    const [region, setRegion] = useState([{ reg_slno: 0, reg_name: 'Select Region' }])
    const regionList = useMemo(() => emRegion, [emRegion])

    const [value, setValue] = useState(region[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((regValue !== 0) && (flag === 0)) {
            const array = regionList?.filter((e) => e.reg_slno === parseInt(regValue))
            setValue(array[0]);
        }

    }, [regValue])

    useEffect(() => {
        regionList.length > 0 && setRegion(regionList)
    }, [regionList])


    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            getRegion(value.reg_slno)
        } else {
            getRegion(0)
            setFlag(0)
        }
    }, [value])

    return (
        <Autocomplete
            placeholder="Select Region"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.reg_name === value.reg_name}
            getOptionLabel={option => option.reg_name || ''}
            options={region}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyRegion)