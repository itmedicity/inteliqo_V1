import React, { useState, useCallback, memo, } from 'react'
import { Box, Button, Modal, Typography } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ModalClose from '@mui/joy/ModalClose';
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CallLetterModal = ({ isModalOpen, setIsModalOpen, formdata }) => {

    const [date, setdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [time, settime] = useState();

    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()

        if (Object.keys(formdata).length === 0) {
            infoNofity('Please Mark any Person For Call Letter')
        } else {
            const result = await axioslogin.post('/Applicationform/callletterinsert', formdata)

            const { success } = result.data
            if (success === 1) {
                setIsModalOpen(false)
                succesNofity("Call Letter Submitted Sucessfully")

            } else {
                warningNofity('Call Letter Not Send')
            }
        }
    }, [formdata, setIsModalOpen])
    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        height: 250,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <CustmTypog title={'Select Date and Time'} />
                        <Box sx={{ pt: .5, mt: .5 }}><Typography>Date:</Typography></Box>
                        <Box sx={{ width: '100%' }}>
                            <JoyInput
                                type="date"
                                value={date}
                                onchange={setdate}
                                size="sm"
                            />
                        </Box>
                        <Box sx={{ pt: .5, mt: .5 }}><Typography>Time:</Typography></Box>
                        <Box sx={{ width: '100%' }}>
                            <JoyInput
                                type="time"
                                value={time}
                                onchange={settime}
                                size="sm"
                            />
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button sx={{ p: 0, width: "100%" }} size='sm' variant="outlined" color="success" onClick={submitmanpower}>
                                Send Call Letter
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(CallLetterModal)