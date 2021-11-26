import { FormControl, Select, MenuItem } from '@material-ui/core'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import React, { Fragment, memo, useEffect, useContext, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const LeaveTypeSelect = () => {

    const [leavetype, setleaveType] = useState([]);
    const { selectLeaveType, updateLeaveType } = useContext(PayrolMasterContext);

    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/common/getLeaveType')
                .then((response) => {
                    setleaveType(response.data.data)
                    return response.data.data;
                })
                .catch((error) => {
                    return error;
                });
            return result;
        }
        getleaveTypeData();
        return (updateLeaveType(0))
    }, [updateLeaveType])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-0"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectLeaveType"
                    value={selectLeaveType}
                    onChange={(e) => updateLeaveType(e.target.value)}
                    variant="outlined"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Leave Type
                    </MenuItem>
                    {
                        leavetype && leavetype.map((val, index) => {
                            return <MenuItem key={index} value={val.lvetype_slno}>{val.lvetype_desc}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(LeaveTypeSelect)
