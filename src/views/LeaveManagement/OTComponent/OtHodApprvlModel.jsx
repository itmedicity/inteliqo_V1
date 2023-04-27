import { CssVarsProvider, Textarea, Typography } from '@mui/joy'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, MenuItem, Paper, Select, Slide } from '@mui/material'
import moment from 'moment';
import React, { Fragment, memo, useState } from 'react'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const OtHodApprvlModel = ({ open, handleClose, rowData, inchid, count, setCount }) => {

    const {
        em_no,
        em_name,
        ot_date,
        ot_days,
        over_time,
        ot_reson,
        shft_desc,
        emp_id,
        ot_slno,
        ot_coff_type,
        ot_inch_status,
        ot_inch_remark,
        check_in,
        check_out
    } = rowData[0]
    const [status, setstatus] = useState({
        apprv: false,
        reject: false
    })
    const { apprv, reject } = status
    const [ot_type, setOt_type] = useState(0)
    const [ot_hod_remark, setOt_hod_remark] = useState('')
    const [table, setTable] = useState(false)
    const [flag, setFlag] = useState(0)
    const [array, setArray] = useState([])

    const updatehodApproval = async (e) => {
        const ob1 = {
            apprv: false,
            reject: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setstatus({ ...ob1, [e.target.name]: value })
    }

    useEffect(() => {
        if (over_time <= 480) {
            infoNofity("Not Applicable for COff please check more OT Available")
        } else { }

        if (ot_coff_type === 0) {
            setOt_type(0)
        } else {
            setOt_type(ot_coff_type)
        }
        if (check_in !== 0 && check_out !== 0) {
            const obj = {
                punch_taken: 0,
                emp_code: em_no,
                punch_time: check_in
            }
            const obj2 = {
                punch_taken: 0,
                emp_code: em_no,
                punch_time: check_out
            }
            setArray([...array, obj, obj2])
        }
    }, [over_time, ot_coff_type, check_in, check_out])

    const updatechageottype = (val) => {
        if (val === 1) {
            setTable(true)
        } else {
            setTable(false)
        }
    }

    const checkOT = (val) => {
        if (val === 1) {
            if (over_time > 480) {
                var othr = Math.floor(over_time / 480)
                // setdays(othr)

            }
            setFlag(1)
        } else {
            setFlag(3)
        }
    }

    const patchData = {
        ot_hod_status: apprv === true ? 1 : reject === true ? 2 : 0,
        ot_hod_remark: ot_hod_remark,
        ot_hod_user: inchid,
        ot_coff_type: ot_type,
        ot_new_time: flag === 3 ? over_time : 0,
        emp_id: emp_id,
        ot_status: reject === true ? 2 : 0,
        ot_slno: ot_slno
    }

    const dataPost = {
        ot_time: over_time,
        emp_id: emp_id,
        applied_cl: 1,
        ot_coff_slno: ot_slno,
    }

    const submitdata = async () => {
        const result1 = await axioslogin.patch('/overtimerequest/hodapprove', patchData)
        const { success, message } = result1.data
        if (success === 2) {
            if (apprv === true && reject === false && flag === 3) {
                succesNofity("Hod Approved & Converted to Over Time");
            } else if (apprv === false && reject === true && flag === 3) {
                const result1 = await axioslogin.patch('/overtimerequest/inactive/punch', array)
                const { success, message } = result1.data
                if (success === 1) {
                    succesNofity("Ot Approval HOD Rejected ");
                } else {
                    infoNofity(message)
                }
            } else if (apprv === true && reject === false && flag === 1) {
                succesNofity("Hod Approved & Compensatory Off Added ");
            } else if (apprv === false && reject === true && flag === 1) {
                succesNofity("Compensatory Off Hod rejected ");
            }
            setCount(count + 1)
            setFlag(0)
            handleClose()
        } else {
            warningNofity(message)
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='sm'
            >
                <DialogContent sx={{ width: '100%', height: 'auto' }}>
                    <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                <CssVarsProvider>
                                    <Typography fontSize="xl" level="body1">Over Time HOD Approval </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Paper square variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Emp. ID</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {em_no}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", textTransform: "capitalize" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {em_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Request Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {moment(new Date(ot_date)).format('DD-MM-YYYY')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                        <CssVarsProvider>
                                            <Typography level="body1"> Shift</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {shft_desc}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">OT Date</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">: {moment(new Date(ot_days)).format('DD-MM-YYYY')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Time in Min.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {over_time} minutes</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%" }} >
                                    <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">Reason</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> : {ot_reson}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                {
                                    ot_inch_status === 1 ? <Box sx={{ display: "flex", width: "100%" }} >
                                        <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                                            <CssVarsProvider>
                                                <Typography level="body1">Incharge Remark</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ display: "flex", width: "75%", px: 0.5, justifyContent: "left" }} >
                                            <CssVarsProvider>
                                                <Typography level="body1"> : {ot_inch_remark}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box> : null
                                }
                            </Paper>
                            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', pt: 0.5, justifyContent: 'space-between' }}>
                                <Box sx={{ flex: 1, p: 1 }}>
                                    <FormControl fullWidth size="small"   >
                                        <Select
                                            value={ot_type}
                                            onChange={(e) => {
                                                updatechageottype(e.target.value)
                                                checkOT(e.target.value)
                                                setOt_type(e.target.value)
                                            }}
                                            size="small"
                                            fullWidth
                                            variant='outlined'
                                        >
                                            <MenuItem value={0} disabled >Select OT Type</MenuItem>
                                            <MenuItem value={1}>Compensatory Off</MenuItem>
                                            <MenuItem value={2}>Over Time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ flex: 1, pt: 0.5, flexDirection: 'row-reverse' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="apprv"
                                                color="primary"
                                                value={apprv}
                                                checked={apprv}
                                                onChange={(e) =>
                                                    updatehodApproval(e)
                                                }
                                            />
                                        }
                                        label="Approve"
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pt: 0.5, }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="reject"
                                                color="primary"
                                                value={reject}
                                                checked={reject}

                                                className="ml-2 "
                                                onChange={(e) =>
                                                    updatehodApproval(e)
                                                }
                                            />
                                        }
                                        label="Reject"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", pt: 1, display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ display: "flex", width: "25%", px: 0.5, justifyContent: "left", fontWeight: 500, pt: 1 }}  >
                                    <CssVarsProvider>
                                        <Typography level="body1"> Remark</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 6 }} >
                                    <CssVarsProvider>
                                        <Textarea
                                            label="Outlined"
                                            placeholder="Hod Remark"
                                            variant="outlined"
                                            color="warning"
                                            size="lg"
                                            minRows={1}
                                            maxRows={3}
                                            onChange={(e) => setOt_hod_remark(e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Button color="primary" onClick={submitdata} >SAVE</Button>
                            <Button onClick={handleClose} color="primary" >Close</Button>
                        </DialogActions>
                    </Paper>
                </DialogContent >
            </Dialog >
        </Fragment >
    )
}

export default memo(OtHodApprvlModel) 