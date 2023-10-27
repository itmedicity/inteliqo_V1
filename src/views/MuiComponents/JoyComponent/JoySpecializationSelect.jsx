import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSpecialization } from 'src/redux/actions/Specilization.Action'
import _ from 'underscore'

const JoySpecializationSelect = ({ value, setValue, course, specdisable }) => {

    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setSpecialization()), [dispatch])

    const empSpecilization = useSelector((state) => state.getEmployeeSpeclization.SpecilizationList, _.isEqual)
    const specList = useMemo(() => empSpecilization, [empSpecilization]);

    const filterarr = specList?.filter(val => val.cour_slno === course)

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [value, setValue])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Specializtion</Option>
            {
                filterarr?.map((val, index) => {
                    return <Option key={index} value={val.spec_slno}>{val.spec_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySpecializationSelect) 