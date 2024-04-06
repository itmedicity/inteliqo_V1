import React from 'react'
// import { FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect } from 'react'
import { Actiontypes } from 'src/redux/constants/action.type'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const LeaveRequestType = ({ empstatus, onChange, onChangeVal }) => {
    const dispatch = useDispatch();
    const { FETCH_LEAVE_REQUEST } = Actiontypes;

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge } = employeeProfileDetl;

    const [leaveRequestType, setleaveRequestType] = useState([]);

    useEffect(() => {
        const getLeaveRequestType = async () => {
            const result = await axioslogin.get('/leaveRequestType/select')
            const { success, data } = result.data;
            if (success === 1) {
                setleaveRequestType(data)
            } else {
                setleaveRequestType([]);
            }
        }
        getLeaveRequestType()

    }, []);

    //onchage leave requst select option
    const onChangeLeaveReqSelectOption = (e) => {
        console.log(e)
        onChange(e)
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
    }

    return (
        // <FormControl
        //     fullWidth={true}
        //     margin="dense"
        //     size='small'
        // >
        //     <Select
        //         fullWidth={true}
        //         variant="outlined"
        //         margin='dense'
        //         size='small'
        //         value={onChangeVal}
        //         disabled={empstatus === 0 && (hod === 1 || incharge === 1) ? true : false}
        //         onChange={(e) => onChangeLeaveReqSelectOption(e)}
        //     >
        //         <MenuItem value={0} disabled>
        //             Leave Request Type
        //         </MenuItem>
        //         {
        //             leaveRequestType && leaveRequestType.map((val, index) => {
        //                 return <MenuItem key={index} value={val.lrequest_slno}>{val.lrequest_type}</MenuItem>
        //             })
        //         }
        //     </Select>
        // </FormControl>

        <Select
            defaultValue={onChangeVal}
            onChange={(e, val) => onChangeLeaveReqSelectOption(val)}
            size='sm'
            disabled={empstatus === 0 && (hod === 1 || incharge === 1) ? true : false}
            sx={{ width: '100%' }}
        >
            <Option value={0} disabled  >Leave Request Type</Option>
            {
                leaveRequestType && leaveRequestType.map((val, index) => {
                    return <Option key={index} value={val.lrequest_slno}>{val.lrequest_type}</Option>
                })
            }
        </Select>

    )
}

export default memo(LeaveRequestType)