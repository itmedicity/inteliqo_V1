import React, { Fragment, useCallback, useEffect, memo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { Chip, CssVarsProvider, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { employeeNumber } from 'src/views/Constant/Constant';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const CompansatoryOff = ({ open, setOpen, data, setCount }) => {

    //DISPLAY THE DATA 
    const { slno, emno, name, section, status } = data;
    //STATES
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const [coff, setCoff] = useState({
        reqestdate: '',
        leave_date: '',
        cf_reason: '',
        em_id: 0,
        punchindata: '',
        punchoutdata: '',
        durationpunch: ''
    })

    const { reqestdate, leave_date, cf_reason, em_id, punchindata, punchoutdata, durationpunch } = coff

    //GET THE DETAILED TABLE DATA USING API
    const getLeaveReqDetl = async (slno) => {
        const resultdel = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${slno}`);
        const { success, data } = resultdel?.data;
        if (success === 1) {
            const { leave_date, reqestdate, cf_reason, em_id, punchoutdata, punchindata, durationpunch } = data[0]
            const formdata = {
                reqestdate: reqestdate,
                leave_date: leave_date,
                cf_reason: cf_reason,
                em_id: em_id,
                punchindata: punchindata,
                punchoutdata: punchoutdata,
                durationpunch: durationpunch
            }
            setCoff(formdata)
        }
    }

    useEffect(() => {
        if (slno !== null && slno !== undefined) {
            getLeaveReqDetl(slno)
        }
    }, [slno])

    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        const formData = {
            cf_hr_apprv_status: 1,
            cf_hr_apprv_cmnt: reason,
            cf_hr_apprv_time: moment().format('YYYY-MM-DD HH:mm'),
            cf_hr_uscode: employeeNumber(),
            cmp_off_reqid: slno,
            calculated_date: leave_date,
            credited_date: moment().format('YYYY-MM-DD HH:mm'),
            emp_id: em_id,
            lvetype_slno: 11

        }
        if (reason === '') {
            warningNofity("Plaese Add Remark")
            setOpenBkDrop(false)
        } else {
            //UPDATE LEAVE MASTER TABLE
            const resultdel = await axioslogin.patch(`/LeaveRequestApproval/HrCoff`, formData);
            const { success, message } = await resultdel.data;
            if (success === 1) {
                setOpenBkDrop(false)
                setCount(Math.random())
                succesNofity('Leave Request Approved')
                setOpen(false)
            }
            else {
                succesNofity(message)
            }
        }
    }, [reason, slno, leave_date, setCount, setOpen, em_id])
    const CoffRejectdata = {
        cf_hr_apprv_status: 2,
        cf_hr_apprv_cmnt: reason,
        cf_hr_apprv_time: moment().format('YYYY-MM-DD HH:mm'),
        cf_hr_uscode: employeeNumber(),
        cmp_off_reqid: slno
    }

    // HALF DAY LEAVE HR REJECT
    const handleRegectRequest = async () => {
        const result = await axioslogin.patch(`/LeaveRequestApproval/CoffReqRejectHr`, CoffRejectdata);
        const { success } = result.data
        if (success === 1) {
            setOpenBkDrop(false)
            setOpen(false)
            setCount(Math.random())
            succesNofity('Leave Request Reject')
        }
        else {
            setOpenBkDrop(false)
            setOpen(false)
            setCount(Math.random())
            errorNofity('Error Updating Leave Request')
        }
    }
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
                            {name}
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
                                {emno}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{section}</Typography>
                    </Box>
                    <Box sx={{ mt: 0.5, pt: 1 }} >
                        <Typography variant="outlined" color="success">
                            {status}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> Request Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                            <CssVarsProvider>
                                <Typography level="body1" fontSize="md"> : {reqestdate}</Typography>
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
                                <Typography level="body1" fontSize="md">: {leave_date}</Typography>
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
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Requested Leave Information.
                        </Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Reason:
                            </Typography>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                {cf_reason}
                            </Typography>
                        </Box>
                    </Paper>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Leave Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                Leave Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}
export default memo(CompansatoryOff)