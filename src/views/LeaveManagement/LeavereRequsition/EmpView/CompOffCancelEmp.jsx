import React, { Fragment, useCallback, useEffect, memo, useMemo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';


const CompOffCancelEmp = ({ open, setOpen, data, setCount }) => {

    //DISPLAY THE DATA 
    const { slno, emno, name, section } = data;

    //STATES
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const [coff, setCoff] = useState({
        reqestdate: '',
        leave_date: '',
        cf_reason: '',
        em_id: '',
        cf_hr_apprv_status: 0
    })

    const { reqestdate, leave_date, cf_reason, em_id, cf_hr_apprv_status } = coff

    //GET THE DETAILED TABLE DATA USING API
    const getLeaveReqDetl = async (slno) => {
        const resultdel = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${slno}`);
        const { success, data } = resultdel?.data;
        if (success === 1) {
            const { leave_date, reqestdate, cf_reason, em_id, cf_hr_apprv_status } = data[0]
            const formdata = {
                reqestdate: reqestdate,
                leave_date: leave_date,
                cf_reason: cf_reason,
                em_id: em_id,
                cf_hr_apprv_status: cf_hr_apprv_status
            }
            setCoff(formdata)
        }
    }

    useEffect(() => {
        if (slno !== null && slno !== undefined) {
            getLeaveReqDetl(slno)
        }
    }, [slno])

    // COFF Request Close
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

    const CancelRequest = useCallback(async () => {
        if (reason === '') {
            setOpenBkDrop(false)
            warningNofity("Please Add Reason! ")
        } else {
            const result = await axioslogin.patch('/LeaveRequestApproval/coffCanceluser', Canceldata);
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
    }, [Canceldata, reason])

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
                            Coff Request Cancel
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
                                {moment(reqestdate).format('DD-MM-YYYY')}
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
                                {moment(leave_date).format('DD-MM-YYYY')}
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
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Reason:
                            </Typography>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                {cf_reason}
                            </Typography>
                        </Box>
                    </Paper>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…"
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={CancelRequest}>
                                Save
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleClose}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(CompOffCancelEmp)