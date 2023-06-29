import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSpecialization } from 'src/redux/actions/Specilization.Action';
import _ from 'underscore';

const SpecializtionSelectRedux = ({ value, setValue, course, specdisable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setSpecialization()), [dispatch])

    const empSpecilization = useSelector((state) => state.getEmployeeSpeclization.SpecilizationList, _.isEqual)
    const specList = useMemo(() => empSpecilization, [empSpecilization]);

    const filterarr = specList?.filter(val => val.cour_slno === course)

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                disabled={specdisable}
            >
                <MenuItem value={0} >
                    Select Specializtion
                </MenuItem>
                {
                    filterarr && filterarr.map((val, index) => {
                        return <MenuItem key={index} value={val.spec_slno}>{val.spec_desc}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(SpecializtionSelectRedux)