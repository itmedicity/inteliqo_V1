import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReligion } from 'src/redux/actions/Religion.Action'
import _ from 'underscore'

const ReligionSelectRedux = ({ value, setValue }) => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(setReligion()), [dispatch])

    const empReligions = useSelector((state) => state.getEmployeeReligion.empRel, _.isEqual)
    const religionList = useMemo(() => empReligions, [empReligions]);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option value={0} disabled>Select Religion</Option>
            {
                religionList?.map((val, ind) => {
                    return <Option key={ind} value={val.relg_slno}>{val.relg_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(ReligionSelectRedux) 