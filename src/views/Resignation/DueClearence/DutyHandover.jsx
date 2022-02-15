import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';

const DutyHandover = ({ name, select, style, onChange, em_department, em_dept_section }) => {
    const [dataa, setData] = useState([])
    useEffect(() => {
        const PostData = {
            em_dept_section: em_dept_section,
            em_department: em_department
        }
        const getEmploye = async () => {
            const result = await axioslogin.post('empmast/getempName', PostData)
            const { success, data } = result.data
            if (success === 1) {
                setData(data)
            }
        }
        getEmploye()
    })

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} >
                        Employees
                    </MenuItem>
                    {
                        dataa && dataa.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
};

export default DutyHandover;
