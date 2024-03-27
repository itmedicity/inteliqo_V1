import React, { Fragment, useCallback, useEffect, memo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { CssVarsProvider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { format } from 'date-fns';

const CompOffRqModel = ({ setOpen, open, handleClose, authority, em_id, setcount, count, slno }) => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')

    const [formdata, setformData] = useState({
        coffreason: '',
        emp_name: '',
        emp_id: '',
        requestdate: '',
        leavedate: '',
        leavetype: '',
        durationpunch: '',
        sect_name: '',
        punchindata: '',
        punchoutdata: ''
    })
    const { coffreason, emp_name, emp_id, requestdate, leavedate, durationpunch,
        sect_name, punchindata, punchoutdata } = formdata;

    //redux data of all compensatory leave request
    const compOffrqData = useSelector((state) => state?.setAllLeaveApproval?.compOffrqData?.compOffRqList, _.isEqual)

    useEffect(() => {
        if (Object.keys(compOffrqData).length > 0) {
            //filtering selected row from all compensatory off request
            const array = compOffrqData && compOffrqData.filter((val) => val.cmp_off_reqid === slno)
            const { em_name, reqtype_name, em_no, reqestdate, cf_reason, leave_date, durationpunch,
                sect_name, punchindata, punchoutdata } = array[0]
            const formdata = {
                emp_id: em_no,
                emp_name: em_name,
                requestdate: moment(new Date(reqestdate)).format('DD-MM-YYYY'),
                leavetype: reqtype_name,
                coffreason: cf_reason,
                leavedate: moment(new Date(leave_date)).format('DD-MM-YYYY'),
                durationpunch: durationpunch,
                sect_name: sect_name,
                punchindata: punchindata,
                punchoutdata: punchoutdata
            }
            setformData(formdata)
        }
    }, [compOffrqData, slno])

    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        const sumbcompens = {
            status: 1,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvcoff', sumbcompens)
                const { success, message } = result.data
                if (success === 1) {
                    setreason('')
                    setcount(count + 1)
                    succesNofity(message)
                    handleClose()
                    setOpenBkDrop(false)
                }
                else {
                    errorNofity(message)
                    setOpenBkDrop(false)
                }
            }
        }
        else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${slno}`)
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
                                setreason('')
                                setcount(count + 1)
                                succesNofity(message)
                                handleClose()
                                setOpenBkDrop(false)
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(count + 1)
                            succesNofity(message)
                            handleClose()
                        } else {
                            errorNofity(message)
                            setOpenBkDrop(false)
                        }
                    }
                } else {

                }
            }
        }

    }, [reason, slno, em_id, count, handleClose, setcount, authority])

    const handleRegectRequest = useCallback(async () => {
        setOpenBkDrop(true)
        const sumbcompens = {
            status: 2,
            comment: reason,
            slno: slno,
            apprvdate: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            us_code: em_id
        }
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvcoff', sumbcompens)
                const { success, message } = result.data
                if (success === 1) {
                    setreason('')
                    setcount(count + 1)
                    succesNofity(message)
                    handleClose()
                    setOpenBkDrop(false)
                } else {
                    errorNofity(message)
                    setOpenBkDrop(false)
                }
            }
        } else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${slno}`)
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
                                setreason('')
                                setcount(count + 1)
                                succesNofity(message)
                                handleClose()
                                setOpenBkDrop(false)
                            } else {
                                errorNofity(message)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/HodApprvlcoff', sumbcompens)
                        const { success, message } = result.data
                        if (success === 1) {
                            setreason('')
                            setcount(count + 1)
                            succesNofity(message)
                            handleClose()
                            setOpenBkDrop(false)
                        } else {
                            errorNofity(message)
                            setOpenBkDrop(false)
                        }
                    }
                } else {

                }
            }
        }
    }, [reason, slno, em_id, count, handleClose, setcount, authority])

    return (
        <Fragment>
            <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center', }} >
                        <Typography
                            fontSize="xl2"
                            lineHeight={1}
                            startDecorator={
                                <EmojiEmotionsOutlinedIcon sx={{ color: 'green' }} />
                            }
                            sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                        >
                            {emp_name}
                        </Typography>
                        <Typography
                            lineHeight={1}
                            component="h3"
                            id="modal-title"
                            level="h5"
                            textColor="inherit"
                            fontWeight="md"
                            // mb={1}
                            endDecorator={<Typography
                                level="h6"
                                justifyContent="center"
                                alignItems="center"
                                alignContent='center'
                                lineHeight={1}
                            >
                                {emp_id}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Request Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {requestdate}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Duty Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: {leavedate}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Punch In Time</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: {moment(new Date(punchindata)).format('DD-MM-YYYY  hh:mm:ss')}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Punch Out Time</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md">: {moment(new Date(punchoutdata)).format('DD-MM-YYYY  hh:mm:ss')}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Duty Hour</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {`${Math.floor(durationpunch / 60)}:${durationpunch % 60}`}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Leave Reason</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {coffreason}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setreason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                COFF Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                COFF Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(CompOffRqModel) 