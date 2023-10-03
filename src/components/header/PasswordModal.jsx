import { Box, Button, CssVarsProvider, FormControl, FormLabel, Input, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const PasswordModal = ({ open, setOpen, details }) => {

    const history = useHistory();
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [compareValue, setComapreValue] = useState(0)

    useEffect(() => {
        if (confirmPassword !== '' && newPassword !== '') {
            const comparisonResult = newPassword.localeCompare(confirmPassword);
            setComapreValue(comparisonResult);
        } else {
            setComapreValue(0)
        }

    }, [newPassword, confirmPassword])

    const Submitrequest = useCallback(async () => {
        const updateData = {

            emp_password: confirmPassword,
            emp_status: 1,
            emp_edit: details.em_no,
            oldempno: details.em_no
        }
        const result = await axioslogin.patch('/employee/update/pass', updateData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            sessionStorage.clear();
            history.push('/')
            setOpen(false)
        } else {
            warningNofity(message)
            setOpen(false)
        }
    }, [confirmPassword, details, setOpen, history])

    return (
        <>
            <ToastContainer />
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                placeholder="New Password"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            {
                                compareValue === 0 ? null :
                                    <CssVarsProvider>

                                        <Typography level="body1" sx={{ color: 'red' }}>   <InfoOutlined /> Opps! Incorrect Password </Typography>
                                    </CssVarsProvider>

                            }
                        </FormControl>
                        <Box sx={{ display: 'flex', gap: 2, }}>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button
                                    type="submit"
                                    size="md"
                                    color="primary"
                                    onClick={Submitrequest}
                                >Submit</Button>
                            </Box>
                            <Box sx={{}}>
                                <Button
                                    size="md"
                                    color="primary"
                                    type="submit"
                                    onClick={() => setOpen(false)}
                                >Cancel</Button>
                            </Box>
                        </Box>
                    </Stack>
                </ModalDialog>
            </Modal >
        </>
    )
}

export default memo(PasswordModal) 