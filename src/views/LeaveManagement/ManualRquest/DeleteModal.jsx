import React, { useCallback } from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';
import { Button, ModalClose, Typography } from '@mui/joy';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const DeleteModal = ({ open, setOpen, punchMastdata, setCount }) => {

    const submitRequest = useCallback(async () => {
        const { punch_slno, manual_slno } = punchMastdata
        const postData = {
            punch_in: null,
            punch_out: null,
            hrs_worked: 0,
            late_in: 0,
            early_out: 0,
            duty_status: 0,
            duty_desc: 'A',
            lvereq_desc: 'A',
            punch_slno: punch_slno,
        }

        const deleteId = {
            manual_slno: manual_slno
        }
        let result = await axioslogin.post("/attendCal/deletePunchMasterSingleRow", postData);
        const { success } = result.data;
        if (success === 1) {

            let result = await axioslogin.patch("/attendCal/inactiveStatus", deleteId);
            const { success } = result.data;
            if (success === 1) {
                succesNofity('Punch Data Cleared')
                setOpen(false)
                setCount(Math.random())
            } else {
                errorNofity("Error While Inactiving Data ! Contact HR/IT")
            }
        } else {
            errorNofity('Error Punch Master Data Updarion ! Contact HR/IT')
            setOpen(false)
        }

    }, [punchMastdata, setCount, setOpen])

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
                        Duty Day Details
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
                            {punchMastdata?.duty_date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            Leave Desc
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {punchMastdata?.lvereq_desc}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }} >
                        <Typography
                            level="body1"
                            fontSize="sm"
                            justifyContent="center"
                        >
                            Duty Desc
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {punchMastdata?.duty_desc}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flex: 1, py: 1 }}>
                    <Typography
                        level="body2"
                        // startDecorator={<InfoOutlined />}
                        sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                    >
                        Are you sure want to delete?
                    </Typography>
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

export default memo(DeleteModal) 