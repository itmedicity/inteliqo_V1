import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { format } from 'date-fns';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import _ from 'underscore';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const LeavRqModel = ({ open, handleClose, authority, em_id, setcount, count, slno }) => {
    //redux data all leave request
    const leaveRqData = useSelector((state) => state?.setAllLeaveApproval?.leaveRqData?.leaveRqList, _.isEqual)
    const [details, setDetails] = useState([])
    const [formdata, setformData] = useState({
        emp_name: '',
        emp_id: '',
        leave_reason: '',
        leave_date: '',
        requestdate: '',
        leavetodate: '',
        no_of_leave: '',
        lve_uniq_no: ''

    })
    const { emp_name, emp_id, leavetodate, leave_reason, requestdate, leave_date, no_of_leave, lve_uniq_no } = formdata;

    useEffect(() => {
        if (Object.keys(leaveRqData).length > 0) {
            //filtering selected row from all data array
            const array = leaveRqData && leaveRqData.filter((val) => val.leave_slno === slno)
            const { em_name, em_no, leave_reason, request_date, leave_date, leavetodate, no_of_leave, lve_uniq_no } = array[0]
            const formdata = {
                emp_id: em_no,
                emp_name: em_name,
                leave_date: moment(new Date(leave_date)).format('DD-MM-YYYY'),
                requestdate: moment(new Date(request_date)).format('DD-MM-YYYY'),
                leave_reason: leave_reason,
                leavetodate: moment(new Date(leavetodate)).format('DD-MM-YYYY'),
                no_of_leave: no_of_leave,
                lve_uniq_no: lve_uniq_no
            }
            setformData(formdata)
        }
        const getLeaveDetails = async () => {
            //to get leave request details
            const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${slno}`)
            if (resultdel.data.success === 1) {
                setDetails(resultdel.data.data)
            } else {
                setDetails([])
            }
        }
        getLeaveDetails()
    }, [leaveRqData, slno])


    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const [reason, setreason] = useState('')

    const updateInchargeApproval = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitdata = async () => {
        const postleavedata = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id,
            lve_uniq_no: lve_uniq_no
        }
        //incharge approval
        if (authority === 1) {
            const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', postleavedata)
            const { success, message } = result.data;
            if (success === 1) {
                setcount(count + 1)
                succesNofity(message)
                const ob1 = {
                    apprv: false,
                    reject: false

                }
                setstatus(ob1)
                setreason('')
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        //hod appoval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { inc_apprv_req, incapprv_status } = data[0]
                if (inc_apprv_req === 1 && incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', postleavedata)
                    const { success } = result.data;
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', postleavedata)
                        const { success, message } = result.data;
                        if (success === 1) {
                            succesNofity(message)
                            const ob1 = {
                                apprv: false,
                                reject: false

                            }
                            setstatus(ob1)
                            setreason('')
                            setcount(count + 1)
                            handleClose()

                        } else if (success === 2) {
                            warningNofity(message)
                        }
                        else {
                            errorNofity(message)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', postleavedata)
                    const { success, message } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        const ob1 = {
                            apprv: false,
                            reject: false

                        }
                        setstatus(ob1)
                        setreason('')
                        setcount(count + 1)
                        handleClose()

                    } else if (success === 2) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }
        }
        //ceo approval
        else if (authority === 3) {
            const result = await axioslogin.patch('/LeaveRequestApproval/CeoApprvLeave', postleavedata)
            const { success, message } = result.data;
            if (success === 1) {
                const ob1 = {
                    apprv: false,
                    reject: false

                }
                setstatus(ob1)
                setreason('')
                setcount(count + 1)
                succesNofity(message)
                handleClose()

            } else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent sx={{ width: '100%', height: 'auto' }}>
                    <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography fontSize="xl" level="body1">Leaves Request Approval </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Emp. ID</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {emp_id}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", textTransform: "capitalize" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {emp_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Request Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {requestdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> No of Days</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {no_of_leave}</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Leave From Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {leave_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">Leave To date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {leavetodate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Leave Reason</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {leave_reason}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
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
                                            {
                                                details && details.map((val, index) => {
                                                    const tr = <TableRow key={index}>
                                                        <TableCell align="center">{format(new Date(val.leave_dates), 'dd-MM-yyyy')}</TableCell>
                                                        <TableCell align="center">{val.leavetype_name}</TableCell>
                                                        <TableCell align="center">{val.leave_name}</TableCell>
                                                    </TableRow>

                                                    return tr
                                                })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>


                            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', pt: 0.5, justifyContent: 'space-between' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="apprv"
                                                color="primary"
                                                value={apprv}
                                                checked={apprv}
                                                onChange={(e) =>
                                                    updateInchargeApproval(e)
                                                }
                                            />
                                        }
                                        label="Leave Request Approve"
                                    />
                                </Box>

                                <Box sx={{ width: '100%', }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="reject"
                                                color="primary"
                                                value={reject}
                                                checked={reject}

                                                className="ml-2 "
                                                onChange={(e) =>
                                                    updateInchargeApproval(e)
                                                }
                                            />
                                        }
                                        label="Leave Request Reject"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", pt: 1, display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Remark</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                    <TextField
                                        id="fullWidth"
                                        size="small"
                                        type="text"
                                        fullWidth
                                        value={reason}
                                        name="reasonautho"
                                        onChange={(e) => setreason(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Button color="primary" onClick={submitdata} >Save</Button>
                            <Button onClick={handleClose} color="primary" >Close</Button>
                        </DialogActions>
                    </Paper>
                </DialogContent >

            </Dialog >
        </Fragment >
    )
}
export default memo(LeavRqModel)