import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInstitution } from 'src/redux/actions/InstitutionType.Action';
import { Option, Select } from '@mui/joy';

const InstitutionSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInstitution());
    }, [dispatch])

    const InstitutionType = useSelector((state) => state?.getInstitutionType?.InstitutionList)
    const instituteList = useMemo(() => InstitutionType, [InstitutionType])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
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

export default memo(InstitutionSelect) 