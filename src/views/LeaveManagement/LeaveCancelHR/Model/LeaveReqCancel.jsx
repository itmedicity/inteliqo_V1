import React, { useState, Fragment, memo, useCallback } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { employeeNumber } from 'src/views/Constant/Constant';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const LeaveReqCancel = ({ open, setOpen, data, setCount }) => {
    //STATES
    const [reqDetl, setReqDetl] = useState([]);
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)

    //DISPLAY THE DATA 
    const { slno, emno, name, section, hrstatus, reqDate, fromDate, toDate } = data;
    //GET THE DETAILED TABLE DATA USING API
    const getLeaveReqDetl = async (slno) => {
        const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${slno}`);
        const { success, data } = resultdel?.data;
        if (success === 1) {
            setReqDetl(data)
        }
    }

    useEffect(() => {
        if (slno !== null && slno !== undefined) {
            getLeaveReqDetl(slno)
        }
    }, [slno])

    const Cancelrequest = useCallback(async () => {
        //CASUAL LEAVE 
        const casualLev = reqDetl?.filter(val => val.leave_typeid === 1)?.map(val => {
            return { ...val, emno: emno }
        });
        //NATIONAL HOLIDAY
        const Holiday = reqDetl?.filter(val => val.leave_typeid === 3 || val.leave_typeid === 4)?.map(val => {
            return { ...val, emno: emno }
        });
        //EARN LEAVE
        const earnLeave = reqDetl?.filter(val => val.leave_typeid === 8)?.map(val => {
            return { ...val, emno: emno }
        });
        //COMPENSATORY OFF
        const compansatoryOff = reqDetl?.filter(val => val.leave_typeid === 11)?.map(val => {
            return { ...val, emno: emno }
        });

        //COMMON LEAVES 
        const commonLeaves = reqDetl?.filter((val) => val.leave_typeid !== 1 &&
            val.leave_typeid !== 3 &&
            val.leave_typeid !== 4 &&
            val.leave_typeid !== 8 &&
            val.leave_typeid !== 11
        ).map(val => {
            return { ...val, emno: emno }
        });


        const LeaveCanceldata = {
            lv_cancel_cmnt: reason,
            lv_cancel_date: moment().format('YYYY-MM-DD HH:mm'),
            lv_cancel_us_code: employeeNumber(),
            lve_uniq_no: slno
        }

        const result = await axioslogin.patch(`/LeaveRequestApproval/lveReqCanclHr`, LeaveCanceldata);
        const { success } = result.data
        if (success === 1) {


            //UPDATE HOLIDAY 
            const holidayLeavePromise = new Promise(async (resolve, reject) => {
                if (Holiday?.length > 0) {
                    const resulthl = await axioslogin.post(`/LeaveRequestApproval/CancelHolidayLeave`, Holiday);
                    const { success, message } = resulthl.data;
                    if (success === 1) {
                        resolve('Holiday Leave Request updated')
                    } else {
                        reject(`HL Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            //UPDATE CASUAL LEAVE TABLE
            const casualLeavePromise = new Promise(async (resolve, reject) => {
                if (casualLev?.length > 0) {
                    const resultcl = await axioslogin.post(`/LeaveRequestApproval/CancelCasualyLeave`, casualLev);
                    const { success, message } = resultcl.data;
                    if (success === 1) {
                        resolve('Casual Leave Request Updated')
                    } else {
                        reject(`CL Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            //EARN LEAVE 
            const earnLeavePromise = new Promise(async (resolve, reject) => {
                if (earnLeave?.length > 0) {
                    const resultel = await axioslogin.post(`/LeaveRequestApproval/CancelEarnLeave`, earnLeave);
                    const { success, message } = resultel.data;
                    if (success === 1) {
                        resolve('Earn Leave Request updated')
                    } else {
                        reject(`EL Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })


            //COFF UPDATION
            const coffLeavePromise = new Promise(async (resolve, reject) => {
                if (compansatoryOff?.length > 0) {
                    const resultcoff = await axioslogin.post(`/LeaveRequestApproval/CancelCoffLeave`, compansatoryOff);
                    const { success, message } = resultcoff.data;
                    if (success === 1) {
                        resolve('COFF Request Approved')
                    } else {
                        reject(`COFF Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            //UPDATE COMMON LEAVE TABLE
            const commonLeavePromise = new Promise(async (resolve, reject) => {
                if (commonLeaves?.length > 0) {
                    const resultcl = await axioslogin.post(`/LeaveRequestApproval/CancelCasualyLeave`, commonLeaves);
                    const { success, message } = resultcl.data;
                    if (success === 1) {
                        resolve('Casual Leave Request Updated')
                    } else {
                        reject(`CL Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            /**** UPDATE PUNCH MASTER TABLE ****/
            const esiLeave = reqDetl?.filter(val => val.leave_typeid === 6)?.map(val => {
                return { ...val, emno: emno }
            });
            const lwfLeave = reqDetl?.filter(val => val.leave_typeid === 5)?.map(val => {
                return { ...val, emno: emno }
            });
            const withOutesilwf = reqDetl?.filter(val => val.leave_typeid !== 5 && val.leave_typeid !== 6)?.map(val => {
                return { ...val, emno: emno }
            });

            //UPDATE PUNCH MASTER TABLE ESI LEAVE
            const updateEsiLeavePunchMaster = new Promise(async (resolve, reject) => {
                if (esiLeave?.length > 0) {
                    const esiPunchMasterUpdate = await axioslogin.post(`/LeaveRequestApproval/CancelpunchMastEsiLeave`, esiLeave);
                    const { success, message } = esiPunchMasterUpdate.data;
                    if (success === 1) {
                        resolve('ESI Leave Updated')
                    } else {
                        reject(`Esi Punch Master Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            //UPDATE PUNCH MASTER TABLE LWP LEAVE 
            const updateLwpPunchMaster = new Promise(async (resolve, reject) => {
                if (lwfLeave?.length > 0) {
                    const lwfPunchMasterUpdate = await axioslogin.post(`/LeaveRequestApproval/CancelpunchMastLwfLeave`, lwfLeave);
                    const { success, message } = lwfPunchMasterUpdate.data;
                    if (success === 1) {
                        resolve('LWF Leave Updated')
                    } else {
                        reject(`LWP Punch Master Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            //UPDATE PUNCH MASTER TABLE BALANCE ALL LEAVE 
            const updateLeavePunchMasterTable = new Promise(async (resolve, reject) => {
                if (withOutesilwf?.length > 0) {
                    const leaveUpdationPunchMaster = await axioslogin.post(`/LeaveRequestApproval/CancelpunchMastLeave`, withOutesilwf);
                    const { success, message } = leaveUpdationPunchMaster.data;
                    if (success === 1) {
                        resolve('Leave Updation')
                    } else {
                        reject(`Leave Updation with OUT ESI and LWP Updation ! Error ${message}`)
                    }
                } else {
                    resolve(1)
                }
            })

            if (hrstatus === 1) {

                Promise.all([
                    casualLeavePromise,
                    holidayLeavePromise,
                    earnLeavePromise,
                    coffLeavePromise,
                    commonLeavePromise,
                    updateEsiLeavePunchMaster,
                    updateLwpPunchMaster,
                    updateLeavePunchMasterTable
                ]).then(result => {
                    if (result) {
                        setOpenBkDrop(false)
                        setCount(Math.random())
                        succesNofity('Leave Request Approved')
                        setOpen(false)
                    }
                }).catch(error => {
                    setCount(Math.random())
                    errorNofity('Error Updating Leave Request')
                    const errorLog = {
                        error_log_table: 'punch_master,leave_request,leave_reqdetl',
                        error_log: error,
                        em_no: emno,
                        formName: 'Leave Approval Modal Approval HR Page'
                    }
                    axioslogin.post(`/common/errorLog`, errorLog);
                    setOpenBkDrop(false)
                    setOpen(false)
                })

            }

            else {
                Promise.all([
                    casualLeavePromise,
                    holidayLeavePromise,
                    earnLeavePromise,
                    coffLeavePromise,
                    commonLeavePromise

                ]).then(result => {
                    if (result) {
                        setOpenBkDrop(false)
                        setCount(Math.random())
                        succesNofity('Leave Request Approved')
                        setOpen(false)
                    }
                }).catch(error => {
                    setCount(Math.random())
                    errorNofity('Error Updating Leave Request')
                    const errorLog = {
                        error_log_table: 'punch_master,leave_request,leave_reqdetl',
                        error_log: error,
                        em_no: emno,
                        formName: 'Leave Approval Modal Approval HR Page'
                    }
                    axioslogin.post(`/common/errorLog`, errorLog);
                    setOpenBkDrop(false)
                    setOpen(false)
                })

            }
        }

    }, [slno, reqDetl, emno, hrstatus, setCount, reason, setOpen])

    // Half Day Request Cancel Close
    const handleClose = () => {
        setOpen(false)
        setOpenBkDrop(false)
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
                            Leave Request Cancel
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
                        <Box sx={{ display: 'flex', flex: 1, pr: 1, justifyContent: 'space-between' }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Request From
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg">
                                {moment(fromDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, pr: 1, justifyContent: 'space-between' }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Request To
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg">
                                {moment(toDate).format('DD-MM-YYYY')}
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
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        {
                            reqDetl?.map((val, idx) => {
                                return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} key={idx} >
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                        {moment(val.leave_dates).format('DD-MM-YYYY')}
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                                        {val.leavetype_name}
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                                        {val.leave_name}
                                    </Typography>
                                </Box>
                            })
                        }
                    </Paper>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…" variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={Cancelrequest}>
                                Save
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(LeaveReqCancel)