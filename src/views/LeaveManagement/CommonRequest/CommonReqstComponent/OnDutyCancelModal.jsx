import React, { useCallback, useMemo, useState } from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';
import { Button, ModalClose, Textarea, Typography } from '@mui/joy';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';

const OnDutyCancelModal = ({ open, setOpen, empData, setCount }) => {
    const [reason, setReason] = useState('')

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    const submitRequest = useCallback(async () => {

        const postData = {
            cancel_comment: reason,
            cancel_user: em_id,
            slno: empData?.onduty_slno
        }

        const result = await axioslogin.patch('/CommonReqst/cancel/onduty', postData)
        const { message, success } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(Math.random())
            setOpen(false)
        } else {
            warningNofity(message)
            setOpen(false)
        }

    }, [em_id, reason, empData, setOpen, setCount])

    const closeRequest = useCallback(() => {
        setOpen(false)
    }, [setOpen])


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
                        On Duty Day Details
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, }} >
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                            fontSize="sm"
                        >
                            Duty Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {empData?.dutyDate}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            Shift Desc
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {empData?.shft_desc}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            Reason
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {empData?.reason}
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

export default memo(OnDutyCancelModal) 