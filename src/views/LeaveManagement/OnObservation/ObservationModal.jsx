import { Avatar, Box, Button, ButtonGroup, CardActions, CardContent, CardOverflow, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { addDays, format, isValid } from 'date-fns';
import React, { memo, useMemo } from 'react'
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const ObservationModal = ({ open, setOpen, empdata }) => {

    const { em_id, em_no, em_name, em_doj, dept_name, sect_name } = empdata;
    const state = useSelector((state) => state?.getCommonSettings)
    const commonStates = useMemo(() => state, [state])
    const { onobservation_days } = commonStates;
    const obsLastDay = addDays(new Date(em_doj), onobservation_days)


    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id: LoginEmpID } = employeeProfileDetl;


    const closeModal = useCallback(() => {
        setOpen(false)
    }, [])

    const submitData = useCallback(async () => {
        const postData = {
            duty_day: format(new Date(em_doj), 'yyyy-MM-dd'),
            emp_id: em_id,
            dateofjoining: format(new Date(em_doj), 'yyyy-MM-dd'),
            observation_day: format(new Date(em_doj), 'yyyy-MM-dd'),
            create_user: LoginEmpID
        }
        const empData = await axioslogin.patch("/OnObservationRequest/punchMasterUpdate", postData);
        const { success, message } = empData.data;
        if (success === 1) {
            succesNofity("Submitted Suuccessfully")
            setOpen(false)
        } else {
            errorNofity(message)
            setOpen(false)
        }
    }, [em_id, em_doj, LoginEmpID])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog size="lg" variant="outlined" >
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

                <CardContent>
                    <Box sx={{ display: 'flex' }} >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                pr: 2,
                                "--Avatar-size": "80px",
                                "--Avatar-ringSize": "8px"
                            }}
                        >
                            <Avatar src="" size="lg" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, }} >
                                    <Typography level="title-lg">{em_name}</Typography>
                                    <Typography level="title-lg">Employee No # {em_no}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{sect_name}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }} >
                        Observation Day : {isValid(new Date(em_doj)) === true ? format(new Date(em_doj), 'dd-MM-yyyy') : 'NOT UPDATED'}
                    </Box>

                </CardContent>
                <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                    <CardActions buttonFlex="1">
                        <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                            <Button onClick={submitData}>Verify&Submit</Button>
                            <Button onClick={closeModal}>Cancel</Button>
                        </ButtonGroup>
                    </CardActions>
                </CardOverflow>
            </ModalDialog>
        </Modal>
    )
}

export default memo(ObservationModal) 