import { Option, Select } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShiftDetails } from 'src/redux/actions/Shift.Action'

const ShiftSelectByRedux = ({ value, setValue, disabled }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setShiftDetails());
    }, [dispatch])

    const shift = useSelector((state) => {
        return state.getShiftList.shiftDetails || 0
    })

    return (
        <Select
            disabled={disabled}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}> Select Shift</Option>
            {
                shift?.map((val, index) => {
                    return <Option key={index} value={val.shft_slno}>{val.shft_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(ShiftSelectByRedux)