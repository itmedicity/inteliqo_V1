import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { CssVarsProvider, Typography } from '@mui/joy';
import moment from 'moment';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CompOffRqModel = ({ open, handleClose, hafdaydata, authority, em_id, setcount, count }) => {

    const [formdata, setformData] = useState({
        coffreason: '',
        emp_name: '',
        emp_id: '',
        requestdate: '',
        leavedate: '',
        leavetype: '',
        durationpunch: ''
    })
    const { coffreason, emp_name, emp_id, requestdate, leavedate, leavetype, durationpunch } = formdata;

    useEffect(() => {
        if (hafdaydata.length === 1) {
            const { cf_reason, em_name, em_no, reqestdate, leave_date, reqtype_name, durationpunch } = hafdaydata[0]
            const formdata = {
                coffreason: cf_reason,
                emp_name: em_name,
                emp_id: em_no,
                requestdate: moment(new Date(reqestdate)).format('YYYY-MM-DD'),
                leavedate: moment(new Date(leave_date)).format('YYYY-MM-DD'),
                leavetype: reqtype_name,
                durationpunch: durationpunch
            }
            setformData(formdata)
        }
    }, [hafdaydata])
    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status

    const updatecompensatory = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitcompensatry = async () => {
        const sumbcompens = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: hafdaydata[0].cmp_off_reqid,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvcoff', sumbcompens)
            const { success, message } = result.data
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
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${hafdaydata[0].cmp_off_reqid}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { cf_inc_apprv_req, cf_incapprv_status } = data[0]
                if (cf_inc_apprv_req === 1 && cf_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvcoff', sumbcompens)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
                        const { success, message } = result.data
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
                        }
                        else if (success === 2) {
                            warningNofity(message)
                        }
                        else {
                            errorNofity(message)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
                    const { success, message } = result.data
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
                    }
                    else if (success === 2) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }

        }
        else if (authority === 3) {
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceocoff', sumbcompens)
            const { success, message } = result.data
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
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 4) {
            const result = await axioslogin.patch('/LeaveRequestApproval/HrCoff', sumbcompens)
            const { success, data, message } = result.data;
            if (success === 1) {
                const { em_id } = data[0]
                const postData = {
                    calculated_date: format(new Date(), 'yyyy-MM-dd'),
                    emp_id: em_id,
                }
                const results = await axioslogin.post('/LeaveRequestApproval/insertcoffleaveCalc', postData)
                const { success, message } = results.data
                if (success === 1) {
                    succesNofity("Updated")
                    const ob1 = {
                        apprv: false,
                        reject: false

                    }
                    setstatus(ob1)
                    setreason('')
                    setcount(count + 1)
                    handleClose()
                }
                else if (success === 2) {
                    warningNofity(message)
                }
                else {
                    errorNofity(message)
                }
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 5) {
            const result = await axioslogin.patch('./LeaveRequestApproval/coffCancel', sumbcompens)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                handleClose()
            }
            else if (success === 2) {
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
                <DialogTitle>{"Compensatory Off Approval"}</DialogTitle>
                <DialogContent sx={{ width: '100%', height: 'auto' }}>
                    <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography level="body1"> Emp. ID</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                                <CssVarsProvider>
                                    <Typography level="body1"> {emp_id}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                <CssVarsProvider>
                                    <Typography level="body1"> Name</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", textTransform: "capitalize" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {emp_name.toLowerCase()}</Typography>
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
                                    <Typography level="body1"> {requestdate}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                <CssVarsProvider>
                                    <Typography level="body1"> Leave Type</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {leavetype}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography level="body1"> Leave Date</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {leavedate}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography level="body1"> Duty Hour</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {`${Math.floor(durationpunch / 60)}:${durationpunch % 60}`}</Typography>
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
                                    <Typography level="body1"> {coffreason}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
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
                                                updatecompensatory(e)
                                            }
                                        />
                                    }
                                    label="Approve"
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
                                                updatecompensatory(e)
                                            }
                                        />
                                    }
                                    label="Reject"
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", pt: 1, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography level="body1"> Leave Reason</Typography>
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
                </DialogContent >
                <DialogActions>
                    <Button color="primary" onClick={submitcompensatry} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(CompOffRqModel) 