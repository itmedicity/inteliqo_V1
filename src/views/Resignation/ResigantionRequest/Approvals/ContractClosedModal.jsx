import { Box, Button, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const ContractClosedModal = ({ open, setOpen, data, setCount, loginEmp, slno }) => {

    const [details, setDetails] = useState({
        dept_id: 0,
        dept_name: '',
        em_name: '',
        em_no: 0,
        em_cont_start: '',
        em_cont_close_date: '',
        sect_id: 0,
        sect_name: '',
        em_designation: 0,
        resign_reason: '',
        relieving_date: '',
        inch_coment: '',
        em_id: 0
    })
    const { em_name, em_no, em_cont_start, em_cont_close_date, em_designation,
        sect_name, dept_id, sect_id, em_id } = details;

    const [remark, setRemark] = useState('')
    const [dueDept, SetDueDept] = useState({})


    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { em_department, dept_name, em_name, em_no, em_cont_start, em_cont_close_date, em_dept_section,
                sect_name, em_id, em_designation } = data
            const details = {
                dept_id: em_department,
                dept_name: dept_name,
                em_name: em_name,
                em_no: em_no,
                sect_id: em_dept_section,
                sect_name: sect_name,
                em_id: em_id,
                em_cont_start: em_cont_start,
                em_cont_close_date: em_cont_close_date,
                em_designation: em_designation
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


    const submitFormdata = async (e) => {
        e.preventDefault()
        const postData = {
            dept_id: dept_id,
            sect_id: sect_id,
            em_id: em_id,
            em_no: em_no,
            designation: em_designation,
            resignation_type: 3,
            request_date: em_cont_close_date,
            relieving_date: em_cont_close_date,
            resign_reason: "Contract Closed",
            contract_close_resign: 'C',
            hr_id: loginEmp,
            hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
            hr_app_status: 1,
            hr_coment: remark,
            resign_status: 'A',
        }
        const result = await axioslogin.post('/Resignation/contractcloseHrapprvl', postData)
        const { success, message } = result.data
        if (success === 1) {
            const result = await axioslogin.post('/dueclearence', dueDept)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Resignation Request Approved")
                setCount(Math.random())
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
            errorNofity("Error Occured!!!Please Contact EDP")
            setOpen(false)
        }
    }

    const handleRejectRequest = async (e) => {
        e.preventDefault()
        const postData = {
            dept_id: dept_id,
            sect_id: sect_id,
            em_id: em_id,
            em_no: em_no,
            designation: em_designation,
            resignation_type: 3,
            request_date: em_cont_close_date,
            relieving_date: em_cont_close_date,
            resign_reason: "Contract Closed",
            contract_close_resign: 'C',
            hr_id: loginEmp,
            hr_app_date: moment(new Date()).format('YYYY-MM-DD'),
            hr_app_status: 2,
            hr_coment: remark,
            resign_status: 'R',
        }
        const result = await axioslogin.post('/Resignation/contractcloseHrapprvl', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity("Resignation Request Approved")
            setCount(Math.random())
            setOpen(false)
            setRemark('')
        }
        else if (success === 2) {
            warningNofity(message)
            setOpen(false)
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
            setOpen(false)
        }
    }

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
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                        >
                            Contract Start Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {moment(em_cont_start).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                        <Typography
                            level="body1"
                            justifyContent="center"
                        >
                            Contract End Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />} fontSize="sm" fontWeight="lg" >
                            {moment(em_cont_close_date).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ pt: 0.5 }} >
                    <Textarea name="Outlined" placeholder="Remark For Approve/Reject here…"
                        variant="outlined" onChange={(e) => setRemark(e.target.value)} />

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success" onClick={submitFormdata}>
                            Approve
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleRejectRequest}>
                            Reject
                        </Button>
                    </Box>
                </Box>
            </ModalDialog >
        </Modal >
    )
}

export default memo(ContractClosedModal) 