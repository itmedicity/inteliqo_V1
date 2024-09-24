import React, { useState, memo, useCallback } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { Chip, Divider, ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { useMemo } from 'react';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { useSelector } from 'react-redux';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const LeaveRequestModal = ({ open, setOpen, data, setCount, previousLeave }) => {
    //STATES
    const [reqDetl, setReqDetl] = useState([]);
    const [reason, setReason] = useState('');
    const [openBkDrop, setOpenBkDrop] = useState(false)

    //DISPLAY THE DATA 
    const { emno, em_id, name, section, requestDate: reqDate, fromDate, toDate, dept_section,
        leave_reason, inc_apprv_cmnt, hod_apprv_cmnt, lve_uniq_no, leave_date } = data;

    const loginem_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    //GET THE DETAILED TABLE DATA USING API
    const getLeaveReqDetl = async (lve_uniq_no) => {
        const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${lve_uniq_no}`);
        const { success, data } = resultdel?.data;
        if (success === 1) {
            setReqDetl(data)
        }
    }

    useEffect(() => {
        if (lve_uniq_no !== null && lve_uniq_no !== undefined) {
            getLeaveReqDetl(lve_uniq_no)
        }

        // const getleaveMonthData = async () => {
        //     const postdata = {
        //         emp_id: [em_id],
        //         // emp_id: [168],
        //         from: format(startOfMonth(new Date(data?.fromDate)), 'yyyy-MM-dd'),
        //         to: format(endOfMonth(new Date(data?.fromDate)), 'yyyy-MM-dd'),
        //     }
        //     const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
        //     const { success, data: punchmast } = result.data
        //     console.log(punchmast);
        // }


        // getleaveMonthData()
    }, [lve_uniq_no, data, em_id])

    //UPDATE LEAVE FUNCTION 
    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        //CASUAL LEAVE 
        const casualLev = reqDetl?.filter(val => val.leave_typeid === 1)?.map(val => {
            return { ...val, emno: emno }
        });
        //NATIONAL HOLIDAY
        // const Holiday = reqDetl?.filter(val => val.leave_typeid === 3 || val.leave_typeid === 4)?.map(val => {
        //     return { ...val, emno: emno }
        // });
        //EARN LEAVE
        const earnLeave = reqDetl?.filter(val => val.leave_typeid === 8)?.map(val => {
            return { ...val, emno: emno }
        });
        //COMPENSATORY OFF
        const compansatoryOff = reqDetl?.filter(val => val.leave_typeid === 11)?.map(val => {
            return { ...val, emno: emno }
        });

        const formData = {
            status: 1,
            comment: reason,
            apprvdate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            us_code: loginem_id,
            slno: lve_uniq_no
        }
        const postDataForAttendaceMark = {
            month: format(startOfMonth(new Date(leave_date)), 'yyyy-MM-dd'),
            section: dept_section
        }

        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postDataForAttendaceMark);
        const { success, data } = checkPunchMarkingHr.data
        if (success === 0 || success === 1) {
            const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(leave_date)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
            const lastDay_month = format(lastDayOfMonth(new Date(leave_date)), 'yyyy-MM-dd')
            if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                warningNofity("Punch Marking Monthly Process Done !! Can't Approve Leave Request!!  ")
                setOpenBkDrop(false)
                setOpen(false)
            } else {

                /**** UPDATE LEAVE TABLES****/
                //UPDATE CASUAL LEAVE TABLE
                const casualLeavePromise = new Promise(async (resolve, reject) => {
                    if (casualLev?.length > 0) {
                        const resultcl = await axioslogin.post(`/LeaveRequestApproval/updateCasualLeaveTable`, casualLev);
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

                //UPDATE HOLIDAY 
                // const holidayLeavePromise = new Promise(async (resolve, reject) => {
                //     if (Holiday?.length > 0) {
                //         const resulthl = await axioslogin.post(`/LeaveRequestApproval/updateHolidayLeaveTable`, Holiday);
                //         const { success, message } = resulthl.data;
                //         if (success === 1) {
                //             resolve('Holiday Leave Request updated')
                //         } else {
                //             reject(`HL Updation ! Error ${message}`)
                //         }
                //     } else {
                //         resolve(1)
                //     }
                // })

                //EARN LEAVE 
                const earnLeavePromise = new Promise(async (resolve, reject) => {
                    if (earnLeave?.length > 0) {
                        const resultel = await axioslogin.post(`/LeaveRequestApproval/updateEarnLeaveTable`, earnLeave);
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
                        const resultcoff = await axioslogin.post(`/LeaveRequestApproval/updatecOffTable`, compansatoryOff);
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

                /**** UPDATE PUNCH MASTER TABLE ****/
                const esiLeave = reqDetl?.filter(val => val.leave_typeid === 6)?.map(val => {
                    return { ...val, emno: emno }
                });
                const lwfLeave = reqDetl?.filter(val => val.leave_typeid === 5)?.map(val => {
                    return { ...val, emno: emno }
                });
                const withOutesilwf = reqDetl?.filter(val => val.leave_typeid !== 5 && val.leave_typeid !== 6)?.map(val => {
                    return { ...val, emno: emno }
                });

                //UPDATE PUNCH MASTER TABLE ESI LEAVE
                const updateEsiLeavePunchMaster = new Promise(async (resolve, reject) => {
                    if (esiLeave?.length > 0) {
                        const esiPunchMasterUpdate = await axioslogin.post(`/LeaveRequestApproval/punchMasterUpdateEsiLeave`, esiLeave);
                        const { success, message } = esiPunchMasterUpdate.data;
                        if (success === 1) {
                            resolve('ESI Leave Updated')
                        } else {
                            reject(`Esi Punch Master Updation ! Error ${message}`)
                        }
                    } else {
                        resolve(1)
                    }
                })

                //UPDATE PUNCH MASTER TABLE LWP LEAVE 
                const updateLwpPunchMaster = new Promise(async (resolve, reject) => {
                    if (lwfLeave?.length > 0) {
                        const lwfPunchMasterUpdate = await axioslogin.post(`/LeaveRequestApproval/punchMasterUpdateLwfLeave`, lwfLeave);
                        const { success, message } = lwfPunchMasterUpdate.data;
                        if (success === 1) {
                            resolve('LWP Leave Updated')
                        } else {
                            reject(`LWP Punch Master Updation ! Error ${message}`)
                        }
                    } else {
                        resolve(1)
                    }
                })

                //UPDATE PUNCH MASTER TABLE BALANCE ALL LEAVE 
                const updateLeavePunchMasterTable = new Promise(async (resolve, reject) => {
                    const arr = withOutesilwf?.map((val) => {
                        return {
                            ...val,
                            duty_status: val.leave_typeid === 1 && val.leaveCount === 0.5 ? 0.5 : val.leave_typeid === 7 && val.leaveCount === 0.5 ? 0.5 : 1,
                            lvereq_desc: val.leave_typeid === 11 ? 'COFF' : val.leave_typeid === 7 && val.leaveCount !== 0.5 ? 'SL' : val.leave_typeid === 8 ? 'EL' : val.leave_typeid === 1 && val.leaveCount !== 0.5 ? 'CL' : val.leave_typeid === 1 && val.leaveCount === 0.5 ? 'HDCL' : val.leave_typeid === 7 && val.leaveCount === 0.5 ? 'HDSL' : 'ML',
                            duty_desc: val.leave_typeid === 11 ? 'COFF' : val.leave_typeid === 7 && val.leaveCount !== 0.5 ? 'SL' : val.leave_typeid === 8 ? 'EL' : val.leave_typeid === 1 && val.leaveCount !== 0.5 ? 'CL' : val.leave_typeid === 1 && val.leaveCount === 0.5 ? 'HCL' : val.leave_typeid === 7 && val.leaveCount === 0.5 ? 'HSL' : 'ML',
                            leave_dates: format(new Date(val.leave_dates), 'yyyy-MM-dd ')
                        }
                    })

                    if (withOutesilwf?.length > 0) {
                        const leaveUpdationPunchMaster = await axioslogin.post(`/LeaveRequestApproval/punchMasterUpdateLeave`, arr);
                        const { success, message } = leaveUpdationPunchMaster.data;
                        if (success === 1) {
                            resolve('Leave Updation')
                        } else {
                            reject(`Leave Updation with OUT ESI and LWP Updation ! Error ${message}`)
                        }
                    } else {
                        resolve(1)
                    }
                })

                Promise.all([
                    casualLeavePromise,
                    // holidayLeavePromise,
                    earnLeavePromise,
                    coffLeavePromise,
                    // updateEsiLeavePunchMaster,
                    // updateLwpPunchMaster,
                    // updateLeavePunchMasterTable
                ]).then(async (result) => {
                    if (result) {
                        Promise.all([
                            updateEsiLeavePunchMaster,
                            updateLwpPunchMaster,
                            updateLeavePunchMasterTable
                        ]).then(async (result) => {
                            const resultdel = await axioslogin.patch(`/LeaveRequestApproval/hrLeaveapprv`, formData);
                            const { success } = await resultdel.data;
                            if (success === 1) {
                                setOpenBkDrop(false)
                                setCount(Math.random())
                                succesNofity('Leave Request Approved')
                                setOpen(false)
                            }
                            else {
                                setCount(Math.random())
                                errorNofity('Error Updating Leave Request')
                                setOpenBkDrop(false)
                                setOpen(false)
                            }
                        })
                    }
                }).catch(error => {
                    setCount(Math.random())
                    errorNofity('Error Updating Leave Request')
                    const errorLog = {
                        error_log_table: 'punch_master,leave_request,leave_reqdetl',
                        error_log: error,
                        em_no: emno,
                        formName: 'Leave Approval Modal Approval HR Page'
                    }
                    axioslogin.post(`/common/errorLog`, errorLog);
                    setOpenBkDrop(false)
                    setOpen(false)
                })

            }
        } else {
            errorNofity("Error getting PunchMarkingHR ")
        }

    }, [reqDetl, emno, reason, setCount, setOpen, dept_section, lve_uniq_no, leave_date, loginem_id])

    const LeaveRejectdata = useMemo(() => {
        return {
            hr_apprv_status: 2,
            hr_apprv_cmnt: reason,
            hr_apprv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            hr_uscode: loginem_id,
            lve_uniq_no: lve_uniq_no
        }
    }, [reason, lve_uniq_no, loginem_id])

    const handleRejectRequest = useCallback(async () => {
        //CASUAL LEAVE 
        const casualLev = reqDetl?.filter(val => val.leave_typeid === 1)?.map(val => {
            return { ...val, emno: emno }
        });
        //NATIONAL HOLIDAY
        const Holiday = reqDetl?.filter(val => val.leave_typeid === 3 || val.leave_typeid === 4)?.map(val => {
            return { ...val, emno: emno }
        });
        //EARN LEAVE
        const earnLeave = reqDetl?.filter(val => val.leave_typeid === 8)?.map(val => {
            return { ...val, emno: emno }
        });
        //COMPENSATORY OFF
        const compansatoryOff = reqDetl?.filter(val => val.leave_typeid === 11)?.map(val => {
            return { ...val, emno: emno }
        });

        //COMMON LEAVES 
        const commonLeaves = reqDetl?.filter((val) => val.leave_typeid !== 1 &&
            val.leave_typeid !== 3 &&
            val.leave_typeid !== 4 &&
            val.leave_typeid !== 8 &&
            val.leave_typeid !== 11
        ).map(val => {
            return { ...val, emno: emno }
        });

        /**** UPDATE LEAVE TABLES****/

        //UPDATE HOLIDAY 
        const holidayLeavePromise = new Promise(async (resolve, reject) => {
            if (Holiday?.length > 0) {
                const resulthl = await axioslogin.post(`/LeaveRequestApproval/CancelHolidayLeave`, Holiday);
                const { success, message } = resulthl.data;
                if (success === 1) {
                    resolve('Holiday Leave Request updated')
                } else {
                    reject(`HL Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })

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
                    resolve('Common Leave Request Updated')
                } else {
                    reject(`Common Leave Updation ! Error ${message}`)
                }
            } else {
                resolve(1)
            }
        })

        //handle function for reject the leave
        const result = await axioslogin.patch(`/LeaveRequestApproval/lveReqRejectHr`, LeaveRejectdata);
        const { success } = result.data
        if (success === 1) {
            Promise.all([
                casualLeavePromise,
                holidayLeavePromise,
                earnLeavePromise,
                coffLeavePromise,
                commonLeavePromise

            ]).then(result => {
                if (result) {
                    setOpenBkDrop(false)
                    setCount(Math.random())
                    succesNofity('Leave Request Rejected')
                    setOpen(false)
                }
            }).catch(error => {
                setCount(Math.random())
                errorNofity('Error Updating Leave Request')
                const errorLog = {
                    error_log_table: 'punch_master,leave_request,leave_reqdetl',
                    error_log: error,
                    em_no: emno,
                    formName: 'Leave Approval Modal Approval HR Page'
                }
                axioslogin.post(`/common/errorLog`, errorLog);
                setOpenBkDrop(false)
                setOpen(false)
            })

        }
        else {
            setOpenBkDrop(false)
            setOpen(false)
            setCount(Math.random())
            errorNofity('Error Updating Leave Request')
        }

    }, [emno, setCount, setOpen, LeaveRejectdata, reqDetl])

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
                                    :{reqDate}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Leave From
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{fromDate}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Leave To
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{toDate}
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
                                    :{leave_reason}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Incharge Comment
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{inc_apprv_cmnt === null ? 'NIL' : inc_apprv_cmnt === '' ? 'NIL' : inc_apprv_cmnt}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Hod Comment
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    :{hod_apprv_cmnt === null ? 'NIL' : hod_apprv_cmnt === '' ? 'NIL' : hod_apprv_cmnt}
                                </Typography>
                            </Box>
                        </Box>
                        <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8, width: '100%' }} >
                            {
                                reqDetl?.map((val, idx) => {
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
                        <Box sx={{ flex: 1, py: 1 }}>
                            <Typography
                                level="body2"
                                startDecorator={<InfoOutlined />}
                                sx={{ alignItems: 'left', wordBreak: 'break-all', }}
                            >
                                Previous Leave Information.
                            </Typography>
                        </Box>
                        <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8, width: '100%' }} >
                            {
                                previousLeave?.map((val, idx) => {
                                    return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} key={idx} >
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                                            {moment(val.duty_day).format('DD-MM-YYYY')}
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                                            {val.lvereq_desc}
                                        </Typography>
                                        <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                                            {val.duty_desc}
                                        </Typography>
                                    </Box>
                                })
                            }
                        </Paper>

                    </Box>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Approve/Reject The Request here…" variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={handleApproverequest}>
                                Leave Request Approve
                            </Button>
                            <Button variant="solid" color="danger" onClick={handleRejectRequest}>
                                Leave Request Reject
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default memo(LeaveRequestModal)