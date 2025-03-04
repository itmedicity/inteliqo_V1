import { Box, Button, Typography, } from '@mui/joy'
import { Dialog, DialogActions, DialogContent, DialogContentText, Paper, Slide, TextareaAutosize, TextField, Tooltip } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { startOfMonth } from 'date-fns';
import moment from 'moment';
import React, { memo, useCallback, useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeIdNumber } from 'src/views/Constant/Constant';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ArearModal = ({ open, setOpen, data }) => {

    const [arearMonth, setArearMonth] = useState(moment(new Date()))
    const [amount, setAmount] = useState(0)
    const [remark, setRemark] = useState('')
    const [details, setDetails] = useState(
        {
            emno: '',
            name: '',
            section: '',
            emid: 0,
            dept_name: '',
            dept_id: 0,
            sect_id: 0
        }
    )
    const { emno, name, section, dept_name, emid, dept_id, sect_id } = details;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {

            const { sect_name, em_name, em_no, em_id, dept_name, em_department, em_dept_section } = data;
            const details = {
                emno: em_no,
                name: em_name,
                section: sect_name,
                emid: em_id,
                dept_name: dept_name,
                dept_id: em_department,
                sect_id: em_dept_section
            }
            setDetails(details)
        }
        else {
            setDetails({})
        }
    }, [data])

    const submitAllowance = useCallback(async () => {
        const postData = {
            em_id: emid,
            em_no: emno,
            arrear_amount: amount,
            arrear_month: moment(startOfMonth(startOfMonth(new Date(arearMonth)))).format('YYYY-MM-DD'),
            create_user: employeeIdNumber(),
            arear_remark: remark,
            department: dept_id,
            department_sect: sect_id

        }
        if (remark === '' || amount === 0) {
            infoNofity("Please Add Remark and Amount")
        } else {
            const result = await axioslogin.post('/payrollprocess/insert/arear', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setArearMonth(moment(new Date()))
                setAmount(0)
                setRemark('')
                setOpen(false)
            } else {
                warningNofity(message)
            }
        }
    }, [arearMonth, amount, dept_id, sect_id, setOpen,
        remark, emid, emno])


    const CloseModel = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: 400
                    }}>
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Arear Details
                    </DialogContentText>
                    <Box variant='outlined' sx={{
                        width: "100%",
                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                    }} >
                        <Paper variant='outlined' sx={{ p: 0.2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                                <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography
                                            level="body1"
                                            justifyContent="center"
                                        >
                                            Emp. ID
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography level="body1"
                                            justifyContent="center" >
                                            {emno}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography
                                            level="body1"
                                            justifyContent="center"
                                        >
                                            Emp. Name
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography level="body1"
                                            justifyContent="center" >
                                            {name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                                <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography
                                            level="body1"
                                            justifyContent="center"
                                        >
                                            Dept. Name
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography level="body1"
                                            justifyContent="center" >
                                            {dept_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography
                                            level="body1"
                                            justifyContent="center"
                                        >
                                            Section Name
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                                        <Typography level="body1"
                                            justifyContent="center" >
                                            {section}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{ display: 'flex', width: '100%', pt: 1, }}>
                            <Tooltip title="Arear Month" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['month']}
                                            inputFormat="DD-MM-YYYY"
                                            value={arearMonth}
                                            onChange={setArearMonth}
                                            renderInput={(params) => (
                                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Tooltip>
                            <Tooltip title="Arear Amount" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, pt: 0.5, px: 0.5 }}>
                                    <TextField
                                        placeholder="Arear Amount"
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ width: "100%", pt: 1.5, px: 0.5, display: 'flex', flexDirection: 'row' }}>
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex" }}
                                minRows={3}
                                placeholder="Remark"
                                value={remark}
                                name="remark"
                                onChange={(e) => setRemark(e.target.value)}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submitAllowance}>Save</Button>
                    <Button color="secondary" onClick={CloseModel} >Cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default memo(ArearModal) 