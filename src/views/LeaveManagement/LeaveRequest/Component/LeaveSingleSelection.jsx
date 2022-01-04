import { IconButton } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import TestLeaveType from './TestLeaveType';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LeaveSingleSelection = ({ setLveState }) => {
    const [state, setState] = useState(0)
    const [sgleLeaveType, setSgleLeaveType] = useState()
    const date1 = '2021-01-01';
    const date2 = '2021-01-05';

    const handleSingleLeave = async () => {
        setState(1)
        const levedata = {
            frmDate: date1,
            toDate: date2,
            LeaveType: sgleLeaveType,
        }
        setLveState(levedata)
    }

    return (
        <Fragment>
            <div className="col-md-3">
                <TestLeaveType style={SELECT_CMP_STYLE}
                    name="type" select="Leave Request Type"
                    onChange={(e) => setSgleLeaveType(e.target.value)} />
            </div>
            <div className='col-md-1'  >
                <IconButton
                    edge="end"
                    className='py-1'
                    style={state === 0 ? { color: 'red' } : { color: 'green' }}
                    onClick={handleSingleLeave}
                >
                    <ExitToAppIcon className='p-0' />
                </IconButton>
            </div>
        </Fragment>
    )
}

export default LeaveSingleSelection
