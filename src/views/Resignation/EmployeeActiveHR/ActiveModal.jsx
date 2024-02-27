import { Box, Button, Chip, Divider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeNumber } from 'src/views/Constant/Constant';

const ActiveModal = ({ open, setOpen, data, setCount }) => {
    const [reason, setReason] = useState('')
    const [details, setDetails] = useState(
        {
            emno: '',
            name: '',
            section: '',
            emid: 0,
            dept_id: 0,
            sect_id: 0
        }
    )
    const { emno, name, section, dept_id, sect_id, emid } = details;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { sect_name, em_name, em_no, em_id, dept_id, sect_id } = data[0]
            const details = {
                emno: em_no,
                name: em_name,
                section: sect_name,
                emid: em_id,
                dept_id: dept_id,
                sect_id: sect_id
            }
            setDetails(details)
        }
        else {
            setDetails({})
        }
    }, [data])

    const CloseModel = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const saveData=useCallback(async()=>{
        const postData = {
            em_id: emid
        }

        const activedata = {
            em_id: emid,
            em_no: emno,
            remark: reason,
            create_user: employeeNumber()
        }
        
        if (reason === '') {
            setOpen(false)
            infoNofity("Please Add Remark!")
        } else {
           
        const result = await axioslogin.patch('/empmast/empmsater/active', postData)
        const { success } = result.data
        if (success === 2) {
           
            setCount(Math.random())
                const result = await axioslogin.post('/empmast/insert/active', activedata)
                const { success } = result.data
                if (success === 1) {
                    setOpen(false)
                    succesNofity("Employee Activated")
                    setCount(Math.random())
                } else {
                    warningNofity("Error while Activating an Employee")
                }
          
        } else {
            setOpen(false)
            warningNofity("Error while Activating an Employee")
        }
    }
    },[emid,emno,reason])

  return (
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
  )
}

export default memo(ActiveModal)