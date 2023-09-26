import { Button, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const ResignModal = ({ open, setOpen, data, setCount, loginEmp, slno }) => {

    const loginId = useMemo(() => loginEmp, [loginEmp])
    const [remark, setRemark] = useState('')

    const [details, setDetails] = useState({
        dept_id: 0,
        dept_name: '',
        em_name: '',
        em_no: 0,
        request_date: '',
        resig_slno: 0,
        sect_id: 0,
        sect_name: '',
        status: '',
        resign_reason: '',
        relieving_date: '',
        inch_coment: '',
        em_id: 0
    })
    const { em_name, em_no, request_date, resig_slno,
        sect_name, status, resign_reason, relieving_date, inch_coment, } = details;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { dept_id, dept_name, em_name, em_no, request_date, resig_slno, sect_id,
                sect_name, resign_reason, relieving_date, status, inch_coment, em_id } = data
            const details = {
                dept_id: dept_id,
                dept_name: dept_name,
                em_name: em_name,
                em_no: em_no,
                request_date: request_date,
                resig_slno: resig_slno,
                sect_id: sect_id,
                sect_name: sect_name,
                status: status,
                resign_reason: resign_reason,
                relieving_date: relieving_date,
                inch_coment: inch_coment,
                em_id: em_id
            }
            setDetails(details)
        } else {
            setDetails({})
        }
    }, [data])


    const submitFormdata = useCallback(async (e) => {
        e.preventDefault()
        const postData = {
            resign_cancel: 'C',
            resign_cancel_reason: remark,
            cancel_user: loginId,
            resign_cancel_date: moment(new Date()).format('YYYY-MM-DD'),
            resig_slno: resig_slno
        }
        const result = await axioslogin.patch('/Resignation/resigncancelhr', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(Math.random())
            setOpen(false)
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDP")
            setOpen(false)
        }
    }, [remark, loginId, resig_slno, remark,])

    return (
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
                        {em_name}
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
                            {em_no}
                        </Typography>}
                        sx={{ color: 'neutral.400', display: 'flex', }}
                    >
                        {`employee #`}
                    </Typography>
                    <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                </Box>

                {
                    slno === 4 ? null : <Box sx={{ mt: 0.5, pt: 1 }} >
                        <Typography variant="outlined" color="success">
                            {status}
                        </Typography>
                    </Box>
                }

                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                        >
                            Request Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {moment(request_date).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, py: 1 }}>
                    <Typography
                        level="body2"
                        startDecorator={<InfoOutlined />}
                        sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                    >
                        Resignation Information.
                    </Typography>
                </Box>
                <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                        <Typography fontSize="sm" fontWeight="lg"  >
                            Relieving Date:
                        </Typography>
                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                            {moment(relieving_date).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                        <Typography fontSize="sm" fontWeight="lg"  >
                            Reason:
                        </Typography>
                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                            {resign_reason}
                        </Typography>
                    </Box>
                    {
                        slno === 2 ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Incharge Comment:
                            </Typography>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                {inch_coment}
                            </Typography>
                        </Box> : null
                    }
                </Paper>
                <Box sx={{ pt: 0.5 }} >
                    <Textarea name="Outlined" placeholder="Reason For Cancellation"
                        variant="outlined" onChange={(e) => setRemark(e.target.value)} />

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success" onClick={submitFormdata}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </ModalDialog >
        </Modal >
    )
}

export default memo(ResignModal) 