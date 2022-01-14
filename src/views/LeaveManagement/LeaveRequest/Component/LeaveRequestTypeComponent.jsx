import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const LeaveRequestTypeComponent = ({ name, select, style, onChange }) => {
    const [leaveRequestType, setleaveRequestType] = useState([]);
    // useeffect 
    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/leaveRequestType/select')
            const { success, data } = result.data;
            if (success === 1) {
                setleaveRequestType(data)
            }
        }
        getemptypedata()

    }, []);
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
                    <MenuItem value={0} disabled>
                        Leave Request Type
                    </MenuItem>
                    {
                        leaveRequestType && leaveRequestType.map((val, index) => {
                            return <MenuItem key={index} value={val.lrequest_slno}>{val.lrequest_type}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default LeaveRequestTypeComponent
