import React, { Fragment, useState, useContext, memo, useCallback } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { IconButton } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { useMemo } from 'react';

const MarkingComponent = ({ value }) => {

    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_no } = employeedetails
    const [count, setcount] = useState(0)
    const [assign, setassign] = useState({ coassign: false })
    const [cosetup, setcosetup] = useState(0)

    const updateAssign = useCallback((e) => {
        setcosetup(1)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setassign({ ...assign, [e.target.name]: value })

    }, [assign])

    const postData = useMemo(() => {
        return {
            emp_id: value.emp_id,
            co_assign: assign.coassign === true ? 1 : 0,
            create_user: em_no
        }
    }, [value, em_no, assign])

    const submitAssign = useCallback(async (e) => {
        e.preventDefault();

        const result = await axioslogin.post('/authorization/coassign', postData)
        const { message, success } = result.data;
        if (success === 1) {
            setcount(count + 1)
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }, [postData, count])


    return (
        <Fragment>
            <TableRow
                key={value.emp_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{value.emp_id}</TableCell>
                <TableCell align="center">{value.sect_name}</TableCell>
                <TableCell align="center">{value.em_name}</TableCell>
                <TableCell align="center">{
                    <JoyCheckbox
                        // label='Incharge'
                        checked={value.coassign === 1 && cosetup === 0 ? true : assign.coassign}
                        name="coassign"
                        onchange={(e) => updateAssign(e)}
                    />
                }
                </TableCell>
                <TableCell align="center">
                    {/* <BiPlusCircle size={24} color="success" /> */}
                    <IconButton aria-label="add" style={{ padding: "0rem" }}
                        onClick={submitAssign}
                    >
                        <AddTaskRoundedIcon color="success" />
                    </IconButton>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default memo(MarkingComponent)
