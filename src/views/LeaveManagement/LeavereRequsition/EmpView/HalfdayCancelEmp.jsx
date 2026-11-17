import React, { Fragment, useCallback, memo, useMemo, useEffect } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { employeeIdNumber } from 'src/views/Constant/Constant';
const HalfdayCancelEmp = ({ open, setOpen, data, setCount }) => {
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)
    //const [reqDetl, setReqDetl] = useState([]);
    const [planSlno, setPlanslno] = useState(0)
    const [hrStatus, sethrStatus] = useState(0)
    const [leaveDate, setleaveDate] = useState('')

    const { slno, emno, name, section, status, reqDate } = data;

    const handleClose = () => {
        setOpen(false)
        setOpenBkDrop(false)
    }

    //GET THE DETAILED TABLE DATA USING API
    const getLeaveReqDetl = async (slno) => {
        const resultdel = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${slno}`);
        const { success, data } = resultdel?.data;
        if (success === 1) {
            const { planslno, hf_hr_apprv_status, leavedate } = data[0]
            setPlanslno(planslno)
            //setReqDetl(data)
            sethrStatus(hf_hr_apprv_status)
            setleaveDate(leavedate)
        }
    }

    useEffect(() => {
        if (slno !== null && slno !== undefined) {
            getLeaveReqDetl(slno)
        }
    }, [slno])

    const Canceldata = useMemo(() => {
        return {
            lv_cancel_cmnt: reason,
            lv_cancel_date: moment().format('YYYY-MM-DD HH:mm'),
            lv_cancel_us_code: employeeIdNumber(),
            half_slno: slno,
            hrm_cl_slno: planSlno,
            hrstatus: hrStatus,
            duty_day: leaveDate,
            em_no: emno,
        }
    }, [emno, reason, slno, hrStatus, leaveDate, planSlno])

    const Cancelrequest = useCallback(async () => {
        if (reason === '') {
            setOpenBkDrop(false)
            warningNofity("Please Add Reason! ")
        } else {
            const result = await axioslogin.patch('/LeaveRequestApproval/halfdaycancelReqUser', Canceldata);
            const { success } = result.data
            if (success === 1) {
                setOpenBkDrop(false)
                succesNofity('Leave Request Canceled')
                setCount(Math.random())
                setOpen(false)
            } else {
                setCount(Math.random())
                setOpenBkDrop(false)
                setOpen(false)
                errorNofity('Error Updating Leave Request')
            }
        }
    }, [Canceldata, reason, setOpen, setCount])

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
                    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                        <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Request Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(reqDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                        <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Halfday Leave Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(reqDate).format('DD-MM-YYYY')}
                            </Typography>
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
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={Cancelrequest}>
                                Leave Request Cancel
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleClose}>
                                Leave Request Close
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(HalfdayCancelEmp)