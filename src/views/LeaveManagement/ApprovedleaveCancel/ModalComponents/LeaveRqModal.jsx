import React, { useCallback, memo, useMemo, useEffect } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { ModalDialog, Avatar, Textarea } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

const LeaveRqModal = ({ open, setOpen, empData, setCount }) => {


    const [reason, setReason] = useState('');
    const [reqDetl, setReqDetl] = useState([]);

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    useEffect(() => {
        const getLeaveReqDetl = async (slno) => {
            const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${slno}`);
            const { success, data } = resultdel?.data;
            if (success === 1) {
                setReqDetl(data)
            } else {
                setReqDetl([])
            }
        }
        getLeaveReqDetl(empData?.lve_uniq_no)
    }, [empData])


    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const handleApproverequest = useCallback(async () => {
        //CASUAL LEAVE 
        const casualLev = reqDetl?.filter(val => val.leave_typeid === 1)?.map(val => {
            return { ...val, emno: empData?.em_no }
        });
        //EARN LEAVE
        const earnLeave = reqDetl?.filter(val => val.leave_typeid === 8)?.map(val => {
            return { ...val, emno: empData?.em_no }
        });
        //COMPENSATORY OFF
        const compansatoryOff = reqDetl?.filter(val => val.leave_typeid === 11)?.map(val => {
            return { ...val, emno: empData?.em_no }
        });

        //COMMON LEAVES 
        const commonLeaves = reqDetl?.filter((val) => val.leave_typeid !== 1 &&
            val.leave_typeid !== 3 &&
            val.leave_typeid !== 4 &&
            val.leave_typeid !== 8 &&
            val.leave_typeid !== 11
        ).map(val => {
            return { ...val, emno: empData?.em_no }
        });

        const LeaveCanceldata = {
            lv_cancel_cmnt: reason,
            lv_cancel_date: moment().format('YYYY-MM-DD HH:mm'),
            lv_cancel_us_code: em_id,
            lve_uniq_no: empData?.lve_uniq_no
        }

        const monthStartDate = format(startOfMonth(new Date(empData?.leave_date)), 'yyyy-MM-dd')
        const postData = {
            month: monthStartDate,
            section: empData?.dept_section
        }
        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
        const { success, data } = checkPunchMarkingHr.data
        if (success === 0 || success === 1) {
            const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(empData?.leave_date)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
            const lastDay_month = format(lastDayOfMonth(new Date(empData?.leave_date)), 'yyyy-MM-dd')
            if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                warningNofity("Punch Marking Monthly Process Done !! Can't Cancel Leave Request  ")
                setOpen(false)
            } else {

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
                        const resultcl = await axioslogin.post(`/LeaveRequestApproval/CancelCommonLeave`, commonLeaves);
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
                    return { ...val, emno: empData?.em_no }
                });
                const lwfLeave = reqDetl?.filter(val => val.leave_typeid === 5)?.map(val => {
                    return { ...val, emno: empData?.em_no }
                });
                const withOutesilwf = reqDetl?.filter(val => val.leave_typeid !== 5 && val.leave_typeid !== 6)?.map(val => {
                    return { ...val, emno: empData?.em_no }
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
                Promise.all([
                    casualLeavePromise,
                    earnLeavePromise,
                    coffLeavePromise,
                    commonLeavePromise,
                    updateEsiLeavePunchMaster,
                    updateLwpPunchMaster,
                    updateLeavePunchMasterTable
                ]).then(async (result) => {
                    if (result) {
                        const result = await axioslogin.patch(`/LeaveRequestApproval/lveReqCanclHr`, LeaveCanceldata);
                        const { success } = result.data
                        if (success === 1) {
                            setOpen(false)
                            setCount(Math.random())
                            succesNofity('Leave Request Cancelled Successfully')
                            setOpen(false)
                        } else {
                            errorNofity("Error while updating leave request table")
                        }
                    }
                }).catch(error => {
                    setCount(Math.random())
                    errorNofity('Error Updating Leave Request')
                    const errorLog = {
                        error_log_table: 'punch_master,leave_request,leave_reqdetl',
                        error_log: error,
                        em_no: empData?.em_no,
                        formName: 'Leave Approval Modal Approval HR Page'
                    }
                    axioslogin.post(`/common/errorLog`, errorLog);
                    setOpen(false)
                })
            }
        } else {
            errorNofity("Error getting PunchMarkingHR ")
            setOpen(false)
        }

    }, [reason, empData, em_id, reqDetl, setCount, setOpen])
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',

            }}
        >
            <ModalDialog size="lg" sx={{ p: 0, }}  >
                <ModalClose
                    //  variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Box sx={{
                    p: 1,
                    width: '100%', display: 'flex', borderRadius: 0, flex: 1,
                    bgcolor: '#E0FBE2'
                }}>
                    <Box sx={{ flex: 1, width: '100%' }} >
                        <Typography sx={{ fontWeight: 600 }} >
                            Approved Leave Request Cancel
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', p: 1 }} >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            pr: 2,
                            "--Avatar-size": "60px",
                            "--Avatar-ringSize": "8px"
                        }}
                    >
                        <Avatar src="" size="sm" />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, }} >
                                <Typography level="title-lg">{empData?.em_name}</Typography>
                                <Typography level="title-lg">Employee No # {empData?.em_no}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                            <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                            <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{empData?.sect_name}</Typography>
                        </Box>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center', px: 1, borderBlockStyle: 'outset',
                        flexDirection: 'column',
                    }} >
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Request Date
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.requestDate}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Leave From
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.fromDate}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Leave To
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.toDate}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Reason
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.leave_reason}
                            </Typography>
                        </Box>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8, width: '100%' }} >
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
                </Box>
                <Box sx={{ p: 1 }} >
                    <Textarea name="Outlined" placeholder="Reason For Cancel The Request here…"
                        variant="outlined" onChange={(e) => setReason(e.target.value)} />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', px: 2, py: 2, mb: 1 }}>
                        <Button variant='solid' color="success" onClick={handleApproverequest}>
                            Save
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(LeaveRqModal) 