// import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, memo } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ResignationApprovalSection = ({ name, select, style, onChange, DeptSect, updateDeptSect }) => {
    const { employeedetails, authorization } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const { is_incharge } = authorization
    //use effect incharge deptSect
    useEffect(() => {
        if (is_incharge === 1) {
            const getInchargeDeptSect = async () => {
                const result = await axioslogin.get(`/common/inchargedeptSect/${em_id}`)
                const { success, data1 } = result.data
                if (success === 1) {
                    updateDeptSect(data1)
                }
            }
            getInchargeDeptSect()
        }
    }, [is_incharge, em_id])

    return (
        <FormControl
            fullWidth
            size='small'
        >
            <Select
                name={name}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                variant="outlined"
                defaultValue={0}
            >
                <MenuItem value={0} >
                    All Department Section
                </MenuItem>
                {
                    DeptSect && DeptSect.map((val, index) => {
                        return <MenuItem key={index} value={val.dept_section}>{val.sect_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>

    )
}

export default memo(ResignationApprovalSection)
