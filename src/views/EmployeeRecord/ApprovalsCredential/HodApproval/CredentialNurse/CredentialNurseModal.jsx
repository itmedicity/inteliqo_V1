import React, { lazy, memo, useCallback, useMemo, useState } from 'react'
import { Box, Button, Modal, ModalDialog, Table, Tooltip, Typography } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';


const CredentialFormRegistration = lazy(() => import('./CredentialFormRegistration'))

const CredentialNurseModal = ({ isModalOpen, setIsModalOpen, Empdata, count, SetCount }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_name, em_id } = employeeProfileDetl

    const onClose = useCallback((e) => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

    const [FormDatamain, setFormDatamain] = useState({
        HodName: em_name,
        emId: em_id,
        HodRemark: "",
        Hoddatesaved: moment(new Date()).format('YYYY-MM-DD'),
    })
    const { HodRemark, emId, Hoddatesaved } = FormDatamain

    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,
            em_id: emId,
            HodRemark: HodRemark,
            Hoddatesaved: Hoddatesaved
        }
    }, [Employee, em_id, HodRemark, Hoddatesaved])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HodRemark === '') {
            warningNofity("Please enter the Comments")
        }
        else {
            const result = await axioslogin.post('/PersonalChecklist/CredentialnurseHodApproval', personaldata)
            const { success } = result.data
            if (success === 1) {
                setIsModalOpen(false)
                succesNofity("Sucessfully Updated")
                SetCount(count + 1)
            }
            else {
                warningNofity("Something Went Wrong")
            }
        }

    }, [HodRemark, SetCount, count])
    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpen}
                onClose={onClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='sm' sx={{ width: '80%' }}>
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
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1, mt: 2, }}>

                        <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> Name  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>ID No</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.em_no === '' ? 'Not Updated' : Employee?.em_no} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Date Of Joining  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.em_doj === '' ? 'Not Updated' : Employee?.em_doj} </Typography>
                                    </td>
                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Designation </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.desg_name === '' ? 'Not Updated' : Employee?.desg_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Department </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.dept_name === '' ? 'Not Updated' : Employee?.dept_name} </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <CredentialFormRegistration Employee={Employee} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

                            <Tooltip title="Save">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={handleOnClick}
                                >
                                    Submit Application
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(CredentialNurseModal)