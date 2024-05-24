import React, { useCallback, memo, useState, } from 'react'
import { Box, Button, Modal, Typography, Textarea } from '@mui/joy'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import ModalClose from '@mui/joy/ModalClose';
import { axioslogin } from 'src/views/Axios/Axios';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import moment from 'moment'

const CallLetterModal = ({ isModalOpen, setIsModalOpen, formdata, time, date, settime, setdate, setformdata, setOpenRowIndex, count, setcount }) => {

    const [phonecall_status, setPhonecallstatus] = useState(false)
    const [remark, setremark] = useState('')

    //for saving the time and date
    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        if (phonecall_status === false) {
            setIsModalOpen(false)
            infoNofity('Please condact the Applicant')
        } else {
            const postdata = formdata.map(item => ({
                ...item,
                date: date,
                time: time,
                letter_status: 1,
                remark: remark,
                phonecall_status: phonecall_status === true ? 1 : 0
            }))
            const result = await axioslogin.post('/Applicationform/callletterinsert', postdata)
            const { success } = result.data
            if (success === 1) {
                setIsModalOpen(false)
                setOpenRowIndex(null)
                setformdata([])
                setcount(count + 1)
                setremark('')
                setPhonecallstatus(false)
                settime(moment().format('LT'))
                setdate(moment(new Date()).format('YYYY-MM-DD'))
                succesNofity("Call Letter Submitted Sucessfully")
            } else {
                warningNofity('Call Letter Not Send')
            }
        }
    }, [formdata, setIsModalOpen, date, time, setformdata, setOpenRowIndex, setcount, count, remark, phonecall_status, setdate, settime])
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
                        height: 450,
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
                        <Box sx={{ mt: 1, pt: .5, }}>
                            <JoyCheckbox
                                label='Check if Phone Call accept'
                                name="phonecall_status"
                                checked={phonecall_status}
                                onchange={(e) => setPhonecallstatus(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>

                            <Textarea name="Outlined" placeholder="Remark here..." minRows={5}
                                variant="outlined" onChange={(e) => setremark(e.target.value)} />

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