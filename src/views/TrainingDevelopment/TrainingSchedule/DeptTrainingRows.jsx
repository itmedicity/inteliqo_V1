import React, { memo, useCallback, useState } from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material';
import { Fragment } from 'react';
import TableEditModal from './TableEditModal';
import moment from 'moment';

const DeptTrainingRows = ({ tabledata, count, Setcount }) => {
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(0);
    const [rowdata, setrowdata] = useState({});


    const handleClick = useCallback((val) => {
        setrowdata(val);
        setOpen(true);
        setFlag(1);
    }, [])

    return (
        <Fragment>
            <TableBody>
                {
                    tabledata?.map((val, index) => (
                        <TableRow key={index}>
                            {/* <TableCell sx={{ textAlign: "center" }}>
                                {moment(val.months).format("MMM")}
                            </TableCell> */}
                            <TableCell onClick={() => handleClick(val)} sx={{
                                textDecoration: "underline",
                                textAlign: "center",
                                color: "blue",
                                cursor: "pointer"
                            }}>
                                {val.training_topic_name}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {val.traineer_name}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {val.date}
                            </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>

            {
                flag === 1 ? <TableEditModal rowdata={rowdata} setrowdata={setrowdata} count={count} Setcount={Setcount} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} /> : null
            }
        </Fragment >
    );
}

export default memo(DeptTrainingRows);
