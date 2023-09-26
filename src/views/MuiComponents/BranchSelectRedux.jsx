import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBranch } from 'src/redux/actions/Branch.Action';
import _ from 'underscore';
const BranchSelectRedux = ({ value, setValue, }) => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(setBranch()), [dispatch])

    const empBranch = useSelector((state) => state.getBranchList.branchList, _.isEqual)
    const branchData = useMemo(() => empBranch, [empBranch]);

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
                <MenuItem value={0} disabled >
                    Select Branch
                </MenuItem>
                {
                    branchData && branchData.map((val, index) => {
                        return <MenuItem key={index} value={val.branch_slno}>{val.branch_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(BranchSelectRedux)