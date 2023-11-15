
import React, { memo, useCallback, useMemo, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Box, Button, Modal, Typography, Textarea } from '@mui/joy'
import moment from 'moment'
import ModalClose from '@mui/joy/ModalClose';

const VacancyModal = ({ isModalOpen, setIsModalOpen, selectedRowData, setcount, count }) => {
    const postdata = useMemo(() => {
        return {
            dept_id: selectedRowData?.dept_id,
            desg_id: selectedRowData?.desg_id,
            fromDate: moment().format('yyyy-MM-DD'),
            Announcement_status: 1
        }
    }, [selectedRowData])

    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/Manpower/updateAnnouncement', postdata)
        const { success, message } = result.data
        if (success === 2) {
            setcount(count + 1)
            succesNofity(message)
            setIsModalOpen(false)
        } else {
            warningNofity(message)
        }

    }, [count, postdata])
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
                    <Box sx={{ p: 2, border: 1, borderColor: "#6B728E" }}>
                        <CustmTypog title={'Vacancy Announcement'} />
                        <Box sx={{ mt: 2, display: "flex" }}>
                            <Box sx={{ width: "50%" }}>
                                <Typography>Department :</Typography>
                                <Typography>Designation :</Typography>
                                {/* <Typography>Type :</Typography> */}
                                <Typography>Required No:</Typography>
                                {/* <Typography>Replacement or Not :</Typography> */}
                                {/* {selectedRowData?.replacement_status === 1 ? <Typography>Replacement Employee Name:</Typography> : null} */}
                                <Typography>Requested Date:</Typography>
                                <Typography>Approval Date :</Typography>
                                <Typography>Wanted Date :</Typography>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.dept_name || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.desg_name || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.manpower_required_no || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.createdate || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.ed_approval_date || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.required_date || 'N/A'}</Typography>
                            </Box>

                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button sx={{ p: 0, width: "30%", }} size='sm' variant="outlined" color="success" onClick={handleOnClick} >
                                Announce Vacancy
                            </Button>

                        </Box>
                    </Box>


                </Box>

            </Modal>
        </Box>
    )
}

export default memo(VacancyModal) 