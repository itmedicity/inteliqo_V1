import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Paper, Slide, TextField, } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { format } from 'date-fns';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { CssVarsProvider, Typography } from '@mui/joy';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NopunchRqModel = ({ open, handleClose, authority, em_id, count, setcount, slno }) => {
    //redux for all no punch data
    const nopunchRqData = useSelector((state) => state?.setAllLeaveApproval?.nopunchRqData?.nopunchRqList, _.isEqual)
    const [formdata, setFormData] = useState({
        emp_name: '',
        emp_id: '',
        nopreason: '',
        checktintime: '',
        checkouttime: '',
        nopunchdate: '',
        requestdate: ''
    })
    const { emp_name, emp_id, nopreason, checktintime, checkouttime, nopunchdate, requestdate } = formdata;

    useEffect(() => {
        if (Object.keys(nopunchRqData).length > 0) {
            //filtering selected row from all no punch data array
            const array = nopunchRqData && nopunchRqData.filter((val) => val.nopunch_slno === slno)
            const { em_name, em_no, nopunchdate, checkintime, checkouttime, creteddate, checkinflag, checkoutflag, np_reason } = array[0]
            const formdata = {
                emp_name: em_name,
                emp_id: em_no,
                nopreason: np_reason,
                checktintime: checkinflag === 1 ? format(new Date(checkintime), 'HH:mm:ss') : '00:00:00',
                checkouttime: checkoutflag === 1 ? format(new Date(checkouttime), 'HH:mm:ss') : '00:00:00',
                nopunchdate: moment(new Date(nopunchdate)).format('DD-MM-YYYY'),
                requestdate: moment(new Date(creteddate)).format('DD-MM-YYYY')
            }
            setFormData(formdata)
        }
    }, [nopunchRqData, slno])

    const [reason, setreason] = useState('')
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const updatenopunchreq = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    const submitnopunch = async () => {
        const submitpunch = {
            status: apprv === true && reject === false ? 1 : apprv === false && reject === true ? 2 : null,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
        //submitting incharge approval
        if (authority === 1) {
            const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', submitpunch)
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
        //submitting hod approval
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${slno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { np_inc_apprv_req, np_incapprv_status } = data[0]
                if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                    const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', submitpunch)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', submitpunch)
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
                    const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', submitpunch)
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
        //submitting ceo approval
        else if (authority === 3) {
            const result = await axioslogin.patch('./LeaveRequestApproval/Ceonopunch', submitpunch)
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
        // else if (authority === 5) {
        //     const result = await axioslogin.patch('./LeaveRequestApproval/nopunchCancel', submitpunch)
        //     const { success, message } = result.data
        //     if (success === 1) {
        //         succesNofity(message)
        //         getHRnopunchrequst(arraydepsect).then((val) => {
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
                <DialogContent sx={{ width: '100%', height: 'auto' }}>
                    <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography fontSize="xl" level="body1">No Punch Request Approval </Typography>
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
                                            <Typography level="body1"> Miss Punch Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {nopunchdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Check In</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {checktintime}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Check Out</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {checkouttime}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">Reason</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {nopreason}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
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
                                                    updatenopunchreq(e)
                                                }
                                            />
                                        }
                                        label="No Punch Request Approve"
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
                                                    updatenopunchreq(e)
                                                }
                                            />
                                        }
                                        label="No Punch Request Reject"
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
                            <Button color="primary" onClick={submitnopunch} >SAVE</Button>
                            <Button onClick={handleClose} color="primary" >Close</Button>
                        </DialogActions>
                    </Paper>
                </DialogContent >
            </Dialog >
        </Fragment >
    )
}
export default memo(NopunchRqModel)