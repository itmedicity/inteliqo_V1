import { LinearProgress, TableCell } from '@mui/material';
import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import LeaveCarryTextFeild from './LeaveCarryTextFeild';

const LeaveCarryCount = ({ emid, setedit, edit, count, setemp_id }) => {
    const [leavecount, SetleaveCount] = useState([])
    useEffect(() => {
        const getleavecount = async () => {
            const result = await axioslogin.get(`/common/getLeavecount/${emid}`)
            const { success, data } = result.data;
            if (success === 1) {
                setemp_id(emid)
                SetleaveCount(data[0])
            } else { }
        }
        getleavecount()
    }, [emid])


    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    leavecount && leavecount.map((val, index) => {
                        return <TableCell align="center" text="center" key={val.leavetype} style={{ padding: 0, width: '10rem', height: '1rem' }}>
                            <div className="col-md-12">
                                <div className='row'>
                                    <div className="col-md-6">
                                        {val.tot_cl}
                                    </div>
                                    <div className="col-md-6">
                                        <LeaveCarryTextFeild
                                            SetleaveCount={SetleaveCount}
                                            count={val.tot_cl}
                                            setedit={setedit}
                                            edit={edit}
                                            name={val.leavetype}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                    })
                }
            </Suspense>
        </Fragment >
    )
}

export default memo(LeaveCarryCount)