import { Checkbox, FormControlLabel, TableCell, TableRow } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Checkboxcompnt from './Checkboxcompnt'

const DueApprovalHrCompoent = ({ row, setfinaldata }) => {
    const [data, setdata] = useState(0)
    const [formData, setFormData] = useState({
        approval: false,
        reject: false
    })
    const { approval, reject } = formData
    useEffect(() => {
        if (data === 1) {
            setfinaldata((formData) => [...formData, {
                slno: row.duemast_slno,
                due_desc: row.due_desc,
                approval: approval,
                reject: reject
            }])
        }
    }, [formData])
    const updateHRApproval = async (e) => {
        setdata(1)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value, slno: row.duemast_slno, due_desc: row.due_desc })
    }
    return (
        <Fragment>
            <TableRow
                key={row.duemast_slno}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" align="left">
                    {row.due_desc}
                </TableCell>
                <TableCell align="left">
                    <Checkboxcompnt approval={approval} updateHRApproval={updateHRApproval} name={'approval'} label={"Yes"} />
                </TableCell>
                <TableCell align="left">

                    <Checkboxcompnt approval={reject} updateHRApproval={updateHRApproval} name={'reject'} label={"No"} />
                </TableCell>
            </TableRow>
        </Fragment>
    )
};

export default DueApprovalHrCompoent;
