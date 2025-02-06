import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { addDays, format } from 'date-fns';
import React, { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const ContractConfirmationModal = ({ open, setOpen, data, count, setCount }) => {

    const history = useHistory()

    const state = useSelector((state) => state?.getCommonSettings,)
    const commonSetting = useMemo(() => state, [state])
    const { external_trainee } = commonSetting;

    const submitRequest = useCallback(async () => {

        const postData = {
            em_id: data?.em_id,
            em_no: data?.em_no,
            em_cont_start: (external_trainee === data?.com_category) && (data?.com_category !== data?.com_category_new) ? data?.category_ineffect_date : data?.em_doj,
            em_cont_end: (external_trainee === data?.com_category) && (data?.com_category !== data?.com_category_new) ? format(addDays(new Date(data?.category_ineffect_date), 365), 'yyyy-MM-dd') : format(addDays(new Date(data?.em_doj), 365), 'yyyy-MM-dd'),
            em_prob_end_date: '2000-01-31',
            em_conf_end_date: data?.category_ineffect_date,
            status: 0
        }

        const result = await axioslogin.post('/empmast/newContract/cateChange', data)
        const { message, success } = result.data;
        if (success === 1) {
            const result = await axioslogin.post('/empmast/createContract', postData)
            const { message, success } = result.data;
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
    }, [data, count, setCount, setOpen, history, external_trainee])


    const closeRequest = useCallback(() => {
        setOpen(false)
    }, [setOpen])

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
                        Are You Sure To Confirm Contract Catgory Change Date To Date Of Joining??
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

export default memo(ContractConfirmationModal) 