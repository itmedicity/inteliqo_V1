import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSpecialization } from 'src/redux/actions/Specilization.Action';
import _ from 'underscore';

const SpecializtionSelectRedux = ({ value, setValue, course, specdisable, setreg_mandatory }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setSpecialization()), [dispatch])

    const empSpecilization = useSelector((state) => state.getEmployeeSpeclization.SpecilizationList, _.isEqual)
    const specList = useMemo(() => empSpecilization, [empSpecilization]);

    const filterarr = specList?.filter(val => val.cour_slno === course)

    const getDetails = useCallback((val) => {
        const { reg_mandatory } = val;
        setreg_mandatory(reg_mandatory)
    }, [setreg_mandatory])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={specdisable}
        >
            <Option disabled value={0}>Select Specializtion</Option>
            {
                filterarr?.map((val, index) => {
                    return <Option key={index} value={val.spec_slno} onClick={() => getDetails(val)}>{val.spec_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(SpecializtionSelectRedux)