import React, { useCallback, memo, useMemo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { ModalDialog, Avatar, Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { useSelector } from 'react-redux';

const OneHourModal = ({ open, setOpen, onhourdata, setCount }) => {

    const [reason, setReason] = useState('');

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    const handleApproverequest = useCallback(async () => {

        const monthStartDate = format(startOfMonth(new Date(onhourdata?.one_hour_duty_day)), 'yyyy-MM-dd')
        const postData = {
            month: monthStartDate,
            section: onhourdata?.dept_sect_id
        }
        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
        const { success, data } = checkPunchMarkingHr.data
        if (success === 0 || success === 1) {
            const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(onhourdata?.one_hour_duty_day)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
            const lastDay_month = format(lastDayOfMonth(new Date(onhourdata?.one_hour_duty_day)), 'yyyy-MM-dd')
            if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                warningNofity("Punch Marking Monthly Process Done !! Can't Cancel One Hour Request  ")
                setOpen(false)
            } else {
                const punchmast = {
                    empno: onhourdata?.em_no,
                    dutyday: onhourdata?.one_hour_duty_day
                }
                const result = await axioslogin.post('/attendCal/attendanceshiftdetl', punchmast);
                const { success, data } = result.data;
                if (success === 1) {
                    const { punch_slno } = data[0];
                    const postData = {
                        punch_in: null,
                        punch_out: null,
                        hrs_worked: 0,
                        late_in: 0,
                        early_out: 0,
                        duty_status: 0,
                        duty_desc: 'A',
                        lvereq_desc: 'A',
                        cancel_comment: reason,
                        slno: onhourdata?.request_slno,
                        punch_slno: punch_slno,
                        cancel_user: em_id,
                        em_no: onhourdata?.em_no,
                        duty_day: onhourdata?.one_hour_duty_day

                    }
                    const result = await axioslogin.post('/CommonReqst/cancel/approvedOneHour', postData)
                    const { success } = result.data;
                    if (success === 1) {
                        succesNofity("Request Cancelled Successfully!")
                        setOpen(false)
                        setCount(Math.random())
                    } else {
                        errorNofity("Error While cancelling Request")
                    }
                } else {
                    errorNofity("Error While getting Punchmast data! Please Contact IT")
                }
            }
        } else {
            errorNofity("Error getting PunchMarkingHR ")
            setOpen(false)
        }
    }, [onhourdata, reason, setCount, setOpen, em_id])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <>
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
                                One Hour Approved Request Cancel
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
                                    <Typography level="title-lg">{onhourdata?.em_name}</Typography>
                                    <Typography level="title-lg">Employee No # {onhourdata?.em_no}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{onhourdata?.sect_name}</Typography>
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
                                    :{onhourdata?.requestDate}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Shift
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{onhourdata?.shft_desc}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    One Hour day
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{onhourdata?.one_hour_day}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    One Hour Time
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{onhourdata?.checkin_flag === 1 ? 'In Punch Time' : onhourdata?.checkout_flag === 1 ? 'Out Punch Time' : null}
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
                                    :{onhourdata?.reason}
                                </Typography>
                            </Box>
                        </Box>
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
        </>
    )
}

export default memo(OneHourModal) 