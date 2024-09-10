import { Box, Button, Modal, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import ModalClose from '@mui/joy/ModalClose';
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
// import CustomBackDrop from '../../../Muicomponents/CustomBackDrop';

const Expmodalinformation = lazy(() => import('./Expmodalinformation'))
const Edumodalinformation = lazy(() => import('./Edumodalinformation'))
const Vacancylistinf = lazy(() => import('./Vacancylistinf'))


const MainModal = ({ isModalOpen, setIsModalOpen, formdata, education, handleOnSave, expdata, edudata, eduname, vacancydata, selectedVacancies,
    setSelectedVacancies, openBkDrop }) => {
    const { name, lname, email, mobile, date } = formdata

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
                        p: 3,
                        borderRadius: 10,
                        border: 1
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
                    <CustomBackDrop open={openBkDrop} text="Please wait !. " />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <Box sx={{ mt: 1 }}>
                            <Vacancylistinf vacancydata={vacancydata} selectedVacancies={selectedVacancies} setSelectedVacancies={setSelectedVacancies} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography level="title-lg" sx={{}}>Basic Information</Typography>

                            {/* <CustmTypog title={'Your Information'} /> */}
                            <Box sx={{ mt: 1, borderTop: "1px solid #DFDFDF", }}>
                                <Box sx={{

                                    width: "100%", '@media screen and (max-width: 768px)': {
                                        width: "100%",
                                    },
                                }}>
                                    <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', width: '70%', gap: 1 }}>
                                            <Box>  <PersonIcon />  </Box>
                                            <Box sx={{ mt: .5 }}>
                                                <Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {name === '' ? "Not Updated" : name} {lname === '' ? "" : lname}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', width: '70%', gap: 1 }}>
                                            <Box>
                                                <EmailIcon />
                                            </Box>
                                            <Box sx={{ mt: .5 }}> <Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {email === '' ? "Not Updated" : email}</Typography> </Box>

                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', width: '70%', gap: 1 }}>
                                            <Box>
                                                <PhoneIcon />
                                            </Box>
                                            <Box sx={{ mt: .5 }}><Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {mobile === '' ? "Not Updated" : mobile}</Typography>  </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', width: '70%', gap: 1 }}>
                                            <Box>
                                                <CalendarMonthIcon />
                                            </Box>
                                            <Box sx={{ mt: .5 }}><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {date === '' ? "Not Updated" : moment(date).format('DD-MM-YYYY')}</Typography>  </Box>

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Expmodalinformation formdata={formdata} education={education} expdata={expdata} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Edumodalinformation formdata={formdata} education={education} edudata={edudata} eduname={eduname} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={handleOnSave}
                            >
                                Submit Application
                                {/* <SaveIcon /> */}
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(MainModal)