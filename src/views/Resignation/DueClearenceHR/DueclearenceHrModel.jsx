import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DueApprovalHrCompoent from './DueApprovalHrCompoent'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DueclearenceHrModel = ({ open, handleClose, slno, deptsec, SetCount, count }) => {
    const [dueDetl, setDuedetl] = useState([])
    const [finaldata, setfinaldata] = useState([])
    const [dueMast, setdueMast] = useState([])
    useEffect(() => {
        const getDuedetl = async () => {
            const result = await axioslogin.get(`/dueclearence/getdueDetl/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDuedetl(data)
            }
            else if (success === 0) {
                setDuedetl([])
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getDuedetl()
        const getDueMastData = async () => {
            const result = await axioslogin.get('/duemast')
            const { success, data } = result.data
            if (success === 1) {
                setdueMast(data)
            }
            else {
                setdueMast([])
            }
        }
        getDueMastData()
    }, [slno])
    const postdataa = finaldata.map((val) => {
        return {
            slno: val.slno,
            due_desc: val.due_desc,
            approval: val.approval === false ? 0 : 1,
            em_sec: deptsec,
            emid: slno
        }
    })
    //save
    const submitFormData = async () => {
        const result = await axioslogin.post('/dueclrHR', postdataa)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            SetCount(count + 1)
            handleClose()
        }
        else {
            errorNofity("Error Occured!!1Please Contact EDp")
        }
    }
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Due Clearence HR"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        minWidth: 800,
                        maxWidth: 800,
                        width: 800,
                    }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="row g-1">
                                    <div className="col-md-12 pt-2 pb-1">
                                        <Typography>DUE CLEARENCE DEPARTMENT</Typography>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Department</TableCell>
                                                    <TableCell align="left">Status</TableCell>
                                                    <TableCell align="left" >Department Comment</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dueDetl.map((row) => (
                                                    <TableRow
                                                        key={row.due_slno}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" align="left">
                                                            {row.due_deptname}
                                                        </TableCell>
                                                        <TableCell align="left" >{row.due_dept_status}</TableCell>
                                                        <TableCell align="left">{row.due_dept_comment}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className="row-g-1">
                                    <div className="col-md-12 pt-2 pb-1">
                                        <Typography>DUE CLEARENCE DEPARTMENT OF HR</Typography>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                            <TableBody>
                                                {dueMast.map((val, index) => (

                                                    <DueApprovalHrCompoent row={val} key={index} setfinaldata={setfinaldata} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitFormData}>Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default DueclearenceHrModel;
