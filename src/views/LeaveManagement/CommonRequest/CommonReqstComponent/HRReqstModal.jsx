import { Chip, Divider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy';
import { Box, Button, Paper, } from '@mui/material';
import moment from 'moment';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeNumber } from 'src/views/Constant/Constant';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const HRReqstModal = ({ open, setOpen, data }) => {

    const [reason, setReason] = useState('')
    const [details, setDetails] = useState(
        {
            emno: '',
            name: '',
            section: '',
            reqDate: '',
            emid: 0,
            comments: ''
        }
    )
    const { emno, name, section, reqDate, comments } = details;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { sect_name, em_name, em_no, em_id, request_comments, request_date } = data[0]
            const details = {
                emno: em_no,
                name: em_name,
                section: sect_name,
                reqDate: request_date,
                comments: request_comments,
                emid: em_id,
            }
            setDetails(details)
        }
        else {
            setDetails({})
        }
    }, [data])

    const saveData = async () => {
        const { general_slno } = data[0]
        const patchData = {
            hr_comments: reason,
            hr_status: 1,
            hrm_comment_date: moment().format('YYYY-MM-DD HH:mm'),
            hr_userid: employeeNumber(),
            general_slno: general_slno
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
            {/* <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" /> */}
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
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >
                            {section}
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
                                {moment(reqDate).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Request Information.
                        </Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Employee Comment:
                                </Typography>
                                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                    {comments}
                                </Typography>
                            </Box>

                        </Box>
                    </Paper>
                    <Divider>
                        <Chip variant="outlined" color="info" size="sm">
                            HR Use Only
                        </Chip>
                    </Divider>
                    <Box sx={{ pt: 0.5 }} >
                        <Textarea name="Outlined" placeholder="Add Any Remarks Here...."
                            variant="outlined" onChange={(e) => setReason(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="solid" color="success" onClick={saveData}>
                                Save
                            </Button>
                            <Button variant="solid" color="danger" onClick={CloseModel}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment >
        // <Fragment>
        //     <ToastContainer />
        //     <Dialog
        //         open={open}
        //         TransitionComponent={Transition}
        //         fullWidth
        //         sx={{ width: '100%', height: 600 }}
        //     >
        //         <DialogContent id="alert-dialog-slide-descriptiona">
        //             <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
        //                 <Box sx={{ width: '100%', pt: 1, display: "flex", flexDirection: "row", justifyContent: 'left' }}>
        //                     <CssVarsProvider>
        //                         <Typography sx={{ fontWeight: 500 }} >
        //                             HR Remarks
        //                         </Typography>
        //                     </CssVarsProvider>
        //                 </Box>
        //                 <Box sx={{ flex: 1, px: 0.5, mt: 1 }}>
        //                     <TextareaAutosize
        //                         style={{ width: "100%", display: "flex" }}
        //                         minRows={2}
        //                         placeholder="Add Any Remarks Here...."
        //                         value={reason}
        //                         name="reason"
        //                         onChange={(e) => setReason(e.target.value)}
        //                     />
        //                 </Box>
        //             </Box>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button color="secondary" onClick={saveData}>Save</Button>
        //             <Button color="secondary" onClick={CloseModel} >Cancel</Button>
        //         </DialogActions>
        //     </Dialog>
        // </Fragment>
    )
}

export default memo(HRReqstModal)