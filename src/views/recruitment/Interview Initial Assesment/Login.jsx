import { Box, Button, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { lazy, memo, useCallback, useMemo, useState } from 'react'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import Key from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';

const Empdetails = lazy(() => import('./Empdetails'))

const Login = ({ setdesgid, desgid, empid, setempid, count, setcount }) => {
    // const [empid, setempid] = useState('');
    const [num, setnumber] = useState('');
    const [Personaldata, setpersonaldata] = useState('');
    const [flag, setFlag] = useState(0);

    const postdata = useMemo(() => {
        return {
            application_no: empid,
            num: num
        }
    }, [empid, num])
    const handleonclick = useCallback(async () => {

        const result = await axioslogin.post('/Applicationform/logindata', postdata)
        const { success, data } = result.data
        if (success === 1) {
            setpersonaldata(data)
            setFlag(1)

        }

        else {
            warningNofity("Employee Doesn't Exit, please Check the Application Number and Registered Mobile Number")
            setpersonaldata([])
        }


    }, [postdata]);
    return (
        <>
            {flag === 1 ? <Empdetails Personaldata={Personaldata} setdesgid={setdesgid} desgid={desgid} count={count} setcount={setcount} /> :

                <Box sx={{ width: "100%", height: window.innerHeight, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <ToastContainer />

                    <Paper sx={{ width: "70%", }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', p: 2 }}>
                            <Typography color="success" level="h1" sx={{}}>Login</Typography>
                            <Typography color="neutral" level="title-md" sx={{ mt: 1 }}>Sign In to your account</Typography>
                            <Box sx={{ mt: 3 }}>
                                <JoyInput
                                    variant="outlined"
                                    sx={{ p: 0, m: 0 }}
                                    type="text"
                                    color="success"
                                    placeholder="Enter Your Application No"
                                    startDecorator={<PersonIcon />}
                                    value={empid}
                                    onchange={(empid) => setempid(empid)}
                                // size="lg"
                                />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <JoyInput
                                    variant="outlined"
                                    sx={{ p: 0, m: 0, }}
                                    type="text"
                                    color="success"
                                    placeholder="Enter Your Mobile number"
                                    startDecorator={<Key />}
                                    value={num}
                                    onchange={(num) => setnumber(num)}
                                // size="lg"
                                />
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <Button sx={{ p: 0, width: "100%" }} variant="solid" color="success"
                                    onClick={handleonclick}

                                >
                                    Login
                                </Button>
                            </Box>



                        </Box>

                    </Paper>
                </Box>
            }


        </>
    )
}

export default memo(Login)