import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { LinearProgress, TableCell, TableRow } from '@mui/material'
import EarningTableCell from './EarningTableCell';
const FixedTableCell = ({ emid }) => {


    const [fixed, setFixed] = useState([])

    useEffect(() => {

        const getFixed = async () => {
            const result = await axioslogin.get(`/payrollprocess/Fixed/${emid}`)
            const { success, data } = result.data;
            if (success === 1) {
                setFixed(data)
            } else { }
        }
        getFixed()

    }, [emid])


    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    fixed && fixed.map((val, index) => {
                        return <TableRow key={val.ernded_slno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {/* <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.ernded_slno}</TableCell> */}
                            <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.earnded_name}</TableCell>
                            <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.em_amount}</TableCell>
                            <Suspense fallback={<LinearProgress />} >
                                <EarningTableCell emid={val.em_id} />
                            </Suspense>

                        </TableRow>
                    })
                }
            </Suspense>
        </Fragment >
    )
}

export default memo(FixedTableCell)