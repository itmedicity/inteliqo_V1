import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from 'src/redux/actions/Course.Action';
import _ from 'underscore';

const RegistrationtypeSelect = ({ value, setValue, education, regTypedisable }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setCourse()), [dispatch])

    const empRegistrationType = useSelector((state) => state.getEmpRegistrationType.RegistrationTypeList, _.isEqual)
    const regList = useMemo(() => empRegistrationType, [empRegistrationType]);

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                disabled={regTypedisable}
            >
                <MenuItem value={0} >
                    Select Registration Type
                </MenuItem>
                {
                    regList && regList.map((val, index) => {
                        return <MenuItem key={index} value={val.reg_id}>{val.registration_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(RegistrationtypeSelect) 