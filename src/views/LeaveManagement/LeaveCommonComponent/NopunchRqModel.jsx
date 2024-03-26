import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { CssVarsProvider, Typography } from '@mui/joy';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { ModalDialog, Textarea } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box, Paper } from '@mui/material';
import Button from '@mui/joy/Button';

const NopunchRqModel = ({ setOpen, open, authority, em_id, count, setcount, slno }) => {

    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [reason, setreason] = useState('')
    //redux for all no punch data
    const nopunchRqData = useSelector((state) => state?.setAllLeaveApproval?.nopunchRqData?.nopunchRqList, _.isEqual)
    const [formdata, setFormData] = useState({
        emp_name: '',
        emp_id: '',
        nopreason: '',
        checktintime: '',
        checkouttime: '',
        nopunchdate: '',
        requestdate: '',
        sect_name: '',
        shft_desc: ''
    })
    const { emp_name, emp_id, nopreason, checktintime, checkouttime, nopunchdate, requestdate,
        sect_name, shft_desc } = formdata;

    useEffect(() => {
        if (Object.keys(nopunchRqData).length > 0) {
            //filtering selected row from all no punch data array
            const array = nopunchRqData && nopunchRqData.filter((val) => val.nopunch_slno === slno)

            const { em_name, em_no, nopunchdate, checkintime, checkouttime, creteddate, checkinflag,
                checkoutflag, np_reason, sect_name, shft_desc } = array[0]
            const formdata = {
                emp_name: em_name,
                emp_id: em_no,
                nopreason: np_reason,
                checktintime: checkinflag === 1 ? format(new Date(checkintime), 'HH:mm:ss') : '00:00:00',
                checkouttime: checkoutflag === 1 ? format(new Date(checkouttime), 'HH:mm:ss') : '00:00:00',
                nopunchdate: moment(new Date(nopunchdate)).format('DD-MM-YYYY'),
                requestdate: moment(new Date(creteddate)).format('DD-MM-YYYY'),
                sect_name: sect_name,
                shft_desc: shft_desc
            }
            setFormData(formdata)
        }
    }, [nopunchRqData, slno])

    const approve = useMemo(() => {
        return {
            status: 1,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
    }, [reason, slno, em_id])

    const rejectd = useMemo(() => {
        return {
            status: 2,
            comment: reason,
            slno: slno,
            apprvdate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            us_code: em_id
        }
    }, [reason, slno, em_id])



    const handleApproverequest = useCallback(async () => {
        setOpenBkDrop(true)
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', approve)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(count + 1)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
            }
        } else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${slno}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { np_inc_apprv_req, np_incapprv_status } = data[0]
                    if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', approve)
                        const { success } = result.data
                        if (success === 1) {
                            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', approve)
                            const { success, message } = result.data
                            if (success === 1) {
                                succesNofity(message)
                                setreason('')
                                setcount(count + 1)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                            else {
                                errorNofity(message)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', approve)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)
                            setreason('')
                            setcount(count + 1)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                    }
                }
            }
        }
    }, [authority, approve, setOpen, count, setcount, slno, reason])

    const handleRegectRequest = useCallback(async () => {
        setOpenBkDrop(true)
        if (authority === 1) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', rejectd)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setreason('')
                    setcount(count + 1)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
                else {
                    errorNofity(message)
                    setOpen(false)
                    setOpenBkDrop(false)
                }
            }
        }
        //submitting hod approval
        else if (authority === 2) {
            if (reason === '') {
                infoNofity("Please Add Remark")
            } else {
                const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${slno}`)
                const { success, data } = result.data;
                if (success === 1) {
                    const { np_inc_apprv_req, np_incapprv_status } = data[0]
                    if (np_inc_apprv_req === 1 && np_incapprv_status === 0) {
                        const result = await axioslogin.patch('./LeaveRequestApproval/inchargeapprvnopunch', rejectd)
                        const { success } = result.data
                        if (success === 1) {
                            const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', rejectd)
                            const { success, message } = result.data
                            if (success === 1) {
                                succesNofity(message)
                                setreason('')
                                setcount(count + 1)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                            else {
                                errorNofity(message)
                                setOpen(false)
                                setOpenBkDrop(false)
                            }
                        }
                    } else {
                        const result = await axioslogin.patch('./LeaveRequestApproval/hodapprvlnopunch', rejectd)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)
                            setreason('')
                            setcount(count + 1)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                        else {
                            errorNofity(message)
                            setOpen(false)
                            setOpenBkDrop(false)
                        }
                    }
                }
            }
        }
    }, [rejectd, authority, count, setcount, slno, setOpen, reason])

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
                            {emp_name}
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
                                {emp_id}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                    </Box>
                    {/* <Box sx={{ mt: 0.5, pt: 1 }} >
                    <Typography variant="outlined" color="success">
                        {status}
                    </Typography>
                </Box> */}
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }}>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Request Date</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> : {requestdate}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Miss Punch Date</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md">: {nopunchdate}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left" }}  >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Reason</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> : {nopreason}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left" }}  >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Shift time</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> : {shft_desc}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Check In</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md">: {checktintime}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> Check Out</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" fontSize="md"> : {checkouttime}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                    {/* <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            Incharge Use Only
                        </Chip>
                    </Divider> */}
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Reason For Reject The Request here…" variant="outlined" onChange={(e) => setreason(e.target.value)} />
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
export default memo(NopunchRqModel)