import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setempDeptSect } from 'src/redux/actions/AuthorizationDeptSectionAction';
import _ from 'underscore';

const DeptSectionSelect = ({ em_id, value, setValue }) => {

    const dispatch = useDispatch()
    const [deptSectValues, setDeptSectValues] = useState([])
    useEffect(() => dispatch(setempDeptSect(em_id)), [em_id, dispatch])

    const departmentSec = useSelector((state) => state.getloginDeptSection.deptSectList, _.isEqual)
    const DeptSect = useMemo(() => departmentSec, [departmentSec]);
    useEffect(() => {

        if (DeptSect !== undefined && DeptSect !== null && Object.keys(DeptSect).length > 0) {
            setDeptSectValues(DeptSect)
        } else {
            setDeptSectValues([])
        }
    }, [DeptSect])


    return (

        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
        >
            <Option disabled value={0}> Select Department Section </Option>
            {
                deptSectValues?.map((val, index) => {
                    return <Option key={index} value={val.dept_section}>{val.sect_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(DeptSectionSelect)