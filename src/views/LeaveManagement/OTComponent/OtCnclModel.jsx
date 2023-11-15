import React, { Fragment, memo, useEffect, useState } from 'react'
import { CssVarsProvider, Textarea, Typography } from '@mui/joy'
import { Box, Button, Dialog, DialogActions, DialogContent, Paper, Slide } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import moment from 'moment';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const OtCnclModel = ({ open, handleClose, rowData, count, setCount, logEmpid, apprvlname }) => {
    const { em_no, em_name, ot_date, ot_days, over_time, ot_reson, shft_desc, ot_slno, check_in, check_out } = rowData[0]

    const [cancel, setCancel] = useState('')
    const [array, setArray] = useState([])

    const patchdata = {
        ot_status: 1,
        ot_cancel_reason: cancel,
        ot_cancel_date: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss'),
        ot_cancel_user: logEmpid,
        ot_slno: ot_slno
    }

    useEffect(() => {
        if (check_in !== 0 && check_out !== 0) {
            const obj = {
                punch_taken: 0,
                emp_code: em_no,
                punch_time: check_in
            }
            const obj2 = {
                punch_taken: 0,
                emp_code: em_no,
                punch_time: check_out
            }
            setArray([...array, obj, obj2])
        }
    }, [check_in, array, em_no, check_out])

    const submitCancel = async (e) => {
        e.preventDefault()
        const result1 = await axioslogin.patch('/overtimerequest/cancelot/dept', patchdata)
        const { success, message } = result1.data
        if (success === 2) {
            const result1 = await axioslogin.patch('/overtimerequest/inactive/punch', array)
            const { success, message } = result1.data
            if (success === 1) {
                succesNofity("Ot Approval Incharge Rejected ");
                setCancel('')
                setCount(count + 1)
                handleClose()
            } else {
                infoNofity(message)
            }
        } else if (success === 1) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
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
                                    <Typography fontSize="xl" level="body1">{apprvlname} </Typography>
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
                                            <Typography level="body1"> : {em_no}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", textTransform: "capitalize" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {em_name}</Typography>
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
                                            <Typography level="body1"> : {moment(new Date(ot_date)).format('DD-MM-YYYY')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Shift</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {shft_desc}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">OT Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {moment(new Date(ot_days)).format('DD-MM-YYYY')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Time in Min.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {over_time} minutes</Typography>
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
                                            <Typography level="body1"> : {ot_reson}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                            <Box sx={{ width: "100%", pt: 1, display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Remark</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 6 }} >
                                    <CssVarsProvider>
                                        <Textarea
                                            label="Outlined"
                                            placeholder="Reason For Cancel"
                                            variant="outlined"
                                            color="warning"
                                            size="lg"
                                            minRows={1}
                                            maxRows={2}
                                            onChange={(e) => setCancel(e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Button color="primary" onClick={submitCancel} >SAVE</Button>
                            <Button onClick={handleClose} color="primary" >Close</Button>
                        </DialogActions>
                    </Paper>
                </DialogContent >
            </Dialog >
        </Fragment>
    )
}

export default memo(OtCnclModel)