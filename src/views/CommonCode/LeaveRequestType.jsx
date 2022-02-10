import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const LeaveRequestType = (props) => {
    // intializing use state
    const [leaveRequestType, setleaveRequestType] = useState([]);

    // useContext
    const { getleavereqtype, updateleavereqtype } = useContext(PayrolMasterContext)

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
        return (
            updateleavereqtype(0)
        )
    }, [updateleavereqtype]);
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-labels"
                    id="demo-simple-selects"
                    name="getleavereqtype"
                    value={getleavereqtype}
                    onChange={(e) => {
                        updateleavereqtype(e.target.value)
                        props.setleavereqtype(e.target.value)
                    }}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={props.style}
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

export default LeaveRequestType
