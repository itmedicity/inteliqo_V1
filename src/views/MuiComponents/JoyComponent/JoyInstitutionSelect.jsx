import { Option, Select } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInstitution } from 'src/redux/actions/InstitutionType.Action';
import _ from 'underscore';

const JoyInstitutionSelect = ({ value, setValue }) => {

    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        dispatch(setInstitution());
    }, [dispatch])

    const InstitutionType = useSelector((state) => state.getInstitutionType.InstitutionList, _.isEqual)
    const instituteList = useMemo(() => InstitutionType, [InstitutionType])

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = instituteList?.find((e) => e.inst_slno === value)
            setValue(array.inst_slno)
        }
    }, [value, flag, instituteList])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [value])


    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Institution Type</Option>
            {
                instituteList?.map((val, index) => {
                    return <Option key={index} value={val.inst_slno}>{val.inst_emp_type}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyInstitutionSelect) 