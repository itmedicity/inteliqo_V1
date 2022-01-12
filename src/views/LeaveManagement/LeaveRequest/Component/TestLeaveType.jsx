import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';

const TestLeaveType = ({ name, select, style, onChange }) => {
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    const [leaveType, setLeaveType] = useState([]);
    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/leaveType/select')
            const { success, data } = result.data
            if (success === 1) {
                setLeaveType(data)
            }
        }
        getleaveTypeData();

    }, [])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0' disabled>
                        Select Leave Type
                    </MenuItem>
                    {
                        leaveType && leaveType.map((val, index) => {
                            return <MenuItem key={index} value={val.lvetype_slno}>{val.lvetype_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestLeaveType
