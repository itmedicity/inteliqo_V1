import { Typography } from '@material-ui/core'
import React, { Fragment, memo } from 'react'
import '../avathar.css'
import { cyan, deepPurple, brown } from '@material-ui/core/colors';
const Avatharattndance = ({ val }) => {


    return (

        <Fragment>
            <div className={`avathar `} style={{
                backgroundColor: (val.updation_flag === 0 && val.shift_id === 0) ? null :
                    val.shift_id === 5 ? '#cfd8dc' :
                        (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1
                            && ((val.late_in !== 0 || val.early_out !== 0)) ? "#797979" : (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 ? "#4E9258" :
                            val.duty_status === 0.5 ? deepPurple[300] : val.lvreq_type != 0 ? cyan[300]
                                : val.duty_status === 0 ? "#F3E3C3" : (val.punch_in === null && val.punch_out === null) ? "#F3E3C3" :
                                    ((val.punch_in === null && val.punch_out !== null) || (val.punch_in !== null && val.punch_out === null)) ? "#F3E3C3" : null
            }}>
                <div className='text-center pt-2'>
                    <Typography variant="body2">{val.updation_flag === 0 && val.shift_id === 0 ? 'NP' :
                        val.shift_id === 5 ? 'WOF' :
                            (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 && ((val.late_in !== 0 || val.early_out !== 0)) ? 'L/E' :
                                (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 ? 'P' :
                                    val.duty_status === 0.5 ? 'HLP' : val.lvreq_type != 0 ? val.lvreq_type
                                        : val.duty_status === 0 ? 'LOP' : (val.punch_in === null && val.punch_out === null) ? 'LOP' : ((val.late_in !== 0 || val.early_out !== 0)) ? brown[500] :
                                            ((val.punch_in === null && val.punch_out !== null) || (val.punch_in !== null && val.punch_out === null)) ? 'LOP' : 'P'
                    }</Typography>
                </div>


            </div>
        </Fragment >
    )
}

export default memo(Avatharattndance)