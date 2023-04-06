import React from 'react'
import { memo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { ModalDialog } from '@mui/joy';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Box } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import moment from 'moment';

const LeaveRequestModal = ({ open, setOpen, data }) => {
    console.log(data)
    //DISPLAY THE DATA 
    //GET THE DETAILED TABLE DATA USING API

    //UPDATE LEAVE FUNCTION 
    const { slno, emno, name, section, status, hrstatus, code, reqDate } = data;
    // console.log(reqdata)

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

        >
            <ModalDialog size="lg" >
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
                        // mb={1}
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
                    <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{section}</Typography>
                </Box>
                <Box sx={{ mt: 0.5, pt: 1 }} >
                    <Typography variant="outlined" color="success">
                        {status}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, pt: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, pr: 1 }} >
                        <Typography
                            level="h6"
                            justifyContent="center"
                        >
                            Request Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />}>
                            {moment(reqDate).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                    {/* <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                        <Typography
                            level="h6"
                            justifyContent="center"
                        >
                            Request Date
                        </Typography>
                        <Typography startDecorator={<ArrowRightOutlinedIcon />}>
                            {moment(reqDate).format('DD-MM-YYYY')}
                        </Typography>
                    </Box> */}
                </Box>
                {/* <Typography
                    component="h3"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    Information Technology
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                    Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                    optional <code>aria-describedby</code> attribute.
                </Typography> */}
            </ModalDialog>
        </Modal>
    )
}

export default memo(LeaveRequestModal)