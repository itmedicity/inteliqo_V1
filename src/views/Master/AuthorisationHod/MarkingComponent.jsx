import React, { Fragment, useState, useContext, memo } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Checkbox, IconButton } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const MarkingComponent = ({ value }, key) => {

    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_no } = employeedetails
    const [count, setcount] = useState(0)
    const [assign, setassign] = useState({ coassign: false })
    const [cosetup, setcosetup] = useState(0)

    const updateAssign = (e) => {
        setcosetup(1)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setassign({ ...assign, [e.target.name]: value })

    }

    const postData = {
        emp_id: value.emp_id,
        co_assign: assign.coassign === true ? 1 : 0,
        create_user: em_no
    }

    const submitAssign = async (e) => {
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
    }


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
                    <Checkbox
                        name="coassign"
                        color="primary"
                        // value={coassign}
                        checked={value.coassign === 1 && cosetup === 0 ? true : assign.coassign}
                        className="py-0 px-5"
                        onChange={(e) => {
                            updateAssign(e)
                        }}
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
