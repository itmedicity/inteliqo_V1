import { Button, Checkbox, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { Box, FormControlLabel, Paper } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';

const InchargeApprovalModal = ({ open, setOpen, data, setCount, loginEmp, slno }) => {

    const loginId = useMemo(() => loginEmp, [loginEmp])

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
        em_id: 0,
        resignation_type: 0
    })
    const { em_name, em_no, request_date, resig_slno,
        sect_name, status, resign_reason, relieving_date, inch_coment,
        dept_id, sect_id, em_id, resignation_type, attachment } = details;
    const [remark, setRemark] = useState('')
    const [replacement, setreplacement] = useState(false)
    const [dueDept, SetDueDept] = useState({})
    const [salaryPenalty, setSalarypenalty] = useState(false)

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { dept_id, dept_name, em_name, em_no, request_date, resig_slno, sect_id,
                sect_name, resign_reason, relieving_date, status, inch_coment, em_id, resignation_type, attachment } = data

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
                em_id: em_id,
                resignation_type: resignation_type,
                attachment: attachment
            }

            setDetails(details)
        } else {
            setDetails({})
        }
    }, [data])

    useEffect(() => {
        const postDeptData = {
            dept_id: dept_id,
            sect_id: sect_id,
        }
        const getDueDepartment = async () => {
            const results = await axioslogin.post('/Duedepartment/duedept', postDeptData)
            const { success1, data1 } = results.data
            if (success1 === 1) {
                const { due_dept_code } = data1[0]
                const duedepartment = JSON.parse(due_dept_code)
                const duedeptdetl = duedepartment.map((val) => {
                    return { deptcode: val.deptcode, deptname: val.deptdesc, emp_id: em_id }
                })
                SetDueDept(duedeptdetl)
            } else {
                SetDueDept()
            }
        }

        getDueDepartment(postDeptData)
    }, [dept_id, sect_id, em_id])

    const handleRejectRequest = async () => {
        if (slno === 1) {
            const approveData = {
                inch_id: loginId,
                inch_app_date: moment(new Date()).format('YYYY-MM-DD'),
                inch_app_status: 2,
                inch_coment: remark,
                resig_slno: resig_slno,
                replacement_required_incharge: replacement === true ? 1 : 0
            }
            const result = await axioslogin.patch('/Resignation', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Rejected")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        } else if (slno === 2) {
            const approveData = {
                hod_id: loginId,
                hod_app_date: moment(new Date()).format('YYYY-MM-DD'),
                hod_app_status: 2,
                hod_coment: remark,
                resig_slno: resig_slno,
                replacement_required_hod: replacement === true ? 1 : 0
            }
            const result = await axioslogin.patch('/Resignation/resignhod', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Rejected")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        } else if (slno === 3) {
            const approveData = {
                ceo_id: loginId,
                ceo_appr_date: moment(new Date()).format('YYYY-MM-DD'),
                ceo_appr_status: 2,
                ceo_comment: remark,
                resig_slno: resig_slno,
            }
            const result = await axioslogin.patch('/Resignation/resignhr', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Rejected")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        } else {
            const approveData = {
                hr_id: loginId,
                hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
                hr_app_status: 2,
                hr_coment: remark,
                resign_status: 'R',
                resig_slno: resig_slno,
            }
            const result = await axioslogin.patch('/Resignation/resignapproval', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Approved")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        }
    }

    const submitFormdata = useCallback(async (e) => {
        if (slno === 1) {
            const approveData = {
                inch_id: loginId,
                inch_app_date: moment(new Date()).format('YYYY-MM-DD'),
                inch_app_status: 1,
                inch_coment: remark,
                resig_slno: resig_slno,
                replacement_required_incharge: replacement === true ? 1 : 0
            }
            const result = await axioslogin.patch('/Resignation', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Approved")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        } else if (slno === 2) {
            const approveData = {
                hod_id: loginId,
                hod_app_date: moment(new Date()).format('YYYY-MM-DD'),
                hod_app_status: 1,
                hod_coment: remark,
                resig_slno: resig_slno,
                replacement_required_hod: replacement === true ? 1 : 0
            }
            const result = await axioslogin.patch('/Resignation/resignhod', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Approved")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }

        } else if (slno === 3) {
            const approveData = {
                ceo_id: loginId,
                ceo_appr_date: moment(new Date()).format('YYYY-MM-DD'),
                ceo_appr_status: 1,
                ceo_comment: remark,
                resig_slno: resig_slno,
            }
            const result = await axioslogin.patch('/Resignation/resignhr', approveData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Approved")
                setCount(Math.random())
                setreplacement(false)
                setOpen(false)
                setRemark('')
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        } else {

            const approveData = {
                hr_id: loginId,
                hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
                hr_app_status: 1,
                hr_coment: remark,
                resign_status: 'A',
                replacement_required_hr: replacement === true ? 1 : 0,
                salaryPenalty: salaryPenalty === true ? 1 : 0,
                resig_slno: resig_slno,
            }

            const result = await axioslogin.patch('/Resignation/resignapproval', approveData)
            const { success, message } = result.data
            if (success === 1) {

                const result = await axioslogin.post('/dueclearence', dueDept)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity("Resignation Request Approved")
                    setCount(Math.random())
                    setreplacement(false)
                    setOpen(false)
                    setRemark('')
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                }
            }
            else if (success === 2) {
                warningNofity(message)
                setOpen(false)
            }
            else {
                errorNofity(message)
                setOpen(false)
            }
        }
    }, [remark, replacement, resig_slno, loginId, slno, dueDept,
        salaryPenalty, setOpen, setCount])


    const [open1, setOpen1] = useState(false);


    console.log(attachment)

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog size="lg" sx={{ width: '50%', }} >
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
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'left' }} >
                    <Typography
                        fontSize="xl2"
                        lineHeight={1}
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
                        sx={{ color: 'neutral.400', display: 'flex', textTransform: "capitalize", pt: 0.5 }}
                    >
                        {`employee #`}
                    </Typography>
                    <Typography level="body1" sx={{ textTransform: "capitalize", color: 'neutral.400' }} >{sect_name?.toLowerCase()}</Typography>
                </Box>
                {
                    slno === 4 ? null
                        : <Typography
                            level="title-md"
                            variant="outlined"
                            color="success"
                            sx={{ display: 'flex', justifyContent: 'left', p: 0.5, borderRadius: 8 }}
                        >
                            {status}
                        </Typography>
                }
                <Box>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined color="primary" />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Resignation Information
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }} >
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }} >
                            <Typography
                                level="title-md"
                                justifyContent="center"
                            >
                                Resignation Requested Date
                            </Typography>
                            <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                                {moment(request_date).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>

                    <Paper variant="outlined" square sx={{ display: 'flex', p: 0.5, mt: 1, borderRadius: 1, flexDirection: 'row' }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', width: '90%' }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" level="title-md"  >
                                    Relieving Date:
                                </Typography>
                                <Typography fontSize="sm" sx={{ flex: 1, pl: 2 }}  >
                                    {moment(relieving_date).format('DD-MM-YYYY')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" level="title-md"   >
                                    Reason:
                                </Typography>
                                <Typography fontSize="sm" sx={{ flex: 1, pl: 2 }} >
                                    {resign_reason}
                                </Typography>
                            </Box>

                            {
                                resignation_type === '2' ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, backgroundColor: 'lightpink' }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Employee Under 24 hour Resignation
                                    </Typography>
                                </Box> : null
                            }
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
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '10%' }} onClick={() => setOpen1(true)} >
                            <FilePresentOutlinedIcon sx={{ color: '#240000', fontSize: 50, cursor: 'pointer' }} />
                        </Box>
                    </Paper>
                </Box>

                <Box sx={{}} >
                    <Textarea
                        name="Outlined"
                        placeholder="Remark For Approve/Reject The Request here…"
                        variant="outlined"
                        minRows={3}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', flex: 1, px: 2, py: 0.5 }}>
                        <Box sx={{ display: 'flex' }}>
                            <FormControlLabel
                                control={<Checkbox sx={{ paddingX: 1 }} />}
                                label="  Replacement Required"
                                checked={replacement}
                                name="replacement"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                onChange={(e) => setreplacement(e.target.checked)}
                            />
                        </Box>
                        {
                            slno === 4 ? <Box sx={{ display: 'flex', px: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label=" Salary Penalty"
                                    checked={salaryPenalty}
                                    name="salaryPenalty"
                                    onChange={(e) => setSalarypenalty(e.target.checked)}
                                />
                            </Box> : null
                        }
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant="solid" color="success" onClick={submitFormdata}>
                            Resignation Request Approve
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleRejectRequest}>
                            Resignation Request Reject
                        </Button>
                    </Box>
                </Box>

                <Modal
                    open={open1}
                    onClose={() => setOpen1(false)}
                >
                    <ModalDialog>
                        <ModalClose />
                        <Box>
                            <img src={`http://localhost/NAS/ResignationReq/${attachment}`} alt="Resignation" style={{ width: '100%', height: '100%' }} />
                        </Box>
                    </ModalDialog>
                </Modal>

            </ModalDialog >
        </Modal >
    )
}

export default memo(InchargeApprovalModal) 