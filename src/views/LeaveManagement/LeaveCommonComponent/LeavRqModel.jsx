import { Typography } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Box, Paper } from '@mui/material';
import { useMemo } from 'react';

const LeavRqModel = ({ setOpen, open, authority, empData, setcount }) => {

    const employeeLeaveData = useMemo(() => empData, [empData])

    const { SlNo, Employee_name, Emp_no, requestDate, no_of_leave, leave_reason,
        leave_date, leavetodate, sect_name, lve_uniq_no } = employeeLeaveData


    const [reason, setreason] = useState('')
    const [openBkDrop, setOpenBkDrop] = useState(false)

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)
    const [details, setDetails] = useState([])


    useEffect(() => {


        const getLeaveDetails = async (lve_uniq_no) => {
            //to get leave request details
            const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${lve_uniq_no}`)
            if (resultdel.data.success === 1) {
                setDetails(resultdel.data.data)
            } else {
                setDetails([])
            }
        }
        getLeaveDetails(lve_uniq_no)
        //  }
    }, [lve_uniq_no])

    const inchpostData = useMemo(() => {
        return {
            status: 1,
            comment: reason,
            slno: SlNo,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id,
            lve_uniq_no: lve_uniq_no
        }
    }, [reason, SlNo, em_id, lve_uniq_no])

    const LeaveRejectdata = useMemo(() => {
        return {
            status: 2,
            comment: reason,
            slno: SlNo,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id,
            lve_uniq_no: lve_uniq_no
        }
    }, [reason, SlNo, em_id, lve_uniq_no])


    const handleApproverequest = useCallback(async () => {
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', inchpostData)
                const { success, message } = result.data;
                if (success === 1) {
                    setcount(Math.random())
                    succesNofity(message)
                    setreason('')
                    setOpen(false)
                } else if (success === 2) {
                    warningNofity(message)
                    setOpen(false)
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                }
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { inc_apprv_req, incapprv_status } = data[0]
                if (inc_apprv_req === 1 && incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', inchpostData)
                    const { success } = result.data;
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', inchpostData)
                        const { success, message } = result.data;
                        if (success === 1) {
                            succesNofity(message)
                            setreason('')
                            setcount(Math.random())
                            setOpen(false)
                        } else if (success === 2) {
                            warningNofity(message)
                            setOpen(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', inchpostData)
                    const { success, message } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        setreason('')
                        setcount(Math.random())
                        setOpen(false)
                    } else if (success === 2) {
                        warningNofity(message)
                        setOpen(false)
                    }
                    else {
                        errorNofity(message)
                        setOpen(false)
                    }
                }
            }
        }
    }, [authority, inchpostData, setcount, reason, setOpen, SlNo])

    const handleRegectRequest = useCallback(async () => {
        //CASUAL LEAVE 
        const casualLev = details?.filter(val => val.leave_typeid === 1)?.map(val => {
            return { ...val, emno: Emp_no }
        });
        //EARN LEAVE
        const earnLeave = details?.filter(val => val.leave_typeid === 8)?.map(val => {
            return { ...val, emno: Emp_no }
        });
        //COMPENSATORY OFF
        const compansatoryOff = details?.filter(val => val.leave_typeid === 11)?.map(val => {
            return { ...val, emno: Emp_no }
        });

        //COMMON LEAVES 
        const commonLeaves = details?.filter((val) => val.leave_typeid !== 1 &&
            val.leave_typeid !== 3 &&
            val.leave_typeid !== 4 &&
            val.leave_typeid !== 8 &&
            val.leave_typeid !== 11
        ).map(val => {
            return { ...val, emno: Emp_no }
        });

        //UPDATE CASUAL LEAVE TABLE
        const casualLeavePromise = new Promise(async (resolve, reject) => {
            if (casualLev?.length > 0) {
                const resultcl = await axioslogin.post(`/LeaveRequestApproval/CancelCasualyLeave`, casualLev);
                const { success, message } = resultcl.data;
                if (success === 1) {
                    resolve('Casual Leave Request Updated')
                } else {
                    reject(`CL Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })

        //EARN LEAVE 
        const earnLeavePromise = new Promise(async (resolve, reject) => {
            if (earnLeave?.length > 0) {
                const resultel = await axioslogin.post(`/LeaveRequestApproval/CancelEarnLeave`, earnLeave);
                const { success, message } = resultel.data;
                if (success === 1) {
                    resolve('Earn Leave Request updated')
                } else {
                    reject(`EL Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })


        //COFF UPDATION
        const coffLeavePromise = new Promise(async (resolve, reject) => {
            if (compansatoryOff?.length > 0) {
                const resultcoff = await axioslogin.post(`/LeaveRequestApproval/CancelCoffLeave`, compansatoryOff);
                const { success, message } = resultcoff.data;
                if (success === 1) {
                    resolve('COFF Request Approved')
                } else {
                    reject(`COFF Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })

        //UPDATE COMMON LEAVE TABLE
        const commonLeavePromise = new Promise(async (resolve, reject) => {
            if (commonLeaves?.length > 0) {
                const resultcl = await axioslogin.post(`/LeaveRequestApproval/CancelCasualyLeave`, commonLeaves);
                const { success, message } = resultcl.data;
                if (success === 1) {
                    resolve('Casual Leave Request Updated')
                } else {
                    reject(`CL Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })

        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remarks!")
            } else {
                const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', LeaveRejectdata)
                const { success } = result.data;
                if (success === 1) {
                    Promise.all([
                        casualLeavePromise,
                        //holidayLeavePromise,
                        earnLeavePromise,
                        coffLeavePromise,
                        commonLeavePromise

                    ]).then(result => {
                        if (result) {
                            setOpenBkDrop(false)
                            setcount(Math.random())
                            succesNofity('Leave Request Approved')
                            setOpen(false)
                        }
                    }).catch(error => {
                        setcount(Math.random())
                        errorNofity('Error Updating Leave Request')
                        const errorLog = {
                            error_log_table: 'punch_master,leave_request,leave_reqdetl',
                            error_log: error,
                            em_no: Emp_no,
                            formName: 'Leave Approval Modal Approval HR Page'
                        }
                        axioslogin.post(`/common/errorLog`, errorLog);
                        setOpenBkDrop(false)
                        setOpen(false)
                    })
                } else {
                    setOpenBkDrop(false)
                    setOpen(false)
                    setcount(Math.random())
                    errorNofity('Error Updating Leave Request')
                }
            }
        }
        else if (authority === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { inc_apprv_req, incapprv_status } = data[0]
                if (inc_apprv_req === 1 && incapprv_status === 0) {
                    const result = await axioslogin.patch('/LeaveRequestApproval/inchargeapprv', LeaveRejectdata)
                    const { success } = result.data;
                    if (success === 1) {
                        const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', LeaveRejectdata)
                        const { success } = result.data;
                        if (success === 1) {
                            Promise.all([
                                casualLeavePromise,
                                //holidayLeavePromise,
                                earnLeavePromise,
                                coffLeavePromise,
                                commonLeavePromise

                            ]).then(result => {
                                if (result) {
                                    setOpenBkDrop(false)
                                    setcount(Math.random())
                                    succesNofity('Leave Request Approved')
                                    setOpen(false)
                                }
                            }).catch(error => {
                                setcount(Math.random())
                                errorNofity('Error Updating Leave Request')
                                const errorLog = {
                                    error_log_table: 'punch_master,leave_request,leave_reqdetl',
                                    error_log: error,
                                    em_no: Emp_no,
                                    formName: 'Leave Approval Modal Approval HR Page'
                                }
                                axioslogin.post(`/common/errorLog`, errorLog);
                                setOpenBkDrop(false)
                                setOpen(false)
                            })
                        } else {
                            setOpenBkDrop(false)
                            setOpen(false)
                            setcount(Math.random())
                            errorNofity('Error Updating Leave Request')
                        }
                    }
                } else {
                    const result = await axioslogin.patch('/LeaveRequestApproval/hodapprvlLeave', LeaveRejectdata)
                    const { success } = result.data;
                    if (success === 1) {
                        Promise.all([
                            casualLeavePromise,
                            //holidayLeavePromise,
                            earnLeavePromise,
                            coffLeavePromise,
                            commonLeavePromise

                        ]).then(result => {
                            if (result) {
                                setOpenBkDrop(false)
                                setcount(Math.random())
                                succesNofity('Leave Request Approved')
                                setOpen(false)
                            }
                        }).catch(error => {
                            setcount(Math.random())
                            errorNofity('Error Updating Leave Request')
                            const errorLog = {
                                error_log_table: 'punch_master,leave_request,leave_reqdetl',
                                error_log: error,
                                em_no: Emp_no,
                                formName: 'Leave Approval Modal Approval HR Page'
                            }
                            axioslogin.post(`/common/errorLog`, errorLog);
                            setOpenBkDrop(false)
                            setOpen(false)
                        })
                    } else {
                        setOpenBkDrop(false)
                        setOpen(false)
                        setcount(Math.random())
                        errorNofity('Error Updating Leave Request')
                    }
                }
            }
        }

    }, [authority, LeaveRejectdata, details, Emp_no, setOpen, setcount, reason, SlNo])

    return (
        <>
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
                            {Employee_name}
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
                                {Emp_no}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }}>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <Typography level="body1"> Request Date</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <Typography level="body1"> : {requestDate}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <Typography level="body1"> No of Days</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <Typography level="body1"> : {no_of_leave}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left" }}  >
                                <Typography level="body1"> Leave Reason</Typography>
                            </Box>
                            <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <Typography level="body1"> : {leave_reason}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                                <Typography level="body1"> Leave From Date</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <Typography level="body1">: {leave_date}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                                <Typography level="body1">Leave To date</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <Typography level="body1"> : {leavetodate}</Typography>
                            </Box>
                        </Box>
                    </Paper>
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
                            details?.map((val, idx) => {
                                return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} key={idx} >
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                        {moment(val.leave_dates).format('DD-MM-YYYY')}
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
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            Incharge Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Approve/Reject The Request here…" variant="outlined" onChange={(e) => setreason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Leave Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRegectRequest}>
                                Leave Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    )
}
export default memo(LeavRqModel)