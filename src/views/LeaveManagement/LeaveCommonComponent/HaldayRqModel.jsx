import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment'
import { ImGift } from 'react-icons/im';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HaldayRqModel = ({ open, handleClose, hafdaydata, authority, em_id, setcount, count }) => {
    const [halfreason, setHalfreason] = useState('')
    useEffect(() => {
        if (hafdaydata.length === 1) {
            const { hf_reason } = hafdaydata[0]
            setHalfreason(hf_reason)
        }
    }, [hafdaydata])
    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const updateHalfdatereq = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submithaday = async () => {
        const submhalfday = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: hafdaydata[0].half_slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
            const { success, message } = result.data
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
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${hafdaydata[0].half_slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
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
                    const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
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
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
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
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${hafdaydata[0].half_slno}`)
            const { success, data, message } = result.data;
            if (success === 1) {
                const { hf_inc_apprv_req, hf_incapprv_status, hf_hod_apprv_req, hf_hod_apprv_status,
                    hf_ceo_req_status, hf_ceo_apprv_status } = data[0]
                if (hf_inc_apprv_req === 1 && hf_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvhalf', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${hafdaydata[0].half_slno}`)
                        const { success, data, message } = result.data;
                        if (success === 1) {
                            const { hf_hod_apprv_req, hf_hod_apprv_status } = data[0]
                            if (hf_hod_apprv_req === 1 && hf_hod_apprv_status === 0) {
                                const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                                const { success, message } = result.data
                                if (success === 1) {
                                    const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${hafdaydata[0].half_slno}`)
                                    const { success, data, message } = result.data;
                                    if (success === 1) {
                                        const { hf_ceo_req_status, hf_ceo_apprv_status } = data[0]
                                        if (hf_ceo_req_status === 1 && hf_ceo_apprv_status === 0) {
                                            const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
                                            const { success, message } = result.data
                                            if (success === 1) {
                                                const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                                                const { success, data, message } = result.data;
                                                if (success === 1) {
                                                    const post = data.map((val) => {
                                                        const postData = {
                                                            date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                                            req_type: 'HL',
                                                            leave: 1,
                                                            leave_subreq: val.planslno,
                                                            em_no: hafdaydata[0].em_no,
                                                        }
                                                        return postData
                                                    })
                                                    const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
                                            } else {
                                                warningNofity(message)
                                            }
                                        } else {
                                            const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                                            const { success, data, message } = result.data;
                                            if (success === 1) {
                                                const post = data.map((val) => {
                                                    const postData = {
                                                        date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                                        req_type: 'HL',
                                                        leave: 1,
                                                        leave_subreq: val.planslno,
                                                        em_no: hafdaydata[0].em_no,
                                                    }
                                                    return postData
                                                })
                                                const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
                                    } else {
                                        warningNofity(message)
                                    }
                                } else {
                                    warningNofity(message)
                                }

                            }
                        }
                    }

                } else if (hf_hod_apprv_req === 1 && hf_hod_apprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlhalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${hafdaydata[0].half_slno}`)
                        const { success, data, message } = result.data;
                        if (success === 1) {
                            const { hf_ceo_req_status, hf_ceo_apprv_status } = data[0]
                            if (hf_ceo_req_status === 1 && hf_ceo_apprv_status === 0) {
                                const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
                                const { success, message } = result.data
                                if (success === 1) {
                                    const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                                    const { success, data, message } = result.data;
                                    if (success === 1) {
                                        const post = data.map((val) => {
                                            const postData = {
                                                date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                                req_type: 'HL',
                                                leave: 1,
                                                leave_subreq: val.planslno,
                                                em_no: hafdaydata[0].em_no,
                                            }
                                            return postData
                                        })
                                        const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
                                } else {
                                    warningNofity(message)
                                }
                            } else {
                                const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                                const { success, data, message } = result.data;
                                if (success === 1) {
                                    const post = data.map((val) => {
                                        const postData = {
                                            date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                            req_type: 'HL',
                                            leave: 1,
                                            leave_subreq: val.planslno,
                                            em_no: hafdaydata[0].em_no,
                                        }
                                        return postData
                                    })
                                    const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
                        } else {
                            warningNofity(message)
                        }
                    } else {
                        warningNofity(message)
                    }

                } else if (hf_ceo_req_status === 1 && hf_ceo_apprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/Ceohalfday', submhalfday)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                        const { success, data, message } = result.data;
                        if (success === 1) {
                            const post = data.map((val) => {
                                const postData = {
                                    date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                    req_type: 'HL',
                                    leave: 1,
                                    leave_subreq: val.planslno,
                                    em_no: hafdaydata[0].em_no,
                                }
                                return postData
                            })
                            const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
                    } else {
                        warningNofity(message)
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/Hrhalfday', submhalfday)
                    const { success, data, message } = result.data;
                    if (success === 1) {
                        const post = data.map((val) => {
                            const postData = {
                                date: moment(new Date(val.leavedate)).format('YYYY-MM-DD'),
                                req_type: 'HL',
                                leave: 1,
                                leave_subreq: val.planslno,
                                em_no: hafdaydata[0].em_no,
                            }
                            return postData
                        })
                        const results = await axioslogin.patch('/LeaveRequestApproval/updatehrPuchhalfday', post)
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
            } else {
                warningNofity(message)
            }

        }
        // else if (authority === 5) {
        //     const result = await axioslogin.patch('./LeaveRequestApproval/halfdaycancelReq', submhalfday)
        //     const { success, message } = result.data
        //     if (success === 1) {
        //         succesNofity(message)
        //         Hrhalfdayrequest(arraydepsect).then((val) => {
        //             setleavereq(val)
        //         })
        //         handleClose()
        //     }
        //     else if (success === 2) {
        //         warningNofity(message)
        //     }
        //     else {
        //         errorNofity(message)
        //     }
        // }
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
                <DialogTitle>{"No Punch Request Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    width: '100%',
                    height: 600
                }}>
                    <Box sx={{
                        width: "100%",
                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                    }} >
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
                                            hafdaydata.map((val, index) => {
                                                const tr = <TableRow key={index}>
                                                    <TableCell align="center">{format(new Date(val.leavedate), 'dd-MM-yyyy')}</TableCell>
                                                    <TableCell align="center">Casual Leave</TableCell>
                                                    <TableCell align="center">{val.month}</TableCell>
                                                </TableRow>

                                                return tr
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Box sx={{ width: "100%", pt: 1 }}>
                            <Tooltip title="Reason" followCursor placement='top' arrow>
                                <TextField
                                    fullWidth
                                    id="fullWidth" size="small"
                                    disabled
                                    value={halfreason}
                                />
                            </Tooltip>
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
                                                updateHalfdatereq(e)
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
                                                updateHalfdatereq(e)
                                            }
                                        />
                                    }
                                    label="Reject"
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", pt: 1 }}>
                            <Tooltip title="Remark" followCursor placement='top' arrow>
                                <TextField
                                    id="fullWidth"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    value={reason}
                                    name="reasonautho"
                                    onChange={(e) => setreason(e.target.value)}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </DialogContent >
                <DialogActions>
                    <Button color="primary" onClick={submithaday} >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default HaldayRqModel