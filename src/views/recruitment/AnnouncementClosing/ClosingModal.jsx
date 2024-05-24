import React, { memo, useCallback, useMemo, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Box, Button, Modal, Textarea, Typography, } from '@mui/joy'
import moment from 'moment'
import ModalClose from '@mui/joy/ModalClose';

const ClosingModal = ({ isModalOpen, setIsModalOpen, item, count, setcount }) => {
    const [remark, setremark] = useState('')
    const postdata = useMemo(() => {
        return {
            dept_id: item?.dept_id,
            desg_id: item?.desg_id,
            fromDate: moment().format('yyyy-MM-DD'),
            Announcement_status: 2,
            remark: remark
        }
    }, [item, remark])

    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (remark === '') {
            setIsModalOpen(false)
            warningNofity("Please enter the Remark")
        } else {
            const result = await axioslogin.post('/Manpower/closeAnnouncement', postdata)
            const { success, message } = result.data
            if (success === 2) {
                setcount(count + 1)
                succesNofity(message)
                setIsModalOpen(false)
            } else {
                warningNofity(message)
            }
        }
    }, [count, postdata, setIsModalOpen, setcount, remark])
    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 1,
                        borderRadius: 10,
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
                    <Box sx={{ p: 2, borderColor: "#6B728E" }}>
                        <CustmTypog title={'Announcement Closing'} />
                        <Box sx={{ display: "flex", mt: 1 }}>
                            <Box sx={{ width: "30%" }}>
                                <Typography>Department :</Typography>
                                <Typography>Designation :</Typography>
                                <Typography>Required No:</Typography>
                                <Typography>Remark:</Typography>
                            </Box>
                            <Box sx={{ width: "70%" }}>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{item?.dept_name || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{item?.desg_name || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{item?.manpower_required_no || 'N/A'}</Typography>
                                <Textarea name="Outlined" placeholder="Remark here..." minRows={5}
                                    variant="outlined" onChange={(e) => setremark(e.target.value)} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                            <Button sx={{ p: 0, width: "50%" }} size='sm' variant="outlined" color="success" onClick={handleOnClick} >
                                Announcement Closing
                            </Button>
                        </Box>
                    </Box>


                </Box>

            </Modal>
        </Box>
    )
}

export default memo(ClosingModal)