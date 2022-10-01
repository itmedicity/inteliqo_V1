import React, { Fragment } from 'react'
import { deepOrange, deepPurple, green, blueGrey, pink } from '@mui/material/colors';
import { Avatar } from '@mui/material';
const Shiftfirstcol = ({ datapunch }) => {
    console.log(datapunch)
    const { duty_status, lvreq_type, punch_in, punch_out, shift_id, holiday_flag, duty_worked, offday_falg } = datapunch;
    console.log(datapunch)
    return (
        <Fragment>
            {/* <Avatar sx={{
                bgcolor: (punch_in !== null && punch_out !== null) && duty_status === 1 ? green[500] :
                    shift_id === 1002 ? blueGrey[200] :
                        duty_status === 0.5 ? deepPurple[500] :
                            lvreq_type !== 0 && duty_status !== 0 ? cyan[500] :
                                duty_status === 0 && holiday_flag === 0 ? deepOrange[500] :
                                    holiday_flag === 1 ? pink[500] : green[500]
                , width: 25, height: 25, fontSize: 10
            }}>
                {(punch_in !== null && punch_out !== null) && duty_status === 1 ? 'P' :
                    shift_id === 1002 ? 'WOF' :
                        duty_status === 0.5 ? 'HLP' :
                            lvreq_type !== 0 && duty_status !== 0 ? lvreq_type :
                                duty_status === 0 && holiday_flag === 0 ? 'LOP' : holiday_flag === 1 ? 'H' : 'P'
                }
            </Avatar> */}
            <Avatar sx={{
                width: 25, height: 25, fontSize: 10,
                bgcolor: (punch_in !== null && punch_out !== null) && (duty_status > 0 || duty_worked > 0) ? green[500]
                    : duty_status === 0.5 ? deepPurple[500]
                        : offday_falg === 1 ? blueGrey[500]
                            : holiday_flag === 1 ? pink[300]
                                : lvreq_type === 'LV' ? deepPurple[500]
                                    : deepOrange[500]
            }}>
                {
                    (punch_in !== null && punch_out !== null) && (duty_status > 0 || duty_worked > 0) ? 'P'
                        : duty_status === 0.5 ? 'HLP'
                            : offday_falg === 1 ? 'WOF'
                                : holiday_flag === 1 ? 'H'
                                    : lvreq_type === 'LV' ? 'L'
                                        : 'LOP'
                }
            </Avatar>
        </Fragment >
    )
}

export default Shiftfirstcol