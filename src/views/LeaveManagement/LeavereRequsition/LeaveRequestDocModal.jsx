import React, { useCallback } from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';
import { Button, ModalClose, Typography } from '@mui/joy';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { format, startOfMonth, lastDayOfMonth } from 'date-fns';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const LeaveRequestDocModal = ({ open, data, setOpen, setTable, setReason, setRequestType, setDropOpen }) => {
    const { detlPostSata, masterPostData } = data;

    const submitRequest = useCallback(async () => {
        const LWPCount = detlPostSata?.filter((k) => k?.leave_typeid === 5)
        if (LWPCount?.length > 1) {
            warningNofity("Can't Apply Two or More LWP Leaves")
            setDropOpen(false)
            setOpen(false)
        } else if (LWPCount?.length !== 0) {
            const checkLWp = {
                em_no: masterPostData?.em_no,
                fromDate: format(startOfMonth(new Date(masterPostData?.leavefrom_date)), 'yyyy-MM-dd'),
                toDate: format(lastDayOfMonth(new Date(masterPostData?.leavefrom_date)), 'yyyy-MM-dd')
            }
            const result = await axioslogin.post('/LeaveRequest/getLWPLeave/Inamonth', checkLWp);
            const { success: lwpsucc } = result.data;
            if (lwpsucc === 1) {
                warningNofity("A LWP Leave Exist In This Month!")
                setDropOpen(false)
                setOpen(false)
            } else {
                const submitLeaveRequet = await axioslogin.post('/LeaveRequest/modifiedLeaveRequest', data);
                const { success, message } = submitLeaveRequet.data;
                if (success === 1) {
                    setDropOpen(false)
                    setOpen(false)
                    setTable([])
                    setReason('')
                    setRequestType(0)
                    succesNofity("Leave request submited Successfully")

                } else {
                    setDropOpen(false)
                    setTable([])
                    setReason('')
                    setRequestType(0)
                    errorNofity(message)
                    setOpen(false)
                }
            }

        } else {
            const submitLeaveRequet = await axioslogin.post('/LeaveRequest/modifiedLeaveRequest', data);
            const { success, message } = submitLeaveRequet.data;
            if (success === 1) {
                setDropOpen(false)
                setOpen(false)
                setTable([])
                setReason('')
                setRequestType(0)
                succesNofity("Leave request submited Successfully")

            } else {
                setDropOpen(false)
                setTable([])
                setReason('')
                setRequestType(0)
                errorNofity(message)
                setOpen(false)
            }
        }
    }, [data, setOpen, setTable, setReason, setRequestType, setDropOpen, detlPostSata, masterPostData])

    const closeRequest = useCallback(() => {
        setOpen(false)
        setDropOpen(false)
    }, [setOpen, setDropOpen])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={closeRequest}
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
                        Leave Details
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                            fontSize="sm"
                        >
                            Request Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {format(new Date(), 'yyyy-MM-dd')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            No. of Leaves
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {masterPostData?.no_of_leave}
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
                <Paper variant="outlined" square sx={{
                    p: 0.5, mb: 0.8,
                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                }} >
                    {
                        detlPostSata?.map((val, idx) => {
                            return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} key={idx} >
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                    {format(new Date(val.lveDate), 'yyyy-MM-dd')}
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

export default memo(LeaveRequestDocModal)