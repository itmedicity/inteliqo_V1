import React, { memo, useCallback, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, ModalDialog, Textarea, Button } from '@mui/joy';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeIdNumber } from 'src/views/Constant/Constant';

const CoffCancelModal = ({ open, setOpen, coffdata, setCount }) => {

    const [reason, setReason] = useState('')

    const handleClose = useCallback(() => {
        setReason('')
        setOpen(false)
    }, [setOpen])

    const handleCancel = useCallback(async () => {
        if (!reason || reason.trim() === '') {
            warningNofity("Reason For Cancel The Request is Mandatory")
            return
        }

        try {
            const deleteData = {
                lv_cancel_cmnt: reason,
                lv_cancel_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                doc_cmp_off_reqid: coffdata?.doc_cmp_off_reqid,
                lv_cancel_emid: employeeIdNumber(),
                em_no: coffdata?.em_no,
                leave_date:format(new Date(coffdata?.leave_date), 'yyyy-MM-dd'),
                lvereq_desc:'A',
                duty_desc:'A'
            }

            const result = await axioslogin.patch('/DoctorsProcess/doctorCoff/delete', deleteData)
            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNofity(message || 'COFF Request Deleted Successfully')
                if (setCount) setCount(Math.random())
                handleClose()
            } else {
                errorNofity(message || 'Error While Deleting COFF Request')
            }
        } catch (error) {
            errorNofity('Error While Cancelling COFF Request!')
        }
    }, [reason, coffdata, setCount, handleClose])
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
                            COFF Request Cancel
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
                                <Typography level="title-lg">{coffdata?.em_name}</Typography>
                                <Typography level="title-lg">Employee No # {coffdata?.em_no}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                            <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                            <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{coffdata?.sect_name}</Typography>
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
                                {coffdata?.reqestdate && !isNaN(new Date(coffdata.reqestdate))
                                    ? format(new Date(coffdata.reqestdate), 'dd-MM-yyyy HH:mm')
                                    : 'NIL'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Duty Name
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{coffdata?.dutyTyp}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Leave Date
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{coffdata?.leave_date && !isNaN(new Date(coffdata?.leave_date))
                                    ? format(new Date(coffdata?.leave_date), 'dd-MM-yyyy')
                                    : 'NIL'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Duty Date
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                :{coffdata?.duty_taken_date && !isNaN(new Date(coffdata?.duty_taken_date))
                                    ? format(new Date(coffdata?.duty_taken_date), 'dd-MM-yyyy')
                                    : 'NIL'}
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
                                :{coffdata?.cf_reason}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 1 }} >
                    <Textarea
                        name="Outlined"
                        placeholder="Reason For Cancel The Request here…"
                        variant="outlined"
                        minRows={2}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', px: 2, py: 2, mb: 1 }}>
                        <Button variant='solid' color="success" onClick={handleCancel}>
                            Delete Request
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

export default memo(CoffCancelModal) 
