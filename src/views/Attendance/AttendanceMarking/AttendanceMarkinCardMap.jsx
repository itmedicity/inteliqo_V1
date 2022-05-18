import { LinearProgress, Typography } from '@mui/material'
import { TableCell, TableRow } from '@material-ui/core';
import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import '../styleattnd.css'
import AttendanceMarkingTabdata from './AttendanceMarkingTabdata';
import AttandanceMarkingtotal from './AttandanceMarkingtotal';
import AttendanceMarkingCheckbox from './AttendanceMarkingCheckbox';

const AttendanceMarkinCardMap = ({ val, key, data, count, dateformat, rageset, employeedata, arrytry, setArrytry }) => {
    useEffect(() => {

    }, [count])



    const [formData, setFormData] = useState({
        approval: false,
    })
    const { approval } = formData

    const updateSelect = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value, emid: val.em_id })
    }


    //getting employee of row where check box is checked
    const updateAttendanceMarking = (value) => {
        if (value === true) {
            const arry = {
                emid: val.em_id
            }
            setArrytry([...arrytry, arry])
        }
        if (value === false) {
            const arry2 = {
                emid: val.em_id
            }
            const final = arrytry.filter((val) => {
                return val.emid !== arry2.emid
            })
            setArrytry(final)
        }
    }

    return (
        <Fragment>

            <TableRow key={key} >
                <TableCell align="right" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }} >
                    <AttendanceMarkingCheckbox
                        approval={approval}
                        updateApproval={updateSelect}
                        name={'approval'}
                        testChecked={updateAttendanceMarking}
                    />
                </TableCell>
                <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }} >
                    <Typography variant="subtitle2" noWrap={true}>
                        {val.em_name}
                    </Typography>
                </TableCell>
                <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                    <Typography variant="subtitle2">
                        {val.em_id}
                    </Typography>
                </TableCell>

                <Suspense fallback={<LinearProgress />} >
                    <AttendanceMarkingTabdata data={data} count={count} dateformat={dateformat} rageset={rageset} />
                    <AttandanceMarkingtotal data={data} length={dateformat.length} count={count} />

                </Suspense>
            </TableRow>
        </Fragment>
    )
}

export default memo(AttendanceMarkinCardMap)

