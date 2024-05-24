import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSpecialization } from 'src/redux/actions/Specilization.Action'
import _ from 'underscore'

const JoySpecializationSelect = ({ value, setValue, course, setSpecName }) => {

    const dispatch = useDispatch()

    useEffect(() => dispatch(setSpecialization()), [dispatch])

    const empSpecilization = useSelector((state) => state.getEmployeeSpeclization.SpecilizationList, _.isEqual)
    const specList = useMemo(() => empSpecilization, [empSpecilization]);

    const filterarr = specList?.filter(val => val.cour_slno === course)

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setSpecName(event.target.innerText)
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