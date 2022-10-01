import { Typography } from '@material-ui/core'
import React, { Fragment, memo } from 'react'
import '../avathar.css'
import { cyan, deepPurple } from '@material-ui/core/colors';
import { deepOrange, green, blueGrey, pink, brown } from '@mui/material/colors';
const Avatharattndance = ({ val }) => {
    return (
        <Fragment>
            {/* <div className={`avathar `} style={{
                backgroundColor: val.length === 0 ? null : ((val[0].updation_flag === 0 && val[0].shift_id === 0) ? '#686A6C' :
                    val[0].shift_id === 1002 ? '#cfd8dc' :
                        (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1
                            && ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? "#797979" : (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 ? "#4E9258" :
                            val[0].duty_status === 0.5 ? deepPurple[300] : val[0].lvreq_type !== null ? cyan[300]
                                : val[0].duty_status === 0 ? "#F3E3C3" : (val[0].punch_in === null && val[0].punch_out === null) && val[0].duty_status === 0 ? "#F3E3C3" :
                                    ((val[0].punch_in === null && val[0].punch_out !== null) || (val[0].punch_in !== null && val[0].punch_out === null)) ? "#F3E3C3" : null)
            }}>
                <div className='text-center pt-2'>
                    <Typography variant="body2">{val.length === 0 ? "NA" : (val[0].updation_flag === 0 && val[0].shift_id === 0 ? 'NA' :
                        val[0].shift_id === 1002 ? 'WOF' :
                            (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 && ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? 'L/E' :
                                (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 ? 'P' :
                                    val[0].duty_status === 0.5 ? 'HLP' : val[0].lvreq_type !== null ? val[0].lvreq_type
                                        : val[0].duty_status === 0 ? 'LOP' : (val[0].punch_in === null && val[0].punch_out === null) && val[0].duty_status === 0 ? 'LOP' : ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? 'sdas' :
                                            ((val[0].punch_in === null && val[0].punch_out !== null) || (val[0].punch_in !== null && val[0].punch_out === null)) ? 'LOP' : 'P')
                    }</Typography>
                </div>


            </div> */}
            <div className={`avathar `} style={{
                backgroundColor:
                    (val[0].updation_flag === 0) && (val[0].shift_id === 0) ? blueGrey[200]
                        : (val[0].punch_in !== null && val[0].punch_out !== null) && (val[0].duty_worked > 0 || val[0].duty_status > 0) ? green[500]
                            : (val[0].late_in > 0 || val[0].early_out > 0) ? brown[500]
                                : val[0].duty_status === 0.5 ? deepPurple[500]
                                    : val[0].lvreq_type === 'LV' ? cyan[500]
                                        : val[0].lvreq_type === 'NP' ? cyan[500]
                                            : val[0].offday_falg === 1 ? blueGrey[500]
                                                : val[0].holiday_flag === 1 ? pink[300]
                                                    : (val[0].punch_in === null && val[0].punch_out === null) && (val[0].duty_worked === 0 || val[0].duty_status === 0) && (val[0].lvreq_type === "0") ? deepOrange[200]
                                                        : blueGrey[200]

            }}>
                <div className='text-center pt-2'>
                    <Typography variant="body2">{
                        (val[0].updation_flag === 0) && (val[0].shift_id === 0) ? "NA"
                            : (val[0].punch_in !== null && val[0].punch_out !== null) && (val[0].duty_worked > 0 || val[0].duty_status > 0) ? "P"
                                : (val[0].late_in > 0 || val[0].early_out > 0) ? "L/E"
                                    : val[0].duty_status === 0.5 ? "HLP"
                                        : val[0].lvreq_type === 'LV' ? "L"
                                            : val[0].lvreq_type === 'NP' ? "NP"
                                                : val[0].offday_falg === 1 ? "WOF"
                                                    : val[0].holiday_flag === 1 ? "H"
                                                        : (val[0].punch_in === null && val[0].punch_out === null) && (val[0].duty_worked === 0 || val[0].duty_status === 0) && (val[0].lvreq_type === "0") ? "LOP"
                                                            : "NA"
                    }
                    </Typography>
                </div>
            </div>
        </Fragment >
    )
}

export default memo(Avatharattndance)