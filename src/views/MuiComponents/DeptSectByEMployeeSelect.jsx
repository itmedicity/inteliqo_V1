import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const DeptSectByEMployeeSelect = ({ value, setValue, style, deptSect }) => {
    const [nameList, setnameList] = useState([])

    useEffect(() => {
        const getEmployeeName = async () => {
            const result = await axioslogin.get(`/common/getEmpName/${deptSect}`)
            const { data, success } = result.data;
            if (success === 1) {
                setnameList(data)
            } else {
                setnameList([])
            }
        }
        getEmployeeName()

    }, [deptSect])

    return (
        <Box>
            <FormControl fullWidth size="small" sx={{ minWidth: 300, maxWidth: 500 }}   >
                <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ ...style }}
                // sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select Department Section</MenuItem>
                    {
                        nameList && nameList.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_no}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default DeptSectByEMployeeSelect