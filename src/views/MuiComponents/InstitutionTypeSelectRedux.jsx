import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { setInstitution } from 'src/redux/actions/InstitutionType.Action'
const InstitutionTypeSelectRedux = ({ value, setValue, }) => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(setInstitution()), [dispatch])

    const InstitutionType = useSelector((state) => state.getInstitutionType.InstitutionList, _.isEqual)
    const data = useMemo(() => InstitutionType, [InstitutionType]);

    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
            >
                <MenuItem value={0} >
                    Select Institution Type
                </MenuItem>
                {
                    data && data.map((val, index) => {
                        return <MenuItem key={index} value={val.inst_slno}>{val.inst_emp_type}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(InstitutionTypeSelectRedux) 