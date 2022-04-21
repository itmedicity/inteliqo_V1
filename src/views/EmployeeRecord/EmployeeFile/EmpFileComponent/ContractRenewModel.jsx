import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core'
import { Slide } from '@mui/material';
import moment from 'moment';
import { eachDayOfInterval } from 'date-fns/esm';
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ContractRenewModel = ({ data, open, setOpenn }) => {
    const [dutytotal, setdutydatatotal] = useState([])
    const rage = eachDayOfInterval(
        { start: new Date(data.start), end: new Date(data.end) }
    )
    const length = rage.length
    useEffect(() => {
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', data)
            const { success, message } = result.data
            if (success === 1) {
                setdutydatatotal(message)
            }
            else if (success === 0) {
                setdutydatatotal([])
            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getattnsdata()
    }, [data])
    const postDataa = dutytotal && dutytotal.map((val) => {
        return {
            emp_id: val.emp_id,
            work_days: length,
            present: val.duty_status,
            att_leave: val.leave_type,
            Lop: parseFloat(length) - (parseFloat(val.duty_status) + parseFloat(val.leave_type)),
            tot_days: (parseFloat(val.duty_status) + parseFloat(val.leave_type)),
            contract_renew_date: moment(new Date()).format('YYYY-MM-DD')
        }
    })
    const submitFormdata = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/AttendanceContrRenew', postDataa)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setOpenn(false)
        }
        else {
            errorNofity("Error Occurred!!Please Contact EDp")
        }
    }


    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Attendance Details"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table" className='attends'>
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }}>
                                    <TableCell>Work Days </TableCell>
                                    <TableCell>Present</TableCell>
                                    <TableCell>Leave</TableCell>
                                    <TableCell>Lop</TableCell>
                                    <TableCell>Total Days</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Suspense fallback={<LinearProgress />} >
                                    {dutytotal && dutytotal.map((val) => {
                                        return <TableRow key={val.duty_worked}  >
                                            <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }} >
                                                <Typography variant="subtitle2" noWrap={true}>
                                                    {length}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                                                <Typography variant="subtitle2">
                                                    {val.duty_status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                                                <Typography variant="subtitle2">
                                                    {val.leave_type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                                                <Typography variant="subtitle2">
                                                    {parseFloat(length) - (parseFloat(val.duty_status) + parseFloat(val.leave_type))}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                                                <Typography variant="subtitle2">
                                                    {(parseFloat(val.duty_status) + parseFloat(val.leave_type))}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>

                                    })
                                    }

                                </Suspense>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogActions>
                        <Button color="primary" onClick={submitFormdata} >Process</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default ContractRenewModel