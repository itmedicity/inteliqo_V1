import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ModelApproveReject = ({ open, handleClose }) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>{"Leave Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12" >
                                <div className="col-md-12 col-sm-12">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Leave Request Type"
                                        fullWidth
                                        disabled="Disabled"
                                    // value={}
                                    // name=""
                                    />
                                </div>
                                <div className="row g-1 pt-1">
                                    <div className="col-md-4">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                            disabled="Disabled"
                                        //value={finestart}
                                        //name="finestart"
                                        // changeTextValue={(e) => {
                                        //     getstart(e)
                                        // }}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="End  Date"
                                            disabled="Disabled"
                                        // value={finestart}
                                        // name="finestart"
                                        // changeTextValue={(e) => {
                                        //     getstart(e)
                                        // }}
                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="No of days"
                                            fullWidth
                                            disabled="Disabled"
                                        // value={}
                                        // name=""
                                        // changeTextValue={(e) => }
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12">
                                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                            <TableContainer sx={{ maxHeight: 440 }}>
                                                <Table sx={{ minWidth: 50 }} size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">Days</TableCell>
                                                            <TableCell align="center">Leave Type</TableCell>
                                                            <TableCell align="center">Month of Leaves</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center">1</TableCell>
                                                            <TableCell align="center">Casual Leave</TableCell>
                                                            <TableCell align="center">November</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell align="center">2</TableCell>
                                                            <TableCell align="center">Holiday Leave</TableCell>
                                                            <TableCell align="center">Xmass</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=" Reason For Leave"
                                            fullWidth
                                            disabled="Disabled"
                                        // value={}
                                        // name=""
                                        />
                                    </div>
                                </div>

                                <div className="row g-1 ">
                                    <div className="col-md-12 pt-2 pl-6">
                                        <RadioGroup row name="row-radio-buttons-group">
                                            <FormControlLabel
                                                value="approve"
                                                label="Approve"
                                                control={<Radio color="success" size="small" />}
                                            />

                                            <FormControlLabel
                                                value="reject"
                                                control={<Radio color="secondary" size="small" />}
                                                label="Reject"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=" Reason For Cancel"
                                            fullWidth
                                        // value={}
                                        // name=""
                                        // changeTextValue={(e) => }
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div >

                </DialogContent >
                <DialogActions>
                    <Button color="primary" >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >

        </Fragment >
    )
}

export default memo(ModelApproveReject)
