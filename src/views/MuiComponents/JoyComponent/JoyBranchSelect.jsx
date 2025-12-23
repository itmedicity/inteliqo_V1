import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBranch } from 'src/redux/actions/Branch.Action';
import _ from 'underscore';

const JoyBranchSelect = ({ value, setValue }) => {

    const dispatch = useDispatch()
    const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setBranch()), [dispatch])

    const empBranch = useSelector((state) => state?.getBranchList?.branchList, _.isEqual)
    const branchData = useMemo(() => empBranch, [empBranch]);

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = branchData?.find((e) => e?.branch_slno === value)
            setValue(array?.branch_slno)
        }
    }, [value, setValue, flag, branchData])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setFlag(0)
            setValue(0)
        }
        return
    }, [setValue])

    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
            color='primary'
        >
            <Option disabled value={0}> Select Branch </Option>
            {
                branchData?.map((val, index) => {
                    return <Option key={val?.branch_slno} value={val?.branch_slno}>{val?.branch_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyBranchSelect) 