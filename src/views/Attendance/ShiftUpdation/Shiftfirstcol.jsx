import React, { Fragment } from 'react'
import { deepOrange, deepPurple, green, cyan, blueGrey, pink } from '@mui/material/colors';
import { Avatar } from '@mui/material';
const Shiftfirstcol = ({ datapunch }) => {
    const { duty_status, lvreq_type, punch_in, punch_out, shift_id, holiday_flag } = datapunch;
    return (
        <Fragment>
            <Avatar sx={{
                bgcolor: (punch_in !== null && punch_out !== null) && duty_status === 1 ? green[500] :
                    shift_id === 5 ? blueGrey[200] :
                        duty_status === 0.5 ? deepPurple[500] :
                            lvreq_type !== 0 && duty_status !== 0 ? cyan[500] :
                                duty_status === 0 && holiday_flag === 0 ? deepOrange[500] :
                                    holiday_flag === 1 ? pink[500] : green[500]
                , width: 25, height: 25, fontSize: 10
            }}>
                {(punch_in !== null && punch_out !== null) && duty_status === 1 ? 'P' :
                    shift_id === 5 ? 'WOF' :
                        duty_status === 0.5 ? 'HLP' :
                            lvreq_type !== 0 && duty_status !== 0 ? lvreq_type :
                                duty_status === 0 && holiday_flag === 0 ? 'LOP' : holiday_flag === 1 ? 'H' : 'P'
                }
            </Avatar>
        </Fragment>
    )
}

export default Shiftfirstcol