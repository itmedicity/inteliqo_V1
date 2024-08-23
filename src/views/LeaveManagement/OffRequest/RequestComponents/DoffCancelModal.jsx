import React, { useCallback, useMemo, useState } from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';
import { Button, ModalClose, Textarea, Typography } from '@mui/joy';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

const DoffCancelModal = ({ open, setOpen, empData, setCount }) => {
    const [reason, setReason] = useState('')

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    const closeRequest = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const submitRequest = useCallback(async () => {
        const punchmast = {
            empno: empData?.em_no,
            dutyday: empData?.required_date
        }

        const getID = {
            startDate: format(new Date(empData?.required_date), 'yyyy-MM-dd'),
            em_id: empData?.em_id
        }

        const dutyID = {
            startDate: format(new Date(empData?.duty_date), 'yyyy-MM-dd'),
            em_id: empData?.em_id
        }

        const monthStartDate = format(startOfMonth(new Date(empData?.required_date)), 'yyyy-MM-dd')
        const postData = {
            month: monthStartDate,
            section: empData?.sect_id
        }
        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
        const { success, data } = checkPunchMarkingHr.data
        if (success === 0 || success === 1) {
            const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(empData?.required_date)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
            const lastDay_month = format(lastDayOfMonth(new Date(empData?.required_date)), 'yyyy-MM-dd')
            if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                setOpen(false)
                warningNofity("Punch Marking Monthly Process Done !! Can't Apply DOFF Request!!  ")
            } else {
                const result = await axioslogin.post('LeaveRequest/gethafdayshift/', getID);
                const { success, data: pladata } = result.data;
                if (success === 1) {
                    const { plan_slno: doffPlanSlno } = pladata[0];
                    const result = await axioslogin.post('/attendCal/attendanceshiftdetl', punchmast);
                    const { success, data } = result.data;
                    if (success === 1) {
                        const { punch_slno } = data[0];

                        const result = await axioslogin.post('LeaveRequest/gethafdayshift/', dutyID);
                        const { success, data: dutydata } = result.data;
                        if (success === 1) {
                            const { plan_slno } = dutydata[0];

                            const postData = {
                                punch_in: null,
                                punch_out: null,
                                hrs_worked: 0,
                                late_in: 0,
                                early_out: 0,
                                duty_status: 0,
                                duty_desc: 'A',
                                lvereq_desc: 'A',
                                delete_user: em_id,
                                delete_comments: reason,
                                duty_off_slno: empData?.duty_off_slno,
                                punch_slno: punch_slno,
                                plan_slno: plan_slno,
                                doffPlanSlno: doffPlanSlno,
                                shift_id: 1
                            }

                            const result = await axioslogin.post('/OffRequest/delete', postData)
                            const { success, message } = result.data;
                            if (success === 1) {
                                succesNofity(message)
                                setCount(Math.random())
                                setOpen(false)
                            } else {
                                warningNofity("Error While Updating Data")
                            }
                        } else {
                            errorNofity("Error While getting Dutyplan data! Please Contact IT")
                        }

                    } else {
                        errorNofity("Error While getting Punchmast data! Please Contact IT")
                    }
                } else {
                    errorNofity("Error While getting Dutyplan data! Please Contact IT")
                }
            }
        } else {
            setOpen(false)
            errorNofity("Error getting PunchMarkingHR ")
        }




    }, [empData, setCount, setOpen, reason, em_id])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"

            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}

        >
            <ModalDialog size="lg" sx={{ width: "30vw" }} >
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

                <Box sx={{ mt: 0.5, pt: 1, textAlign: 'center' }} >
                    <Typography variant="outlined" color="success" justifyContent="center">
                        Doff Day Details
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, }} >
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                            fontSize="sm"
                        >
                            24 Duty Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {empData?.twentyDuty}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            Doff Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {empData?.required_date}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flex: 1, }}>
                    <Typography
                        level="body2"
                        // startDecorator={<InfoOutlined />}
                        sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                    >
                        Are you sure want to delete?
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Textarea name="Outlined" placeholder="Reason For Deleting Request"
                        variant="outlined" onChange={(e) => setReason(e.target.value)} />
                </Box>
                <Box sx={{ pt: 0.5 }} >
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success" onClick={submitRequest}>
                            Verify & Submit
                        </Button>
                        <Button variant="solid" color="danger" onClick={closeRequest}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(DoffCancelModal) 