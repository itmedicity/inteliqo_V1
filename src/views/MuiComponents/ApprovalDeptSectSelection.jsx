import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setempDeptSect } from 'src/redux/actions/AuthorizationDeptSectionAction';
import _ from 'underscore';

const ApprovalDeptSectSelection = ({ em_id, value, setValue, updateDeptSect }) => {
    const dispatch = useDispatch()
    const [deptSectValues, setDeptSectValues] = useState([])
    useEffect(() => dispatch(setempDeptSect(em_id)), [em_id, dispatch])

    const departmentSec = useSelector((state) => state.getloginDeptSection.deptSectList, _.isEqual)
    const DeptSect = useMemo(() => departmentSec, [departmentSec]);
    useEffect(() => {

        if (Object.keys(DeptSect).length > 0) {
            setDeptSectValues(DeptSect)
            updateDeptSect(DeptSect)
        } else {
            setDeptSectValues([])
            updateDeptSect([])
        }
    }, [DeptSect, updateDeptSect])

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
                <MenuItem value={0} disabled>
                    All Department Section
                </MenuItem>
                {
                    deptSectValues && deptSectValues.map((val, index) => {
                        return <MenuItem key={index} value={val.dept_section}>{val.sect_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>

    )
}

export default memo(ApprovalDeptSectSelection) 