import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import DeleteIcon from '@mui/icons-material/Delete';
import LeaveCancelUserModel from './Component/LeaveCancelUserModel';

const LeaveRequestTable = ({ em_id, count, setCount }) => {
    const [state, setState] = useState(0)
    const [slnum, setSlno] = useState(0)
    const [lvtype, setlvtype] = useState(0)
    const [open, setOpen] = useState(false)
    const [leavecanceldetl, setleavecanceldetl] = useState([])
    useEffect(() => {
        if (em_id !== '') {
            const getleavecancel = async () => {
                const result = await axioslogin.get(`/LeaveRequest/leavecancel/${em_id}`)
                const { success, data } = result.data
                if (success === 1) {
                    setleavecanceldetl(data[0])
                }
            }
            getleavecancel()
        }
    }, [em_id, count])

    const LeaveCancel = async (type, slno) => {
        setSlno(slno)
        setlvtype(type)
        setState(1)
        setOpen(true)
    }
    const handleClose = async () => {
        setOpen(false)
    }

    return (
        <Fragment>
            {state === 1 ? <LeaveCancelUserModel open={open} handleClose={handleClose}
                slnum={slnum} lvtype={lvtype} em_id={em_id} count={count} setCount={setCount} /> : null}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Request Type</TableCell>
                            <TableCell align="left">Leave Date</TableCell>
                            <TableCell align="left">Leave Reason</TableCell>
                            <TableCell align="left">Leave Cancel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            leavecanceldetl && leavecanceldetl.map((val, index) => {

                                return < TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{val.leavetype} </TableCell>
                                    <TableCell align="left">{val.leave_date}</TableCell>
                                    <TableCell align="left">{val.leave_reason}</TableCell>
                                    <TableCell align="left">
                                        <IconButton size="small"
                                            onClick={(e) => {
                                                LeaveCancel(val.leavetypeid, val.leave_slno)
                                            }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>

                </Table>

            </TableContainer>
        </Fragment>
    )
}

export default LeaveRequestTable