import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from 'src/redux/actions/Course.Action';
import _ from 'underscore';

const RegistrationtypeSelect = ({ value, setValue, regTypedisable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setCourse()), [dispatch])

    const empRegistrationType = useSelector((state) => state.getEmpRegistrationType.RegistrationTypeList, _.isEqual)
    const regList = useMemo(() => empRegistrationType, [empRegistrationType]);

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={regTypedisable}
        >
            <Option disabled value={0}> Select Registration Type</Option>
            {
                regList?.map((val, index) => {
                    return <Option key={index} value={val.reg_id}>{val.registration_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(RegistrationtypeSelect) 