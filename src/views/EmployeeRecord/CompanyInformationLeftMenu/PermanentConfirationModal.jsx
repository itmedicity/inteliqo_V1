import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const PermanentConfirationModal = ({ open, setOpen, data, count, setCount }) => {

    const history = useHistory()

    const closeRequest = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const submitRequest = useCallback(async () => {
        const result = await axioslogin.post('/empmast/permanent', data)
        const { message, success } = result.data;
        if (success === 1) {
            if (success === 1) {
                setCount(count + 1)
                succesNofity(message);
                history.push(`/Home/Prfle/${data?.em_no}/${data?.em_id}`)
                setOpen(0)
            } else {
                infoNofity(message)
            }
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }

    }, [data, count, setCount, setOpen, history])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"

            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}

        >
            <ModalDialog size="lg" sx={{ width: "30vw" }} >
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        // borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Box sx={{ display: 'flex', flex: 1, fontWeight: 500, justifyContent: 'center' }}>
                    <Typography level="body2"  >
                        Are You Sure To Confirm Catgory Change Date To Date Of Joining??
                    </Typography>
                </Box>
                <Box sx={{}} >
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success" onClick={submitRequest}>
                            Submit
                        </Button>
                        <Button variant="solid" color="danger" onClick={closeRequest}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(PermanentConfirationModal) 