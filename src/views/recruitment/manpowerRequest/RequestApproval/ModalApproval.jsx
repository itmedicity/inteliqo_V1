import React, { memo, useCallback, useMemo, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Box, Button, Modal, Typography, Textarea } from '@mui/joy'
import moment from 'moment'
import ModalClose from '@mui/joy/ModalClose';

const ModalApproval = ({ setIsModalOpen, isModalOpen, selectedRowData, setcount, count }) => {

    const [remark, setremark] = useState('')

    const rejectpostdata = useMemo(() => {
        return {
            dept_id: selectedRowData?.dept_id,
            desg_id: selectedRowData?.desg_id,
            remark: remark,
            fromDate: moment().format('yyyy-MM-DD'),
            ed_approval_status: 2
        }
    }, [selectedRowData, remark])

    // for reject
    const handleCloseModal = useCallback(async (event) => {
        event.preventDefault()

        if (remark === '') {
            infoNofity('Enter the remark')
            setIsModalOpen(false)
        } else {
            const result = await axioslogin.post('/Manpower/updateDataManpower', rejectpostdata)
            const { success, message } = result.data
            if (success === 2) {
                setcount(count + 1)
                succesNofity(message)
                setIsModalOpen(false)
            } else {
                warningNofity(message)
            }
        }
    }, [rejectpostdata, count, remark, setIsModalOpen, setcount])
    // data save
    const postdata = useMemo(() => {
        return {
            dept_id: selectedRowData?.dept_id,
            desg_id: selectedRowData?.desg_id,
            remark: remark,
            fromDate: moment().format('yyyy-MM-DD'),
            ed_approval_status: 1
        }
    }, [selectedRowData, remark])

    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (remark === '') {
            infoNofity('Enter the remark')
            setIsModalOpen(false)
        } else {
            const result = await axioslogin.post('/Manpower/updateDataManpower', postdata)
            const { success, message } = result.data
            if (success === 2) {
                setcount(count + 1)
                succesNofity(message)
                setIsModalOpen(false)
            } else {
                warningNofity(message)
            }
        }
    }, [postdata, count, remark, setcount, setIsModalOpen])
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
                        <CustmTypog title={'ManPower Request Approval'} />
                        <Box sx={{ mt: 2, display: "flex" }}>
                            <Box sx={{ width: "50%" }}>
                                <Typography>Department :</Typography>
                                <Typography>Designation :</Typography>
                                <Typography>Type :</Typography>
                                <Typography>Required No:</Typography>
                                <Typography>Replacement or Not :</Typography>
                                {selectedRowData?.replacement_status === 1 ? <Typography>Replacement Employee Name:</Typography> : null}
                                <Typography>Request Date :</Typography>
                                <Typography>Last date :</Typography>
                                <Typography>Remark :</Typography>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.dept_name || 'N/A'}</Typography>
                                <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.desg_name || 'N/A'}</Typography>
                                <Typography sx={{ color: '#78C1F3' }}>{selectedRowData?.apprentice_status === 1 ? "Apprentice"
                                    : selectedRowData?.contract_status === 1 ? "Contract"
                                        : selectedRowData?.permanent_status === 1 ? "Permanent"
                                            : selectedRowData?.trainee_status === 1 ? "Traianee" : 'nil'}</Typography>
                                <Typography sx={{ color: '#78C1F3' }}> {selectedRowData?.manpower_required_no}</Typography>
                                <Typography sx={{ color: '#78C1F3' }}>{selectedRowData?.addition_status === 1 ? "Addition"
                                    : selectedRowData?.new_position_statu === 1 ? "New Position"
                                        : selectedRowData?.replacement_status === 1 ? 'Replacement' : "nil"
                                }</Typography>
                                {selectedRowData?.replacement_status === 1 ? <Typography sx={{ textTransform: "capitalize", color: '#78C1F3' }}>{selectedRowData?.em_name || 'N/A'}</Typography> : null}
                                <Typography sx={{ color: '#78C1F3' }}>{selectedRowData?.createdate || 'N/A'}</Typography>
                                <Typography sx={{ color: '#78C1F3' }}>{selectedRowData?.required_date || 'N/A'}</Typography>
                                <Box>
                                    <Textarea name="Outlined" placeholder="Remark here..."
                                        variant="outlined" onChange={(e) => setremark(e.target.value)} />
                                </Box>


                            </Box>

                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button sx={{ p: 0, width: "12%", }} size='sm' variant="outlined" color="success" onClick={handleOnClick} >
                                Approve
                            </Button>
                            <Button sx={{ p: 0, width: "12%" }} size='sm' variant="outlined" color="primary" onClick={handleCloseModal}>
                                Reject
                            </Button>
                        </Box>
                    </Box>


                </Box>

            </Modal>

        </Box>
    )
}

export default memo(ModalApproval) 