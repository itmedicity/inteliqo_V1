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
import { useSelector } from 'react-redux';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

const HalfdayModal = ({ open, setOpen, empData, setCount }) => {

    const [reason, setReason] = useState('');

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const handleApproverequest = useCallback(async () => {
        const monthStartDate = format(startOfMonth(new Date(empData?.leavedate)), 'yyyy-MM-dd')
        const postData = {
            month: monthStartDate,
            section: empData?.dept_section
        }
        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
        const { success, data } = checkPunchMarkingHr.data
        if (success === 0 || success === 1) {
            const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(empData?.leavedate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
            const lastDay_month = format(lastDayOfMonth(new Date(empData?.leavedate)), 'yyyy-MM-dd')
            if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                warningNofity("Punch Marking Monthly Process Done !! Can't Cancel Miss Punch Request  ")
                setOpen(false)
            } else {

                const punchmast = {
                    empno: empData?.em_no,
                    dutyday: empData?.leavedate
                }
                const result = await axioslogin.post('/attendCal/attendanceshiftdetl', punchmast);
                const { success, data: punchdata } = result.data;
                if (success === 1) {
                    const { punch_slno } = punchdata[0];
                    const postData = {
                        punch_in: null,
                        punch_out: null,
                        hrs_worked: 0,
                        late_in: 0,
                        early_out: 0,
                        duty_status: 0,
                        duty_desc: 'A',
                        lvereq_desc: 'A',
                        lv_cancel_cmnt: reason,
                        lv_cancel_us_code: em_id,
                        punch_slno: punch_slno,
                        hrm_cl_slno: empData?.planslno,
                        half_slno: parseInt(empData?.half_slno)
                    }
                    const resultdel = await axioslogin.patch('/LeaveRequestApproval/cancel/halfday', postData);
                    const { success } = await resultdel.data;
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
    }, [empData, em_id, reason, setOpen, setCount])

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
                            Halfday Approved Request Cancel
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
                                Shift
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.shft_desc}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Halfday Taken Date
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.halfday_date}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Halfday Taken Time
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{empData?.halfday_status === 1 ? 'First Half' : 'Second Half'}
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
                                :{empData?.hf_reason}
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
    )
}

export default memo(HalfdayModal) 