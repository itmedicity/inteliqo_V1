
import { Option, Select } from '@mui/joy';
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
        <Select
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>   Select Branch </Option>
            {
                branchData?.map((val, index) => {
                    return <Option key={index} value={val.branch_slno}>{val.branch_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(BranchSelectRedux)