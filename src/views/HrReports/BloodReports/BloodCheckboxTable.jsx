import { Checkbox, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';
import { useSelector, useDispatch } from 'react-redux';

const BloodCheckboxTable = ({ onChange }) => {
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBloodgrp());
    }, [])

    //for glood group name list
    const empBloodgrp = useSelector((state) => {
        return state.getEmployeeBloodgrp.empBlood
    })

    const handleAllClick = async (e) => {
        if (e.target.checked === true) {
            const newSelecteds = empBloodgrp.map((n) => n.group_slno);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    console.log(selected);
    return (
        <Table aria-labelledby="tableTitle" padding='none'>
            <TableBody>
                <TableRow>
                    <TableCell className="selectCheckbox" padding="checkbox" size='small'>
                        <Checkbox className="selectCheckbox"
                            name="Selectall"
                            value={selected}
                            label="Select All"
                            onClick={handleAllClick}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none" size='small'>
                        Select All
                    </TableCell>
                </TableRow>
                {
                    empBloodgrp && empBloodgrp.map((val) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={val.group_slno}

                            >
                                <TableCell className="selectCheckbox" padding="checkbox" size='small'>
                                    <Checkbox className="selectCheckbox"
                                        name={val.group_name}
                                        value={val.group_slno}
                                        label={val.group_name}
                                        onChange={onChange}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none" size='small'>
                                    {val.group_name}
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    )
}

export default BloodCheckboxTable