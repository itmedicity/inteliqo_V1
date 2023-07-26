import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Button, Dialog, DialogActions, DialogContent, Slide, TextareaAutosize } from '@mui/material';
import moment from 'moment';
import React, { Fragment, memo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeNumber } from 'src/views/Constant/Constant';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HRReqstModal = ({ open, setOpen, data }) => {

    const [reason, setReason] = useState('')


    const saveData = async () => {
        const { serialno } = data[0]
        const patchData = {
            hr_comments: reason,
            hr_status: 1,
            hrm_comment_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_userid: employeeNumber(),
            general_slno: serialno
        }
        const result = await axioslogin.patch('/CommonReqst/hr/general', patchData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message)
            setReason('')
            setOpen(false)
        } else {
            errorNofity(message)
            setReason('')
            setOpen(false)
        }
    }

    const CloseModel = async () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                sx={{ width: '100%', height: 600 }}
            >
                <DialogContent id="alert-dialog-slide-descriptiona">
                    <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                        <Box sx={{ width: '100%', pt: 1, display: "flex", flexDirection: "row", justifyContent: 'left' }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontWeight: 500 }} >
                                    HR Remarks
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, mt: 1 }}>
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex" }}
                                minRows={2}
                                placeholder="Add Any Remarks Here...."
                                value={reason}
                                name="reason"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={saveData}>Save</Button>
                    <Button color="secondary" onClick={CloseModel} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(HRReqstModal)