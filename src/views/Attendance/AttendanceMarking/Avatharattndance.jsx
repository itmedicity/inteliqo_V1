import { Typography } from '@material-ui/core'
import React, { Fragment, memo } from 'react'
import '../avathar.css'
import { cyan, deepPurple } from '@material-ui/core/colors';
const Avatharattndance = ({ val }) => {


    return (

        <Fragment>
            <div className={`avathar `} style={{
                backgroundColor: val.length === 0 ? null : ((val[0].updation_flag === 0 && val[0].shift_id === 0) ? '#686A6C' :
                    val[0].shift_id === 5 ? '#cfd8dc' :
                        (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1
                            && ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? "#797979" : (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 ? "#4E9258" :
                            val[0].duty_status === 0.5 ? deepPurple[300] : val[0].lvreq_type !== 0 ? cyan[300]
                                : val[0].duty_status === 0 ? "#F3E3C3" : (val[0].punch_in === null && val[0].punch_out === null) ? "#F3E3C3" :
                                    ((val[0].punch_in === null && val[0].punch_out !== null) || (val[0].punch_in !== null && val[0].punch_out === null)) ? "#F3E3C3" : null)
            }}>
                <div className='text-center pt-2'>
                    <Typography variant="body2">{val.length === 0 ? "NA" : (val[0].updation_flag === 0 && val[0].shift_id === 0 ? 'NP' :
                        val[0].shift_id === 5 ? 'WOF' :
                            (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 && ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? 'L/E' :
                                (val[0].punch_in !== null && val[0].punch_out !== null) && val[0].duty_status === 1 ? 'P' :
                                    val[0].duty_status === 0.5 ? 'HLP' : val[0].lvreq_type !== 0 ? val[0].lvreq_type
                                        : val[0].duty_status === 0 ? 'LOP' : (val[0].punch_in === null && val[0].punch_out === null) ? 'LOP' : ((val[0].late_in !== 0 || val[0].early_out !== 0)) ? 'sdas' :
                                            ((val[0].punch_in === null && val[0].punch_out !== null) || (val[0].punch_in !== null && val[0].punch_out === null)) ? 'LOP' : 'P')
                    }</Typography>
                </div>


            </div>
        </Fragment >
    )
}

export default memo(Avatharattndance)