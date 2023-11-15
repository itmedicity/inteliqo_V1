import React, { Fragment, useCallback, memo, useMemo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
const HalfdayCancelEmp = ({ open, setOpen, data, setCount }) => {
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const { slno, emno, name, section, status, reqDate } = data;

    const handleClose = () => {
        setOpen(false)
        setOpenBkDrop(false)
    }

    const Canceldata = useMemo(() => {
        return {
            status: 1,
            comment: reason,
            apprvdate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
            us_code: emno,
            slno: slno
        }
    }, [emno, reason, slno])

    const Cancelrequest = useCallback(async () => {
        if (reason === '') {
            setOpenBkDrop(false)
            warningNofity("Please Add Reason! ")
        } else {
            const result = await axioslogin.patch('/LeaveRequestApproval/halfdaycancelReqUser', Canceldata);
            const { success } = result.data
            if (success === 1) {
                setOpenBkDrop(false)
                succesNofity('Leave Request Canceled')
                setCount(Math.random())
                setOpen(false)
            } else {
                setCount(Math.random())
                setOpenBkDrop(false)
                setOpen(false)
                errorNofity('Error Updating Leave Request')
            }
        }
    }, [Canceldata, reason, setOpen, setCount])

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
                            {status}
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
                        <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                            <Typography
                                level="body1"
                                justifyContent="center"
                            >
                                Leave Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(reqDate).format('DD-MM-YYYY')}
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
                    {/* <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        {
                            reqDetl?.map((val, idx) => {
                                return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }} key={idx} >
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                        <Typography fontSize="sm" fontWeight="lg"  >
                                            Check In:
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                            {moment(val.checkIn).format('hh:mm:ss')}
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ pl: 2 }} >
                                            Check Out:
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                            {moment(val.checkOut).format('hh:mm:ss')}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                        <Typography fontSize="sm" fontWeight="lg"  >
                                            Month of Leave:
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                            {val.month}
                                        </Typography>
                                    </Box>
                                </Box>
                            })
                        }
                    </Paper> */}

                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={Cancelrequest}>
                                Leave Request Cancel
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleClose}>
                                Leave Request Close
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(HalfdayCancelEmp)