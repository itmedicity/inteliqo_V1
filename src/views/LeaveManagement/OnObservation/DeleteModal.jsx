import React, { useCallback, useMemo, useState } from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';
import { Avatar, Button, ButtonGroup, CardActions, CardContent, CardOverflow, ModalClose, Textarea, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import { format, isValid } from 'date-fns';

const DeleteModal = ({ open, setOpen, empdata }) => {

    const { observation_slno, em_no, em_name, em_doj, sect_name } = empdata;

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, } = employeeProfileDetl;

    const [reason, setReason] = useState('')

    const closeModal = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const submitData = useCallback(async () => {
        const punchmast = {
            empno: em_no,
            dutyday: em_doj
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
                delete_user: em_id,
                delete_comment: reason,
                delete_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                punch_slno: punch_slno,
                observation_slno: observation_slno

            }
            const result = await axioslogin.post('/OnObservationRequest/inactiveOnObservation', postData)
            const { success } = result.data;
            if (success === 1) {
                succesNofity("Request Cancelled Successfully!")
                setOpen(false)
            } else {
                errorNofity("Error While cancelling Request")
            }
        } else {
            errorNofity("Error While getting Punchmast data! Please Contact IT")
        }
    }, [em_no, reason, em_id, observation_slno, em_doj, setOpen])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog size="lg" variant="outlined" >
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

                <CardContent>
                    <Box sx={{ display: 'flex' }} >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                pr: 2,
                                "--Avatar-size": "80px",
                                "--Avatar-ringSize": "8px"
                            }}
                        >
                            <Avatar src="" size="lg" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, }} >
                                    <Typography level="title-lg">{em_name}</Typography>
                                    <Typography level="title-lg">Employee No # {em_no}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{sect_name}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }} >
                        Observation Day : {isValid(new Date(em_doj)) === true ? format(new Date(em_doj), 'dd-MM-yyyy') : 'NOT UPDATED'}
                    </Box>
                    <Box sx={{ flex: 1, }}>
                        <Textarea name="Outlined" placeholder="Reason For Deleting Request"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                    </Box>
                </CardContent>
                <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                    <CardActions buttonFlex="1">
                        <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                            <Button variant="solid" color="success" onClick={submitData}>Delete</Button>
                            <Button variant="solid" color="danger" onClick={closeModal}>Cancel</Button>
                        </ButtonGroup>
                    </CardActions>
                </CardOverflow>
            </ModalDialog>
        </Modal>
    )
}

export default memo(DeleteModal) 