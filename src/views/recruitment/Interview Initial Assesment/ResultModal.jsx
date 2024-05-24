import React, { memo, useCallback, useMemo } from 'react'
import { Box, Button, Modal, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';


const ResultModal = ({ isModalOpen, setIsModalOpen, name, crtanswer, wrganswer, setflag, empid, desgid }) => {

    const postdata = useMemo(() => {
        return {
            crtanswer: crtanswer,
            interview_status: 1,
            application_no: empid,
            desigid: desgid
        }
    }, [crtanswer, empid, desgid])
    //for saving the time and date
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/Applicationform/interviewinsert', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity("Initial Assesment Completed")
            setflag(1)
            setIsModalOpen(false)
        } else {
            warningNofity(message)
        }
    }, [setflag, setIsModalOpen, postdata])

    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        height: 300,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
                    }}
                >

                    <Box sx={{ height: window.innerHeight - 20, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        {/* <CustmTypog title={'Final Result'} /> */}
                        <Paper sx={{ width: "100%", p: 1, boxShadow: 5, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography level="h5">Hi <Typography color="success" level="h4">{name}</Typography> Your Result Is </Typography>

                        </Paper>
                        <Paper sx={{ width: "100%", p: 1, boxShadow: 5, mt: 3 }}>
                            <Typography level="h5">Correct Answer : <Typography color="success" level="h4">{crtanswer}</Typography> </Typography>
                            <Typography level="h5">Wrong Answer : <Typography color="success" level="h4">{wrganswer}</Typography> </Typography>
                            <Typography level="h5">Total Mark : <Typography color="success" level="h4">{crtanswer}</Typography> </Typography>
                        </Paper>
                        <Box sx={{ display: 'flex', justifyContent: "center", mt: 5 }}>
                            <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success"
                                onClick={handleSubmit}
                            // disabled={currentQuestionIndex > Question.length - 1}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(ResultModal)